# Algebraic structure
algebraic structure on set A = collection of finitary operations on A
**algebra** = set A with this structure
eg. group,ring,field,lattice
more complex structures defined by introducing mltiple operations, different underlying sets, or altering defining axioms; eg. vector space, modules, algebras


# Group like structure

-             | totality | associativity | identity | invertibility | commutativity
--------------|----------|---------------|----------|---------------|--------------
semigroupoid  |          | y             |          |               |
category      |          | y             | y        |               |
groupoid      |          | y             | y        | y             |
magma         | y        |               |          |               |
quasigroup    | y        |               |          | y             |
loop          | y        |               | y        | y             |
semigroup     | y        | y             |          |               |
monoid        | y        | y             | y        |               |
group         | y        | y             | y        | y             |

# category
algebraic structure ~group without inverse/closure
ability to compose arrow associatively & existence of idntity arrow for each object
eg. category of set: object=set, arrow=function

## category theory
seek to generalize all mathematics in terms of category, independent of what objects and arrows represent
**same category** if:
 same collection objects, same collection of arrow, same associative method of composing any pair of arrows
eg. Set: sets,set function; Ring: rings,ring homomorphisms; Top: topological spaces,continuous maps
Monoid = special sort of category with single object, whose self-morphism represent by elements of monoid

## definition
class ob(C) of objects
class hom(C) of morphisms/arrows/maps between objects
  f: a->b, "f is morphism from a to b"
  hom(a,b)
compositon of morphism: hom(a,b) x hom(b,c) -> hom(a,c)
  eg. f:a->b, g:b->c =>  g∘f 

such that following axioms hold:
associativity: 
  if f:a->b, g:b->c, h:c->d; then h∘(g∘f)=(h∘g)∘f
identity:
  for every object x, there exists morphism id_x: x->x ; "identity morphism for x"
  f:a->x, g:x->b => id_x∘f=f, g∘id_x=g
abelian group | y        | y             | y        | y             | y

# partial function
parital function X to Y: function f:X'->Y for some proper subset X' of X 
  generalize f:X->Y by not forcing f to map every element of X to element of Y
**total function** if X'=X

## endofunction
map type to same type
  eg. Int=>Int, String=>String
      (x: Int) => x*2  ;  (x: Int) => x*3

Identity function do nothing, it's special case of endofunction

## endofunctor
assume endofunctor is F, F[Int] => Int
  for f: Int => String, F[f] => f
so endofunctor is a Identity functor, do nothing to objects and relations in category

###
construct category Hask, take example of List, we get
`List[A], List[List[A]], List[List[List[A]]] ...`
the results of these mapping are also Hask category, so it's endofunctor


## monad
monad in X is just monoid of endofunctors of X

## functor
functor is type-oriented programming
assue F[_] is functor, then mapping: String => F[String]

functor and function both represent mapping, but on different target
function: mapping among proper types
  eg. Int => String ; List[T] => Set[T]

functor: mapping among category (can treat category as higher kind type )




