# 'first paint'(白屏時間) first, then 'dom ready' ? 
first paint: from opening page to seeing sth on sreen
dom interactive: user can interact with page

#
```js
if(! "a" in window){
    var a = 1;
}
```
a == undefined

since ! has higher priority to `in`, so is false

#
`var a=b=5;   ===   var a=5; b=5;`
if vairable declared without var, then it's global variable
will be error in strict mode

# jsx
`<div className="msg-box">{msg}</div>`
# angular
scope

# || &&
```js
// return first one
typeof(a) || typeof(b)  === typeof(a)
'n' || 1  === 'n'
1 || 'n'  === 1
 
// return last one 
'a' && 'b' === 'b'
1 && true === true
```

# 
```js
var x=0;
switch(++x){
  case 0: ++x;
  case 1: ++x;
  case 2: ++x;
}
```
when x enter switch -> 1, then ++x->2, since no break, jump to case 2:
++x->3

# this
1. if there's obj, then obj
2. if no obj, then global obj
3. use new point to new obj
4. use apply/call/bind change obj pointed by this

# js mechanism
event like click, focus, setTimeout, ajax will cause ajax
js is single thread, so prefer sync task first
execute from top to bottom, when face async, freeze it, place in async queue; only when sync task finished, then look at async

`for` is sync task, so execute for first

# 
"40"%7 is ok, direct convert "40" -> 40

a.sort() -> will change a

# cross domain
jsonp: old browser support
  no need XHR
  only support GET

#
before js execute, will declare all things with var, function

#
`output(typeof (function() {output(“Hello World!”)})());`
immediate execute anonymous function, then return nothing, so undefined

#
span is not block element, so cannot set width & height
with float:left, span becomes block, can set height:100%

# Promise status
pending, resolved, rejected

#
typeof null == object
typeof return [symbol,number,string,function,boolean,object,undefined]
typeof [1,2] == object
typeof([1,2]) == object

#
```js
var B = function(){this.n = 9999};
var C = function(){var n = 888};
// n in B belongs to class
// no n in C
```

# req and response header
## request
GET
Accept
Accept-Language
Connection: Keep-Alive
Host: localhost:8080
Referer: (where client referred from which link)
User-Agent
Accept-Encoding
If-Modified-Since (last cache time)
Cookie
Date
## response
Location
Server (server name)
Content-Encoding (compress format)
Content-Length
Content-Language
Content-Type (encoding, charset)
Last-Modified
Refresh (redirect)
Content-Disposition (attachment; filename=aaa.zip)
Transfer-Encoding (chunk: send data as chunk)
Set-Cookie
Expires
Cache-Control (allow cache or not)
Pragma
connection (connect relation)
Date








