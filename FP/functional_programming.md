# currying vs partial application
currying:
convert single function of n arguments -> n functions with single argument
function f(x,y,z) { z(x(y)); }  ===>  function f(x) { lambda(y) {lambda(z) {z(x(y))} } }
--> f(x)(y)(z)
* takes exactly 1 input (fn)

parital application:
if only call f x y, then got partially-applied function
* takes >= 2 inputs (fn, x1 ...)





