# homotopy definition
homotopic in topology = two continuous functions from one topological space to another
- one continuously deform into another
- homotopy between two functions

## formal def
continuousfn f,g for X -> Y that X,Y:topological space
H: X × [0,1] -> Y
where H(x,0) = f(x), H(x,1) = g(x) ∀x ∈ X

## another def
family of continuouss functions h1: X -> Y for t ∈ [0,1] 
such that h0 = f, h1 = g

### example
transform mug to torus
homotopy between two embeddings f,g of torus into R³ 
X = torus, Y = R³ 
f = continuous function from torus -> embedded surface-of-doughnut shape 
g = continuous function : torus -> embedded surface-of-mug shape

## properties
homotopic is equivalence relation on set of all continuous functions X -> Y
- compatible with function composition

if f1.g1 : X -> Y, f2.g2 : Y -> Z are homotopic,
then f2 ∘ f1 and g2 ∘ g1 : X -> Z are also homotopic



# topological space
set of points along with set of neighbourhoods for each point
- satisfy set of axioms relating points and neighbourhoods

allow very general definitions
- define continuity, connectedness, convergence
- other space (eg. manifolds,metric space) specialized of topological space
  - with extra structures or constrains

find invariants to decide equivalence of surfaces
=> geometry invariants of arbitrary continuous transformation
=> topology

## def via neighbourhoods
X is set, x in X are points, X can be empty
N = function assigning to each x ∈ X wrt. N (neighbourhoods of x)
N = neighbourhood topology

1. if N is neighbourhood of x, then x ∈ N
2. if N ⊂ X and includes neighbourhood of x, then N is neighbourhood of x
3. intersection of 2 neighbourhood of x = neighbourhood of x
4. any neighbourhood N of x, includes neighbourhood M of x
  - such that N is neighbourhood of each point M

eg. subset N of R = neighbourhood of real number x, IF it includes open interval containing x

## def via open set
topological space = ordered pair (X,r)
- where X: set, r: collection of subset of X

1. empty set and X itself belong to r
2. arbitrary union of member of r => belong to r
3. intersection of any finite num of x ∈ r => belong to r
  
open sets = elements of r
topology on X = collection of r

### example
- given X={1,2,3,4},

trivial topology = {{}, {1,2,3,4}}
another topology = {{},{2},{1,2},{2,3},{1,2,3},{1,2,3,4}}
discrete topology = P(X) the power set of X

- Non-example
r={{},{1,2,3},{2},{3}}  [because {2}∪{3} = {2,3} ∉ r ]
r={{},{1,2,3},{1,2},{2,3}}  [because {1,2}∩{2,3} = {2} ∉ r ]


given X = Z (all integers)
r = collection of all finite subset of integers + Z
=> not topology, because union of all finite set not containing 0
  - infinite but not all of Z
  - => not in r

### power set
set of all subsets of x
eg. S = {1,2,3},
power set = { {1},{2},{3},{1,2},{1,3},{2,3},{1,2,3} }
number of elements = |P(S)| = 2^n, wehre n = |S|

## def via closed set
1. empty set and X => closed
2. intersection of any collection of closed set => closed
3. union of any finite num of closed set => closed


## comparison of topologies
r1, r2: topology
∀x ∈ r1 -> x ∈ r2 AND r1 ⊂ r2
=> r2 is finer than r1, r1 is coarser than r2

{all topologies on X} => complete lattice
- if F = {rₐ | a ∈ A} = {topologies on X}


### complete lattice
partially ordered set where {supermum, infimum} ∈ all subsets

for S ⊂ T: partially ordered set,
infimum = x ∈ T where ∀y x ≤ y ∈ S
supremum = x ∈ T where ∀y x ≥ y ∈ S

eg.
power set of given set, ordered by inclusion 
- (supremum = union of subsets, infimum = intersection of subsets)
non-negative integers, ordered by divisibility (#numbers it can divide, 0 is largest)


### lattice
partially ordered set that every 2 elements have unique supermum,infimum


## continuous functions
function f: X->Y is continuous IF
- ∀x ∈ X and neighborhood N of f(x)
- ∃ neighborhood M of x such that f(M) ⊆ N

f is continuous if inverse image of every open set is open


# homotopy group 


























