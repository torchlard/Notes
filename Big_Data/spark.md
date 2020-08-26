# spark framework
API: Spark
cluster computing: Spark standalone, YARN, Mesos
storage: HDFS

## components
Spark Core
- IO, Spark cluster, task dispatching fault recovery, RDD

Spark SQL
- distributed framework for structured data processing
- cost based optimizer
- mid query fault-tolerance
- compatible with Hive data
- DataFrame, SQL to get data source: Hive, Avro, Parquet,ORC,JSON, JDBC

Spark Streaming
- add-on to core spark API: scalable, high-throughput
- data source: Kafka, Flume, Kinesis, TCP socket
- Micro-batching for real-time streaming
1. gathering
2. processing
3. data storage

MLlib
- machine learning library
- clustering, regression, classification, collaborative filtering
- switch to DataFrame based API, more user friendly
- use Breeze linear algebra package

GraphX
- API for graphs, graph parallel execution
- network graph analytics engine, data store
- clustering, classification, traversal, searching, pathfinding
- can use vertex, edge when primitive data type
- fumdamental operations on graph => Pregel API

SparkR (R on spark)
- exlore different technique to integrate usability of R with scalability of R
- data source API
- data frame optimization: code genration, memory management
- scalability to many core and machine

support lang: R,python,Scala,Java

## Dataset (Resilient distributed dataset)
resilient: if memory lost, can be recreated
distributed: across cluster
dataset: initial data come from file / created programmatically

fundamental unit of data in Spark

### operations
- return:
count
take(n)
- transform:
filter
map
reduce

### type
RDD can hold any element type
- primitive: int, char, bool
- sequence: list, array, typle, dict
- Scala/Java Object: if serializable
- mixed type

Double RDD: numeric data
Pair RDD: key-value pair
- use with Map-Reduce algorithm
- can use additional fn: sort, join, group, count

## MapReduce VS spark
map reduce:
each job has 1 map, 1 reduce phase -> limited

Spark:
map and reduce functions can be interspersed, result stored in memory
operations can be chained easily

### reduceByKey

# can replce
HSQL (Hive), MapReduce
Mahout (algorithm lib)

# limitation
Spark was not created as multi-user environment
1. no support for true real-time processing'
only has near real-time processing => micro-batch
2. problem with small files
3. no file management system
4. need a lot of memory
5. need manual optimization
6. higher latency compared to Flink

# sparkContext
Application -> Driver program (spark context) -> cluster manager
  |-> worker node (executor: cache, task, task)
  |-> worker node (executor: cache, task, task)

resource manager: spark standalone, YARN, Mesos

## SparkConf
configuration parameter passed to SparkContext
can invoke functions like textFile, sequenceFile, parallelize

## functionality
1. get current status of application
SpkEnv, SparkConf, deployment environment
2. set config
master URL, form logical group of jobs, logging level
3. cancel job
DAGScheduler
4. access services
TaskScheduler, LiveListenBus, BlockManager ...
5. closure cleaning in spark
6. dynamic allocation
requestExecutors, killExecutors
7. register spark listener
8. access persistent RDD
getPersistentRDDs
9. cancel stage
DAGScheduler

# Stage
RDD         Stage
--------------------
partition    task
partition    task
partition    task
 --action, submits job, Job->

Action -> Job -> JobListener
=> Stage -> stage
         -> stage
         -> stage

submitting a job triggers execution of stage and its parent stages

## ShuffleMapStage
intermediate Spark stage in DAG
produce data for another stage

## ResultStage
running function on spark RDD stage that executes Spark function 
final stage in spark
RDD --transform--> RDD --transform--> RDD --> action

DAGScheduler: 
Stage --> Stage --> ResultStage ---- action
Stage -->

## Executor
executing tasks
Executors = worker nodes
process in charge of running individual tasks in given Spark job
provide in-memory storage for Spark RDDs cached by user program through Block Manager

static/dynamic allocation

hearbeat sender thread: sends metrics and heartbeats
describe by id, hostname, environment, classpath

### condition to create executor
1. CoarseGainedExecutorBackend receives RegisteredExecutor msg
2. MesosExecutorBackend registered on Spark
3. LocalEndpoint created for local mode

### create executor instance
1. executor id
2. use SparkEnv access local MetricsSystem

```
ExecutorBackend --> Executor(id/hostname) 
      ^                    | (taskID,attemptNum, taskName)
      |(statusUpdate)      v 
      --------------- TaskRunner
```
executor task launch worker (thread pool)
we can have as many executor we want
- help enhance Spark performance

# RDD
cached, manually partitioned
ways to create RDD:
1. data in stable storage
2. other RDD
3. parallelizing already existing collection in driver program

