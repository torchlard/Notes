# homotopy type theory
## cnetral idea
homotopy type: type as space 
category theory: higher dimensional groupoids

## classical homotopy
space X = set of points equipped with topology

path between point x,y represented by continuous map p: [0,1] -> X
- where p(0)=x, p(1)=y

function = giving a point in X at each moment in time

coarse notion of equality of path: homotopy
homotopy between pair of continuous map  f: X1 -> X2, g: X1 -> X2
continuous map H: X1 x [0,1] -> X2 
- satisfying H(x,0) = f(x)  and  H(x,1) = g(x)

in specific case of path p,q  from x to y
H: [0,1] x [0,1] -> X
H = continuous dformation of p into q that doesn't move endpoints

homotopy is 2-D pat, there should be 3D homotopy between homotopies
-> then 4D (homo on homo on homo) ...
with algebraic operations -> (weak) ∞-groupoid

collection of objects -> collection of morphisms between objects 
-> morphism between morphisms -> ...
with complex algebraic structure => k-morphism (morphism at level k)

morphism at each level has identity,composition,inverse operations

weakness of ∞-groupoid from paths form a group only up to homotopy,
- with (k+1)-path serving as homotopies between k-paths

homotopy hypothesis/theorem = fundamental ∞-groupid construction adjoint to 
geometric realization of ∞-groupoid as space

in hott each type can seen to have structure of ∞-groupoid
for any x,y:A, we have identity type `x =[A] y` OR `id[A](x,y)`
- we can do same iteration on identity type => go higher dimension

p: x =[A] y   , path from x(start point) to y(end point)
parallel: two paths p,q: x=[A]y with same start,end pts 
=> 2-dimensional path

classical homotopy theory: analytic (space and paths are made of points)
new homotopy theory: synthetic (points,paths,paths between paths are basic,atomic,primitive)

all basic construciton, axioms, higher groupoid structure arise 
=> automatically from induction principle

## types are higher groupoid
### lemma 2.1
for every type A, every x,y:A,
`(x = y) -> (y = x)`
type = Π[A:U]Π[x,y:A] (x=y)->(y=x)
such that refl[x]^-1 = refl[x] for each x:A
call p^-1 the inverse of p

### lemma 2.2
for every type A, every x,y,z:A
there is  (x=y) -> (y=z) -> (x=z)
`p |-> q |-> p∙q`
call p∙q concatenation / composite of p and q

treat both sides symmetrically makes more robust proofs

### relations
| equality     | homotopy               | ∞-groupoid              |
| ------------ | ---------------------- | ----------------------- |
| reflexivity  | const path             | identity morphism       |
| symmetry     | inversion of paths     | inverse morphism        |
| transitivity | concatenation of paths | composition of morphism |

specify witness of each equality:
a = b  (by p)
  = c  (by q)
  = d  (by r)
(p∙q)∙r : (a=d)

concatenation, inversion are just "first-level" of higher groupoid structure 
- need conerence laws on these operations
- analogous opeerations at higher dimensions

### lemma 2.3
1. p = p ∙ refl[y] , p = refl[x] ∙ p
2. p^−1 ∙ p = refl[y] , p∙p^−1 = refl[x]
3. p(p^−1) = p
4. p ∙ ( q ∙ r) = ( p ∙ q ) ∙ r

propositoins 1-4  are paths of paths topologically (ie. homotopies)

loops: paths from a point to itself
given a:A, define its loop space Ω(A,a) : a=[A]a

higher groupoid structure: ΩA x ΩA -> ΩA








