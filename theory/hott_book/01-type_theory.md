# type theory VS set theory
- set theory need first class logic embedded
- type theory is its own deductive system 
deductive system = collection of rules for deriving things (judgment)

prove theorem = construct an object
A has a proof = a: A ~~ a ∈ A in set

a: A is judgment; a ∈ A is proposition
in type theory, cannot say "if a: A then not case that b: B", nor disprove judgment "a: A" 

cannot talk about element "a" in isolation
every element must be element of some type

"let x be natural number"
- set theory: "let x be a thing" AND "assume that x ∈ N"
- type theory: "let x: N" (atomic statement)

in type theory, propositions are type => equality is a type
a,b: A => "a =_A b"
IF "a =(A) b", then a and b are (propositionally) equal

## equality 
judgmental equality / definitional equality: a ≡ b
VS propositional equality

"p: (x = y)", "A ≡ (x=y)"
"f: A -> B" = f has type (A -> B)

## context
assume x,y: A, p:x =[A] y; => construct an element p^-1: y =[A] x
context = collection of all such assumptions
        = ordered list of assumption

## rules
set theory: only rules are rules of first-order logic
- all information about behavior of set contained in axiom

type theory: rules which contains all information, axiom not necessary
- At the end, need extra univalence axiom

# function types
in type theory, function not defined as functional relations, but are primitive concept

ways to construct element of A -> B
1. direct definition
2. λ-calculus

introduce a function by giving it a name
  f(x) = Φ  where A -> B
x = variable, Φ = expression
check Φ: B, x: A
compute f(a) by replacing variable x in Φ with a

λ-abstraction: not introduce name for function
`(λ(x: A).Φ): A -> B`

if f(x) = x+x, then `(λ(x: N).x+x): N -> N`
`λ(x: N).x+x)(2) = 2 + 2`

const function `λ(x: A).y: A -> B` for any y:B
generally omit tiype and write `λx.Φ`

equivalent notation `(x |-> Φ): A -> B`
`g(x,-)` = `λy.g(x,y)`

`f ≡ (λx.f(x))` define function that applies f to its argument

## binding structure
insvisible link generated by binders such as λ,Π,Σ between place where variable is introduced and used

## currying
f: A -> (B -> C)  =  f: A -> B -> C
represent function of 2 inputs a:A, b:B as function take 1 input a:A, return another function
- apply f to a first, then apply result to b => `f(a)(b): C`

`f(x,y) = Φ` = `f = λx.λy.Φ` = `f = x |-> y |-> Φ` = `f(-,-)`


# universe
universe = type whose elements are types
in set theory, for universe of all types => Russell's paradox
- to avoid paradox, introduce hierarchy of universe `U0: U1: U2 ...`
- cumulative universe, next universe contains previous universe
- write `A: U` and omit level

families of types / dependent type = `B: A -> U`
eg. family of finite sets `Fin: N -> U`, where Fin(n) is type with exactly n elements

constant type family = `(λ(x: A).B): A -> U`

# dependent function type (Π)
dependent function = functions whose codomain type vary depending on element of domain 

given A:U, family B:A->U, construct dependent function type
`Π(x:A) B(x):U` = `Π(x:A),B(x)` = `Π(x:A) B(x)`

if B is constant family, then `Π(x:A) B ≡ (A -> B)`
λ-abstarction: `λx.Φ : Π(x:A) B(x)`

eg. function returns "largest" element of nonempty finite type
`fmax: Π(n:N) Fin(n+1)` = `fmax(n) = n_(n+1)`

## polymorphic function
takes type as one of its arguments, act on element of that type
`id: Π(A:U) A->A`   define `id_A(x) = x`

`swap: Π(A:U) Π(B:U) Π(C:U) (A->B->C) -> (B->A->C)`
define as `swap(A,B,C,g) = λb.λa.g(a)(b)`

another possibility: `Π(x:A) Π(y:B(x)) C(x,y)`
given a:A, b:B(a) => `f(a)(b): C(a,b)`


# Product type
cartesian product = given A,B:U, introduce AxB: U
unit type (nullary product type) = 1:U

ordered pair is primitive concept in type theory

