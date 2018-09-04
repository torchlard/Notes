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
const sums = ([a, ...b]) => (b.length==0) ? 0 : a+sums(b)

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


