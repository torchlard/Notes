# currying vs partial application
currying:
convert single function of n arguments -> n functions with single argument
function f(x,y,z) { z(x(y)); }  ===>  function f(x) { lambda(y) {lambda(z) {z(x(y))} } }
--> f(x)(y)(z)
* takes exactly 1 input (fn)

parital application:
if only call f x y, then got partially-applied function
* takes >= 2 inputs (fn, x1 ...)

# definitions
functor :: (a -> b) -> f a -> f b
applicative :: f (a -> b) -> f a -> f b
monad :: m a -> (a -> m b) -> m b


# Higher kinded type
type constructor as an actual type
type constructor
- like funciton in type universe
- as type with 'hole' in it, container of type
- generic type parameterised over other types
- endofunctor in category of types

higher = higher order
kinded = (kinds = types of types) kind signature : * -> *
types = type constructor as first class type

# point-free style (tacit programming)
programming paradigm that function definition don't identify arguments (points) which they operate
- definitions merely compose other functions
- well adapted for equational reasoning

```haskell
sum (x:xs) = x + sum xs
sum [] = 0
-- to point free
sum = foldr (+) 0

p x y z = f (g x y) z
-- to point free
p = ((.) f) . g
```
eg. unix pipeline is also point-free style
`sort | uniq -c | sort -rn`


# Kind polymorphism
## in idris
```haskell
arrowsTy : Nat -> Type
arrowsTy Z = Type
arrowsTy (S k) = Type -> arrowTy k

Arrows : (n : Nat) -> Type -> arrowTy n
Arrows Z a = a
Arrows (S k) a = compose (\b => a -> b) . Arrows k
  where compose : {n : Nat} -> (Type -> Type) -> arrowsTy n -> arrowsTy n
        compsoe {n = Z} g f = g f
        compose {n = S k} g f = compsoe g . f
-- === another version ===
Arrows' : (Type -> Type) -> (n : Nat) -> Type -> arrowTy n
Arrows' finalize Z x = finalize x
Arrows' finalize (S k) x = Arrows' (finalize . (\r => x -> r)) k

Arrows : (n : Nat) -> Type -> arrowTy n
Arrows = Arrows' id

```





















