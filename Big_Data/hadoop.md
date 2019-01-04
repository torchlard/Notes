# history
2010 HBase, Hive, Pig
2011 ZooKeeper
2013 Hadoop 1.1.2

# framework
```
Enterprise Data Warehouse (EDW) | BI application
EDW connector | Orchestration framework (HBase, Zookeeper, Flume)
Data Access framework (pig, hive, sqoop, avro)
              Network
Data storage framework (HDS) | Data processing framework (MapReduce)
                JVM
Operating System (Linux)
Server Hardware                
```
[Extra: Backup recovery, deployment, security, management]

# architecutre
distributed, with some centralization
main node do most computation, storage
- TaskTracker: reply to MapReduce tasks
- NameNode: track HDFS directories & files
- JobTracker: dispatch compute tasks to TaskTracker

world -> switch -> rack1
                   rack2
      -> switch -> rack3
                   rack4

Aggregation switch -(8GB)-> rack switch -(1GB)-> node[normal PC]
30-40 nodes/rack

## NameNode
only one NameNode
like directory structure, store metadata for files
transaction log for file deletes/adds
handle creation of replica block when DataNode fails
- manage file system namespace
- map file name to set of blocks
- map block to DataNodes
cluster configuration management

### NameNode Metadata
entire metadata in main memory
- list of files
- blocks for each file
- dataNodes for each block
- file attributes
- transaction log

### NameNode failure
single point of failure
transaction log stored in multiple directories
need high availability solution

### Secondary NameNode
FSImage: HDFS metadata checkpoint, get all directory and file serialization
copy and merge FSImage and Transaction Log to temporary directory

## DataNode
store actual data in HDFS
run on any fs, notify NameNode what block it has
replicate block 2x in local rack, 1x elsewhere
- Block server -> store data in local fs, metadata of block
- periodically report all existing blocks to NameNode
- pipeline of data
client read from nearest replicas

### data pipeline
client get list of DataNode to place blocks
-> write block to first DataNode
-> first DataNode forward data to next node in pipeline
-> after all replicas written, move on to write next block

### rebalancer
goal: %disk full on DataNodes should be similar

### hearbeat
dataNode send heartbeat to NameNode every 3 seconds
NameNode use heartbeats to detect DataNode failure

## MapReduce
JobTracker: split up data into smaller tasks (map), send to TaskTracker process 
TaskTracker: report to JobTracker, report job progress
programming model for efficient distributed computing
- stream through data, reduce seeks, pipelining

### Dataflow
preloaded local input data -> intermediate data from mapper
-> values exchanged by shuffle process
-> reducing process generated outputs -> output stored locally

### operation
fine grained Map,Reduce -> improve load balancing, faster recovery
automatic re-execution on failure
locality optimization

### Input, Output format
may specify InputFormat, OutputFormat, default to be test
SequenceFileInputformat for binary data
file-based

### numbers
Maps
- default: as many as number of HDFS blocks being processed
- controlled by min-split-size
Reducers
- 0.95 * num_nodes * mapred.tasktracker.tasks.maximum

## requirement
high write throughput
cheap, elastic storage
low latency
high consistency
high sequential and random read performance

# HDFS
google's GFS close source
very large distributed file system
optimized for batch processing

single namespace for entire cluster
files broken up into blocks, eg. 64MB blcok size, each replicated in multiple DataNodes
write-once-read-many access model
client can only append to existing files, not overwrite
client find location of blocks and access data

# Other projects
## Pig
express sequences of MapReduce jobs
nested bags of items
provide SQL operators

## HBase
row/column store
billion rows / million columns
modeled on Google's Bigtable

## Hive
by Facebook
relational database built on Hadoop
- maintain list of table schemas
- call Hadoop Streaming scripts from HiveQL 
- table partitioning, clustering, complex data types

=========================
# MapReduce
partition --> combine

## before mapreduce
- manage thousands of processor
- manage parallelization and distribution
- IO scheduling
- status and monitoring
- fault/crash tolerance
=> very troublesome ...

## parallelization problem
node died? how to know all nodes finished?
how to aggregate partial result?
how to assign work units?
=> communication between workers
=> access to shared data
==> synchronization mechanism

## manage multiple worker
we need: semaphore, conditional variables, barriers
problem: deadlock, livelock, race conditions...

## scale issue
need distributed file system to store PB scale data
disk failure is norm when > 1000 disks
cirtical issue: fault tolerance + replication + load balancing (+ monitoring)

## divide and conquer
take word count as example
1. schedule parallel parse task
2. schedule parallel ocunt task
parse = mapping operation
count = reduce operation

### Map
goal: extract something you care about for each record
method: shuffle and sort

key: reference to input value
value: data set to operate

input data -> <key,value> pair
split data to supply multiple processors

### Reduce
goal: write result
method: aggregate, summarize, filter, transform

<key,value> pair -> <result>
split1 -> map -> reduce
split2 -> map -> reduce
split3 -> map -> reduce

## characteristics
very large scale data
write once read many: allow parallelism without mutexes
Map, Reduce are main operations
all map completed before reduce starts
map and reduce performed by same processor

configurable #map, #reduce tasks
operation provisioned near data
runtime take care of splitting and moving data for operation
special distributed file system

## big ideas
assume processors and storage are co-located
process data sequentially, avoid random access
hide system-level details from application developer
seamless scalability

## problems addressing
wordcount, adwords, pagerank, indexing data
simple algorithm: grep, text-indexing
Bayesian classification

## scope
single-core [pipelined instruction]
  {single core, single/multi processor}
multi-core [concurrent thread]
  {multicore, single/multi processor}
cluster [service object]
  {cluster of processors with shared/distributed memory}
grid of clusters [indexed file level]
perfectly parallel processing [Mega block level] 
  {no effort to separate tasks}
MapReduce, distributed file system
Cloud computing [Virtual system level]









