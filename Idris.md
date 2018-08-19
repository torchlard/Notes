# fundamentals
## operator
```
putStrLn (show (1+1))
=== putStrLn $ show $ 1+1 
=== (putStrLn . show) (1+1)
```
($): avoid parentheses


## conditional
```idris
if a > 1 then "no"
else if a < -3 then "no2"
else "haha"
```

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

## higher-kinded typees
type operator = functions from type to type
kind = type of type
```java (psuedo)
class GraphSearch<T>{
  T<Node>frontier;
}
```
GraphSearch has kind (* -> *) -> *
GraphSeach = higher-kinded as higher-orer functions on level of types
Functor, Monad are higher-kinded polymorphism in Haskell

## Rank-n types
Rank-1 type: `a -> b -> a` rewrite as `forall a b. a -> b -> a`
only one forall needed

Rank-2 type: `(a -> a) -> (b -> b)` rewrite as `(forall a. a -> a) -> (forall b. b -> b)`
there are 2 forall 

Rank-N type reconstruction is undecidable in general, need some explicit type annotation
in haskell, Rank-2 / Rank-N need language extension `{-# LANGUAGE Rank2Types #-}` / `{-# LANGUAGE RankNTypes #-}`



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


# first class types
1. give more meaningful names to composite types
```
tri : Vect 3 (Double, Double)
tri = [(0.0, 0.0), (3.0, 1.0), (3.4, 1.5)]

Position : Type
Position = (Double, Double)

tri: Vect 3 Position
tri = [(0.0, 0.0), (3.0, 1.0), (3.4, 1.5)]
```

2. allow function's type to vary according to some contextual information
```
StringOrInt : Bool -> Type
StringOrInt False = String
StringOrInt True = Int
```
can consider type-level funtions in the same way as ordinary function in most cases
differences:
1. type-level fn compile time only, no way to inspect Type directly
2. only functions that are total will be evaluated at type level
   - functions that are not total -> as contant, not evaluate further

in type-driven development, often think about functions in terms of transformation between data types
intermediate types = intermediate stage of computation

# Interface
Functor: extract items from container, apply functions to them, and put items back to container
Foldable: explains how to reduce structure to single value using initial value and function
pure: take value of any type and return applicative functor with that value inside 
- put it in some sort of minimal default context
  
Applicative: interface that support function application inside generic type
- we find way to map function from 1 functor to another by pattern match 

Assume both parameter of <*> are `functor`
So for Maybe, <*> extracts the function from the left value if it's a Just and maps it over the right value. 
We cannot extract funciton from Nothing. If any of the parameters is Nothing, Nothing is the result.
```idris
Just (+3) <*> Just 9 === Just 12
pure (+3) <*> Just 9 === Just 12
pure (+3) <*> Nothing === Nothing
pure (+) <*> Just 3 <*> Nothing === Nothing
```


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
pure: produce value
bind: sequence stateful operations, pass result of first as input to next


evalState: return value produced by sequence of operation
execState: return final state after seq operations

$: application operator that applies function to an argument
```
when (x=="yes") $
  do ...
  === [equal to]
when (x=="yes") (
  do ...
)
```

# Effects
to compile program with effects library, run
`idris hello.idr -o hello -p effects; ./hello`

`x <- e`: bind result of effectful operation e to variable x
`pure e`: turns pure value e into result of effectful operation

running an effectful program can change set of effects available
- updating state contain dependent type
- open file for reading is an effect, whether file really opened depends on whether open successfully


























