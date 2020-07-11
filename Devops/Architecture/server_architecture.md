# process models
## blocking single process
very poor performance
simple

## blocking multi-process
context-switch cost

## blocking multi-threading multi-process
not much difference compared to multi-process
introduce dead-lock, race condition

## non-blocking event driven
single loop checking
ignore context-switch, process copy
no dead lock
- complicated program

## non-blocking coroutine
simplest coroutine = generator
process that can halt, and resume later

all happening in same thread
coroutine ~ micro-thread

coroutine switching controlled by programmer



# IO models comparison
|                  | BIO  | pseudo async IO | NIO             | AIO   |
|------------------|------|-----------------|-----------------|-------|
| client:IO thread | 1:1  | M:N             | M:1             | M:0   |
| IO(Blocking/N)   | B    | B               | N               | N     |
| IO(sync/async)   | sync | sync            | sync(multiplex) | async |

sync = server response after process
async = server response immediately first, then process, return result to client later
blocking = client wait until response come
non-blocking = client do other things, check if response come regularly

## service type
1. only request from client, no need response (eg. notification)
easily designed as async
2. one request, one response
can use `Future-Listener` in Java to do async, same effect as sync


# (OSI network level) Load balance
## L2 (mac)
virtual MAC address, external request to virtual MAC, redirect to actual MAC
## L3 (IP)
external request to virtual IP
## L4 (TCP)
ip+port get request, redirect to machine
software: F5, lvs, nginx, haproxy
- when SYN request from client, modify target IP
L4 switch, ~ router
## L7 (http)
according to url/IP, host get request, redirect to handler server
if no L4, then no L7
consider features of application, eg. language to different server
~ proxy server
server: haproxy, nginx, apache

most popular: L4, L7


# history
## 1st generation
MVC: all the things compiled in giant WAR package
vertical framework
problem:
- manny duplication
- difficult to debug
- difficult to learn: long chain of method calls
- no unified framework, manually wrap upper level

### MVC architecture
```
browser
---------
JS/JSP/HTML/Servlet (View)
Action (Controller)
Business (Model)
---------
Database access [ORM]
---------
DB connection pool [Tomcat]
DB DB | File,logging
```
small scale: dual machine
- Watch Dog monitor server
- dynamic IP
- if one died switch to backup server, and wakeup original one

Large scale: L7 load balance
many nodes, DBs, file operations

### partition
vertical: split by business types
horizontal: separate core, public business; provider independent package, decoupling

## 2nd generation
new demand
- dependency management: want universal service registration
- transparent routing: timeout, flow control 
- => independent service management, monitor all nodes

solution [custom RPC framework]
1. subscribe/publish mechanism -> auto service discovry
2. dependency decoupling -> configuration based development
3. clustering

RPC framework based on Java NIO (Netty), serialization
### RPC framework
RPC hide TCP/UDP, serialize method(XML/JSON/binary), communication details
1. provider give interface definition, data structure, service definition file (IDL, WSDL)
2. remote proxy object
client actually called local proxy of remtoe service (JDK dynamic proxy)
3. communication: HTTP Invoke, RMI invoke
4. Serialization

Apache Thrift
- from facebook
- IDL, binary msg
- blocking/non-blocking, single/multiple thread
  
Avro
- under Hadoop
- support dynamic mechanism, use namespace

gRPC
- high efficiency, based on HTTP/2
- ProtoBuf (smaller)

### common framework
1. RPC layer
remote abstraction, restful, NIO framework, HTTP base protocol, transport
2. Filter Chain
load balance, timeout, finish inform
3. Service
dynamic proxy(Java/cglib, javassit), custom service interface (Java bean)

#### problems
complex URL configuration, high pressure to load balancer
dependency: which service start first?
how many nodes needed for particular service?


## 3rd generation
SOA middleware: ESB, RPC, BPM
### SOA
principle
- service reusable
- service share common contract: IDL/Java interface /WSDL/manual
- decoupling, independent service
- hide underlying logic within service
- composable service
- domain specific
- stateless service
- service auto discovery

#### challenges
- efficiency of service calling
- linear scaling
- efficient, real-time service multi-dimensional monitoring
- massive scale nodes debugging
- fuzzy search in massive size logging
- service flow control, timeout, service upgrade/degrade
- partition of service, largest reuse

#### issues
1. service definition
2. service management lifecycle: plan, design, implement, deploy, maintain, deprecated
3. service version
4. service registration: how to publish,subscribe?
5. service monitoring
6. QoS
7. Debug
8. Security

#### Dubbo
SOA framework
1. init Spring context, by XML file publish service by protocol
2. provider register in registry and publish provider info
3. consumer subscribe according to XML config, get routing info
4. register give service address to consumer
5. consumer call remote service, choose a provider by local cache
  
connectivity
- registry only provide directory service, no message relay
- long connection among registry, provider, consumer
  - if provider is down, inform consumer immediately
- registry and monitor are optional, consumer can direct link to provider

