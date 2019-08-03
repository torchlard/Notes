## Object.assign
a ways to copy object with modification, used in fp
```js
const one = {
  'a': 1, 'b':2, 'c':3
}
const two = Object.assign(one, {'c': 4, 'a':9, 'd':3})
console.log(two) // {'a':9, 'b':2, 'c':4, 'd':3}
```

## pattern matching
```js
let [a,b,c] = [1,[2,3], {'ok': 3}, 5 ]
// a = 1, b = [2,3], c = {'ok': 3}

let [e, ...f] = [1,2,3,4]
// e=1, f=[2,3,4]
```
extra variables will be ignored
intrinsically pattern matching like haskell

eg. summation by pattern matching
```js
const sums = ([a, ...b]) => (b.length==0) ? a : a+sums(b)

// fibonacci number
const init = [1,1]
const fibo = (n, [a,b, ...rest]) => {
  const ans = [a + b, a, b].concat(rest)
  return (ans.length > n) ? ans : fibo(n, ans)
} 

console.log(fibo(30, init));

// object
let {foo, bar} = {foo: 'aaa', bar: 'bbb'}
let {fol: f, gol: g} = {fol: 'aa', gol: 'bb'}

// string
const [a,b,c,d,e] = "hello"

// property
let {length: le} = "hellow"

// function
[1, undefined, 3].map((x = 'yes') => x)
// [1, 'yes', 3]
```

avoid using ( or )

## generator
function* fibs(){
  let a = 0
  let b = 0
  while(true) {
    yield a
    [a, b] = [b, a+b]
  }
}

## var VS let
since var is valid in global scope, i in console.log
all point to same i (the last i value in iterations)
```js
var a = []
for (var i=0; i<10; i++){
  a[i] = function(){
    console.log(i);
  };
}
a[6](); // 10

// parent scope: setting iteration variable
// child scope: iteration body
for (let i=0; i<3; i++){
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

`let` cannot declare same variable twice in same scope
`const`: data in memory address pointed by variable cannot be changed
  if the data structure it pointed to is mutable, then the value can be changed

## string
```js
for (let codePoint of 'foo')
  console.log(codePoint)
// 'f'
// 'o'
// 'o'

String.raw({raw: 'testvv'}, 0,1,2)
// "t0e1s2tvv"
```

## escape character
filter malicious code from user input
```js
let sender = '<script>alert("abc")</script>'

function SaferHMTL(templateData) {
  let s = templateData[0]

  for (let i=1; i<arguments.length; i++){
    let arg = String(arguments[i])

    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    s += templateData[i]
  }

  return s
}

let message = SaferHMTL`<p>${sender} has sent you a message.</p>`

console.log(message);
```

## Number
`Number.EPSILON`
since js uses IEEE 754 standard, precision of number at most 64 bit
therefore 0.1+0.2 not equal to 0.3 !!!
```js
function withErrorMargin(left,right) {
  return Math.abs(left-right) < Number.EPSILON * Math.pow(2,2)
}
withErrorMargin(1.1+1.3, 2.4)  // true

// power
2**3 === 8
2**3**2 = 2**(3**2)
```

## function
```js
(function (a,b,c=5) {}).length // 2

const full = ({first, last}) => first + ' ' + last;
  ===
function full(person){
  return person.first + ' ' + person.last;
}

const headAndTail = (head, ...tail) => [head, tail]
headandTail(1,2,3,4,5) // [1,[2,3,4,5]]
```

## Object
```js
const foo = 'bar'
const baz = {foo}
console.log(baz); // {foo: 'bar'}

const g = (x,y) => {return {x,y}}
console.log(g(1,2));


let obj = {
  ['h'+'ell'](){
    return 'hi'
  }
}
console.log(obj.hell()); // 'hi'

```


## Symbol
when you use object provide by others, and want to add new method
name of new method may conflict with existing methods
=> mechanism to ensure unique field name

`Symbol` as primitive data structure, is value not object
  ~ string

```js
let mySymbol = Symbol();

let a = {}
a[mySymbol] = 'Hello'

let a = {
  [mySymbol]: 'Hello'
}
```

## Set
```js
const a = new Set()
[2,3,4,5,2,2].forEach(x => s.add(x))
// a = Set{2,3,4,5}

// remove redundancy
[...new Set(array)]
```

## Map
js object can only use string as key => many limitations
Map allow any kind of value and object as key => value--value pair
better hash architecture

```js
const m = new Map()
const o = {p: 'hi'}
m.set(p, 'content')
m.get(o) // 'content'

const map = new Map([
  ['name', 'zhang'], ['title', 'author']
])
map.size // 2
map.get('name') // 'zhang'
```

## Proxy
change default operation in language level => program to programming language
(meta programming)
- set barrier before access to target
overloads operator

```js
let obj = new Proxy({}, {
  get: function(target, key, receiver){
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver)
  },
  set: function(target, key, value, receiver){
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver)
  }
})

obj.count = 1
// setting count!
++obj.count
// getting count!
// setting count!
```

## Reflect
```js
Reflect.get(target,name) === target[name]
Relect.set(target, name, value) === target[name]=value
```
Reflect is used with Proxy
adv:
1. more elegant return value (return obj if success, return error if fail)
2. more reliable apply
3. 


## Iterator
js increase Map, Set on top of original Array, Object collections,
so we need 
1. unified interface to manage all these different data structure
2. member list in certain order
3. iterate by "for...of"

procedure:
1. create pointer object, point to initial position
2. call next, point to first member
3. call next again to 2nd member until last one


# good practice
```js
const itemsCopy = [...items]

// convert array-like object to array
const foo = document.querySelectorAll('.foo')
const nodes = Array.from(foo)

/// replace bind, avoid self/_this/that to bind this
const boundMethod = (...params) => method.apply(this, params)
```

when simulate real world object => use Object
when building key: value structure => use Map (has build in iterator)






