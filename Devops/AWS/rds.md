# relational database service (RDS)
basic building block: DB instance
default master username: `admin`

## VPC
EC@-VPC, EC2-Classic host RDS db instances

accounts that support only EC2-VPC has default VPC
some legacy DB instance EC2-Classic not in VPC, no default VPC

limitation:
1. CANNOT move multi-AZ db instance not in VPc into VPC
2. CANNOT moving db instance with read replicas not in VPC into VPC 

After a database is created, you can't change the VPC selection

# instance class type
## standard
m1: general
m3: general, more capable
m4: current general, more capable
m5: latest general, balanced compute,memory,network
  - Nitro System, dedicated hardware and lightweight hypervisor

## memory optimized
m2 < r3 : previous
r4: current, improved networking,EBS
r5: latest, memory-intensive, by Nitro

x1: current, memory-intensive, lowest price/GB RAM, up to 1952gb
x1e: latest, up to 3904 GB
z1d: latest, high compute capacity, high memory footprint, all core up to 4GHz

## burstable performance
t2: current, baseline performance, can burst to full CPU
t3: latest, more capable

# hardware
vCPU: virtual processing unit
ECU: relative measure of integer processing power of EC2 instance
  - easy compare CPU capacity between instance class
  - 1 ECU = 1.0-1.2 GHz 2007 Xeon processor
Memory: consistent ratio between memory and vCPU
VPC only: only support instance in VPC based on VPC service
EBS optimized: optimized config stack, give additional capacity for IO
  - minimize contention between IO and other traffic from your instance


# Region, Availability zones
region: separate geographic area
availability zones: multiple isolated locations in a region

# storage type
mysql, mariadb, postgreSQL, oracle: 64TB
SQL server: 16TB

## general purpose SSD
cost-effective for various workload
x ms latency, burst to 3000 IOPS 

IOPS proposional to storage size
burst duration = credit_balance / burst_IOPS - 3*storage_size

## provisioned IOPS SSD
IO extensive, low latency, consistent IO throughput

optimized for OLTP workloads require consistent performance requirements
typically 1000-80000 IOPS

## magnetic
backward compatibility
max amount of storage less than SSD

- no elastic volume
- limit to 3 TB
- limit to 1000 IOPS
- cannot scale storage 

## metric
IOPS: IO operations completed each second
latency: time between IO request submission and completion
throughput: bytes transferred to/from disk eachsecond
queue depth: IO requests in queue waiting to be serviced


# high availability
in multi-az, RDS maintain synchronous standby replica in different AZ
primary DB sync replicated across AZ
- data redundancy, minimize latency spike during system backups
- against instance failure, AZ disruption




# best practise
## storage
multi-AZ deployment


# Read replica
using built-in replication functionality
elastically scale out for read-heavy db workloads

1. specify existing DB instance as source
2. take snapshot of source, create readonly instance from snapshot
3. async replication to update read replica whenever change

read-only connections to read replica
some cases read replica resides in different AWS regions
- secure communication channel between source and read replica

not suport circular replication

## mariadb
logical replication
keep any binary logs that haven't been applied
can enable read replica to be writable
automatic backups on read replica
allow parallel replication threads

## creating read replica
take snapshot
- brief IO suspension (abount 1 min)
- avoid suspension if source DB multi-AZ
  - snapshot can take from secondary DB instance

enable auto backup, backup retention period not 0
within an region, all read replicas must be created in same VPC

### read replica as standalone instance
1. perform DDL (only mysql, maraidb2. )
  - time consuming create/rebuild index
  - perform these on read replica, sync with source DB

2. sharding
  - create read replica corresponding to each shard
  - carve out key space

3. failure recovery
  - complements sync replication, uto failure detectioin, failover
  when failure,
  1. promote read replica
  2. direct db traffic to promoted DB instance
  3. create replacement read replica with promoted DB instance as source

## cross region consideration
1. source DB can cross region read replicas in multiple AWS regions
2. 1 cross region read replica from source (that not read replica of another)
3. higher lag time
4. within region: read replicas either in/out VPC
  - cross region: subnet group must from same VPC
