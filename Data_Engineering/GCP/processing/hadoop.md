# architecture
## MapReduce
- perform distributed processing in parallel in hadoop cluster 
input(key,value) -> Map -> Shuffle and sort: agg value by key -> reduce (final key, final value)

## HDFS (hadoop distributed file system)
believe more in storing data in large chunk of blocks
fault-tolerance, high availability

NameNode (Master): metadata
DataNode (slave): store data 

by default replication factor = 3
because storage using commodity hardware which can crash any time

## YARN
framework on which mapreduce works
job scheduling, resource management
- divide big task into small jobs
- maximize processing
- keep track which job important, priority of jobs, dependencies

## Hadoop common
java library needed for hadoop cluster

# migrate HDFS to GCP
use Hadoop DistCp: for large inter/intra-cluster copying to cloud storage
push: source cluster run distcp jobs on data nodes
- don't need to create extra compute resource to copy

pull: Dataproc cluster run distcp on its data node
- impact and traffic on source cluster minimized
- allow faster transfer, higher outbound bandwidth

source hadoop cluster -> gateway
-> cloud interconnect
-> gateway -> pull cluster 
-> cloud storage

## other options
Apache HBase -> Cloud Bigtable
Apache Impala -> BigQuery

GCP not same fine-grained permission for files
- easiest way set at bucket level 

## incremental move
split data into multiple parts
for hybrid solution make synchronized data read oinly

## copy data to cloud storage
1. establish private link between on-premise network with Google's network using Cloud Interconnect / Cloud VPN
2. create dataproc cluster to use for data transfer
3. google cloud CLI to connect cluster's master instance
4. run distcp command to move data in master instance

# migrate hadoop to GCP
## benefit
- run most jobs with minimal alternation
- scale cluster any time
- simplify tool version update

typical on-premise hadoop system has monolithic cluster that support many workloads 
large, multi-purpose, persistent cluster
=> small,short-lived, specific purpose cluster
ephemeral model

## sequence
1. move data into cloud storage buckets, start small (use backup / archived data to minimize impact)
2. experiment
  - use subset dat to test, make small scale proff of concept
  - try new approaches work with data, adjust to GCP and cloud-computing paradigm
3. think specialized, ephemeral clusters
  - use smallest cluster you can, scope to single/closely related jobs
4. use google cloud tools wherever appropriate

## run jobs on ephemeral cluster
- avoid single point of failure
- repair stateful long running cluster take long time
- problematic stateless ephemeral cluster can easily be deleted, then recreated with job retries
- don't need to maintain clusters over time

## monitoring jobs with cloud logging
- Logs Explorer to use browser GUI
- google cloud CLI from local terminal
- Gcloud Logging API by scripts or applications
- Cloud Logging REST api












