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







