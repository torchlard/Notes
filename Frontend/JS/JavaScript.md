## ajax
modern browser dont support cross domain: both web page and xml must in same server

## keep event binding after refresh component
$("body").on('click',"#btn",function(){
  ...
});
bind to sth that never refresh

#refresh only part of page
$("#mainTable tbody").load("js/test.php");
replace only the selected part with new html code

# global object
var global_var = this; //make glbal_var a global object
global variable = property of global object

var scope = "global"; //global
function f(){
  console.log(scope); //undefined
  var scope = "local";
  console.log(scope); //local
}

# scope chain
list/ chain of objects that defines varaible that are in scope
first obj -> if no property named x, next -> ... unitl find property x
function invoked:
1. new obj store local variable
2. + new obj -> stored scope chain
  => ✅ new, longer chain of scope of function invocation

# initializer
var p = {x:2.3, y:-1.2};
q.x=2.3, q.y=1.2;

# extensible
can it add new property to object?
# serialization
turn object's state to string

# array
array is special js object

unshift -> | | | | <- push
shift   <- | | | | -> pop

slice: get part of array
concat: concat array
var a = [1,2,3,4,5,6,7,8];
b = a.splice(1,3);
a -> 1,5,6,7,8
b -> 2,3,4

# rw property rule
1. reading
- check if property exist
- check if prototype object has that property
2. writing
- only allow writing to current object, not prototype

# avoid prototype to native data type
eg. never add properties to Object.prototype, anything you add will be
enumerable with a for/in loop

# with
in js, `with` defines the context of the code, but better not to use it (deprecated)
eg.
with(this){
  return width*height;
}

# JS vs JAVA
1. class property in Java is a property that is associated with a class itself,
rather than with each instance of a class. Only one copy of each class property.
2. Global class property in javaScript.
3. `this` keyword does not refer to any particular instance of class, instead refers
to constructor itself. Class methods are global.

# code to hide console message source
var console = (function(oldCons){
  return {
    log: function(text){
      setTimeout(oldCons.log.bind(oldCons, text));
    }
  }
})(window.console);

# Async VS Sync
JS is single-thread => only 1 thread interpret and execute js code [main thread]{runtime}
there can be other thread: AJAX, DOM, timer, read/write in Node.js ... [worker thread]
Synchronous:
- wait for previous task complete, and execute next task
- all tasks queue
Async:
- after finish first task, execute 1/many callbacks, not next task
- after function return, user cannot get expected result immediately, need to get by some ways
eg.
fs.readFile('foo.txt', 'utf8', function(err,data){
  console.log(data);
});
-------
var button = document.getElement("#btn");
button.addEventListener('click', function(e){
  console.log();
});
-------
timer.addEventListener('timeout', 1000, fn);

## Messaging
- main thread initialize async task
- main thread execute other code
- worker thread execute async task
- after finish async task, worker thread put message in message queue(FIFO), main thread get message via event loop
- after main thread clear old stack frame, it get msg from event loop, create new stack frame, and execute them
- repeat loop

## Event
all event can be seen as inform mechanism by asynchronous function
the concept of event is not compulsory, its existence make it more frendly to programmer

## Stack of frames
function foo(b){
  var a = 10;
  return a+b+11;
}
function bar(x){
  var y=3;
  return foo(x*y);
}
console.log(bar(7));
| foo |
| bar |

## Heap
Objects are allocated in heap -> large mostly unstructured region of memory

# Promise
state { pending, fulfilled, rejeced }
then can return 3 type of obj { value, promise, thenable }
- value: nothing to say
- promise: when you want to make your custom `Promise` object
  either new one / Promise.resolve(value)
- thenable: for other function/framework usage that not satisfying standard

## async
async: this is an async function, await can only be used inside it
await: wait for promise to return result, and then continue to execute
      await followed by `Promise` object

# super
calling `super()` is necessary if and only if you need a `constructor`
`this` is uninitialized if `super()` is not called

# call, apply
`call` & `apply` point `this` to the first argument of call/apply
if function is used as constructor, then `this` points to object created by `new`

# import declaration may only appear at top level of a module
<script src="rx01.js" type="module"></script>

# unable to monitor directories (guard)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# Iterator
objects with method `next`, has property `value`,`done`
- a mechanism provides consistent interface for iteration of different data structure
# Generator
return iterator, use * denote, cannot use =>
# Iterables
objects with property `Symbol.iterator`, return iterator
all collections (arrays,sets,maps) are iterables
use with `for...of`

# LINQ (Language Integrated Query)
use same method to query different data structure

# push/pull
- push: producer decide when execute callback
- pull: consumer decide when execute callback

|      | single   | multiple   |
|:-----|:---------|:-----------|
| pull | function | Iterator   |
| push | Promise  | Observable |

# Event emitter VS observable
EventEmitter: share side effects, execute regardless subscriber
Observable: no shared execution, lazy

# Observable
- can deliver values either synchronously or asynchronously
- subsribing to Observable is like calling a function

# Subject
- plain Observable = unicast(each observer own independent execution of Observable)
- Subject = multicast
- subscribe registers given Observer in list of Observers ~ addListener
## BehaviorSubject
best represent values over time
## ReplaySubject
can buffer old values before another subscribe

# Operator
pure function, do not change Observable instance, rather return new Observable

# Scheduler
- data structure: know how to store and queue tasks
- execution context: denotes where and when task executed
- virtual clock
- if not specified, RxJS use the one with least concurrency

# arrow function
let materials = [
  'hydrogen', 'helium', 'lithium'
];
materials.map(function(material){
  return material.length;
})
materials.map((material) => {
  return material.length;
})
materials.map(({length}) => length);

# simplify code
const BlogController = {
  index(posts) {return Views.index(posts)},
  show(post) {return Views.show(post)},
  update(post, attrs) {return Db.update(post, attrs)}
};
==>
const BlogController = {
  index: Views.index,
  show: Views.show,
  update: Db.update
};

# side effect
change of system state / obsesrvable interaction with outside world that occurs during calculation of result
objective: contain them and run them in a controlled way

# pure function
mathematical functions

# wrap impure function
// everytime pureHttpCall will return same result
const memoize = (f) => {
  const cache = {};

  return (...args) => {
    const argStr = JSON.stringify(args);
    cache[argStr] = cache[argStr] || f(...args);
    return cache[argStr];
  }
}

const pureHttpCall = memoize((url, params) => () => $.getJSON(url, params))

# referential transparency
code can be substituted for its evaluated value without changing the behavior of program

# currying
call a function with fewer arguments than it expect, it returns a function that takes remaining argument

# higher order function
function that take or return a function

# Pointfree
const snakeCase = word => word.toLowerCase().replace(/s+/ig, '_' );
__ ===>
const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
__

# switch
const go1 = () => console.log('4fd');
const go2 = () => console.log(5);
const go3 = () => console.log(6);
const abcd = () => console.log('default');

const choose = a => ({
  'a': go1,
  'b': go2,
  'c': go3
}[a] || abcd )()

choose('b')

# Composition event
handle input method editor input serial

# CSS
access css styles by
1. getComputedStyle(element).width
get final css style of element
2. element.style.getPropertyValue('width')
get inline css style
3. element.style.width
can get and set inline css

# semicolon issue
avoid begin new line with ( [ `
















