# feature
can be batch, stream processing (with Apache Storm / S4)
can be interactive processing (Apache Impala)
graph processing (Neo4j)
can be real-time and batch mode

# architecture
SparkContext as main program

## cluster manager
- own standalone manager (for easy set up)
- Mesos (deprecated)
- YARN (manager in hadoop 3)
- Kubernetes

1. once connected, acquire executors on nodes in cluster
2. send application code (jar/python files) to executor
3. SparkContext sends tasks to executors to run 

each application get its own executor processes, stay up during whole application, run tasks in multiple threads
- data cannot be shared across instances of SparkContext (different spark application)

spark agnostic to underlying cluster manager
driver program must listen for and accept incoming connections
- driver should run close to worker nodes, preferably same local area network

# glossary
driver program: process running main() and creating SparkContext
Deploy mode
- cluster mode: framework launch driver inside cluster
- client mode: submitter launch driver outside cluster

Executor: in worker node, runs task and keep data in memory or disk storage across
Task: unit of work will be sent to 1 executor
Job: parallel computation consist of multiple tasks spawned respond to Spark action

Stage: job divided into smaller set of tasks called stages (similar to mapReduce)

# Migration to Dataproc

## Spark workloads
### regularly scheduled batch job
eg. hourly, daily ETL, training ML models with Spark ML
create cluster for each batch workload, delete cluste cluster when job finished

1. cluster cluster until finished
2. submit job to cluster
3. delete cluster after job executed

### streaming job
create long running dataproc cluster, run in high-availability mode
don't use preemptible VM

### Ad hoc / interactive workloads submitted by user
eg. user write queries or execute analytical jobs 
choose whether high-availability OR preemptible VMs, and how manage access to cluster

## migration process
1. step by step migrate of all data source to GCP, mirror data source
2. job yb job migration, might have 2 workloads running in parallel
3. Migrate workloads depend on output of spark workload
4. shudown spark jobs in old environment

## storage options
connector implements haddop filesystem interface, compatible with HDFS
can access data using gs:// instead of hdfs://

Cloud storage if
- data in ORC, Parquet, Avro, need data persistence if cluster terminates
- high throughput, files > 128MB
- cross zone durability, high available

Local HDFS storage if
- lot of metadata operation, eg. thousands partitions and directories, fiel size small
- modify data frequently (cloud storage object immutable)
- heavily use append operation on HDFS
- workload with heavy I/O
- IO workload sensitive to latency eg. ms per operation

recommand cloud storage as initial and final source of data in pipeline

### adjust storage size
use persistent-disk SSD for mster or workers as primary disk
attach up to 8 SSD to each worker, 3 disks for HDFS


# Apache Spark -> Dataproc
running Spark on Google Kubernetes Engine (GKE)
identiy job type and plan clusters
1. daily/hourly ETL

recommend cloud storage initial and final source
Sparkk job shuffle data, intermediate to HDFS

Dataproc serverless to run spark workloads
`gcloud dataproc jobs submit [COMMAND]`

## optimal
storage file size 128MB - 1GB
switch to SSD
same regional location for storage bucket
preemptible VM as worker (less than half)


