# motivation
high level -> low level mapping requires tradeoffs
performance on low-end phone not good
faster website rank higher in SEO

=================================================================================

# fps
browser max 60fps
frame = 16.67 ms

when changes in style/change DOM position => change render tree
browser continuously recalculating style,m layout relations 
  to construct tree

## 
use requestanimationFrame: sure will stop working if animation not in viewport
  
# overview
frontend is huge, has various kind of resources: html, css, js, image, (flash) ... each has different optimization skills
## aim
1. faster loading of pages, reactive operations
2. reduce request bandwidth, save resource

## ways
1. page level: http request, script loading, inline script
2. dom operation in js, css selector, image optimization, html structure

## page
### reduce http request (http 1.1 background)
complete request: DNs > server connection > send > wait response > receive
limit on number of concurrent request
1. simplify webpage
2. http cache
   - more cache better, eg. set very long expires for static image
3. resource combine and compress (min js, min css)
4. CSS Sprite (combine css image)
5. inline images (use data:URL scheme to incorporate image to page; see if size increase)
6. lazy load images

## script
1. external script place in bottom
if script place in front, will block loading of other resources
thread shared between JS and UI update, only one can happen at a time
page UI freeze while JS executing

2. async execute inline script
web worker, `<script defer="defer">`: only load after page loaded
3. lazy load javascript (mini version / load core module > other load on demand)
4. css put into head
if put in body, then css will start render even not yet parse all html
if place in bottom, then render time push back
5. async callback
delay callback after window.onload
6. reduce redirection
7. avoid duplicate resource request

## code
### DOM
add/remove/modify DOM is most time consuming
1. html collection
eg. document.images, document.forms, getElementsByTagName()
they will execute request everytime, time consuming
2. reflow & repaint
reflow: process which geometry of layout engine's formatting object computed
repaint: anything not change size,shape,position of element but change appearance (background, border, colors, visibility)

###
1. avoid with (increase scope chain length)
2. avoid eval, Function (slower x100)
3. reduce scope chain searching
use local variable to cache value first
```js
var globalVar = 1;
val localVar = globalVar;
function myCallback(info){
  for(var i=100000; i--;){
    localVar += i;
  }
}
```
```js
var len = values.length
for(var i=len; i--;){
  process(values[i])
}
do {
  process(values[j]);
} while(j--)

for(var i=0, len=divs.length; i<len; i++){
  ...
}
```

### data access
faster: literal(initializer), local variable
slower: object, array
```js
// use
let obj = {}
// instead of
let obj = new Object()
```
### string concat
'+' is slower, use join instead

### CSS
browser parse from right to left

##
image compression

## off document operation
no repaint/reflow needed
- remove element from document, make changes, insert back to document
- set display to 'none' > make changes > set display 'default'
- build DOM change on DocumentFragment, then apply all at once
DocumentFragment: document-like object, not visually represented, owned by document

2. 
minimize access to layout info
runaway script timer? [execution time, number of statements]

==============================================================================

# ES6 optimizaiton
## tail recursion 
any callback will retain call frame when A call B, only when B finish B's frame then disappear
restrict yourself only return 1 function at the end
```js
const newFib = (n, sum1=1, sum2=1) => {
  if (n<= 1) return sum2;
  return newFib(n-1, sum2, sum1+sum2)
}
// VS
const fib = n => {
  if(n<=1) return 1
  return fib(n-1) + fib(n-2)
}

// not tail recursion
const a = x => {
  let m = b(x) // assign after calling function
  return m
}

function a(x){ b(x); } // no return 

const a = x => b(x)-2 // other operations after callback

const trampoline = f => {
  while(f && f instanceof Function){
    f = f();
  }
  return f
}

const newFib = (n, sum1=1, sum2=1) => {
  if (n<= 1) return sum2;
  return newFib(n-1, sum2, sum1+sum2)
}

const fib = n => {
  if(n<=1) return 1
  return fib(n-1) + fib(n-2)
}

const fibonacci = (n, ac1=1, ac2=1) =>
  n <= 1 ? ac2 : fibonacci.bind(null, n - 1, ac2, ac1 + ac2)


// console.log(trampoline(newFib(50000)));
console.log(trampoline(fibonacci(50000000)));
// console.log(newFib(50000)) ;
// console.log(fib(30));


```
if the return of function is single function, it will be much much faster and memory efficient

## boolean
replace true/false with 1/0

## hash map without side effect
`const map = Object.create(null)`
remove __proto__, save memory when prototype not necessary

## reduce scope layers to fasten search
`const tempState = Object.assign({}, this.state)`

## use bit level operations
can use when related to binary operations
```js
n & 1 ? 'odd' : 'even'
1 << n
~~decimals
x << n
x >> n
```

## multiple matching 
use Array/Object/Map/WeakMap replace if-else/switch
object, map, weakmap use hash-value, more efficient
WeakMap avoid memory leakage, but key can only be object


## rail model
response: 100ms 
animate: 8ms (screen 60fps)
idle work: 50ms chunks (if there exists continuous task, divide it into smaller chunk, 
  allow main thread respond to user input)
load: 1000ms to interact

## 
avoid any js animation framework, finish animation in 8ms

load polyfill when needed, since polyfill code with many duplicates is very huge
`<script type="module"></script>`
browser supporting 'module' also support ES2015+ features, so 
```js
(function(){
  try{
    new Function('async() => {}')();
  } catch(error){
    // go with legacy-bundle.js
    return;
  }
  // go with modern-bundle.js
})
```









