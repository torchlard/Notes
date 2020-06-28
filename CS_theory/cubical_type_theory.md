# reference
https://zhuanlan.zhihu.com/p/103565709

# terms
MLTT: Martin-Löf type theory

# definition of cutt
type theory giving homotopy type theory computational meaning
a version of HoTT

# homotopy type theory
traditional type theory augmented with higher inductive types and univalence axiom

# HIT
type equipped with custom equality
eg. write type similar to natural numbers with equality between all even numbers

# proof
in MLTT, since it includes K theorem, Equality type only remain 1 inhabitant: refl
in HoTT, equality proof = Path, Path and Path can be different
  - => infinitely many proofs, each proof = inhabitant = interval

## notation
a ≡ b => Path _ a b



# UA
gives universe strongest possible euality in advance (only 1 universe)

## what is equality?
types within which different equalities defined from your perspective
equality = dependent case

## manipulate equality
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

# concept 
## function extensionality
if every points on 2 functions are equivalent, then 2 functions equivalent
hoTT can proof it structurally


functionExtensionality : {A B : Set}
→ {f g : A → B}   // accept 2 function from A to B
→ (p : ∀ a → f a ≡ g a)   // proof each point the same
→ f ≡ g   

functionExtensionality p i = λ a → p a i
// create path from f a to g a == apply a to path = p a

for every value a : A, there exists interval on path connecting (f a) and (g a)

## square
path = λ-expression accepting 1 I (interval)
square = λ-expression accepting 2 I

## heterogeneous equality
(p : a ≡ b)
(q : c ≡ d)

we cannot write something : p ≡ q, because two types must be same
=> heterogeneous equality

create two different paths between p and q => obtain square
(s : p ≡ q)

# hcomp
another name: Kan operator
## objective
fill up missing side in cube / higher dimensions

## requirement
1. bottom (path if 1D, square if 2D)
2. a functionto map a interval from bottom to side of that shape

## principle
pattern matching on several intervals











