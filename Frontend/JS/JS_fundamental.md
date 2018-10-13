# Number VS new Number
let a1 = Number() // Number
let a2 = new Number() // Object

# copy
for primitive value, pass by value
for objects, pass by reference
```js
let a = 5;
let b = a;
b = 10;
// a=5, b=10

let obj1 = {a:5, b:10, c:15}
let obj2 = obj1
obj2.b = 20
// obj1 = {a:5, b:20, c:15}
// obj2 = {a:5, b:20, c:15}


```
shallow copy: copy collection structure, not element
  - it duplicates as little as possible
  - for primitive value, pass by value
  - for objects, pass by reference
deep copy: copy whole thing including element
  - duplicates everythin

shallow copy:
- Array.concat
  + for strings, numbers, bool => copy value into new array
  + for object ref, copy ref into new array [will affect new]
- Array.slice
  + for strings, numbers, bool => copy value into new array
  + for object ref, copy ref into new array [will affect new]
- Object.assign
  + copy value, not affect new array  

deep copy:
- JSON.parse(JSON.stringify(object_array))
- jQuery.extend({}, objectIsOld)
- lodash's _.cloneDeep

only copy attribute value:
- Object.assign({}, {a: 1})

# call & apply
call: for multiple arguments
apply: for single argument (eg. Array, Object..)
```js
fn.call(this, arg1, arg2)
fn.apply(this, arg1)

function Album(id, title, owner_id){
  this.id = id;
  this.name = title;
  this.owner_id = owner_id;
};

Album.prototype.get_owner = function(callback){
  var self = this;
  $.get('/owners/' + this.owner_id, function(data){
    callback && callback.call(self, data.name);
  })
}
```
call and apply allow dynamic function reference, not fixed when run program

## range
arbitrary part of content of an HTML document
eg. user text selection

for highlight, store range to server
startNode -> startContainer(dom element)
  store DOM as Selection object
  
## xpath
XML path language, use non-XML syntax to address different parts of an XML document
  
## es6 class vs es5 prototype
basically the same, one difference is for eg.
Dog inherit from Animal, and then
  es5: Dog.prototype.constructor === ?Animal
  es6: Dog.prototype.constructor === Dog

## Number system
any radix -> base-10 num
eg.
parseInt("11",2) === 3
parseInt("11",6) === 7
parseInt("0x11") === 17

base-10 num -> any radix
eg.
(17).toString(16) === "11"
(0b111111).toString(16) = "31"

# call by value VS call by reference
value: create new variable a, let a has same value as input
ref: let a as alias of x, a & x has same variable

# memory
## stack
primitive data types has fixed size, so store in stack, system auto allocate memory space
can access its value directly

## heap
js's array has variable size, values are obj in heap
cannot access to cetain position in heap directly

`let b = {m: 20}`
b store in stack, has value of address to {m: 20}
{m: 20} store in heap

## lifecycle
1. allocate memory you need
2. read / write on allocated memory
3. when no need, free it










