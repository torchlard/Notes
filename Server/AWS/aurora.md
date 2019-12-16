# version
## regional
one writer multipe readers: 5.6.10a, 1.19.*, 2.0*.*
serverless: 5.6.10a

## global databases
global_10a


# high performance
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










