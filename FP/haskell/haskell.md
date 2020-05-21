# install hie
https://oomusou.io/haskell/hie/

=======================
# module
if module not found, use `cabal list <module-name>` to find corresponding module
and `cabal install <module>` to install it.
if there's dependency problem, `cabal install <module> --force-reinstalls`
then it can be import by `import <module>`

# concepts
## curried function
all functions in haskell only has 1 parameter
function with multiple arguments = curried functions

max :: (Ord a) => a -> (a -> a)
max get parameter a, and return a function that [take a return a] (a->a)

## efficiency
efficiency of (++) is much lower than (:)

## directional append
if append to left=> x:xs
if append to right=> xs ++ [x]

## abstract data type
data Maybe a = Nothing | Just a
- Maybe is a type constructor, can be 
    Maybe int, Maybe String ...
- Need to fill up all type parameter for it to construct a real type 
- eg. 'Char' as parameter to 'Maybe' -> 'Maybe Char'
- position: `type constructor` = `value constructor`

## read vs show
read "Person {firstName =\"Michael\", lastName =\"Diamond\", age = 43}" == mikeD

## --
`type` keyword: give another name to existing type
`data` keyword: create new type

List belongs to the typeclass `Functor`
class Functor f where
  fmap :: (a->b) -> f a -> f b

think of typeclass as interface in Java

## functor
class Functor f where
  fmap :: (a->b) -> f a -> f b
- this definition shows a type belongs to `Functor` must be * -> * `kind`
functor is a typeclass, it only has one method `fmap`

## compile
<!-- ghc --make <filename> -->
`ghc -o Sorting Sorting.hs`

## do
in haskell, do is for input, output value on screen, has side effect
embedded in do block, like procedural language
line <- getLine [use <- to get input]

## return
use pure value exit I/O action


# parallel
## pure parallelism (Control.Parallel)
solve single problem, more focused
guarenteed deterministic, no race conditon/deadlock

## concurrency (Control.Concurrent)
multiple thread of control execute at same time, not require multiple core
deal continuously with networking protocol, database ..
- threads in IO monad
- communication between threads explicitly programmed
- thread execute on multiple processor simultaneouls
- can be race condition, deadlock

use parallelism if you can, concurrency otherwise

threaded compile
`ghc -o Sorting Sorting.hs -threaded; ./sort +RTS -N2`

# type class
## type class VS OOP classes
type class ~ interface
normally don't implement methods themselves, just
guarentee that actual types that instantiate type class will implement 
specific methods

type class with default implementation ~ abstract class

```haskell
class Eq a where
  (==) :: a -> a -> Bool
  (/=) :: a -> a -> Bool
  x /= y = not (x == y)
```
```java
interface Eq<A> {
  boolean equal(A that);
  boolean notEqual(A that) {
    // default, can override
    return !equal(that)
  }
}
```

## inheritance between interface
```haskell
-- include Show, Monad interface in Stream interface
class (Show s, Monad m s) => Stream m s where
  sClose :: s -> m ()

f :: (Stream m s) => s -> m String
show :: (Show s) => s -> String
f s = return (show s)  
```
eg. Number is base class/superclass of OddNum
there's upcasting, can run function (base class)[Number] from function (subclass) [OddNum]
downcasting is impossible, cannot get subclass from superclass

## inheritance between instance
operation of some class can be executed in other class
```haskell
class Eq a where
  (==) :: a -> a -> Bool
class Cmp a where
  cmp :: a -> a -> Ordering
instance (Cmp a) => Eq a where
  a==b = cmp a b == EQ

cmpDict2EqDict (cmp) = (\a b -> cmp a b == EQ)  
```

## type class ~ parameterized abstract class