## generic way introduce new type
1. formation rules
`A->B` if both A,B are types
`Π(x:A) B(x)` when A,B(x) are types
2. construct elements of that type (constructor/introduciton rule)
`f(x) = 2x`
3. use elements of that type (eliminators/elimination rule)
4. computation rule
express how eliminator act on constructor
`(λx.Φ)(a)`
5. (optional) uniqueness principle
uniqueness of maps into or out of that type
every element of type uniquely determined by results of applying eliminator to it
   - reconstructed from results by applying constructor
propositional uniqueness principle: if provable as propositional equality from other rules of type 

##
given `g: A -> B -> C`
define `f: A x B -> C` by `f((a,b)) = g(a)(b)`

category theory: define product A x B to be left adjoint to "exponential" B -> C

## projection function
pr1: A x B -> A     pr1((a,b)) = a
pr2: A x B -> B     pr2((a,b)) = b

we can invoke function definition once, in universal case => apply resulting fn in other cases

define `rec[AxB]: Π[C:U](A->B->C) -> AxBxC`  by `rec[AxB](C,g,(a,b)) = g(a)(b)`
then `pr1 = rec[AxB](A, λa.λb.a)`, `pr2 = rec[AxB](B, λa.λb.b)`
recursor = `rec[AxB]`


## dependent fn over product type
generalize recursor
given `C: A x B -> U`
define `f: Π[x:AxB] C(x)` by `g: Π[x:A]Π[y:B] C((x,y))`
with `f((x,y)) = g(x)(y)`

prove propositional uniqueness: every element of AxB = a pair
```
uniq[AxB]: Π[x:AxB] ( (pr1(x), pr2(x)) =[AxB] x )
uniq[AxB]((a,b)) = refl[(a,b)]

refl[(a,b)]: (pr1((a,b)), pr2((a,b))) = (a,b)
```
prove a property for all elements of a product
eg. for natural numbers, ability to write proofs by induction
given A,B:U, `ind[AxB]: Π[C: AxB->U] ( Π[x:A] Π[y:B] C((x,y)) ) -> Π[x:AxB] C(x)`
by `ind[AxB] (C,g,(a,b)) = g(a)(b)`

dependent funciton defined on pairs being obtained from induction principle of cartesian product
recursor = special case of induction where family C = const
induction = (dependent) eliminator
recursion = non-dependent eliminator

define `ind[1]: Π[C:1->U] C(*) -> Π[x:1] C(x)` by `ind1(C,c,*) = c`
only inhabitant is *, so to construct `uniq[1]: Π[x:1] x = *` by `uniq[1](*) = refl[*]`
or using induction `uniq[1] = ind[1](λx.x = *, refl[*])`


# dependent pair type Σ
generalize product type to allow 2nd component of pair vary by choice of 1st component
given A:U, B:A->U  `Σ[x:A]B(x)`
have `(a,b): Σ[x:A] B(x)` given `a:A, b:B(a)`
`Σ[x:A]B = A x B`

```
pr1: Σ[x:A]B(x) -> A
pr1((a,b)) = a

C: Σ[x:A]B(x) -> U
g: Π[a:A] Π[b:B(a)] C((a,b))

f: Π[p: Σ[x:A] B(x)] C(p)
f((a,b)) = g(a)(b)

pr2: Π[p:Σ[x:A] B(x)] B(pr1(p))
pr2((a,b)) = b

ind[Σ[x:A] B(x)]: Π[C: Σ[x:A]B(x)->U] (Π[a:A]Π[b:B(a)] C((a,b))) -> Π[p:Σ[x:A]B(x)] C(p)
```
if dependent fn g, assign each a:A depdendnet pair (b,r), where b:B, r:R(a,b)
then f:A->B; dependent fn assign to a:A that R(a,f(a))

type-theoretic axiom of choice can be proven directly from rules of type theory

## magma
definition: a,b ∈ M => a∙b ∈ M  (∙ = operation)
define binary operation `m: A -> A -> A`
magma = pair (A,m) consist of type A:U & operation m
```
magma = Σ[A:U] (A -> A -> A)
pointed magma = Σ[A:U] (A -> A -> A) x A
```
can extract magma's underlying type with projections pr1,pr2

