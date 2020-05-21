# install
Navigate to a suitable directory $HERE (replace appropriately) where you would like to install the library.

Download the tarball of v1.0.1 of the standard library. This can either be done manually by visiting the Github repository for the library, or via the command line as follows:

`wget -O agda-stdlib.tar https://github.com/agda/agda-stdlib/archive/v1.0.1.tar.gz`

Note that you can replace wget with other popular tools such as curl and that you can replace 1.0.1 with any other version of the library you desire.

Extract the standard library from the tarball. Again this can either be done manually or via the command line as follows:

`tar -zxvf agda-stdlib.tar`

[ OPTIONAL ] If using cabal then run the commands to install via cabal:

cd agda-stdlib-1.0.1
cabal install

Register the standard library with Agda's package system by adding the following line to $HOME/.agda/libraries:

$HERE/agda-stdlib-1.0.1/standard-library.agda-lib

[ OPTIONAL ] To use the standard library in your project $PROJECT, put a file $PROJECT.agda-lib file in the project root containing:

depend: standard-library
include: $DIRS

where $DIRS is a list of directories where Agda searches for modules, for instance . (just the project root).

[ OPTIONAL ] If you want to refer to the standard library in all your projects, add the following line to $HOME/.agda/defaults

standard-library


# compile
agda -c peano.agda --no-main

# background
dependent type
for C++,haskell, type-level computation are very often harder to comprehend

in agda, distinction between type and values doesn't exist

# formal verification
you can't reliably unit test against race condition, starvation or deadlock
- all these eliminated via formal methods

proof are compositional
for normal test, need to write unit test and integration test
for proofs, no need to reinvent

impossible for violation of your properties to slip through cracks 

# lib
Agda not even have numbers built in
- all implemented in library


# mixifx
declare functions where arguments can appear anywhere within a term


### 
binary relation is said to be reflexive if every value relates to itself


# time complexity
represent naturals for m+n:
zero, suc: prop to m
integers in Haskell: prop. to log(max(m,n))

naturals for m*n
zero,suc: prop. to m*n
integers in Haskell: prop. to log(m+n)


# data type
## simple data type
Nat(zero,suc), Bool, True, False
BinTree(leaf, branch)
Ord (zeroOrd: Ord, sucOrd: Ord->Ord, limOrd: (Nat->Ord)->Ord)

## general form
data D: Set where
  c1: A1
  c2: A2
  ...


# literal overloading
by default naturla number literals mapped to built-in Nat type
can be bind to `fromNat` by `{-# BUILTIN FORMAT fromNat #-}`


## cong
expression `cong f refl = refl` matches explicit arguments (A -> B) and (m ≡ n)
right: construction of (f m ≡ f n ) using refl

zxiom similar but stronger than J-axiom  (introduction axiom)
```
if sth C : (x y : A) -> (x ≡ y) -> Set  is true for   C x x refl
then its also true for any x,y:A and p: x ≡ y
```

# with
followed by a number of clauses with extra argument on left (|)
=> further pattern match

## rewrite
```agda
f ps rewrite eq = v
  -->

f ps with lhs | eq
...   |  .rhs | refl = v  
```
cannot do further pattern matching on arguments after rewrite
- since everything happens in single clause


# Builtin types
Agda.Builtin.*
Bool, Nat, Int, Word, Float, Char, String
List
Equality

Agda.Primitive: Universe levels
IO, Reflection, Strict

# Record type
- module with parameter
- types grouping values together
- generalise dependent product type by named fields (+ further components)

```agda
record Pair (A B : Set) : Set where
  constructor _,_
  field
    fst : A
    snd : B

Pair.fst : (A B : Set) -> Pair A B -> A
Pair snd : (A B : Set) -> Pair A B -> B    

p23 : Pair Nat Nat
p23 = record { fst = 2; snd = 3 }

// named definitions
p34 : Pair Nat Nat
Pair.fst p34 = 3
Pair.snd p34 = 4

p45 : Pair Nat Nat
p45 = 4 , 5
```
all components in record are optional, can be given in any order

## declaration
```
record <record name> <params> : Set <level> where
  <directives>
  constructor <constructor name>
  field
    <field 1> : <type 1>
    <field 2> : <type 2>
    ...
  <declarations>
```
## directives
eta-equality, no-eta-equality, inductive, co-inductive

## construction
support any combination of explicit field declarations and applied modules
- explicit one takes precedence, module one as default

```
record R : Set where
  field
    x : X
    y : Y
    z : Z

module M where
  x = ...
  y = ...

module M2 (a : A) where
  w = ...
  z = ...

r2 : A -> R
r2 a = record { M hiding (y); M2 a renaming (W to y) }
```
## update 
new : MyRecord
new = record old { a = 0; c = 5 }