robustness
- if one stateless provider down, no effect
- if one registry down, switch
- if database down, registry still access by cache, but no new service

scalability
- can dynamically scale provider and registry

extensibility
- micro kernel + plugin
- pipeline design: ~ AOP

#### HSF
features
- configurable development
- extension system: classLoader separate platform and application, internal use OSGi
- NIO
- multi protocol: WebService, ProtoBuf, Hession


## 4th generation
Micro-service
Docker
### Micro service
- atomic service: single resposibility
- high density deployment
  - can deploy multiple service instance / single docker
- agile developemnt
- self-management, not depenend on other service
  - independent package, deploy, upgrade, rollback

### Microservice VS SOA
SOA: heterogeneous application -> service 
MS: service as small as possible

SOA: reuse existing asset
MS: decoupling

SOA: coarse-grained
MS: fine-grained

SOA: ESB --> MS: P2P
SOA: static management --> MS: realtime 


# Communication framework
NIO better than BIO in larger scale
problem of NIO
- complex API, need handle many ssituation
- epoll bug

Netty framework
## server side design
- upper level API: server instance, param, TCP param, addr, buffer...
- coder (custom)
- AOP

decouple from any protocol
no need to implement all functions, focus on extensibility

## clietn side design
1. create Netty client side, helper BootStrap
2. init client connection
3. async request connection to server
4. set connnection listener
5. return TCP result from server
6. async inform client connection result

## reliability
### heartbeat testing
1. TCP level: Keep-Alive
2. protocol level: in persistent connection protocol, eg. SMPP
3. application level: periodically send heartbeat msg

type: 
1. ping-pong: sender send Ping, receiver send Pong after receive
2. ping-ping: 2 sides send Ping to each other in predefined time

detect lost:
1. N consecutive times not receiving ping / pong
2. IO exception

Netty use 
- read idle: time t not receive
- write idle: time t not send
- read-write idle: time t not send/receive
default read-write idle = exception => close connection

### message queue
sometimes need to resent msg inside queue after resume connection

### graceful resource release
implement by JDK ShutdownHook
system get close command -> mark close status, stop receive new msg -> process all msg elft -> delete resource by GC -> end thread
- usually time limit eg. 30s

## performance
### historic problem
1. BIO, non-linear scaling => handler overflow, thread heap overflow
2. serialization: not cross language, resource hungry
3. take up lot of threads

### Netty solution
1. NIO
2. high performance serialization: Protobuf default
3. IO: reactor single/multiple thread, master/slave model


# Serialization
Serialization = Encode
- object -> byte array
Deserialization = decode
- byte array -> object

## function design
1. how well ser support data structure/type?
2. cross language support
java.io.Serializable not used in framework: not cross language
3. forward compatibility
service version upgrade, how well new interface support old service?
- interface compatibility
- business logic compatibility
- data compatibility
4. performance
- byte stream size
- ser, deser speed
- resource usage
5. extensibility
- explicitly use certain format
- ser library as plugin in communication call chain 

### ser as plugin
get byte array from data frame
first need to certain that the frame has complete data
- may not complete for NIO / persistent connection

way to determine completeness
1. fixed length
2. carriage return eg. HTTP
3. specific separator
4. set length field in header

## best practice
construct interface compatibility standard
- specify what compatibility supported in framework eg. add/delete/modify field

# protocol
public: public protocol, private: private protocol for high performance
goal of SOA: reuse existing asset, allow heterogeneity
SOAP not appropriate

## function description
1. define communication model, message definition
2. provider and consumer persistent connect
3. Netty based
4. extensible ser/deser
5. handshaking, authentication
6. reliability

## process
1. handshake with ID,.. for autheitication
2. server check validity, if ok, return success
3. coonnect success, client send business msg
4. mutual send heartbeat
5. server send business msg
6. close connection

## model
header, body
### header
crcCode(checking), length(header+body), type, priority
interfaceName, methodName, attachment(Map<String,String>, for extension)

### body type
request, response, heartbeat, handshake response

## security
1. for internal use, no need security checking and SSL/TLS transfer
2. external module access internal
use IP black/white list, handshake login
3. 3rd party access
listen to public IP, 3rd party not trusted
use SSL/TLS transfer


# transparent routing
if it require consumer to produce address of service -> violate transparent routing
consumer don't need to request registry each time, can directly get address from cache
- then choose service by routing strategy

## load balance
1. random
disadv 
- high collision rate
- if heterogeneous config, inbalance load
2. polling
sequentially iterate all provider by weighting, 

## service delay
consumer cache delays from all provider, periodically update average delay
-> adjust weighting -> ensure more capable provider larger load
-> whole system approad average dealy

## consistent hashing
request of same parameter always send to same provider

based on hash algorithm, satisfy 4 conditions under dynamic cache
- balance: spread load to all space
- monotonicity: ensure allocated content map to new cache
- spread: same content map to different cache
- load: same cache can be mapped by different content

put cache config into equation
1. cache server hash to a point in ring
2. object hash to a point in ring
3. object point to first cache it found clockwise