for structure >2 piece of data, use iterated pair type, maybe only partially dependent
eg. (x,y,z,w) = (x,(y,(z,w)))


# Coproduct
given A,B:U, introduce coproduct type A+B:U
disjoint union in set theory

empty type 0:U

## construct element
1. inl(a): A+B  for a:A   {left injection}
2. inr(b): A+B  for b:B   {right injection}

```
f: A+B->C, need fn g0: A->C, g1: B->C
f(inl(a)) = g0(a)
f(inr(b)) = g1(b)

rec[A+B]: Π[C:U] (A->C) -> (B->C) -> A+B -> C
rec[A+B] (C, g0, g1, inl(a)) = g0(a)
rec[A+B] (C, g0, g1, inr(b)) = g1(b)

construct depednent type function f: Π[x:A+B] C(x)
assume C: (A+B) -> U
g0: Π[a:A] C(inl(a))
g1: Π[b:B] C(inr(b))

ind[A+B]: Π[C:(A+B)->U]  Π[a:A]C(inl(a)) -> Π[b:B]C(inr(b)) -> Π[x:A+B]C(x)

empty type:
ind[0]: Π[C:0->U] Π[z:0] C(z)
```

# boolean type
boolean type 2:U => exactly 2 elements `0[2],1[2]: 2`

1. can construct type out of coproduct & unit types as 1+1
2. derive binary coproducts from Σ-type and 2

```
f: 2 -> C
f(0[2]) = c0
f(1[2]) = c1

rec[2]: Π[C:U] C -> C -> 2 -> C
rec[2](C, c0, c1, 0[2]) = c0
rec[2](C, c0, c1, 1[2]) = c1

ind[2]: Π[C:2->U] C(0[2]) -> C(1[2]) -> Π[x:2] C(x)
ind[2] (C,c0,c1,0[2]) = c0
ind[2] (C,c0,c1,1[2]) = c1

A+B = Σ[x:2] rec[2](U,A,B,x)
(a,b) = ind[2](rec[2] (U,A,B),a,b)]
```
using induction principle, we can deduce that every elem of 2 is either 1[2] or 0[2]

# natural number
1 = succ(0), 2 = succ(1), ...
define functions by recursion and perform proofs by induction

f: primitive recursion
```
f(0) = c0
f(succ(n)) = c[s](n, f(n))

add(0,n) = n
add(succ(m),n) = succ(add(m,n))
==>

rec[N]: Π[C:U] C- > (N -> C -> C) -> N -> C
rec[N](C,c0,cs,0) = c0
rec[N](C,c0,cs,succ(n)) = succ(add(m,n))

ind[N]: Π[C:N->U] C(0) -> (Π[n:N]C(n) -> C(succ(n))) -> Π[n:N]C(n)
ind[N] (C,c0,cs,0) = c0
ind[N] (C,c0,cs,succ(n)) = cs(n, ind[N](C,c0,cs,n))
```

link to classical notion of proof by induction
property of natural numbers represented by family of types P: N -> U
- if we can prove P(0), and if ∀n we can prove P(succ(n)) assuming P(n)
- then we have P(n) ∀n

whenever introduce new inductive definition, always begin by deriving its induction principle
- appropriate sort of "pattern matching" justified as shorthand for induciton principle


# proposition as types
regard elements of type as evidence OR witnesses that propositioin is true
- we present proofs in ordinary mathematical prose
- no difference from reasoning of classicl set theory, predicate logic, axioms of set theory

proposition NOT merely True/False, but collection of all possible witnesses of its truth
- proofs are mathematical objects in their own right
- on par with objects eg. numbers, groups

True: 1
False: 0
A and B: AxB
A or B: A+B
if A then B: A -> B
A iff B: (A -> B) x (B -> A)
Not A: A -> 0

proof by contradiction is not allowed

## de Morgan's laws
"if not A and not B, then not (A or B)"
(A -> 0) x (B -> 0) -> (A + B -> 0)

## semigroup
`Σ[A:U] Σ[m:A->A->A] Π[x,y,z:A] m(x,m(y,z)) = m(m(x,y),z)`
extract carrier A, operation m, and witness of the axiom