## instance field
model "superclass"
```
record Eq (A : Set) : Set where
  field
    _==_ : A -> A -> Bool

open Eq {{...}}

record Ord (A : Set) : Set where
  field
    _<_ : A -> A -> Bool
    {{eqA}} : Eq A

open Ord {{...}} hiding (eqA)

// function taking Ord A, argument 'Eq A' instance also available
_≤_ (A : Set) {{OrdA : Ord A}} -> A -> A -> Bool
x ≤ y = (x == y) || (x < y)

```




# let expression
```
f : Nat
f = let h : Nat -> Nat
        h m = suc (suc m)
    in  h zero + h (suc zero)

record R : Set where
  constructor c
  field
    f : X
    g : Y
    h : Z

let (c x y z) = t
in u
// translated to
let x = f t
    y = g t
    z = h t
in u    
```

# where block
```
clause 
  where
  declarations
// OR
clause 
  module M where
  declarations  
```
```
reverse : {A : Set} -> List A -> List A
reverse {A} xs = rev-append xs []
  where
    rev-append : List A -> List A -> List A
    rev-append [] ys = ys
    rev-append (x ∷ xs) ys = rev-append xs (x ∷ ys)

tw-map : {A : Set} -> List A -> List (List A)    
tw-map {A} xs = let twice : List A -> List A
                    twice xs = xs ++ xs
                in map (× -> twice [ x ]) xs
```

# Module
definition = construction define entity eg. function, datatype
name = string used to identify definitions
two definitions can have same name

purpose: structure the way names are used in program

```
module Main where
  module B where
    f : Nat -> Nat
    f n = suc n

  g : Nat -> Nat -> Nat
  g n m ≡ m

  ff : Nat -> Nat
  ff x = B.f (B.f x)

  // use short name for definitions in module
  open B

  ff : Nat -> Nat
  ff x = f (f x)
```
opening module only introduce new names for a definition, but never removes old names

module can be opened within local scope
```
ff : Nat -> Nat
ff x = f (f x) where open B
```

## name modifier
fine control over what names introduced when opening a module
`open A using (xs) renaming (ys to zs)`
introduce name xs and zs, where same definition as A.xs and A.ys

```
module Example where
  module Nat where
    data Nat : Set where
      zero : Nat
      suc : Nat -> Nat
  module Bool where
    data Bool : Set where
      true false : Bool  
  module Prelude where
    open Nat public
    open Bool public
    isZero : Nat -> Bool
    isZero zero = true
    isZero (suc _) = false          
```

## parameterised module
abstracting parameters over definitions in module

```
module Sort (A : Set)(_≤_ : A -> A -> Bool) where
  insert : A -> List A -> List A
  insert x [] = x ∷ []
  ...

  sort : List A -> List A
  ...
```
apply parameterised module to its arguments
```
module SortNat = Sort Nat leqNat
// defined as
module SortNat where
  insert : Nat -> List Nat -> List Nat
  insert = Sort.insert Nat leqNat

  sort : List Nat -> List Nat
  sort = Sort.sort Nat leqNat
```
## split program
`import M as M'`
require module `A.B.C` defined in `C.agda` in directory `A/B/`

when define datatype, also defines a module
when define record type, also define module with same name

```
module xxx where
  data Nat : Set where
    zero : Nat
    suc : Nat -> Nat

inj : (n m : Nat) -> Nat.suc n ≡ suc m -> n ≡ m
// instead of
inj : (n m : Nat) -> _≡_ {A = Nat} (suc n) (suc m) -> n ≡ m

```
refer to constructor unambiguously as `Nat.zero`


# postulate
declaration of element of some type without definition (~interface)

# Pragma
comment with special meaning
`{-# <pragma_name> <arguments> #-}`

## inline
definition automatically inlined if
- no pattern matching
- uses each arg at most once
- not use all args


# Idiom bracket
notation makeapplicative functors more convenient
functor `F`
```
pure : ∀ {A} -> A -> F A
_<*>_ : ∀ {A B} -> F (A -> B) -> F A -> F B

(| if a then b else c |)
// desugars to
pure if_then_else_ <*> a <*> b <*> c

```

# Implicit arguments
possible to omit terms that type checker can figure out for itself, replaced by `_`
```
id : (A : Set) -> A -> A
// first arg can be inferred from 2nd arg
id _ = 0
```
{}: to give implicit argument explicitly


