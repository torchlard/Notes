# introduction
study of expressive power of formal system, deductive power of formal proof systems

## formal system
use to infer theorems from axioms according to set of rules (logical calculus)
example: axiomatic system, formal ethics, lambda calculus, proof calculus

# zeroth order logic (propositional logic)
deals with propositions and argument flow, only covers proposition


## basic and derived argument form
negation, double negation, conjunction, biconditional
addition, composition, commutation, association, distribution, De morgan's theorem
law of non-contradiction, importation ...

## soundness, completeness


# first order logic (predicate logic)
covers proposition, predicates, quantification
syntax involve only finite expressions as well-formed formulas
- use quantifier, eg. ∃x usch that x is Socrates and x is a man (instead of Socrates is a man)
- semantics characterized by limitation of all quantifiers to fixed domain of discourse

## non-logical symbols
represent predicates, functions, constants

1. for n ≥ 0, Pⁿ₀,Pⁿ₁,Pⁿ₂...   
represent relations between n elements
2. for n ≥ 0, infinitely many n-ary function symbols

## many-sorted logic
allows variables to have different sorts (domains) => typed first-order logic
sorts = types (in data type)

## extensions
compactness theorem: sentences with arbitrarily large finite models => also have infinite ones
Lowenheim-Skolem theorem: 
- if countable first-order theory has an infinite model
- then ∀ infite cardinal number κ it has model of size κ
=> cannot control cardinality of infinite models

|                     | Compactness | Lowenheim-Sk. |
| ------------------- | ----------- | ------------- |
| First-order logic   | yes         | yes           |
| +∃ finitely many    | no          | yes           |
| +∃ uncountably many | yes         | no            |
| + most              | no          | no            |

## abstract model theory
finitary extensions: retain effective finite syntax of first-order logic
Qẋ̇∙φ(x) = Qxy∙φ(x), ψ(x) 
- Q = generalized quantifier
- φ form majority in universe (most)
- most ψ are φ

most A are B: there exists 1-1 correspondence between A-B and some subset of A∩B, but not vice versa
finiteness may be expressed as 'either one, or two, or three...'



# second order logic
first order logic quantifies only variables that range over individuals
second order logic quantifies over relations, sets, functions
1. S = variable range over sets of individuals, t=first order term, t ∈ S / S(t) 
2. k ∈ N variables range over all k-ary relations on individuals, R (t1,...,tk): atomic formula
3. k ∈ N variables range over all functions taking k elem of domain => retunr single element of domain

Monadic second-order logic: restricted 2nd-order logic only quantifies over unary relations
full second-order logic: no restriction

## semantics
establish meaning of each sentence

standard/full semantics: quantifiers range over all sets or functions of appropriate sort
- once domain of first order variable established, meaning of remaining quantifier fixed

Henkin semantics: each 2nd-order variable particular domain to range over, proper subset of all sets 
- prove Godel's compleness theorem, compactness theorem
- not more rexpressive than first order logic

## expressive power
eg. need 2nd order to asseret least-upper-bound for sets of real numbers
(∀ A) ( [(∃ w) (w ∈ A) ∧ (∃z)(∀u) (u ∈ A -> u ≤ z)]
  -> (∃x) (∀y) (∀w) (w ∈ A -> w ≤ y) <-> (x ≤ y) )
= every nonempty, bounded set A has a least upper bound

possible to write formal sentences which says "domain is finite", "domain is of countable cardinality"
- finite: every surjective function from domain to itself is injective
- countable cardinality: there is bijection between every 2 infiinite subset of domain

## deductive system
set of inference rules and logical axioms that determine which sequences of formulas constitute valid proofs
Lowenheim-Skolem theorem: 
least-upper bound axiom: every nonempty internal set that has an internal upper bound has least internal upper bound


# higher order logic
more expressive, model-theoretic properties less well-behaved than lower order logic
uderlying theory of simple types

third-order logic = quantifies over sets of sets ... up to nth-order logic

## semantics
quantifies over higher-type objects range over all possible objects of that type
eg. quantifier over sets of individuals over entire powerset of set of individuals
- categorical axiomatizations of natural numbers
- not admit effective, sound, complete proof calculus





# infinitary logic

# symbolic logic
Lowenheim-Skolem theorem: first order logic cannot control cardinalities of infinite structure

# model theory



# axoim of choice
Catesian product of collectioin of non-empty set is non-empty
- sometimes we don't know what's inside a non-empty set, so we cannot talk about selection function 

assume I is finite set, then I must be identical to {1,2,..,k}
for S1, f(S1)=x1; for S2, get x2 ∈ S2, extend f to {S1,S2}, f(S2)=x2 ...
finally f(Sk)=x_k, proved f exist

# Zermelo-Fraenkel set theory (ZF)
axiom of ZF refer only to pure set, not allow existence of universal set nor unrestricted comprehension
=> avoid Russel's paradox

1. axiom of extensionality
two set are equal if they have same elements

2. axiom of regularity / axiom of foundation
if A is a non-empty set, then ∃x ∈ A such that either not a set OR disjoint from A
=> no set is an element of itself

