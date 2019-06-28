# notation
S\T = set of elements in S that are not in T

# preliminaries
relation R on set S and T = partial funciton from S to t
if dom(R) = S, then R = total function from S to T

equivalence on S = reflexive + transitive + symmertic relation on set S

n-place relation on collection of set S1,S2...Sn = set R ⊆ S1 x S2 x ... x Sn
where s1 ∈ S1 to sn ∈ Sn related by R
if (s1, ... ,sn) is an element of R

predicate on S = 1-place relation on set S

axiom = rules with no premises

# untyped arithmetic expression
t ::=
true, false, if t then t else t
0, succ t, pred t, iszero t
- close to standard BNF
  
t ::= (metavariable)

axiom written with no bar

## example
proposition T = S
T = smallest set satisfying certain condition,
so enough to show that S satisfies these conditions

complete induction on natural number: suppose predicate holds for all numbers < i, prove holds for i as well

1. give inductive definitions of functions over set of terms
2. give inductive proofs of properties of terms

## principle of induction on terms
Const(true|false|0) = {true|false|0}
Const(succ t1|pred t1|iszero t1) = Consts{t1|t1|t1}

size(true|false|0) = 1
size(succ t1|pred t1|iszero t1) = size(t1)+1

depth(true|false|0) = 1
depth(succ t1|pred t1|iszero t1) = depth(t1)+1


P: predicate on terms
for each term s, given P(r) that
1. induction on depth:
  - depth(r) < depth(s) => P(s)
2. induction on size
  - size(r) < size(s) => P(s) 
3. structural induction
  - immediate subterm r of s => P(s)

analogous to complete induction on natural numbers
structural induciton ~ P(n+1) established for just assumption P(n)

use structural induction wherever possible, since works on terms directly, avoid detour via numbers

at each step of induciton, given term t to show some property P
- assume P holds for all subterms

## semantic style
define how terms evaluated (semantics of language)
1. Operational semantics
define simple abstract machine
abstract: use language terms

state of amchine = term
transition funciton: define machine's behavior
=> sequence of machine state

2. Denotational semantics
meaning of term -> mathematical object

3. Axoimatic semantics
take laws as definition of language
meaning of terms = what can be proved to be

in 80s, abstract method encounter technical problem, operational methods seem more attractive
- use math technique convert denotational semantics to operational setting

## evaluation
t -> t'
"t evaluates to t' in 1 step"
if t = state of abstract machine
then machine can make a step of computation, change state to t'

## determinacy of one-step evaluation
if t->t' and t->t'', then t'=t''

## normal form
term t in normal form if no evaluation rule applies to it
- if there's no t' such that t->t' => t is normal form

every value is in normal form (cannot further evaluate it)
- some normal forms are not value => for run-time errors analysis

## uniqueness of normal forms
if t->u and t->u', where u and u' are both normal forms, then u = u'

## termination of evaluation
for every term t, there's some normal form t' such that t->t'

## stuck
stuck = normal form but not value
- terms not defined to evaluate anything (eg. succ false)

## small-step VS big-step semantics
small-step style: def of evalutation relation show how individual steps computed
big step: term evaluates to final value (t ⤋ v)


# untyped lambda calculus
formal system invented by Alonzo Church
- all computation is reduced to basic operations of function definition and application
- everything is a function

pi-calculus: popular language for defining semantics of message-based concurrent language
object calculus: for object-oriented language

## syntax
key: procedural / functional abstraction

factorial(n) = if n=0 then 1 else n*factorial(n-1)
==>
factorial = λn. if n=0 then 1 else n*factorial(n-1)

x     : variable
λx.t  : abstraction
t t   : application

avoid writing too many parentheses
1. left association 
  - s t u => (s t) u
2. bodies of abstractions extend as far to right as possible 
  - λx. λy. x y x => λx. (λy. ((x y) x))

## scope
`λx. t` 
- x is bound by this abstraction
- λx is binder, scope is t

`λy. x y`
- x is free

closed term = combinator = term with no free variables 

## operational semantics
in pure form, lambda-calculus no built-in constants / primitive operators
- no number, records, loops, IO, conditions, multi-argument functions ...
each step in computation = rewrite application 
- left side is abstraction
- substitute right side for bound variable in abstraction's body

### redex
`(λx. t12) t2 -> [x->t2]t12`
replace all free occurrences of x in t12 by t2

