# introduction
study of expressive power of formal system, deductive power of formal proof systems

## formal system
use to infer theorems from axioms according to set of rules (logical calculus)
example: axiomatic system, formal ethics, lambda calculus, proof calculus

# zeroth order logic (propositional logic)
deals with propositions and argument flow

## basic and derived argument form
negation, double negation, conjunction, biconditional
addition, composition, commutation, association, distribution, De morgan's theorem
law of non-contradiction, importation ...

## soundness, completeness




# first order logic (predicate logic)
particular formal system of logic
syntax involve only finite expressions as well-formed formulas
- use quantifier, eg. ∃x usch that x is Socrates and x is a man (instead of Socrates is a man)
- semantics characterized by limitation of all quantifiers to fixed domain of discourse

distinguish from propositional logic (no quantifiers / relations)
- propositional logic as foundation


# second order logic

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





























