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


# thread state
## delayed insert connection 
allocating local table
create delayed hander
got handler lock
got old table
storing row into queue
waiting for dealy_list
waiting for handler insert
waiting for handler lock
waiting for handler open

## delayed insert handler 
insert: about to insert
reschedule: sleeping, let other thread function
upgrading lock: get lock to table to insert rows
waiting for insert

## event scheduler 
clearing
initialized
waiting for next activation
waiting for scheduler to stop
waiting on empty queue

## general thread
analyzing: calculating table key distribution
checking permission: check if enough permission to perform statement
checking table: table not closed / corrupt, integrity between data and index files with checksum
FULLTEXT initialization
init: ALTER, DELETE, INSERT, SELECT, UPDATE
login: connection thread not yet auth
optimizing: initial optimization
preparing: during query optimization

reopen tables: after thread obtained lock but underlying table structure changed => lock released
repair by sorting: create index using a sort
repair with keycache: create index by key cache, one-by-one
rolling back
waiting for commit lock: flush tables with read lock
waiting for global read lock
waiting for table level lock
waiting on cond: wait for unspecified condition to occur
writing to net

copy to tmp table: new table by ALTER TABLE
copying to group table: sort rows by group, copy to tmp table (diff GROUP BY, ORDER BY)
copying to tmp table: copy to tmp table in memory
copying to tmp talbe on disk
creating sort index: process SELECT resolved using internal temp table
creating tmp table: memory/disk
executing
searching rows for update: matching rows before UPDATE
sending data: sending data to client as part of processing SELECT
sorting for group|order: sort as part of GROUP BY | ORDER BY
sorting index
sorting result: SELECT using non-temp table
system lock: waiting for external lock for specific table
table lock: request table's internal lock after acquiring external lock
updating main|reference table
updating status: after query execution complete, if exceed long_query_time, Slow_queries ++
user lock: wait for advisory lock from GET_LOCK()
user sleep: SLEEP()

deleting from main table
deleting from reference table: deleting matched rows from secondary ref table

after create: function that created table(temp/non-temp) just ended
cleaning up
closing tables
end: cleanup ALTER TABLE, CREATE VIEW, DELETE, INSERT, SELECT, UPDATE
freeing items: free from query cache
flusing tables

killed: thread abort next time it checks kill flag
locked: query locked by another query
purging old relay logs
reading file: LOAD DATA INFILE
remove duplicates: SELECT DISTINCT could not be optimized
rename (result table)

## replication master thread
finished reading one binlog; switching to next binlog
master sent all binlog to slave; waiting for binlog to be udpated
sending binlog event to slave
waiting to finalize termination

## query cache thread
checking privileges on cached query
checking query cache for query
invalidating query cache entries
sending cached result to client
storing result in query cache
waiting for query cache lock

## replication slave connection thread
changing master: CHANGE MASTER TO
killing slave: STOP SLAVE
opening master dump table
reading master dump table
rebuilding index on master dump table

## replication slave IO thread
checking master version
connecting to master
queueing master event to relay log: event copied to relay log
reconnecting after failed binlog dump request
reconnecting after failed master event read
registering slave on master
requesting binlog dump
waiting for master to send event
waiting for slave mutex on exit
waiting for slave SQL thread free enough relay log space
waiting for master update
waiting to reconnect after failed binlog dump request
waiting to reconnect after failed master event read

## slave SQL thread
apply log event
making temp file
reading event from relay log
read all relay log; waiting slave IO to update
waiting for work from SQL thread: in parallel replication worker thread waiting more
waiting prior transaction to start commit before next tx: 
  - wait for conflicting things to end before start executing
waiting for worker thread to be idle
waiting due to global read lock: FLUSH TABLES WITH READ LOCK wait for worker finish
waiting while replication worker thread pool busy
wait other master connection to process GTID received on multiple master connections
  - another thread executing same GTID form another conn
wait slave mutex on exit
wait next event in relay log


# InnoDB buffer pool
keep frequently used blocks in buffer

new sublist: recently-used information
old sublist: older information

when server starts, buffer pool empty
when access data, buffer pool slowly populated
=> some time necessary before buffer pool useful (warmup)

to warm up without time, can dump buffer pool directly
`innodb_buffer_pool_dump_at_shutdown`, `innodb_buffer_pool_dump_at_startup`

when new info acessed not appear in list, oldest item in old list removed

## innodb_buffer_pool_size
total memmory allocated 10% more than specified size
extra space reserved for control structure and buffers
- space must be contiguous
- make sure size not too large, causing swapping

## innodb_buffer_pool_instances
if > 1GB, divide buffer pool into specific number of instances
many instances reduce contention concurrency

## innodb_old_blocks_pct
default 37% reserved for old list

innodb_old_blocks_time: delay before block move from old to new sublist
  - default no delay

reduce impact of full table scans

