redex(reducible expression) = term of form `(λx. t12)t2`
beta-reduction = operation of rewriting a redex according to above rule

(λx.x) y => y   {substitute y into x}
(λx. x (λx.x)) (u r) => u r (λx.x)


## conversion
α-conversion: rename bound variables in expression (avoid name collision)

β-reduction

η-conversion: express idea of extensionality
- two function are same iff give same result for all arguments
- converts between `λx.(f x)` and `f`
- same concept of local completeness in natural deduction

### reduction(evaluation) strategy
```
beta-rduction:
(λx.x) ((λx.x) (λz. (λx.x) z))
= id (id (λz. id z))
= id (id (λz.z))
= id (λz.z)
= λz.z
```
full beta-reduction: any redex reduce at any time
normal order: leftmost, outermostr redex reduce first

call by name: no reduction inside abstraction, under normal order
- eg. Algo-60, Haskell(call by need)
- lazy evaluation

call by value: only outermost redex reduced 
- where redex is reduced only when right-hand side has already reduced to value
- most language use
- arguments to functions are always evaluated (strict)

## multi argument
`f = λx.λy.s` instead of `f = λ(x,y).s`
currying

## Church Boolean
true = λt. λf. t
false = λt. λf. f

true,false are representation of boolean values

use test combinator to run testing
```
test = λl. λm. λn. l m n
test true v w
= (λl. λm. λn. l m n) true v w
= (λm. λn. true m n) v w
= (λn. true v n) w
= true v w
= (λt. λf. t) v w
= (λf. v) w
= v
```

define boolean operator:
`and = λb. λc. b c false`
- given two boolean value b,c; 
- return c if b is true; 
- return false if b is false
- true if both b,c are true

```
and true true
= (λb.λc.b c false) true true
= λb.λc.b c λt.(λf.f) true true
= λb.λc.b c (λt.true) true
= λb.(λc.b c) true
= λc. true c
= λc. (λt.λf.t) c
= λt.λf.t
= true

and true false
= λt. λf. f 
= false
```
or = λb. λc. b true c
```
b true c
---------
T      T = T
T      F = T
F      T = T
F      F = F
```
not = λb. b false true


## pair
pair = λf.λs.λb b f s
fst = λp. p true
snd = λp. p false

fst (pair v w) = v
snd (pair v w) = w

## Church number
c0 = λs.λz. z = false
c1 = λs.λz. s z
c2 = λs.λz. s (s z)
...

each number n represented by combinator cn that takes two arguments (s,z)
- applies `s` n times to z

succ = λn. λs. λz. s (n s z)
- combinator that takes Church numberal n, return another Church numeral

(note: λx.λy. = \xy.)
proof. succ 1 = 2
```
succ 1
= \nsz. s (n s z) 1
= \nsz. s (n s z) (\s'z'. s' z')
= \sz. s ((\s'z'. s' z') s z)
= \sz. s ((\z'. s z') z)
= \sz. s (s z)
= 2
```
### arithmetic
succ = \nsz. s (n s z)
plus = \mnsz. m s (n s z)
- takes two Church numerals m,n

plus = \mn. n succ m  {m + n}
sub = \mn. n pred m  {m - n}
  
times = \mn. m (plus n) c0
- apply function that adds n to its arg, iterated m times, to 0
- add m copies of n

iszero = \m.m(\x.false) true

subtraction:
// init a pair of zeros
zz = pair c0 c0
// generate (c0,c1), (c1,c2), ...
ss = \p. pair (snd p) (plus c1 (snd p))
// define precedence as first elem of pair
// such that number m can refer to first elem of m-th pair generated
prd = \m. fst (m ss zz)

### enrich calculus
use primitive boolean and numbers


realeq = \mn. (equal m n) true false

realnat = \m. m (\x. succ x) 0
- convert Church numeral into primitive nuber

## recursion
some terms cannot be evaluated to normal form
eg. divergent combinator
omega = (\x. x x) (\x. x x)
- reducing redex yeilds exact omega again

diverge = terms with no normal form

useful generalization -> fixed-point combinator
fix = \f. (\x. f(\y. x y y)) (\x. f(\y. x x y))


# typed lambda calculus
functions can be applied only if capable of accepting given input's type of data
- weaker, less expressive than untyped lambda calculus

typed lambda calculus can prove more things


# simply typed lambda calculus
every evaluation strategy terminates for every simply typed lambda calculus
- evaluation of untype lambda terms need not terminate
























