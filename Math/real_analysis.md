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