## higher order logic
we can use universe to represent "higher order logic"
- quantify over all propositions OR over all predicates
- `( Π[P:A->U[i]] P(a) -> P(b) ): U[i+1]`

## proof-relevant nature of logic
"A if and only if B" => (A->B) x (B->A)
but A and B exhibit different behavior (eg. N iff 1, N and 1 are different)
A and B merely logically equivalent (NOT equivalence of types)

"A is inhabited" = we have given a particular element of A, but not give name to that element
`~0 = (0->0)` is inhavited by id0


# Identity type
family `Id[A]: A -> A -> U` (not the same as identity funciton `id[A]`)
if `a =[A] b`, then a and b are equal

homotopical interpretation: regrad witness of a=b as 
- paths   OR
- equivalence between a and b in space A ?

given type A:U and a,b:A, we can form type `(a =[A] b):U` in the same univarse

## construct element of a=b
know that a,b are the same
reflexivity `refl: Π[a:A](a =[A] a) `
- constant path at point a

if a,b are judgmentally equal, then `refl[a]: a =[A] b`

## indiscernibility(不可分辨) of identicals
```
for every family C: A->U
there's fn f: Π[x,y:A] Π[p:x=[A]y] C(x) -> C(y)
such that   f(x,x,refl[x]) = id[C(x)]
```
every family of types C respects equality,
in sense that applying C to equal elements of A => function between resulting types

indiscernibility of identicals = recursion principle for identity type
- gives specified map from `x =[A] y`  to certain other reflexive,binary relations on A
- naemly those of form C(x)->C(y) for some unary predicate C(x)
~~ rec[N] gives specified map N->C for other type C

we consider not only allow equals to be substituted for equals, 
but also consider evidence p for equality


## Path induction
```
given family  C: Π[x,y:A] (x =[A] y) -> U
given function  c: Π[x:A] C(x,x,refl[x])

there is  f: Π[x,y:A] Π[p:x=[A]y] C(x,y,p)
such that   f(x,x,refl[x]) = c(x)

--combine all--
ind[=A]: Π[C:Π[x,y:A] (x =[A]y)->U] (Π[x:A] C(x,x,refl[x])) -> Π[x,y:A] Π[p:x=[A]y] C(x,y,p)
ind[=A] (C,x,x,refl[x]) = c(x)

```
we evaluate c at pair x,x; we get true proposition => reflexive

for natural element, either 0 / succ(n), prove some number => deduce to all
path induction => every path is of form refl[a]
- if we prove property fro reflexivity path, then we proved for all paths

for homotopy interpretation, there may be many different ways a,b identified
- many different elements of identity type

identity family (not identity type) inductively defined

## based path induction
fix an element a:A
```
C: Π[x:A] (a =[A] x) -> U
c: C(a, refl[a])

f: Π[x:A] Π[p:a=x] C(x,p)
f(a,refl[a]) = c
```

for a fixed a:A, the family of types (a =[A] y) as y varies over all elements of A
- is inductively defined by element refl[a]

associative law, commutative law are proven as propositional equality, not judgmental one

## disequality
`(x ≠[A] y) = ~(x =[A] y)`
we cannot prove two things are equal by proving they're not unequal (double negation)


## Versions of type theory
in this version Martin-Lof's intuitionistic type theory
3 variants:
under NuPRL, Coq, Agda computer implementations

- intensional version used here, not extensional version
- extensional: no distinction between judgmental and propositional equality

here admits proof-relevant interpretation of equality
- more restricted variants impose uniqueness of identity proofs: 
  - any 2 proofs of equality judgmentally equals
  - this requirement selectively imposed in COQ/AGDA

here taken induction principle as basic, pattern matching as derived from it
- eg. Agda's pattern matching can prove Axiom K by default
- otehr choice may allow deep pattern matching, 
  - but not well-understood in higher inductive types

ways to implement universe hierarchy
1. include rule that if A:Ui then A:Uj
2. introduce judgmental subtyping <: generated by Ui <: Uj
3. include explicit coercion function ↑: Ui->Uj
































