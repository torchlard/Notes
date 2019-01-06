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

## RDD (Resilient distributed dataset)
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


























