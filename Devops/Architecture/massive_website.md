# High Performance
## thead number
computational intensive task: #thread <= CPU number
IO intensive: more thread is better

## thread safe
no conflict with shared resource
1. stateless object
2. local object (create object inside method)
3. use lock when access shared resource

## resource reuse
- singleton: since objects are stateless, normal to use singleton
- object pool: reduce resource used to new object by replication
- connection pool: after build connection object, put object in connection pool

## data structure
Hash's good algorithm Time33
`hash(i) = hash(i-1) *33 + str[i]`

## garbage collection
GC has great impact to performance
eg. JVM has heap (object memory space, GC, obj new/del) and stack(para, variable)
new object always created in Eden, when Eden is full, Young GC ...

## storage
B+ tree by RDBMS , LSM used by NoSQL
LSM: n level combined tree

RAID, HDFS


# High Availability
typical architecture

[application layer] all kinds of products
[service layer    ] session, account, login
[data layer       ] file system, cache, search, DB

## Application
stateless transfer by load balance

### session
1. session duplication: not practical for massive cluster
2. session binding: use Hash to redirect same IP to same server (sticky session)
3. cookie to record session: restrict by cookie size, highly adopted
4. session server: each time application server access session server for session
  - stateless application server & stateful session server

## Service
1. prioritised management
2. timeout setting: restart/redirect request
3. async call: publish-consumer pattern
4. service planned degradation: random denial of service, close unimportant function
5. idempotence: serveice called multiple times == called once
  - eg. set validation check for money transaction

## Data layer
backup DB

## CAP
data consistency
1. strong consistency: always consistent in all replications, data update sync with operation response
2. data user consistency: inconsistency among replications, but using validation response with consistent result
3. final consisteny: inconsistency in phy storage, user may get different result, but system with fix

# High Elasticity
## physical separation by function
single service handle all -> DB separated -> cache separated -> static resource separated
1. vertical separation
[website concerte product ]
[reusable business service]
[core service             ]
[database                 ]

2. horizontal separation
website frontend | seller backend | buyer backed | transaction forum

## cluster serve single function
### application server cluser
load balance: discover new server / notice server is off

1. HTTP redirect: can be bottleneck, SEO cheating
2. DNS load balance: multiple IP for same website, calc which IP to redirect
  - use DNS as first level load balance -> get internal load balance server -> redirect to real server
3. reverse proxy: can be bottleneck, run in application layer
4. IP load balance: run in kernel layer, restrict by network card bandwidth
5. Data link load balance: in protocol modify mac address (eg. LVS), massive adoption

#### load balance algorithm
1. Round robin: allocate by order
2. Weighted round robin
3. Random
4. Least connection
5. source hashing: to implement sticky session

## Cache Cluster
must minimise effect on newly added cache server, that is new server has cache frequently accessed
Memcached: calculate write, read to which server by data's KEY

consistent hash algorithm: find cloest node clockwise in ring
  - use virtual node to evenly map cache
  - each physical cache server construct virtual cache server

## DB cluster
### relational DB
master, slave separation
Data shreding (horizontal, vertical partition)

# High Extensibility
extensible: under minimal effect system upgrade and extend its function, least coupling among applications 
open-close principle: open to extension, close to modificatoin

scalable: system can enhance/reduce its ability by increade/reduce its resource
main principle is modularity

## message queue
event driven architecture: send msg between low coupling modules
use publisher-subscriber pattern

consumer can filter, process, package message to construct new message type, send msg out, wait for other consumer

### distributed message queue
FIFO
scalable: ~stateless server, add new server to notify producer server refresh list
available: if memory for queue is full, write msg to disk

can support ESB, SOA
MySQL can be distributed msg queue by writting msg to DB

## distributed service
monolithic application =>
vertical partition: break down large app into smaller apps
horizontal partition: extract reusable service as independent service

eg. WSDL, Dubbo

`service consumer`
[process -> interface -> interface proxy
-> client -> service provider list -----------> `Service registration`  
          -> load balance
          -> Remote communication ]
                            |---------------|
`service provider`                          v
[container -> process <- thread <- remote communication ]

## open platform to build ecosystem
API interface: RESTful, WebService, RPC
protocol transformation: transform API into inernal service format, package data return from internal service