5. cannot guarantee > 5 cross-region read replica instances

## cross region replica implementation
process can take an hour to complete
1. source DB instnace `modifying`, new replica `creating`
2. create automated DB snapshot of source DB in source region
   - format: `rds:<instanceID>-<timestamp>`
3. cross-region snapshot copy for initial data transfer
4. when copy completes, snapshot copy `available`
5. use copied snapshot for init data load on replica, `creating`
6. after replica available, sync changes from source

# option group
## step
1. create new option group 
2. add options to option group
3. associate option group with DB instances

## overview
DB engine offer additional features, additional security
use option groups to enable and configure these features
  - specify features, called options

both DB instances and DB snapshots can associate with option group




# parameter groups
container for engine config values that apply to >=1 DB instances
if not specified, use default DB parameter group


# ARN (amazon resource names)
db instance `arn:aws:rds:<region>:<account>:db:<name>`
event subscription `arn:aws:rds:<region>:<account>:es:<name>`
option group `arn:aws:rds:<region>:<account>:og:<name>`
parameter group `arn:aws:rds:<region>:<account>:pg:<name>`
reserved db instance `arn:aws:rds:<region>:<account>:ri:<name>`


# backup
automated backup when available
no backup/snapshot while copy is executing in same region for same DB instance

first snapshot contains data for full DB instance
  - subsequent snapshots for same DB instance incremental

can copy automated and manual DB snapshots
up to 100 manual snapshots per region

automated backups occur daily during preferred backup window
when backup, storage IO suspennd briefly
default 30-min backup window, selected randomly from 8-hour clock

## backup retention period
default backup retention = 1 day
period = 0 disables automated backups

final snapshot doesn't expire

## restore from snapshot
restore DB instance from snapshot, default parameter and opption groups
  - can apply custom param and option group

cost = total storage of system snappshot
max backup = 40

can't restore from DB snapshot that both shared and encrypted
can restore using different storage type

option group associated with DB instance linked to that VPC
- if restore to different VPC, can't use option group
- must create new option group

## copy snapshot
can't copy snapshot to/from China
can't copy between AWS GovCloud

cross-region snapshot copy take an hour
can copy shared snapshot across regions if unencrypted, encrypted snapshot must same region

each account copy up to 5 snapshot at a time

## sharing snapshot
can share manual snapshot up to 20 other AWS accounts
cannot share snapshot that use option group with permanenet/persistent options

## restore db instance to specified time
restore DB instance to specific point creating new DB instance

RDS upload transaction logs for DB instances to S3 every 5 minutes


## encrypted snapshot
AWS KMS key



# monitoring
## automated monitoring tool
### event
subscribe to RDS events when change occur on instance, snapshot, parameter group, security group

### database log
can query some db log files loaded into db tables

### enhanced monitoring
real time mtric

### cloudWatch
metric: update every minute foreach active db
alarm: based on metric threshold
logs: monitor, store, access log


# CloudWatch
## collection
1. logging
- billing
- AWS service distribution
- custom log

2. internal metric
- EC2, DynamoDB, S3, ECS, Lambda, API Gateway

3. custom metric

## monitor
dashboard integration review
high resolution alarm
logs and metrics correlation

## Act
auto scaling
automate response to oprational changes

## Analyze
granular data and extended retention
custom operations opn metrics


# Components
## EC2 (Elastic Compute Cloud)
web service for cloud

## EBS (Elastic Block Store)
persistent block storage for amazon EC2
each EBS volume auto replicated within its availability zone 

## RDS (relational database service)
eg. postgreSQL, MySQL, MariaDB, Oracle Dataabase, SQL Server

## S3 (Storage for the Internet)
object storage, retrieve any amount of data



# warning
## RDS replica Lag
cause: 
- high write workload
- network issue acros regions / available zones

solutions:
- occasionally high => read never on read replica/tolerate steal read
- caused by write workload 
  => structuring app -> write scheduled and completed async
  => avoid large spikes in write activity
- cause by network
  => create another replica in another availability zone

### solution 1
// skip error
call mysql.rds_skip_repl_error();

show slave status \G
show procedure status where db='mysql';







