# Parallel architecture
## bit level parallelism
32-bit faster than 8-bit (eg. add 2 32-bit number)

## instruction level parallelism
CPU highly parallel => pipelining, out-of-order execution, speculative execution

## data parallelism
SIMD (single instruciton, multiple data)
- image processing, GPU use many cores

## task-level parallelism
memory model: shared/distributed?

shared memory: 
processor -- cahce -| bus -- memory
processor -- cahce -|

distributed memory:
memory -- processor -| network
memory -- processor -|

## concurrency, distributed system
multiple computers

question:
1. is model applicable to solving concurrent problem, parallel problem, or both?
2. which parallel architecture can this model target?
3. does model provide tools to help write resilient / geographically distributed code?


# functional programming


















