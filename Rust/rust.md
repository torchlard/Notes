# rust update
rustup update stable

# cargo
project management tool for Rust

start `cargo new hello_world --bin`

src file: src/
lib entry: src/lib.rs
executable entry: src/main.rs
other executable: src/bin/*.rs
testing: tests/
examples: examples/
benchmarks: benches/

cargo.toml: cargo specific project description file

## operations
cargo build
cargo run
cargo clean
cargo update: update all dependency
cargo install

# Packages
crate: binary/library
crate root: source file that know how to build crate
Cargo.toml: describe how to build >= 1 crates

- a package contain 0/1 library crate, any number of binary crates (multiple files in src/bin)
- at most 1 crate in package can be library
- at least 1 crate(library/binary) in package

# module
module: way to organize code, control privacy of paths
path: way to name items
use: bring path into scope
pub: make items public
as: rename items

- all items (fn, method, struct, enums, modules, constants) are private by default
- use `pub` to make item public

```rust
mod sound {
  pub mod instrument {
    pub fn guitar(){
      super::breath();
    }
  }
  fn breath(){}
  mod voice {
  }
}
mod ma {
  mod mb {
    mod mc {
      pub fn calls(){}
    }
  }
}
mod pa {
  pub use ma::mb::mc;
}

use crate::ma::mb::mc;
use std::io::Result as IoResult;

fn fn2() -> IoResult<()> {}

fn main(){
  // absolute path
  crate::sound::instrument::guitar();
  // relative path
  sound::instrument::guitar();
  mc::calls();
  pa::mc::calls();
}
```
define 2 modules (instrument, voice) within sound module

module tree
```
crate
  |-- sound
      |-- instrument
      |-- voice
```

absolute path: starts from crate root
relative path: start from current module, use `self`, `super`, identifier in current module
- both abs/rel path followed by >=1 identifier separated by ::

```rust

mod plant {
  pub struct Vegetable {
    // since name field is public, in main we can read/write to name field by dot notation
    // if not pub, cannot read/write to name
    pub name: String,
    id: i32
  }

  impl Vegetable {
    pub fn new(name: &str) -> Vegetable {
      Vegetable {
        name: String::from(name),
        id: 1
      }
    }
  }
}

fn main(){
  let mut v = plant::Vegetable::new("squash");
  v.name = String::from("butternut squash");
  println!("{} are deliciout", v.name);
}
```
- for functions, better to `use` parent module
- for structs,enum,others, better to `use` full path
  
to bring standard library items
```rust
use std::cmp::Ordering; // start with std
use std::{cmp::Ordering, io}; // nested

use std::io;
use std::io::Write;
// ==>
use std::io::{self, Write};

use std::collections::*;
```

## different files
```rust
// src/main,rs
mod sound;
fn main(){
  crate::sound::instrument::clarinet();
}

// src/sound.rs
fn main(){
  pub mod instrument {
    pub fn clarinet() {}
  }
}
// OR
pub mod instrument;

// src/sound/instrument.rs
pub fn clarinet() {}

```

<!-- ============================== -->

# syntax
ref immutable by default
safe and easy to use reference

## handle failure
Result types are enumerations -> enums
- variants are Ok, Err

if read_line returns Err, likely be result of error coming from OS
if don't call expect, still compile with warning


## raw identifier
use keyword for another purpose
eg. call function named `match` from C library
=> use raw identifier start with r#
```rust
let r#fn = "this var na";
r#match();
```

## constant VS variable
1. cannot use mut with constant
2. declare constant using `const`, type of value must be annotated
3. constants can be declared in nay scope, including global scope
4. constant may set only to a constant expression, not result of function call / other value could only be compputed at runtime

## shadowing
declare new variable with same name as previous variable, new variable shadows previous one

```rust
let x=5;
let x = x+1;
println!("the value of x is {}", x);
// 6
```
first variable shadowed by second

### mut VS let
- use `let` each time create new variable
- can change type of value but reuse the same name
```rust
let spaces = "    ";
let spaces = spaces.len();
```

# Data type
## scalar type
### integer type
i8: 8-bit
i16, u16, i32(default), u32, i64, u64, i128, u128
isize: 64 bit if 64-bit architecture; 32 bit if 32-bit arch
usize

### number literals
decimal: 98_222
Hex: 0xff
Octal: 0o77
Binary: 0b1111_0000
Byte: b'A'

### floating point
```rust
let x = 2.0; // f64
let y: f32 = 3.0;
```
f32: single-precision
f64: double precision

### boolean
let f: bool = false

### char
let c = 'z';
let heart_cat = '😻';

unicode scalar value

## compound type
```rust
// tuple
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x,y,z) = tup;
println!("the value of y is {}", y);

// array
let a = [1,2,3,4,5];
```

### array
data allocate on stack rather than heap
ensure always have fixed number of elements
array isn't as flexible as vector

# program
```rust
let x=5;
let y={
  let x=3;
  // last sentense without ; is return
  x+1
};

println!("the value {} {}", x, y);
// 5 4
```

## loop
```rust
let mut counter = 0;
let result = loop {
  counter += 1;
  if counter == 10 {
    break counter*2;
  }
  println!("{}", counter);
};

assert_eq!(result, 20);
```

## boolean
```rust
let condition = true;
let number = if condition {5} else {6};
println!("{}", number);
// 5
```

# semicolon
almost everything in rust is an expression
semicolon suppress the result of expression

# Ownership
- each value has a variable called owner
- there can only be 1 owner at a time
- when owner goes out of scope, value dropped
## data strucutre
stack is efficient
heap is time consuming to copy
## deep copy/shallow copy
rust will not deep copy automatically, need to call `.clone()`
for primitive type (integer,char,boolean)

```rust
let s = String::from("hello");
let t = s;
println!("{}, {}", s,t);
```

# Reference
reference: &
dereference: *

```rust
fn {
  let s1 = String::from("hello");
  let len = calculate_length(&s1);
  println!("length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
  s.len()
}
```
![](img/ref.svg)

&s1 let us create a reference refer to vlaue s1, but not own it
- so value it points to will not dropped when ref goes out of scope, bocause we don't have ownership
- fn have ref as params instead of autual values

borrowing: having references as function parameters
- we cannot modify something we're borrowing

## borrow
```rust
let mut s = String::from("hello");
{
  let r1 = &mut s;
}
// r1 goes out of scope here, so can make new ref
let r2 = &s;
// --------
let mut s = String::from("hello");
let r1 = &s;
let r2 = &s;
let r3 = &mut s;  // error
```
variable that already borrowed as immutable cannot borrow as mutable
- users of immutable ref not expect value to suddenly change

## dangling references
```rust
fn main() {
  let ref_to_nothing = dangle(); // error
}

fn dangle() -> &String {
  let s = String::from("hello");
  &s  // better return s instead
}
```
no value to borrow from
s is created inside dangle, when code of dangle is finished, s will be deallocated
=> ref point to invalid String

rules
1. at any given time, either 1 mutable ref / any num of immutable ref
2. ref must always be valid

## slice
slice not have ownership, ref contiguous sequence of elements in collection

range:
```
[0..2] == [..2]
[0..len] == [..]
```
slice range must occur at valid UTF-8 char boundaries
- assume ASCII only in here

```rust
fn main(){
  let mut x = String::from("hello world");
  let word = first_word2(&x);
  // error: x already borrowed to immutable word, cannot modify
  x.clear();
  println!("{}", x);
}

fn first_word2(s: &String) -> &str {
  let bytes = s.as_bytes();
  for(i, &item) in bytes.iter().enumerate(){
    if item == b' ' {
      return &s[0..i];
    }
  }

  &s[..]
}

```

### String VS str


# struct
~ OOP data class
```rust
struct User {
  email: String,
  sign_in_count: u64,
  active: bool
}
User {
  username: String::from("some_usernames"),
  active: true,
  sign_in_count: 1
}

struct Color(i32, i32, i32);
let black = Color(0,0,0);
```

## display
```rust
println!("{:?}", rect);   // (30,30)
println!("{:#?}", rect);
// (
//   30,
//   30
// )
```

# method
implementation block
```rust
struct Rectangle {
  width: u32,
  height: u32
}

impl Rectangle {
  fn area(&self) -> u32 {
    self.width * self.height
  }
}
```
method take ownership of self, borrow self immutably
if use `&self`, don't want to take ownership, just want to read data in struct, not write to it

adv method over function is organization
-> put all things with an instance of type in 1 impl block

## ->
rust don't have `->` in C++ => has automatic referencing, dereference the pointer
- when call method with `object.something()`, automatically add in `&, &mut / *` so object matches signature of method

```rust
p1.distance(&p2);
// equivalent to
(&p1).distance(&p2);
```
rust can figure out whether method is reading(&self), mutating (&mut self), or consuming(self)
- make borrowing implicit

## associated funciton
define functions within impl that not take self as parameter
use `::` to call associated function
```rust
impl Rectangle {
  fn adds(x: i32, y: i32) -> i32 {
    x+y
  }
}
fn main(){
  println!("{}", Rectangle::adds(1,2));   // 3
}
```
each struct allowed to have multiple impl blocks

# enum
```rust

enum IpAddr2 {
  V4(u8, u8, u8, u8),
  V6(String)
}
let home = IpAddr2::V4(127, 0, 0, 1);
let loopback = IpAddr2::V6(String::from("::1"));

```

# Optional
rust don't have null

```rust
let some_val = Some(0u8);
match some_val {
  Some(3) => println!("three"),
  _ => println!("fail")
}
// ===>
if let Some(3) = some_val {
  println!("three");
} else {
  println!("fail");
}
```

# Collections
```rust
let v = vec![1,2,3,4,5];
let third: &i32 = &v[2];

match v.get(1) {
  Some(third) => println!("third elem is {}", third),
  None => println!("none")
}


let mut v2 = vec![100, 32, 57];
for i in &mut v2 {
  // dereference operator * to get value in i before using +=
  *i += 50;
}
```
rust need to know what types will be in vector at compile time
- to know exactly how much memory on heap will be needed to store each element
- can be explicit about what types allowed in vector

## String
only one string type: string slice `str`

String: a module
use `String::from` to create String from string literal

## HashMap
```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Blue"), 30);  // overwrite
scores.insert(String::from("Yellow"), 50);
// only insert when key has no value
scores.entry(String::from("Yellow")).or_insert(70);

println!("{:?}", scores);

let teams = vec![String::from("Blue"), String::from("Yellow")];
let initial_scores = vec![10, 50];
let sc: HashMap<_,_> = teams.iter().zip(initial_scores.iter()).collect();

println!("{:?}", sc);

```


# Error
## Unrecoverable error
panic!
```rust
let v = vec![1,2,3];
// panic! error
v[99];

// call panic
panic!("crash and burn");
```
program will stop immediately

## Recoverable error
Result
- most errors aren't serious enough to require program to stop entirely
- can easily interpret and respond to
eg. open a file that doesn't exist => create file instead
```rust
use std::fs::File;
fn main(){
  let f = File::open("hello.txt");
  let f = match f {
    Ok(file) => file,
    Err(error) => {
      panic!("there was problem opening file {:?}", error)
    }
  };
}
```

unwrap: return value inside Ok
expect: keep track of error easier by msg

### propagating error
if error in fn1 called by fn2
- handling error within fn1 => return error to fn2
- let fn2 decide what to do
```rust
// if fn succeed, return Ok that hold String (username)
// if Err, return Err value that holds an instance of io::Error
fn read_username() -> Result<String, io::Error> {
  let f = File::open("hello.txt");
  let mut f = match f {
    Ok(file) => file,
    Err(e) => return Err(e)
  };

  let mut s = String::new();
  match f.read_to_string)&mut s) {
    Ok(_) => Ok(s),
    Err(e) => Err(e)
  }
}
// ==>
fn read_username() -> Result<String, io::Error> {
  // ?: work almost same way as match expression defined to handle Result value above
  let mut s = String::new();
  File::open("hello.txt")?.read_to_string(&mut s)?;
  Ok(s)
}
```
`?` can only be used in functions that return Result
- use unwrap/expect as placeholder for prototyping, before ready to decide how to handle errors
- `panic` can mark test as failure
- unwrap to ensure Result will have Ok value

## advice
- panic when possible that code end up in bad state
- bad state: sth that expected to happen occasionally
- bad state: when some assumption/guarantee/contract/invariant broken
- return Result when failure expected
make use of Rust's type system to do many checks for you

better to make new type and put validation in fn, so to guarantee output valid
```rust
pub struct Guess {
  value: i32
}
impl Guess {
  pub fn new(value: i32) -> Guess {
    if vlaue < 1 || value > 100 {
      panic!("guess value must 1-100, got {}", value);
    }
    Guess {
      value
    }
  }
  pub fn value(&self) -> i32 {
    self.value
  }
}

```

# Generic
zero cost abstraction by monomorphization
- turn generic code into specific code by filling in concrete type when compiled

```rust
struct Point2<T,U> {
  x: T,
  y: U
}
impl<T,U> Point2<T,U> {
  fn mixup<V,W>(self, other: Point2<V,W>) -> Point2<T,W> {
    Point2 {
      x: self.x, 
      y: other.y
    }
  }
}

fn main() {
  let q1 = Point2{ x: 5, y: 10.0};
  let q2 = Point2{ x: "hello", y: 'w'};

  println!("p.x = {}", p.x());
  let mix = q1.mixup(q2);
  println!("after mixup: {}, {}", mix.x, mix.y);
}
```

# Trait
tell compiler about functionality of particular type, can share with other type
- group method signature together

we can't implement external trait on external types
- must be local to our crate
- for other file, has to specify `use aggregator::Summary`

must implement all methods without default implementation in trait

```rust
pub trait Summary {
  fn summarize(&self) -> String;
}

pub struct NewsArticle {
  pub headline: String,
  pub location: String,
  pub author: String,
  pub content: String
}

impl Summary for NewsArticle {
  fn summarize(&self) -> String {
    format!("{} by {} ({})", self.headline, self.author, self.location)
  }
}

pub struct Tweet {
  pub username: String,
  pub content: String,
  pub reply: bool,
  pub retweet: bool
}

impl Summary for Tweet {
  fn summarize(&self) -> String {
    format!("{}: {}", self.username, self.content)
  }
}

fn main(){

  let tweet = Tweet {
    username: String::from("horse_ebook"),
    content: String::from("of coz, as you"),
    reply: false,
    retweet: false
  };
  println!("1 new tweet: {}", tweet.summarize());
}
```

## default implementation
can have default implementation in trait
- impl can choose to overwrite it or not


## trait bounds
traits can act as arguments
trait bound: syntax sugar for longer form
```rust
pub trait Summary {
  fn summarize(&self) -> String;
}
pub fn notify(item: impl Summary) {
  println!("breaking news! {}", item.summarize());
}
// rewrite ==>
pub fn notify<T: Summary> (item: T) {
  println!("Breaking news! {}", item.summarize());
}
// notify needed to display formatting on item, use summarize
pub fn notify(item: impl Summary + Display) {}
pub fn notify<T: Summary + Display>(item: T) {}

fn some_fn<T,U>(t: T, u: U) -> i32
  where T: Display + Clone, U: Clone + Debug {
  }
// return sth that implements Summary trait
fn return_smm() -> impl Summary {
  Tweet {
    username: xxx
    ...
  }
}  
```

## conditionally implement
```rust
struct Pair<T> {
  x: T, y: T
}

impl<T> Pair<T> {
  fn new(x: T, y: T) -> Self {
    Self {x, y}
  }
}

impl<T: Display + PartialOrd> Pair<T> {
  fn cmp_display(&self) {
    if self.x >= self.y {
      println!("largest x = {}", self.x);
    } else {
      println!("largest y = {}", self.y);
    }
  }
}
```
blanket implementation: 
implement trait on any type that satisfies the trait bounds

trait and trait bounds let us write code that use generic type param -> reduce duplication
- no need to write code check behavior at runtime -> done at compile time


# Lifetime
every reference in rust has lifetime
- scope for which reference is valid
- must annotate lifetimes when lifetimes of reference could be related in few different ways
- (must annotate types when multiple types possible)
```rust
{
  let r;
  {
    let x=5;
    r = &x;
  }
  println!("r: {}", r); // error!
}
// r has no value to print
```

## borrow checker
compile has borrow checker that compares scope to determine whether all borrows are valid
```rust
{
  let x=5;               // ----------'b
                         //         |   
  let r = &x;            // ---- 'a |  
                         //   |     |
  println!("r: {}", r);  //   |     |
                         //-----    |
}                        //-----------
```
lifetime of x='b is longer than lifetime of r='a
- r can reference x

## generic lifetimes in functions
```rust
fn longest (x: &str, y: &str) -> &str {
  if x.len() > y.len() {x} else {y}
}
```
&str expected lifetime parameter
- rust can't tell whether ref being returned refers to x or y
- don't know concrete lifetimes of ref passed in

## lifetime annotation
- fn can accept ref with any lifetime by specifying generic type param
- annotation describe relationship of lifeitme of multiple ref to each other without affecting lifetime

start with `'`
```rust
&i32  // ref
&'a i32   // ref with explicit lifetime
&'a mut i32   // mutable ref with explicit lifetime

// x, y, result all have same lifetime
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
  if x.len() > y.len() {x} else {y}
}

// string1 valid until end of outer scope
// string2 valid until end of inner scope
// result reference to sth valid until end of inner scope
fn main() {
  let string1 = String::from("long string is long");
  {
    let string2 = String::from("xyz");
    let result = longest(string1.as_str(), string2.as_str());
    println!("longest str is {}", result);
  }
}

struct ImportantExcerpt<'a> {
  part: &'a str
}
```
lifetime annotations in particular situations are predictable
=> in future compiler can infer lifetimes
=> ever fewer lifetime annotations required

### lifetime elision rule
set of particular rules that compiler will consider

input lifetime: lifetime on function/method param
output lifetime: lifetime on return values

1. (input) each param that is a ref get its own lifetime param
2. (output) if there's exactly one input lifetime param, that lifetime assigned to all output lifetime param
3. (output) if multiple input lifetime param, but one is `&self`/`&mut self`, then lifetime of `self` assigned to all output lifetime param
```rust
fn foo<'a,'b> (x: &'a i32, y: &'b i32);   // 1
fn foo<'a> (x: &'a i32) -> &'a i32    // 2
```

## lifetime for method definition
lifetime name for struct field must declare after `impl`
```rust
// can infer from rule 3, no need annotate
impl<'a> ImportantExcerpt<'a> {
  fn announce(&self, ann: &str) -> &str {
    println("attention pls: {}", ann);
    self.part
  }
}

let s: &'static str = "I have static lifetime";
```
'static: entrie duraiton of program

# Functional lang feature
## closure
anonymous functions save in variable / pass as argument to other functions
- capture value from scope in which they're defined
  
```rust

fn simulated_epensive(intensity: u32) -> u32 {
  println!("calc slowly...");
  intensity
}
// ==>
let expensive_closure = |num| {
  println!("calc slowly...");
  num
};

fn add_v1(x: u32) -> u32 {x+1}
let add_v2 = |x: u32| -> u32 {x+1};
let add_v3 = |x: u32| { x+1 };
let add_v4 = |x: u32| x+1;

```

# Iterator
iterating over items
iterator are lazy, no effect until you call method that consume iterator to use it up
```rust
trait Iterator {
  type Item;
  fn next(&mut self) -> Option<Self::Item>;
}


#[derive(PartialEq, Debug)]
struct Shoe {
  size: u32,
  style: String
}

fn shoes_in_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
  shoes.into_iter().filter(|s| s.size == shoe_size)
       .collect()
}


fn main() {

  let shoes = vec![
    Shoe {size: 10, style: String::from("sneaker")},
    Shoe {size: 13, style: String::from("sandal")},
    Shoe {size: 10, style: String::from("boot")}
  ];

  let in_my_size = shoes_in_size(shoes, 10);
  println!("{:?}", in_my_size);
}

// implement iterator

struct Counter {
  count: u32
}

impl Counter {
  fn new() -> Counter {
    Counter { count: 0 }
  }
}

impl Iterator for Counter {
  type Item = u32;
  fn next(&mut self) -> Option<Self::Item> {
    self.count += 1;
    if self.count < 6 {Some(self.count)} else {None}
  }
}

fn main() {
  let sum: u32 = Counter::new().sum();
  println!("{}", sum);
}

```

# OOp
```rust

impl<T> Screen<T> where T: Draw {
  pub fn run(&self){
    for components in self.components.iter(){
      components.draw();
    }
  }
}

impl Screen {
  pub fn run(&self) {
    for component in self.components.iter(){
      component.draw();
    }
  }
}

pub struct Button {
  pub width: u32,
  pub height: u32,
  pub label: String
}

impl Draw for Button {
  fn draw(&self){

  }
}

use gui::Draw;
struct SelectBox {
  width: u32,
  height: u32,
  options: Vec<String>
}

impl Draw for SelectBox {
  fn draw(&self){

  }
}

use gui::{Screen, Button};

fn main() {
  let screen = Screen {
    components: vec![
      Box::new(SelectBox {
        width: 75,
        height: 10,
        options: vec![
          String::from("Yes"),
          String::from("Maybe"),
          String::from("No")
        ]
      }),
      Box::new(Button {
        width: 50,
        height: 10,
        label: String::from("OK")
      })
    ]
  };

  screen.run();
}
```
write code similar to duck typing
- never have to check whether value implements particular method at runtime OR worry about getting err not implemented
  
static dispatch: compiler know what method call at compile time
- runtime cost if lookup method

if use trait object, must use dynamic dispatch
- compiler don't know all types might be used
- dynamic dispatch prevents compiler from choosing to inline method's code, prevent some optimization

trait is object-safe if methods
- return type isn't self
- no generic type parameters


# Smart pointer
box simpliest smart pointer, type: Box<T>
store data on heap rather than stack
- pointer remain on stack ppoint to heap

```rust
// value 5 allocated on heap
let b = Box::new(5);
println!("b = {}", b);
```

## recursive type
if type ref type directly, compiler don't know how much memory (infinite) to store all data => Error
- wrap type inside box, leave pointer only => finite space needed
```rust
enum List {
  Cons(i32, Box<List>),
  Nil
}
use List::{Cons, Nil};

fn main() {
  let list = Cons(1,
    Box::new(Cons(2,
      Box::new(Cons(3,
        Box::new(Nil))))));
}  
```
Box<T> implements `Deref` trait: smart pointer
- when Box<T> goes out of scope, heap data box pointing to cleaned up as well (due to `Drop` trait implementation)

## Deref trait
allow customize behavior of dereference operator *
```rust

let x = 5;
let w = Box::new(x);
let y = &x; // y = ref to x
let z = &y;
assert_eq!(5, x);
assert_eq!(5, *w);
assert_eq!(5, *y);  // *y: find value ref pointing to
assert_eq!(5, **z); 

```

## Deref coercion
`deref` method give compiler ability to take value of any type that implements `Deref`, call `deref` to get & that know how to deref
- compiler do automatically, when type *y -> *(y.deref())

&T -> &U when T: Deref<Target=U>
&mut T -> &mut U when T: DerefMut<Target=U>
&mut T -> &U when T: Deref<Target=U>

mutabble -> immutable never break borrowing rule
immutable -> mutable require there's only 1 immutable ref to that data


## RC (reference counted smart pointer)
enable multiple ownership
eg. in graph multiple edges point to same node
- keep track of #ref to value
- only for use in single-threaded

```rust
let a = Cons(5, Box::new(Cons(
  10, Box::new(Nil)
)));
let b = Cons(3, Box::new(a));
// error
let c = Cons(4, Box::new(a));

// ==>
let a = Rc::new(Cons(5, Rc::new(
  Cons(10, Rc::new(Nil)))));
let b = Cons(3, Rc::clone(&a));
let c = Cons(4, Rc::clone(&a));
// same as a.clone()
```
since a -> b, b owns a
- every element in list will live at least as long as entire list

Rc<List> has initial ref count = 1, each time call `clone`, count+=1
at end of main, count = 0

## RefCell<T>
interior mutability: mutate data even when immutable reference to data 
ref, Box<T>: borrowing rules' invariant enforced at compile time 
RefCell<T>: enforced at runtime checking
- both Rc<T>, RefCell only use in single-thread

## comparison
- Rc<T>: multiple owner; Box<T>,RefCell<T>: single owner
- Box<T>: immutable/mutable borrows; Rc<T>: only immutable borrows
- RefCell<T>: immutable/mutable borrows checked at runtime
- can mutable value inside RefCell<T> even when RefCell<T> is immutable

```rust
use super::*;
use std::cell::RefCell;

struct MockMessenger {
  sent_messages: RefCell<Vec<String>>
}

impl MockMessenger {
  fn new() -> MockMessenger {
    MockMessenger { sent_messages: RefCell::new(vec![]) }
  }
}

impl Messager for MockMessenger {
  fn send(&self, message: &str) {
    self.sent_messages.borrow_mut().push(String::from(message));
  }
}

#[test]
fn send_75() {
  assert_eq!(mock_messager.send_messages.borrow().len(), 1);
}

```

## reference cycle
prevent memory leaks not rust guaranteed
1. if have RefCell<T> contain Rc<T> value, must ensure don't create cycles
2. recognize data structure so that some ref express ownerhip, some ref don't
Rc<T> only cleaned up if strong_count == 0

## Rc<T> -> Weak<T>
call `Rc::downgrade`, pass ref to `Rc<T>`, get smart pointer of type `Weak<T>`
- weak_count += 1

strong ref: about how share ownership of Rc<T> instance
weak ref: don't express ownership relationship


# Concurrency
Erlang: elegant functionality for message-passing concurrency, obscure way to share states between threads

green thread: programming language provided threads
- M:N model -> M green threads per N OS threads

every non-assembly lang will have some amount of runtime code
- "no runtime" means "small runtime"
- fewer features, smaller binaries
- easier to combine lang with other lang in more context
- rust aim at nearly no runtime, avoid calling C

```rust
thread::spawn(|| {
  for i in 1..10 {
    println!("hi number {} from spawned thread!", i);
    thread::sleep(Duration::from_millis(1));
  }
});

for i in 1..5 {
  println!("hi num {} from main thread!", i);
  thread::sleep(Duration::from_millis(1));
}
```
when main thread ends, even if spawned thread not finished, still terminated

wait for spawn thread to finish:
`handle.join().unwrap();`

```rust
// clousre uses v, capture v make it part of closure's environment
// move: force clousre to take ownership of value, rather than Rust infer that it should borrow the values
let handle = thread::spawn(move || {
  println!("vector: {:?}", v);
});

// error: guarantee main thread won't use v anymore
// drop(v);

handle.join().unwrap();
```

## message passing
Go: "do not communicate by sharing memory; instead, share memory by communicating"
- go use channel
- transmitter, receiver


```rust
// tx: sending end; rx: receiving end
let (tx,rx) = mpsc::channel();
thread::spawn(move || {
  let val = String::from("hi");
  // send method return Result<T,E> type
  tx.send(val).unwrap();
});
// receive Result<T,E>
let received = rx.recv().unwrap();
println!("Got: {}", received);  

// multiple tx
let (tx,rx) = mpsc::channel();

let tx1 = mpsc::Sender::clone(&tx);
thread::spawn(move || {
  let vals = vec![
    String::from("hi"),
    String::from("from"),
    String::from("the"),
    String::from("thread"),
  ];
  for val in vals {
    tx1.send(val).unwrap();
    thread::sleep(Duration::from_secs(1));
  }
});
thread::spawn(move || {
  let vals = vec![
    String::from("more"),
    String::from("msg"),
    String::from("for"),
    String::from("you"),
  ];
  for val in vals {
    tx.send(val).unwrap();
    thread::sleep(Duration::from_secs(1));
  }
});

for received in rx {
  println!("Got {}", received);
}

```
mpsc: multiple producer, single consumer
try_recv: not block, instead return Result<T,E> immediately

## shared state concurrency
channel similar to single ownership
- once transfer value down channel, no longer use that value
- shared memory ~ multiple ownership
- multiple thread access same memory location at same time

### mutex
- must attempt to acquire lock before using data
- when done with data with mutex guards, must unlock

```rust
let m = Mutex::new(5);
{
  let mut num = m.lock().unwrap();
  *num = 6;
}
println!("m = {:?}", m);
```
Mutex<T> is smart pointer, call to lock return smart pointer `MutexGuard`
- implements Deref to point at our inner data
- `Drop` implementation to auto release lock when MutexGuard goes out of scope
- don't risk forgetting release lock and blocking mutex

### share Mutex<T> between multiple threads
create counter variable to hold `i32` insdie Mutex<T>
- create 10 threads iterate through numbers
- move counter into thread -> acquire lock -> +1 to value in mutex
- when thread finish closure, num go out of scope -> relase lock
- in main thread, collect all join handles

### multiple ownership with multiple threads
Rc not safe to share across threads => replace with Arc<T>

```rust
let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];

for _ in 0..10 {
  let counter = Arc::clone(&counter);
  let handle = thread::spawn(move || {
    let mut num = counter.lock().unwrap();
    *num += 1;
  });
  handles.push(handle);
}

for handle in handles {
  handle.join().unwrap();
}

println!("Result: {}", *counter.lock().unwrap());
```

### extensible concurrency
Send: trait indicates ownership of type 
- can be transferred between threads
- almost every rust type is `Send`
- exception: Rc<T>

Sync
























