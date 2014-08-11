# **diet-cookies**
An HTTP cookie manager for diet.

## **Install**
```
npm install diet-cookies
```

## **Example Usage**
```js
require('diet');
app = new App();
app.domain('http://localhost:8000/');
app.plugin('diet-cookies', { alias: 'cookies' });
app.start();

app.get('/', function($){
    // set cookies
    $.cookies.set('id', '1000');
    
    // read cookies
    console.log($.cookies.id);  // -> '1000'    
    console.log($.cookies);      // -> { id: '1000' }
    
    // delete cookies
    $.cookies.delete('id');
    
    $.end();
});
```

## **Read Cookies**
Every cookie is stored in the `$.cookies` object.
```js
$.cookies.your_cookie_name
$.cookies.other_cookie
```

## **Set Cookies**
`name` and `value` is required, `options` are not.
```js
// api
$.cookies.set(name, value, options);
```
```js
// example with defaults
$.cookies.set('id', '100', {
    expire: [0,0,0],    // [days, minutes, seconds]
    httpOnly: false,    // for http only managable cookies
    secure: false,      // for secure cookies
    path: '/',          // set cookies spcific to paths  
    domain: ''          // set cookies specific to domains
})
```

## **Delete Cookies**
```js
// api
$.cookies.delete(name);
```
```js
// example
$.cookies.delete('id');
```

# MIT Licensed

Copyright (c) 2014 Halász Ádám <mail@adamhalasz.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.