3. axiom schema of specification
subset always exist because there's one axiom for each ∅
=> proof existence of empty set

4. axiom of pairing
if x,y are sets, ∃ set contains x,y as elements

5. axiom of union
union over elements of a set exists

6. axiom schema of replacement
image of a set under any definable function will also fall inside a set

7. axiom of infinity
let S(w) = w ∪ {w}, where w is some set
then ∃ set X such that ∅ ∈ X and 
whenever set y ∈ X, then S(y) ∈ X
=> at least one infinite set exists

8. axiom of power set
for any set x, there is set y that contains every subset of x
=> define power set P(x) = {z ∈ y: z ⊆ x}

ZF + axoim of choice = ZFC


# substructural logic
logic lacking one of usual structural rules 
(eg. weakening, contraction, exchange, associativity)

## structural rule
inference rule that doesn't refer to any logical connective (symbol connecting multiple sentences)

```
weakening: hypotheses/conclusion of sequent extended with additional member
Γ ⊢ Σ       Γ ⊢ Σ 
-------  , -------
Γ,A ⊢ Σ    Γ ⊢ Σ,A

contraction: two equal members on same side can be replaced by single member
Γ,A,A ⊢ Σ    Γ ⊢ A,A,Σ 
---------  , ---------
Γ,A ⊢ Σ       Γ ⊢ A,Σ

Exchange: 2 members on same side maybe swapped
Γ1,A,Γ2,B,Γ3 ⊢ Σ    Γ ⊢ Σ1,A,Σ2,B,Σ3
----------------  , ----------------
Γ1,B,Γ2,A,Γ3 ⊢ Σ    Γ ⊢ Σ1,B,Σ2,A,Σ3

```

# classical logic
most widely used
1. law of excluded middle, double negation elimination
2. law of non-contradiction, principle of explosion
- from contradiction, anything follows

3. monotonicity of entailment, idempotency of entailment
- hypotheses of any derived fact may be freely extended with additional assumptions
- contraction

4. commutativity of conjunction
- eg. P ∧ Q = Q ∧ P

5. De Morgan duality
- for any logical operator one can find its dual
- duality provide different angle to llok at some mathematical objects
- may hard to define in 1 concept, but dont easily in another concept

# intuitionstic logic (constructive logic)
systems of symbolic logic
- semantic system offer concept of "constructive truth", rather than validity/provability

weaker than classical logic, more conservative what reasoner to infer
many tautologies in classical logic are not included
- not include law of excluded middle, double negation elimination

## syntax
basic connectives: ->, ∧, ∨, ⊥
¬A = (A -> ⊥)
quantifier: ∃, ∀

## sequent calculus
LJ: simple restriction of system LK (for classical logic)
in LK allow any num of formulas appear on concllusion side
in LJ allow at most 1 formula in the position

## Hibert-style calculus
modus ponens?

## equivalence
ϕ <-> χ = (ϕ -> χ) ∧ (χ -> ϕ)
IFF-1: (ϕ <-> χ) -> ((ϕ -> χ) ∧ (χ -> ϕ))

## relation to classical logic
obtain classical logic by adding these axioms:
A ∧ ¬A  : law of excluded middle
¬¬A -> A :  double negation
((A -> B) -> A) -> A : Peirce's law
(¬A -> ¬B) -> (B -> A) : law of contrapositive


# Non-classical logic
Computability logic: semantically constructed formal theory of computability
many-value logic: allow truth values other than T/F
Intuitionistic logic
Linear logic: reject idempotency, entailment
Modal logic: extends classical logic with non-truth-functional (modal) operator
Paraconsistent logic: reject principle of explosion
Quantum logic
Relevance logicNon-reflexivve logic: (Schrodinger) reject/restric law of identity


# Modal logic
□ : necessity, ◇ : possible
□p = in all possible worlds, p is the case
◇p = in some possible world, p is the case

Necessity: □p / ~◇~p
Possibility: ◇p / ~□~p
analyticity: □p ∨ □~p
contingency: ◇p & ◇~p
impossibility: ~◇p / □~p

Require: 
impossibility <-> analyticity <-> necessity <-> possibility <-> contingency

contradiction:
analyticity <-> contingency
possibility <-> impossibility

## kinds of possibility
logical: fixed given the laws of logic
nomological: fixed given actual laws of nature
temporal: fixed given actual history of the world

## formation rules
any long propositional variable is well-formed formula (wff)
if A is wff, ~A is wff
let x: binary operator &,v,->,<=>, if A,B are wffs, (AxB) is wff

##
Model <W,R,a>
W = set of possible worlds w0,w1,...
a = assignment function that give truth value

w0Rw1 = world w1 accessible to world w0

`a[w0](□p) = 1` <=> ∀ w1 such that w0Rw1, `a[w1](p) = 1`
`a[w0](◇p) = 1` <=> ∃ w1 such that w0Rw1, `a[w1](p) = 1`



Godel:
If theory is consistent and rich enough to contain Peano's axioms 
for natural numbers, it's not complete
=> we cannot proof statement T/F
















