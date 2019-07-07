# Open and closed set in R
## neighborhood
x ∈ R is any set V that contains ε-neighborhod `V(x) = (x-ε, x+ε)` of x for some ε>0

## open
g is open in R if ∀x ∈ G ∃ neighborhood V of x st. V ⊆ G

### property
1. union of arbitrary collection of open subsets in R is open
2. intersection of any finite collection of open set in R is open

### characteristics
subset of R is open <=> is union of countably many disjoint open intervals in R

## closed
subset F of R is closed in R if complement C(F) = R\F is open in R
### property
1. intersection of any finite collection of closed sets in R is clsoed
2. union of any finite collections of closed sets in R is closed
3. setset of R is closed iff it contains all of its cluster points

### characteristics
let F ⊆ R
1. F = clsoed subset of R
2. if X = {xₙ} is any convergent sequence of elem in F, then (lim X) ∈ F


## example
- G = {x ∈ R | 0 < x < 1} is open
- I = [0,1] not open, since every neighborhood of 0 ∈ I contains points not in I
- empty set ∅ is open in R


## Cantor Set
removing sequence of open intervals from closed unit interval I = [0,1]
F1 = [0,1/3] ∪ [2/3,1]
F2 = [0,1/9] ∪ [2/9,1/3] ∪ [2/3,7/9] ∪ [8/9,1]
...

keep removing middle thirds of each set -> F[n+1]

### def
Cantor set F = intersection of sets F[n], n ∈ N
1. total length of removed intervals = 1
2. F has no nonempty open interval as subset
3. F has infinitely many points


## Compact set
open cover of A: collection {Gₐ} of open sets in R whose union contains A
`A ⊆ ∪[a] Gₐ`
(finite) subcover of G: subcollection of set from G st. union of sets in G contains A (finitely many sets)

K ⊂ R is compat : every open cover of K has a finite subcover

Heine-Borel theorem: K ⊂ R is compact iff closed and bounded
K ⊂ R is compat iff every sequence in K has subsequence that converges to point in K

## Continuous functions
global continuity: assume fn continuous in entire domain

continuity of f: A -> R at point c ∈ A
- ∀ ε-neighborhood V(f(c)) ∃ δ-neighborhood V(c) of point c st. 
- if x ∈ V(c) ∩ A, then f(x) ∈ V(f(c))

Global continuity theorem
- let A ⊆ R, let f: A -> R, then
- f is continuous at every point of A
- ∀ open set G in R, ∃ open set H in R st. H ∩ A = f⁻¹(G) 

if K is compact subset of R and f: K -> R is injective and continuous, then f^-1 is continuous on f(K)




















