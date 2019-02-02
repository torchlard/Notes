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

## Vertx core
basic funcionality support HTTP, TCP, file system access

# Verticle
unit of deployment in Vert.x, executed within Vertx instance
encapsulate code for different need
every Vertx instance has N number of event loop (default core*2)

## types
standard verticles
- execute by event loop thread
worker verticles
- 
multi-threaded worker verticles


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
4. 

# Message type
string, boolean
primiives, boxed primitives
JsonObject
Buffer

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






















