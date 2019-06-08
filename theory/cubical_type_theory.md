# definition of cutt
type theory giving homotopy type theory computational meaning

# homotopy type theory
traditional type theory augmented with higher inductive types and univalence axiom

# HIT
type equipped with custom equality
eg. write type similar to natural numbers with equality between all even numbers

# UA
gives universe strongest possible euality in advance (only 1 universe)

# what is equality?
types within which different equalities defined from your perspective
equality = dependent case

# manipulate equality
indices assigned to referents of single equality

capping = construct ceiling of cubical building given its floor and pillars
whole structure made of equalities
eg. cap of square built from 3 different equality
floor: a=b, left wall: a=c, right wall: b=d
==> capping output ceiling c=d
```
c    d
|----|
|    |
|----|
a    b
```
dimension = indices of equalities

## 1-dimensional capping
convention: smaller values at left and bottom
horizontal axis = i; left pilar: i=0; right pillar: i=1
if floor: j=0, then ceiling: j=1

generalize idea equality = line -> square built from equality being a face
-> geometry: equality = lines

~i=0 for i=1, ~i=1 for i=0
~ fuzzy boolena, leave index unspecified, rely on orthogonal dimensions
- select right-hand side of square with only i=1

# available dimensions?
map function over an equality
```
given f : A -> B, x=y in A ==> derive `f x = f y` in B
map (x:A) (y:A) (f: A->B) (e: x=y) = \(i: dim) -> f (e i)
```
(e i) = application to fuzzy boolean i
if i=0, e i => x; if i=1, e i => y


# syntax
```
cap h T {
  ... pattern matching through dimensions ...
} t

\(d: a=b)(1: a=c)(r: b=d) -> \(i: dim) -> cap j T {
  (i=0) => 1 j,
  (i=1) => r j,
} (d i)
```
h: dimension as height of cube
T: space which we build structures
pattern matching: throught pillars / higher-dimensional walls
t: floor of structure whereas h=0


operation of filling cube
```
fill h T {
  pat1 => faces1
  pat2 => faces2
  ...
  patn => facesn
} t :=

cap i T(h := h /\i) {
  pat1 => faces1(h:=h/\i)
  pat2 => faces2(h:=h/\i)
  ...
  patn => facesn(h:=h/\i)
  (h=0) => t
} t
```
if i=1, because 1/\h=h,
filling gives us ceiling modulo name of dimension











