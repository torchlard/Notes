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
scores.insert(String::from("Yellow"), 50);

println!("{:?}", scores);

let teams = vec![String::from("Blue"), String::from("Yellow")];
let initial_scores = vec![10, 50];
let sc: HashMap<_,_> = teams.iter().zip(initial_scores.iter()).collect();

println!("{:?}", sc);

```























