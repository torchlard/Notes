# Thread pool
## mysql before 5.5
assign a thread for every client connection
- extensive context switching
- bad locality for CPU caches
- increse contention for hot locks 
=> performance killer

ideally single active thread for each CPU

## static thread pool (after 5.1)
use limited set of threads to handle all queries

drawback: pool was static
good when threads never block & don't depend on each other

## dynamic thread pool (after 5.5)
thread may block each other via lock / IO, hard to predict how many threads ideal

1. make pool dynamic
2. minimize overhead to maintain thread pool
3. use native thread pool implementation if possible
  - system variables differ between windows and Unix

## when to use
most efficient: query relatively short, load CPU-bound
if not CPU-bound, still can save memory

## when is less efficient
1. very burstly workload
thread_pool_idle_timeout (unix), thread_pool_min_threads (window)

2. many concurrent, long, non-yielding queries
non-yielding: never wait / not indicate waits to thread pool
mostly used in data warehouse scenarios
stall detection to prevent totally monopolizing thread pool

3. simple queries always finish quickly

## config
thread_handling: no-threads, one-thread-per-connection, pool-of-threads
extra_port: extra port number for one-thread-per-connection

thread_pool_dedicated_listener:
- if 1, then each group have dedicated listener
- listener thread not pick up work items
- queueing time, actual queue size will be more exact
  - IO request immediately dequeued from poll

thread_pool_idle_timeout: num of sec idle thread before exists

thread_pool_oversubscribe: 
- #worker thread group remain active at same time, once thread goroup oversubscribed due to stall

thread_pool_size: #thread_groups in thread pool

thread_pool_stall_limit


## Thread group in thread pool implementation
thread group to divide client connection to many set of threads

client connections distributed between thread group
thread_group_id = connection_id % thread_pool_size

### thread group thread
#### worker thread
perform work on behalf of client connections
1 thread group many worker threads, usually only 1 actively running at a time

#### listener thread
listen for IO events, distribute work to worker threads

### global threads
timer thread
- checks each thread group for stalls
- ensure each thread group has listener thread

## thread creation
### worker create by listener thread
situation to create new worker thread:
- get client conn req that need to work on
- no active worke thread in thread group
- no sleeping worker thread that can wake up
- satisfy thread_pool_max_threads

### worker create by worker threads
new thread if:
- worker thread wait on some req (eg. IO, lock)
- no active, sleeping worker threads
- satisfy thread_pool_max_threads
- more client conn req in work queue that listener need to distribute to worker

### listener create by timer thread
if:
- thread group not handle any IO
- no listener thread in group
- no sleeping worker

### worker create by timer during stalls
- timer thinks thread group is stalled
- no sleeping worker threads that timer can wake up
- worker not been created for group within throtting interval

## thread group stalls
if client conn monopolize thread group, prevent other conn
consider stall if:
- more conn req that listener need to distribute
- no client conn req allowed to dequeued to run since last stall check by timer thread

if stall, wake up sleeping worker thred => temporarily allow several client conn run in parallel
`thread_pool_stall_limit`
higher: avoid too many parallel threads
lower: help prevent deadlocks

## thread group oversubscription
when multiple active worker therad, thread group boersubscribed
once thread group oversubscribed, `thread_pool_overssubscribe` define upper limit for when worker threads start shutting down






