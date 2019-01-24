# currying vs partial application
currying:
convert single function of n arguments -> n functions with single argument
function f(x,y,z) { z(x(y)); }  ===>  function f(x) { lambda(y) {lambda(z) {z(x(y))} } }
--> f(x)(y)(z)
* takes exactly 1 input (fn)

parital application:
if only call f x y, then got partially-applied function
* takes >= 2 inputs (fn, x1 ...)

# definitions
functor :: (a -> b) -> f a -> f b
applicative :: f (a -> b) -> f a -> f b
monad :: m a -> (a -> m b) -> m b















