# classification
## implementation
### Recursioin
eg. towers of Hanio

### Logical
controlled logical deduction
logic component expresses axioms that use in computation
logical programming paradigm

### Serial, parallel, distributed

### Deterministic / non-deterministic
solve problem via guessing

### Exact / approximate
may seek approximation closer to true solution using deterministic / random strategy

## design paradigm
### brute force / exhaustive search
### divide and conquer
repeatedly reduce problem into one or more smaller instances until small enough to solve easily

### search and enumeration
many problems can be modeled as problems on graphs
specifies rules for moving around a graph

### randomized algorithms
make choices randomly
eg. Monte Carlo 

### reduction of complexity
solve difficult problem by transforming into better known problem

### back tracking
multiple solutions built incrementally and abandoned when determined cannot lead to valid full solution


# optimization
## linear programming
search for optimal solution to linear function bound to linear equality and inequality constraints
eg. solve maximum flow problem for directed graphs

## dynamic programming
optimal solution construct from optimal solutions to subproblems (and overlapping subproblems)
avoid recomputing solutions already computed
eg, Floyd-Warshall

VS recursion: caching / memoization of recursive calls

## greedy method
start with some solution and improve by making small modifications
eg. find minimal spanning tree where finding optimal solution possible

## heuristic method
find solution close to optimal solution in case finding optimal is impractical
eg. local search, tabu search, genetic algorithm












