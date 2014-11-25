/*jslint node: true, plusplus: true, regexp: true  */
'use strict';

// Isset
var isset = function (object) {
	return (object !== "undefined" && object !== undefined && object !== null && object !== "" && typeof object !== 'undefined') ? true : false;
};

function Cookies($) {
	this.__proto__.header = [];
	this.__proto__.signal = $;
	
	var cookieHeader = $.header('cookie'),
        split,
        split_length,
        i,
        item,
        cookieSplit,
        name,
        value;
	if (cookieHeader) {
		split = cookieHeader.split(';');
		split_length = split.length;
		for (i = 0; i < split_length; i++) {
			item = split[i];
			cookieSplit = item.split('=');
			name = cookieSplit[0].trim();
			value = cookieSplit[1].trim();
			this[name] = value;
		}
	}
		
	return this;
}

Cookies.prototype.set = function (name, value, options) {
    var expires = '',
        days,
        hours,
        minutes,
        future,
        now,
        domain,
        secure,
        httpOnly,
        path,
        header_string;
	// Safe Options Reference
    options = options || {};
	
	// Calculate Expiration Time
	if (isset(options.expire)) {
		days    = options.expire[0] * 1000 * 60 * 60 * 24;
		hours   = options.expire[1] ? options.expire[1] * 1000 * 60 * 60 : 0;
        minutes = options.expire[2] ? options.expire[2] * 1000 * 60 : 0;
        future  = days + hours + minutes;
        now     = new Date().getTime();
        expires = ' Expires=' + new Date(now + future).toGMTString() + ' ';
	}
	
	// Create Safe References to Cookie Options
	domain     = (!isset(options.domain))  ? ''            : ' Domain=' + options.domain + '; ';
	secure     = (isset(options.secure))   ? '; secure '   : '';
	httpOnly   = (isset(options.httpOnly)) ? '; httpOnly ' : '';
	path       = (!isset(options.path))    ? '/'           : options.path;
	
	header_string = name + '=' + value + '; Path=' + path + ';' +
        domain +
        expires +
        secure +
        httpOnly;
	
	this[name] = value;
	this.header.push(header_string);
	this.signal.header('set-cookie', this.header);
};

Cookies.prototype['delete'] = function (name, options) {
    options = (isset(options)) ? options : {};
	var domain = (!isset(options.domain))	? '' : ' Domain=' + options.domain + '; ',
        path   = (!isset(options.path)) ? '/' : options.path;

	delete this[name];
	this.header.push(name + '=;' + domain + ' expires=Thu, 10 Mar 1994 01:00:00 UTC; path=' + path);
	this.signal.header('set-cookie', this.header);
};

// Cookie Handler Module
module.exports.global = function ($) {
	$['return'](new Cookies($));
};

module.parent['return']();