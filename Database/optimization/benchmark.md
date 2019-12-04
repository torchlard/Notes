# benchmark
strategy:
- full-stack
- single-component

## measurement
### throughput
number of transactions per unit of time
measure OLTP throughput

### response time or latency
total time task requires
percentile response time
- 95th percentile 5ms = 95% time finish in 5ms

### Concurrency
open connections VS actual query running concurrently

### Scalability
maintain performance under changing workload
get twice as much work done if twice resource

## tactics
mistakes
- use subset of real data
- incorrectly distributed data (missing hot spot in real system)
- unrealistic distributed parameters
- single user scenario
- benchmark distributed application on single server
- fail to match real user behavior
- running identical queries in loop
- fail to check for error
- no warm up for cache
- use default server setting, no optimization
- benchmark too quickly

do benchmark in same configuration
need to run benchmark for meaningful amount of time
- observe system in steady state

if don't know how long to run -> run forever until satisfied
