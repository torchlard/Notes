# architecture
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

complicated program

## non-blocking coroutine
simplest coroutine = generator
process that can halt, and resume later

all happening in same thread
coroutine ~ micro-thread

coroutine switching controlled by programmer

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

## 2nd generation
SOA middleware: ESB, RPC, BPM
RPC framework based on Java NIO (Netty), serialization
new demand
- dependency management: want universal service registration
- transparent routing: timeout, flow control 
- => independent service management, monitor all nodes

solution [custom RPC framework]
1. subscribe/publish mechanism -> auto service discovry
2. dependency decoupling -> configuration based development
3. clustering

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

#### problems
complex URL configuration, high pressure to load balancer
dependency: which service start first?
how many nodes needed for particular service?

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

## 3rd generation
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