operate RDDs in parallel with low level API
call persist method indicate which RDD want to reuse in future
keep persistent RDD in memory by default
RDD = restricted form of shared memory
use coarse-grained transformation update to shared state
- coarse: transform whole dataset, not an individual element
- fine: transform an individual element
evaluate RDD lazily, save lots of time

## motivation
1. iterative algorithm
2. interactive data mining tools
3. distributed shared memory
4. data stored in intermediate stable distributed storage (HDFS)

## RDD VS DSM (distributed shared memory)
1. read
RDD: coarse/fine grained
DSM: fine-grained
2. write
RDD: coarse grained
DSM: fine grained
3. consistency
RDD: immutable, trivially consistent; changes in RDD permanent
DSM: if programmer follow rules, memmory consistent, result predictable
4. fault-recovery
RDD: lost data recovered using lineage graph
DSM: checkpoint technique, allow applications to roll back
5. straggler mitigation
RDD: mitigate using backup task
DSM: difficult
6. not enough RAM
RDD: RDD shift to disk
DSM: performance decrease

## features
locaiton-stickiness
- defining placement perference to compute partitions
- DAGScheduler: task close to data as much as possible

## transformation
not change input RDD
### Narrow transformation
data is from single partition only
"pipelining" stage
### Wide Transformation
result of groupByKey() and rduceByKey() like funcitons
data may live in many partitions of parent RDD
"shuffle transformation"

## Action
trigger execution using lineage grpah, load data -> transformation 
  -> return final result of RDD computation
lineage graph = dependency graph of all parallel RDDs

eg. first(), take(), reduce(), collect()

## limitation
1. when working with structured data, cannot use optimizer
2. don't infer schema of ingested data
3. performance limitation by GC, Java Serialization
4. storage limitation

## persistent
optimizatio ntechnique save RDD evaluatio nresult
cahce(): save in memory
persist(): can use various storage level

### storage levels
1. memory_only
deserialized Java object in JVM
if > memory, not cache some partition, recompute next time
2. memory_and_disk
deserialized Java object in JVM
if > memory, save on disk
3. memory_only_ser
serialized Java object in memory
not use disk
4. memory_and_disk_ser
~ memory_only_ser, drop partition not fit into memory to disk
5. disk_only
only stored on disk

## unpersist RDD
least recently used algorithm 

# Cluster Managers
## standalone
masters and number of workers
allocate resources based on core

Zookeeper quorum recovers master using standbymaster
authenticatio nwith hsared scret with entirre cluster manager
user configure each node with shared secret

## Mesos
dynamic resource sharing and isolation
node abstraction, club all existing resource into cluster
many physical resource => single virtual resource

1. Mesos master
a cluster has many Mesos master provide fault tolerance
2. Mesos slave
Mesos instance offer resource to cluster
3. Mesos framework
allow application to request resource from cluster

## YARN
global resource amanger, per-applicaiton Application Master
Resource manager + node manager
### resource manager
- scheduler
allocate resource to various running application
monitor / track status for application

- application manager
manager application across Node

### Node manager
- container 
place where unit of work happen, each task run in 1 container
- application master
framework specific library, negotiate resource from resource manager

# SparkSQL
dataframe API, dataset API ways to intersect
run on top of Spark Core
use Catalyst optimizer

## DataFrame
Untyped API
richer optimization compared to relational table
data abstraction, DSL on structured/semi-structured data

SQL Context: entry point work with structured data
Hive Context: hive table, richer functionality

## Dataset
Typed API
has benefit of RDD
map to relational schema
strongly typed, compile-time type safety
encoder: primary concept in serialization and deserializatioin framework
JVM <--> Spark's internal binary format
generate bytecode interact with off-heap data

faster computation than RDD
less memory comsumption

## Catalyst optimizer
fp construct
query plan optimizer, general framework transform tree
cost-based, rule-based optimization

## RDD VS DataFrame VS DataSet
RDD: fundamental data structure
DataFrame: named columns; impose structure onto distributed collection of data
Dataset: extension of DataFrame API, OO interface, optimizer

### GC
RDD: overhead
DataFrame: avoid GC
DataSet: no need GC, use of heap data serialization

### serialization
RDD: write to disk, use Java serialization
DataFrame: 
serialize data into off-heap storage in binary format
transformation directly off heap, no need serialize
DataSet: encoder, use Tungsten binary format

### usage
RDD
- low-level transformation and action
- for unstructred data (eg. stream)
- want to use fp instead of expression in domain to process data
- not care aboud optimization by structured
DataFrame, DataSet:
- use both DataFrame and dataset API for high level abstraction
- high level expression

### error analysis
|                | SQL     | DataFrame | Dataset |
|----------------|---------|-----------|---------|
| Syntax Error   | Runtime | compile   | compile |
| Analysis Error | runtime | runtime   | compile |


