```
x1 = subst C eq cx
// equivalent
x2 = subst {_} C {_} {_} eq cx

y1 : a == b -> C a -> C b
y1 = subst C
// equivalent
y2 : a == b -> C a -> C b
y2 = subst C {_} {_}
```
```
id : (A : Set) -> A -> A
id = λ {A} -> id A
```
give expression e explicitly for y, not x
`subst C {y = e} eq cx`

```
∀ {x : A} -> B   same-as  {x : A} -> B
∀ {x} -> B   same-as  {x : _} -> B
∀ {x y} -> B  same-as ∀ {x} -> ∀ {y} -> B
```


# instance argument
special kind of implicit argument that 
- solved by special instance resolution algorithm
- rather than unification algorithm for normal implicit arguments

instance arg = haskell typeclass constraints

instance arg resolved of its type
- named type: data type / record type
- variable type: previously bound variable of type Set 

unique instance of required type built from declared instances and current context

## usage
syntax `{{x : T}}, | x : T |`

`_==_ : {A : Set} {{eqA : Eq A}} -> A -> A -> Bool`

for some suitable type `Eq`
```haskell
-- restrict A to have property of Eq
-- similar to haskell  (==) :: (Eq a) => a -> a -> Bool
elem : {A : Set} {{eqA : Eq A}} -> A -> List A -> Bool
elem x (y ∷ xs) = x == y || elem x xs
-- equivalent to
elem {{eqA}} x (y ∷ xs) = _==_ {{eqA}} x y || elem {{eqA}} x xs
elem x []       = false
```

## declare instance
```
instanece
  ListMonoid : ∀ {a} {A : Set a} -> Monoid (List A)
  ListMonoid = record { mempty = []; _<>_ = _++_ }

-- equivalent

instnace
  ListMonoid : ∀ {a} {A : Set a} -> Monoid (List A)
  mempty {{ListMonoid}} = []
  _<>_   {{ListMonoid}} xs ys = xs ++ ys

```


# Universe Levels
Russell's paradox: collection of all sets is not itself a set
assume ∃ set U, then form subset A ⊆ U of all set that not contain themselves
=> contradiction

so we have `Bool : Set, Nat : Set`, but not `Set : Set`
in agda, given Set1 such that `Set : Set1`
- elements of Set1 are potentially larger when `A : Set1`
- A = larger set
=> Set2 : Set1, Set3 : Set 2, ...

universe: type whose elements are type
=> infinite number of universe

Set = Set[0] (default one)
Set[n], where n = level of universe

## universe polymorphism
- avoid define too many special List
- make sure every Agda expression has a type, including `Set`, `Set₁`
use special primitive type Level, whose elements are possible levels of universes

Setₙ = Set n, where n : Level

Nat × Nat : Set
Nat × Set : Set₁
Set × Set : Set₁

## Setω
```
data Unit (n : Level) : Set n where
  <> : Unit n
```
what is type of  `(n : Level) -> Set n` ?
we cannot have  `Universe : Universe`
- so assign type `Setω` to it

```
largeType : Setω
largeType = (n : Level) -> Set n
```

# Without K
add restrictions to Agda's typechecking algorithm
- compatible with theory that not support uniqueness of identity proof, eg. HoTT
`{-# OPTIONS --without-K #-}`

## termination checking
restrict structural descent to arguments ending in data types / Size



# Function
## dot pattern (inaccessible pattern)
when the only type-correct vlaue of arg determined by patterns given for other arg

```haskell
data Square : Nat -> Set where
  sq : (m : Nat) -> Square (m * m)

root : (n : Nat) -> Square n -> Nat
root .(m * m) (sq m) = m  

-- another legal def
root : (n : Nat) -> Square n -> Nat
root n (sq m) = m
  -- equiv to
root _ (sq m) = let n = m * m in m
```
by matching argument of type `Square n` forced to equal to m*m

## Absurd pattern
used when none of constructors for particular arg is valid
```haskell
data Even : Nat -> Set where
  even-zero : Even zero
  even-plus2 : (n : Nat) -> Even n -> Even (suc (suc n))

one-not-even : Even 1 -> i
one-not-even ()  
```
## As-pattern (@-pattern)
used to name a pattern

```
module _ {A : Set} (_<_ : A -> A -> Bool) where
  merge : List A -> List A- > List A
  merge xs [] = xs
  merge [] ys = ys
  merge xs@(x ∷ xs1) ys@(y ∷ ys1) =
    if x < y then x ∷ merge xs1 ys
             else y ∷ merge xs ys1
```

# Mutual recursion
placing type signatures of all mutually recursive function before their definitions
```
f : A
g : B[f]
f = a[f, g]
g = b[f, g].
```

Old syntax (avoid)
```
mutual
  f : A
  f = a[f, g]

  g : B[f]
  g = b[f, g]
```












