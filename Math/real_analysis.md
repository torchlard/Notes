# Cantor's theorem
if A is any set, then there's no surjection of A onto set P(A) of all subsets of A
=> unending progression of larger and larger sets

# Lp metric
Lp = (|x1|^p + |x2|^p + ... + |xn|^p )^(1/p)

# Completeness property
## suprema and infima
bounded above if ∃u ∈ R st. s≤u ∀s∈S
bounded below if ∃u ∈ R st. u≤s ∀s∈S
bounded = both bounded below and above
unbounded = not bounded

## property
R is complete ordered field
completeness property of R:
every nonempty set of real number that has an upper bound also has a supermum in R

only 1 supremum(infimum) of given set S ⊆ R

## density theorem
if x and y are any real numbers with x < y, then ∃ r∈Q st. x < r < y

## archimedean property
if x ∈ R, then ∃ n ∈ N st. x < n


# Sequences and limits
sequence = ordered list
= function domain is coutable totally ordered set (eg. natural number)
= function f : N -> R, {xₙ}[∞, n=1], where xₙ = f(n)

## property
convergence: converge if it has a limit
```
lim aₙ = x
n→∞
```


# Riemann Integral
definite integral in calculus texts
```
∫[b,a] f(x)dx = lim[max Δxₖ->0] Σ[n,k=1] f(xₖ) Δxₖ
∫∫ f(x,y)dA = lim[max ΔAₖ->0] Σ[n,k=1] f(xₖ,yₖ) ΔAₖ
∫∫∫ f(x,y,yz)dV = lim[max ΔVₖ->0] Σ[n,k=1] f(xₖ,yₖ,zₖ) ΔVₖ
```
Riemann integral can be computed only for proper integrals

## Jordan measure
let M be bounded set in plane (contained entirely within rectangle)
- outer Jordan measure M = greatest lower bound of areas covering M
- finite unions of rectangles

Jordan measure = common value of outer and inner Jordan measures of M
f: bounded non-negative function on [a,b], ordinate set
M = { (x,y) | x ∈ [a,b], y ∈ [0, f(x)] }

f = Riemann integrable on [a,b] iff M is Jordan measurable
=> M = ∫[b,a] f(x) dx

## Riemann sum
summation of infinitely thin rectangles
Σ[n,k=1] f(xₖ)Δxₖ

if limit of Riemann sum exists as `max Δxₖ -> 0`
=> limit = Riemann integral of f(x) over interval [a,b]

# Lebesgue integral
## motivation
not all functions are consistent and continuous, some are with many holes

## analogy
ways to count amount of money
1. count notes one by one, then sum all => Riemann integral
2. count num of notes for each kind of money, multiply and sum all => Lebesgue integral

problem: how to define number of notes for same note value


# Closed set
1. complement of S is open set
2. S is its own set closure
3. sequences/nets/filters in S that coverage do so within S
4. every point outside S has neighborhood disjoint from S
eg. closed interval, closed path, closed disk

# Open set
let S be subset of metric space
openset of radius r, center x0 = set of all points x such that |x - x0| < r
eg. open interval, disk, ball

neither open/close: half-closed interval (0,1]


# size
## infimum
lower bound a of subset S
a ≤ x ∀x ∈ S

## supremum
upper bound b of subset S
b ≥ x ∀x ∈ S

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
3. subset of R is closed <=> contains all of its limit/cluster points

### characteristics
let F ⊆ R
1. F = clsoed subset of R
2. if X = {xₙ} is any convergent sequence of elem in F, then (lim X) ∈ F


## example
- G = {x ∈ R | 0 < x < 1} is open
- I = [0,1] not open, since every neighborhood of 0 ∈ I contains points not in I
- empty set ∅ is open in R

## ex2
find an infinite open cover of interval (0,1) that has no finite subcover
- (0,1) bounded & not closed => not compact
- (0,1) not closed => not contain all of its limit point
- construct open set get closer and closer to at least 1 end point, never reach them

(0+1/3, 1-1/3) ∪ (0+1/4, 1-1/4) ∪ ... = {(0+1/n, 1-1/n)}[∞,n=3]

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
- ∀ ε-neighborhood U = V(f(c)) ∃ δ-neighborhood V(c) of point c st. 
- if x ∈ V(c) ∩ A, then f(x) ∈ U <=> f(V ∩ A) ⊆ U
- V ∩ A ⊆ f⁻¹(U)

