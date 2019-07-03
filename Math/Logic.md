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





























