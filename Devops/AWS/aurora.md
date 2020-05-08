# introduction
mysql / postgreSQL-compatible editions

## initiative
bottleneck of data management from computation/storage -> network IO

principle: log is database
push log to large scale multi-user storage

## history
conventional (include distributed) use complicated dirty data refresh mechanism
- need many interaction
- 2PC optimized in cloud 


# version
## regional
one writer multipe readers: 5.6.10a, 1.19.*, 2.0*.*
serverless: 5.6.10a

## global databases
global_10a


# features
## high performance
5x throughput than mysql
easy scale compute and memory source up and down
storage auto-scaling: volume grow from 10GB - 64TB
low latency read replica: 
  - share same underlying storage as source instance, lowering cost, avoid write on replica
  - reader endpoint 
cross-region read replicas, faster local read to user
- each region can have +15 Aurora replicas

global database: best replication, traditional binlog-based replication
serverless: on-demand, auto-scaling

custom database endpoint: distribute and load balance workloads across instances

parallel query: faster analytical queries over current data
  - speed up queries up to 2 orders of magnitude
  - maintian high throughput

## serverless aurora


# architecture
data plane:
sql, transactions, caching -> logging+storage -> Amazon S3

control plane:
Amazon DynamoDB, Amazon SWF

move logging and storage 
(redo log, persistence, backup, recovery) to distributed storage

instance keep most conventional components

## optimization
1. cross data center independent failover, auto recovery
2. only write redo log, reduce magnitude of IOPS
3. async replica, replace backup and redo recovery, no checkpoint

Aurora ~ shared disk pparallel
limit update to 1 DB instance
open each layer in DB, each layer independently scale




























