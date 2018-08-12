# type
Int: fixed width signed int (>= 31 bit)
Integer: unbounded signed int (moire expensive)
Nat: unboiunded unsigned int 
Double: double precision fp

## ordinary function
`the`

## Successor
S
eg. S 4 ===> 5


## type level variables
`append: Vect n elem -> Vect m elem -> Vect (n+m) elem`

without implicit arguments:
```idris
append : (elem: Type) -> (n: Nat) -> (m: Nat) ->
          Vect n elem -> Vect m elem -> Vect (n+m) elem
  ...
append Char 2 2 ['a','b'] ['c','d']
```
since there is enough information in types of vector arguments, 
  can infer a,n,m. therefore can write:
`append _ _ _ ['a','b'] ['c','d']`

### bound and unbound implicit
unbound, names (elem, n, m) used directly without being declared anywhere else
`append: Vect n elem -> Vect m elem -> Vect (n+m) elem`

bound:
`append : {elem: Type} -> {n: Nat} -> {m: Nat} ->
          Vect n elem -> Vect m elem -> Vect (n+m) elem`

# IO
you can write function describe sequence of interaction, and pass Idris runtime 
  environment to execute actions
`String -> Int`: String as input, Int as output without side effect
`String -> IO Int`: String as input, description of interactive program that produce Int as output
`main : IO ()`: function main take no input, return description of interactive action that 
                produce empty tuple

`(>>=) : IO a -> (a -> IO b) -> IO b`: 
since output of getLine is IO String, not String, so it cannot be evaluated directly,
  instead you use >>= to allow sequencing of IO actions, feeding result of one action as input 
  into the next
  eg. `getLine >>= putStrLn`

you can always use >>= to sequence IO actions, but it's ugly, so we have `do` as syntax sugar

# Views
pattern matching deconstructs variables into their components
alternative ways, eg.:
1. list of all but last element, and then last element
2. two sublists: first half, second half of input

Views = dependent types parameterized by data you want to match
1. new form of pattern
2. alternative ways traversing data structure
3. hide compplex data behind abstract interface

with ~ case
with introduce new pattern 
- pattern must be valid
- value of pattern forced by some other valid pattern
  


# Streams
separate consumer and producer
treat Delay and Force separately

countFrom as corecursive
infinite list as codata

data = finite, intended to be consumed
codata = potentially infinite, intended to be produced 

## total function
never crash due to missing case

          produced value
             |----|
countFrom n = n :: Delay (countFrom (n+1))
                  |-----------------------|
                    delayed recursive call

total function = function for all well-typed input:
1. terminate with well-typed result [terminating]
2. produce non-empty finite prefix of well-typed infinite result in finite time
    [productive]

determin by:
1. recursive call with decreasing argument that converge toward a base case
2. when recursive call as an argument to Delay, delayed call be argument to data constructor 
   after evalution for all inputs

ex.
```
take 10 (repeat 94)
take 10 (iterate (+1) 0)
```

# State
use Stream to mimic local mutable state
like IO, State Nat ty describe a sequence of operations that read and write mutable state of type Nat
get: read state
put: update state

evalState: return value produced by sequence of operation
execState: return final state after seq operations













