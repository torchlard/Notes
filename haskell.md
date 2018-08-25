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
ghc --make <filename>

## do
in haskell, do is for input, output value on screen, has side effect
embedded in do block, like procedural language
line <- getLine [use <- to get input]

## return
use pure value exit I/O action




