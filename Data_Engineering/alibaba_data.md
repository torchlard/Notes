# data repo
offline: traditional one, calculation per day/hour/week/month as unit
online: real time processing

migrate from MySQL, HBase to ApsaraDB for RDS, table store

# journal data extration
browser: Aplus.JS
app: UserTrack

get page view (PV), unique visitor (UV)

## generate data 
### page event
develop SDK for logging
record
1. device and user info
2. visited page info (eg. product id, shop)
3. visit path (origin)

2 interfaces: call when page displayed / exit

### click and other event
collect same dataset
1. event name
2. duration
3. evernt attribute
4. associated page

## pre-processing
1. identify spam, web crawl, fake visitor
correct by algorithm, set filtering rule

2. fill gap
normalization, standardization
fill in certain field 

3. remove invalid data
in some cases wrong config would case invalid / duplicated data

4. journal isolation

## combine extraction and integration
SPM (super position model)
- trace origin

early days use URL regex, but fails when URL rule set grows enormously

declare >= 1 tag in page
- aggregate data in page 
- eg. traffic flow, convertion funnel, tx, visualized elements click


# Data Synchronization
## Direct sync
use standard API (eg. JDBC) sync

## Data file sync
using predefined file format, size, encoding generate data file

send target system by FTP server
with validation file check missing

## journalism sync
understand data change via log, find out target needed to collect
read operation done in OS, don't need DB connection

## database 
each day 2PB data sync

DataX: framework+plugin
allow data read and convert to intermediate state

Job: data sync job
splitter: divide big task into parallelised small tasks
reader: data reading module
Channel: reader and writer exchange data via Channel

```
Job -> sub-job -> ThreadPool -> Channel -> ThreadPool
    -> sub-job
```

## incremental update
full outer join + insert overwrite
must faster than update

## sync performance
job targeting sync among different db 
difficult to set parallel thread number

1. submit sync job
2. system estimate sync data size, sync speed, expected thread count
3. break down into data blocks
4. multi machine multithread, priority on long waiting time, high ranking
5. prepare for single machine CPU with sufficient remaining resource


## data drift management
first layer from data sync to data repo called ODS / staging

modified_time: data updated time
log_time
proc_time: time actual business happened
extract_time

theoretically these 4 timestamp should be consistent, but in production not
if we partition data by any one ts, will cause issue

### solution
1. get 1 more day's data
2. use multiple ts to get more accurate data


# offline data calculation
MaxCompute: offline
StreamCompute: real time
OneData: data integration and management system

## data flow
1. understand requirement
2. model design
3. ETL development
4. testing
5. deploy
6. devops

## MaxCompute
Client
Interface
Logical 
Storage / Computation

### client
- Web: restful API
- SDK: package on API, Java implementation
- CLT: command line for Windows/Linux
- IDE: high level visualized ETL/BI tool
  - task allocation, auto report generation

### Logical
manage userspace, parse command, data object authentication

Worker: manage all restful request
Scheduler: instance running allocation, monitor resource usage
Executor: instance execution

### features
SQL syntax
MapReduce
Graph: pageRank, shortest distance, K-clustering
Spark
Volume: non 2D table data

## validation
1. sqlscan
check SQL quality, avoid low performance, not following standard

2. Data Quality Center
use certain rules alert dirty data
eg. primary key, table data size, fluctuation, 
  important field non null, enum field discrete value

3. data comparison
data size, sum, avg, max, min

4. data distribution
extract some principal value of fields, and compare to expected value

5. data desensitization
blur sensitive data

## dispatcher engine
async dispatcher
sync dispatcher
task event management
DAG event management


# real time processing
data delay
1. offline: process N days before
2. pre-realtime: process N hours before
3. realtime: process N seconds before

## architecture
1. data extraction
into middleware for subscription

2. data processing
need subscription and pull to computation system

3. data storage
after aggregation, cleansing
write to storage system, continuous incremental insert only

4. data service
HSF, HTTP service to get actual computation result

## data extraction
1. db log
2. engine access log

messaging system
- delay in ms, low throughput
- msg interchange for transactional data, eg. order,pay

data intermediate
- for huge business data (TB/day)
- delay in sec

extraction interval
- data size limit, eg. 512 KB
- time threshold, eg. 30s must collect

## deduplication
normally logic calculated in memory
if too much data, cannot fit into memory

1. accurate dedup
2. fuzzy dedup: can lower usage to 1/1000

boolean filtering
base estimation

## data bias
if data size too large => bottleneck
hash

## data storage
data types

1. intermediate calculation
2. final result data
3. dimension data

## streaming data model
offline and online data model very similar
same divide into 5 level (ODS, DWD, DWS, ADS, DIM)

overall realtime model is subset of offline data model

## dimension table loading
1. full load
if data is less, load to memory all the time

2. incremental load
can use incremental search and LRU invalid method
let most popular data stay in memory

cons: lower efficiency when searching for external storage

## handle sudden huge workload
1. resource sharing
resource pool can be competed by multiple realtime job
increase resource

2. choose suitable caching mechanism
reduce db read write 

3. computation unit combination, reduce topology
deeper topology layers, worse performance
deserialize and serialization time consuming

4. internal object sharing
reduce string copy

5. balance high throughput and low latency

# data service
DWSOA -> OpenAPI -> SmartDQ -> OneService

## DWSOA
SOA method expose data for request

demand driven, develop one or more interace
cons: low extensibility, not flexible

## OpenAPI
group by dimension, data from same dimension form a logic table
minimize interface count

## SmartDQ
DSL in SQL syntax, can use ORM framework
all query redirect to 1 interface

milestone to DevOps
SmartDQ packs heterogeneous data source and distributed query

SmartDQ provides 300 SQL template, 
each template responsible multiple interface request

### layers
1. data source
2. physical table 
3. logical table
like view in db
4. topic
logical table normally under certain topic


## OneService
1 plugin for 1 demand 
plugin in form of microservice, deploy as docker