when add new server5, some object point to 4 -> 5, others unchange
when remove server2, all object point to 2 -> 3, others unchange
- both unblanced load

solution:
[object -> cache server] -> [object -> virtual node -> cache server]

## sticky connection
stateful service

## innative mode
1. check if local JVM has service provider, if yes => local API call
2. if not, choose provider with same IP as localhost (VM)
3. if not, remote service call

## conditional routing
1. IP black/white list
2. flow control, avoid whole cluster flooeded
3. read write separation
4. front back separation: web* => 192.168.1.* ; java* => 192.168.2.*
5. gated launch

## configurable routing
1. provider, consumer, default global
2. all registered in registry
3. changed routing rule persisted in registry, published to provider and client
priority: client > server > global

client knows more clearly what routing effect they want
provider know more clearly internal status of servers

# Fault tolerance
## Failover
when RPC exception, route again, find next provider
ensure idempotence

## Failback
return exception to client, let client handle exception

## Failcache
- Stateful routing: when interrupted, cache msg, wait period T, send again until provider handle
- service that tolerate delay: wait and try again

config
- set max cache objects, cache time
- max period T, max #trial

## Failfast
for non core service, only tried once, ignore exception


# registry
service registry cluster
suply CRUD iterface
- change data in registry

## ZooKeeper
```
Service(ZK client)    ZK server cluster           Consumer (ZK client)
------------------------------------------------------------------------
connect to server ------>
register service  ------>
                                    <----- create connection
                                    <-- get service addr list
                                    <-- listen to addr list
register new service --->

                                provide new server addr list -->
cancel existing service --->
                              get cancelled server addr list -->
heart_beat -------------->
                              get cancelled server addr list -->
```
for 2n+1 server, if n+1 server usable, then cluster usable
when server cluster init, choose 1 as leader, other as follower
- for read request, follower return result
- for write request, leader init voting, return concensus result (over half)

when leader sync with most follower, enter broadcast mode
when new server join, after sync, join broadcast
when leader down / lost support of most follower -> recovery mode -> vote new leader

after voting leader
1. leader wait server connect
2. follower connect leader, send largest zxid to leader
3. leader confirm sync point by zxid
4. after sync, infrom follower to uptodate mode
5. follower receive uptodate, resume handle client request


# service publishing
```
serviceConfig     Proxy     Exporter   Remoting    service registry
------------------------------------------------------------------
platform init, -->
read service 
info list
              wrap local
              service by
              proxy

              create publish -->
              tools
                        validation &
                        init

                        convert to  --->
                        protocol by
                        config
                                      init protocol
                                      server, start
                                      listen, create
                                      cache URL addr

                        send URL  -------------------->
                        registration
                        
             <----------- return result
```
way to publish
1. XML config (best, popular choice)
2. annotation (need recompile if change)
3. API call (code invasion, coupling, need recompile)

registry structure
- by host address
- by service name
- URL

## remote service invocation
```
                                              (immediate return)
consumer --invoke()> service API -> serviceProxy --wait()> remote(client)
         <--response--           <-            <--notify()--
  ------------------- channel ------------------
-> remtoe(server) -> serviceProxy --reflection-> service implementation
<-                <-              <-------------
```
## optimization
lazy loading
async loading


# parameter transfer
need to pass extra data beside business logic, eg. provider's IP, msg chasing ID
- cannot be passed by service interface
## service internal parameter transfer
call local API
1. thread context
2. BPM flow engine

A1.method() ->
    ThreadLocal.get("A") ->
    A2.method()
        ThreadLocal.get("B") ->
        A3.method()
            ThreadLocal.set("A", new value)
            ThreadLocal.set("B", new value)

business work flow --abstract--> Handler
```java
public void initHandlerChain(
  executeEngine.add("authHandler");
  executeEngine.add("logHandler");
  executeEngine.add("billHandler");
)
```
since thread not change in provider, use thread context pass param
```java
RPCContext.setParam("CallingIP", "10.139.123.11");
Object value = serviceImpl.invoke(method, args);
String callingIP = RPCContext.getParam("callingIP");
```
## communication protocol support
extra field

===========================================

# scale theory
3 axis:
1. x-axis: horizontal duplication
2. y-axis: functional decomposition (scal by splitting different things)
3. z-axis: data partitioning (scal by splitting similar things)

# new architecture design
## MVC (old)
presentation, business logic, data access -> intrastructure

### problem
1. assume only interact with UI and database,
ignore other possible external system, eg. msg queue, multiple DB, filesystemm, 3rd party
2. persistence layer let external API pollute domain logic
eg. JDBC, SQL, ORM
3. if DB is missing, difficult to do unit test 

## Domain-driven-design N-layered architecture
presentation -> distributed service -> application layer -> Domain layer <- data persistence layer
Cross-cutting infrastructure

## hexagonal / ports and adapters
all domain object on table
chairs around table aer adapter
behind chairs are external system / services

## onion architecture
application around domain model
internal define interface, external implement interface









