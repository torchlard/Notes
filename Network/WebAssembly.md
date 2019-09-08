# webassembly outside browser
1. make native modules less complicated
  - eg. Cython hard to use, need compile; webassembly no need compile
2. easier to sandbox native code
3. share native code across platform
  - save time maintain web and desktop app

# limitation
right now only talks in number
if take and return anythin besides number
- make module only take number
- add glue code for every environment

## 1st stage
only talk to JS
JS and webassembly use different type
- (int32,int64,float32,float64) VS (Number,BigInt)

can hard code type conversion in engine
- add glue code to translate String -> numbers
- eg. Rust's wasm-bindgen, Emscripten'ss Embind

situation: JS function pass String to Webassembly's function
1. JS fn pass string to JS glue code
2. JS glue code turn String to numbers, put numbers into linear memory
3. pass number(pointer at start of string) to Webassembly
4. wasm function pass number over JS glue code on other side
5. 2nd JS function pull numbers out of linear memory, decode back to String
6. give to 2nd JS function

=> Lot of works !!!

## 2nd stage
add reference type to wasm `anyref`

with anyref
1. JS give wasm reference object (pointer not disclose memory address)
2. ref points to obj on JS heap
3. pass to other JS function

## 3rd stage
JS only part of browser, Web API remains, usually written in C++/Rust
=> Web IDL: standard way to talk about structure of these type

how JS type convert to Web IDL type?
- something like DOMString <-> String compatible
currently no mapping, have to go through JS

1. wasm pass value to JS
2. engine convert valule to JS type, put JS heap in memory
3. Js value passed to web API function, convert to Web IDL type, put in renderer's heap

## 4th stage
have to add higher level type, doing that with GC proposal
wasm module can create Gc objects, like struct and arrays

problem: langs represent things in linear memory in different ways
way1: hardcode mappings in engine
problem1: type check

neew way for mule to explicitly tell engine want type want to input
way2: each lang get boklet how to convert type 

```rust
#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
}
```
tell compiler to include this function in booklet
- compiler will treat as linear memory string, add right mapping for us
==> can cut out JS in middle

## 5th stage
Web IDL = IR for web
interface type = IR outside web

are all abstract type, all operations performed on concrete types on either end
- one set of mapping baked in compile time, other is handed to engine at load time

# target
talk to
- modules running in their own runtime (python module in python runtime)
- webassembly module written in different source languages (eg. Rust, Go)
- host system (eg. WASI)

# interface type
## problem to solve
translate value between different types when module talking to another module

for exported funcions
- accept param from caller
- return values to caller

for imported functions
- pass param to function
- accept return values from function

## example
let say Rust module compile to wasm, 
export greeting_ without input param, return greeting
```wasm
(module
  (memory (export "mem") 1)
  (data (i32.const 0) "hello there")
  (func (export "greeting_") (result i32 i32)
    i32.const 0   ;; offset of string in memory
    i32.const 11  ;; length
  )

  ;; add interface type, assume string as input, string output
  (@interface func (export "greeting") (param $str string) (result string) 
    arg.get $str    ;; push ref to string that passed onto stack
    string-to-memory "mem" "malloc"   ;; take bytes from string, put into linear memory
    call-export "greeting_"   ;; call function we're adapting
    ;; use return value figure out what bytes pull out of linear memory, turn into string
    memory-to-string "mem"    
  )
)
```
we want to return string interface type

provide backward compatibility
- engine don't need understand interface type
- just return 2 integers

## send instruction to engine
known sections: eg. code, data
custom section: eg. interface adapter

with interface type, IR never leave engine
compile can see when translation unnecessary (same type), skip translation work



















