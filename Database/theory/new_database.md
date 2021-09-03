# history
IBM IMS -> IBM DB2
CODESYL
relational model
- separate physical model and query code
Informix, Sybase
Posgres
object-oriented database (json, xml)
- complex queries
- no standard API

1990
MySQL, SQL Server, Postgres
Data warehouse
- eg. fpga based , verticals
- distriuted / shared=nothing
- column system
- relationa; / SQL

2000s NoSQL
- focus on high-availability, high-scalability
- schemaless
- non-relational data models (document, key/value)
- no ACID, custom API

2010s NewSQL
- same performance for OLTP workload as NoSQL with ACID
- relational / SQL
- distributed
- usually closed source
eg. H-Store, SAP hana, ScaleArc, HyPer, VoltDB

2010s hybrid systems
- hybrid transactional analytical processing
- suppport fast OLTP like newSQL 
- distributed / shared-nothing
- relational / SQL
- directly analyse when data arrive
eg. memsql, HyPer, JustOne, SAP hana

relational model won for operational database

# OLAP
not NewSQL
focus on complex read-only query (composite query, multi-dimensional join)
- need complex calculation, long execution time, extra large dataset

# NewSQL
commone: relational, SQL
having large number of transactions
1. short-lived, no pause
2. work on small subset of data using index lookups
3. repetitive (execute same queries with different inputs)

some are HTAP
- support hybrid transactional analytical processing
- avoid heavyweight recovery, concurrency control algorithm
- nodes can directly communicate, not pass through central node
eg. H-Store parallel DB

## operate in distributed cluster of shared-nothing nodes
- include concurrency control, flow control, distributed query processing
eg. TiDB, Apache Ignite, VoltDB, Google Spanner
### 
all DBMS manage their main storage
- some in memory, some in disk
- DBMS customized developed engine distribute DB
- not rely on certain filesystem (eg. HDFS) OR storage strucutre (eg. Apache Ignite)
=> "send query to data", NOT "bring data to query"
=> less traffic
- can use more complex replicate mecchanism over HDFS
- eg. SQL on Hadoop -> not NewSQL
- some DBMS (Clustrix, MemSQL) compatible to MySQL network protocol to reuse existing tools
  
## SQL engines (not NewSQL)
highly optimized storage engine for SQL
eg. MySQL cluster, Infobright, Columnstore (instead of built in DB engine)

## Transparent sharding
sharding middleware layer to auto split db across multiple nodes
- eg. ScaleBase, Vitess, MariaDB MaxScale
- middleware allocate query, transaction; manage data location; replicate, data partition
- each DBMS instance run query, aggregate in middleware
=> no need to modify application, basis of existing DBMS
- need to install DBMS on nodes
- use disk storage, cannot become memory based

## Database-as-a-Service (not NewSQL)
no need to install and maintain DBMS in hardware / cloud VM
- cloud provider maintain all config
  + system optimization, replica, backup
  + only distribute URL connecting to DBMS
  + monitor page, API 
- calc cost by certain storage size, CPU num, memory size

## NewSQL characteristics
### memory based DB
can push some data from memory to disk when not in use
- internal tracking mechanism, find data not query
bigger than memory DB
- use OS virtual memory technology

### partition/sharding





























