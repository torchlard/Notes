# combinator
closed lambda expression, no free variables

## examples
I combinator:
I x = x

K combinator:
(K x) y = x

S combinator:
(S x y z) = (x z (y z))
- x is applied to y after first substituting z into each of them


((S K K) x) = (I x)
but (S K K) itself not equal to I
terms are extensionally equal

## compose
compose = \g -> \f -> \x -> g (f x) 

g (f x) = (K g x) (f x)
g f = S (K g) f
g = S (K g)
g = (K S g) (K g)
_ = S (K S) K

compose = S (K S) K


## fixed pointc ombinator
fixed point of function = mapped to itself

fixed-point combinator = higher order function that return some fixed point

fix f = f (fix f) = f(f(...f(fix f)))

### Y combinator
in lambda calculus, there's some combinator satisfy defintion of fixed-point conbinator
Y combinator = implementation of fixed-point combinator in lambda calculus

untyped lambda calculus: every funciton has a fixed point
Curry's paradoxical combinator Y:

Y = λf. (λx. (f (x x)) λx.(f (x x)))
to define recursive funciton in language that does not support recursion
=> unsound as deductive system

apply Y combinator to functions of >=2 variables
=> like while/for loop in imperative language

## 
may apply to range of different funcitons, normally will not terminate
- unless extra parameter

particular lambda terms (which define functions) considered as values
beta reducing fixed point combinator -> fixed point value






# Church encoding
way to represent data and operators in lambda calculus
Church number = representation of natural numbers using lambda notation

completeness is representational
not possible to decide if 2 functions are extensionally equal
- by undecidability of equivalence from Church's theorem

funcitonal itself
Church numeral 3: λf.λx.f(f(f x))