### Global continuity theorem
- let A ⊆ R, let f: A -> R, then
- f is continuous at every point of A
- ∀ open set G in R, ∃ open set H in R st. H ∩ A = f⁻¹(G) 

f: R->R is continuous <=> f⁻¹(G) is open in R whenever G is open
- in general, continuous function won't send open set to open set
- eg. f(x) = x²+1

### Persenvation of compactness
K ⊆ R is compact, f: K->R continuous on K
=> f(K) is compact

### Theorem
K is compact subset of R , 
f: K -> R is injective and continuous
=> f⁻¹ is continuous on f(K)


# Metric space
generalize fundamental concept of real analysis 
abstraction of distance function

why generalize?
1. theorem derived in general settings can apply to many particular cases
2. removing non-essential features of special situations

set where notion of distance(metric) between elements of set is defined
ordered pair (M,d), where M is set, d is metric

d : M x M -> R such that
1. d(x,y) ≥ 0 ∀x,y ∈ M
2. d(x,y) = 0 <=> x=y
3. d(x,y) = d(y,x)
4. d(x,z) ≤ d(x,y) + d(y,z)

eg. measure theory, functional analysis

## ex1
can define several different metrics on same set
d1(p1,p2) = |x1-x2| + |y1-y2|
d∞(p1,p2) = sup{ |x1-x2| + |y1-y2| }

uniform norm: d∞(f,g) = ||f-g||
||f||: uniform norm of f on set [0,1]

discrete metric:
d(s,t) = 0 if s=t
       | 1 if s≠t

let C[0,1] be set of all continuous functions on interval [0,1] to R

## neighborhood and convergence
let (S,d) be metric space, ε>0
ε-neighborhood of point x0 in S
`V[ε](x0) = {x ∈ S : d(x0,x) < ε}`

notion defined in terms of neighbors -> context of metric space

sequence = X: N -> S
- usual notation: X = (x0), but now x0 ∈ S ∀n ∈ N

sequence (xₙ) converge to x ∈ S 
- if ε>0, ∃ K ∈ N st. xₙ ∈ `V[ε](x)` ∀n ≥ K

## Cauchy sequences
let (S,d) be metric space, sequence (xₙ) in S 
- for each ε>0, ∃ H ∈ N st. d(xₙ,xₘ)<ε ∀n,m ≥ H

prev def: sequence is Cauchy seq iff converges to point of R => not true for metric space

metric space (S,d) is complete 
- if each Cauchy sequence in S converges to a point of S

completeness property of R can be stated in terms of Cauchy seq, 
Supermum property can be duduced as theorem
==OR==
convergence of Cauchy seq deduced as theorem, use completeness property

### example
if (xₙ) is seq of rational number that converges to √2,
then it's Cauchy in Q, but not converge to a point of Q
=> (Q,d) is not complete metric space

## open sets and continuity
subset G of S is open set 
- if ∀ point x ∈ S ∃ neighborhood U of x st. U ⊆ G
- F ⊆ S is closed set in S IF S\F is open set in S

proof: replace (x-ε,x+ε) by ε-neighborhood 

let metric space (S1,d1), (S2,d2)
f: S1 -> S2 continuous at point c in S1
- if ∀ ε-neighborhood of V(c) ∃ δ-neighborhood of c
- st. if x ∈ Vδ(c), then f(x) ∈ Vε(f(c))

## semimetrics
d : S x S -> R that satisfies all metric conditions except one with weaker condition d(x,y)=0 if x=y

semimetric space (S,d) 
every metric is semimetric

P1 = (x1,y1), P2 = (x2,y2)
if d1(P1,P2) = |x1-x2| (not metric, since points with same x-coor have dist=0)
dist(f,g) = ∫[b,a] |f-g|

sequence in semimetric space not necessarily converge to unique limit

## interior point
if S is subset of Euclidean space, then x is interior point of S
- if ∃ open ball centered at x completely contained in S

any subset S of metric space X with metric d
- x is interior point of S if ∃r>0 st. y ∈ S
- whenever distance d(x,y) < r

## exterior point
exterior of subset S of topological space X, ext(S)
complement of interior space






