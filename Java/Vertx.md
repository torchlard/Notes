# Architecture
```
Host
  JVM
    Vertx instance
      verticle
      verticle
  JVM
    Vertx instance
      verticle
      verticle

Event bus      
```    

# Vertx
event-driven, non-blocking reactive application on JVM
handle lot of concurrency using small number of kernel threads

## Golden rule
don't block event loop
example of block:
- Thread.sleep(), wait on lock, wait on mutex/monitor
- long lived database operation, waiting for result
- spinning

## Vertx core
basic funcionality support HTTP, TCP, file system access

# Verticle
(optional)
unit of deployment in Vert.x, executed within Vertx instance
encapsulate code for different need
every Vertx instance has N number of event loop (default core*2)
communicate with each other though event bus

## types
standard verticles
- always execute by event loop thread
- guarantee all code executed on same event loop
  - => can write all code as single threaded, let Vertx worry about threading & scaling
worker verticles
- thread from worker pool, instance run in only 1 thread
multi-threaded worker verticles
- thread from worker pool, instance run concurrently >1 thread
- (most application don't need this)

# Polyglot
multi-language

# concurrency
verticle instance assigned thread/event loop
verticle instance always execute on assigned thread
isolated classloaders, cannot share global state
write all code assume single threading

# Communication
## NodeJS communication options
1. TCP/UDP/UNIX sockets
2. Redis pub/sub
3. ZeroMQ
4. process signaling / cluster module
5. Memcached
6. Eventing frameworks

## Vertx options
1. Event Bus
- addressing (string)
- handler registration, can have multiple handler in same address
2. P2P
3. immutable state
- vertx shared state


# Event loop
## Reactor pattern
single thread / single event loop

## problem
some work is naturally blocking
- intensive data crunching
- 3rd party blocking API (eg. JDBC)
-> pure reactor not fit

## Actor Model (Worker Verticles)
- not assigned vertx event loop thread
- execute on background thread pool
- never execute concurrently > 1 thread
- not allowed to use TCP/HTTP client 
- communicate using event bus


# Rx in Vertx
## intro
```java
for(int x; x<list.size(); x++){

}
// Iterator pattern
for(Element elem: list){

}
// ---
Iterator iterator = list.iterator();
while(iterator.hasNext()){

}
// stream API
list.stream().map(elem -> ...);

// everything in vertx can be Rxified, make reactive
Filesystem fileSsytem = vertx.fileSystem();
fileSystem.open("/data.txt", new OpenOptions(), result -> {
  AsyncFile file = result.result();
  Observable<Buffer> observable = RxHelper.toObservable(file);
  observable.forEach(data -> System.out.println("Read data: "+ data.toString("UTF-8"));
})


```

# Cluster manager
- discovery and group membership of vertx nodes
- maintain cluster wide topic subscriber lists
- distributed map support
- distributed locks
- distributed counters

inter-node transport by TCP connection
default manager: Hazelcast

# Event Bus
single event bus instance for every Vertx instance
even allow client-side JS run in browser to communicate on same event bus

support
- publish/subscribe
- requset-response message 
- point-to-point

## message type
string, boolean
primiives, boxed primitives
JsonObject
Buffer















