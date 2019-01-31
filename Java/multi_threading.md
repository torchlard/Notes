# synchronized
can act on block, method, code segment
- restrict only 1 thread access at the same time

monitor: mutual exclusive object
critical section

```java
Object o = new Object();
synchronized(o){
  // do_sth ...
}
```
for method, monitor = object itself
if not explicitly creating any object, monitor = Main.class

- when 1 thread executing synchronized method for an object
  - all other threads that invoke synchronized method suspend
  - until first thread done

## types
method
- instance method: lock class instance object
`synchronized void method(){ ... }`
- static method: lock class object
`static synchronized void method(){ ... }`

block
- instance object: lock instance object
`synchronized (this){ ... }`
- class object: lock class object
`synchronized (SynchronizedDemo.class) { ... }`
- any instance Object: lock config's instance object
```java
String lock = "";
synchronized(lock){ ... }
```


# CAS
Compare and swap
if value in memory match with expected => 
  then replace with new value, else do nothing

use loop to continuously get value in memory, 
  if it is not what we expect, then extract new one and calc again
  if is expected one, then overwrite old value

# ThreadLocal
threadLocal is data structure, like hash map, each keep 1 map

- each thread has its internal instance copy, that copy can only be used by that thread
- no issue in shared variable among threads

private static -> independent instance copy
when thread ends, all its copy collected

## solutions
1.
ThreadLocal maintain a Map, key=Thread, use get() to get instance
- need to confirm Map is thread-safe
- when thread ends, make sure all mapping of ThreadLocal cancelled

2.
Thread only can access its own Map -> no lock needed
when ThreadLocal save value, it will insert Entry obj in ThreadLocalMap, ThreadLocal as key

## usage
1. each thread need own instance
2. instance shared by multiple method, but not multiple threads

conventionally, for static class, you need to new the class and pass to methods as argument
by using threadLocal, method can reference to static variable directly

## avoid memory leakage
since key is Weak ref, if ThreadLocal has no hard ref, will be collected by GC
if ThreadLocal keep running, Entry value will not be collected

when calling get(),set() -> clear null key's Entry -> no GC Root access -> collected
call remove() after use

# operations
## interrupt
Thread.interrupted(): 
- long time not invoking method, will throw interrupted
- interrupt status

interrupt can be thought as other thread say hi to that thread
- other thread calls `interrupt()` to interrupt that thread
- that thread can use `isInterrupted()` to sense itself being interrupted

## join
allow 1 thread to wait for completion of another
t.join(): current thread pause execution until t terminates

- when statement invoke Thread.start(), keep happen-before relations for threads

# Intrinsic Lock
every object has intrinsic lock with them, no other thread can acquire same lock
```java
synchronized(this){
  // ...
}

private Object lock1 = new Object();
public void inc1(){
  synchronized(lock1){
    c1++;
  }
}
```
reentrant synchronization: 
thread acquire lock that it already owns -> acquire lock more tham once

# Atomic access
atomic RW for reference variables, most primitive veriables (except long, double)
atomic RW for all variables declared volatile (include long, double)

liveness: concurrent application's ability to execute in timely manner

# Starvation
thread unable to gain regular access to shared resource

# Livelock
Thread's action response to action of another thread
- threads are not blocked, but too busy responding to each other

# Guarded Block
`while(!joy) {}` busy waiting for shared variable joy until condition satisfied
-> more efficient `Object.wait`

# Immutable Object
1. no setter
2. make all final, private
3. declare class as final, private constructor
4. no method for mutable object
5. don't share references to mutable objects

# Executor
separate thread management and creation from rest of application

## executor
interface support building new tasks
## executorService
sub-interface of executor
add features manage lifecycle, both individual tasks, executor itself
- accept Runnable (return nothing), Callable interface (return value)
- submit method return `Future` object

## ScheduledExecutorService
sub-interface ofExecutorService
support future, periodic execution of tasks

low-level idiom create new thread & launch immediately
executor more likely use existing worker to run

## Thread pool
newFixedThreadPool: simmple, fixed thread pool
newCachedThreadPool: executor withexpandable thread pool
newSingleThreadExecutor: executor execute single task a time

## form/join
goal: use all available processing power
worker thread run out of things can steal task from other threads

ForkJoinPool class
```
if (my portion of work small enough)
  do work directly
else
  split work into two piece
  invoke 2 peices, wwait for results
```

### join VS wait
join: wait for this thread to die
wait: suspend execution of thread until notify/notifyAll is called
- release lock / monitor while waiting
sleep: pause for cetain period and come back automatically
- not release lock / monitor while waiting
- always sent current thread to sleep

# Concurrent Collection
BlockingQueue: FIFO data structure block/timeout when add to full queue/get from empty
ConcurrentMap: atomic operation under sub-interface of java.util.Map
- ConcurrentHashMap
ConcurrentNavigableMap: support approximate matches
- ConcurrentSkipListMap

# Atomic variable
AotmicInteger

# Concurrent Random Number
ThreadLocalRandom.current().nextInt(4, 77);

# Thread status
new: thread created, not yet start()
runnable: running, include both ready and running state in OS
blocked: thread blocked by lock
waiting: thread waiting for certain action from other thread
time_waiting: thread return after some time
terminated: completed

# LockSupport
basic thread blocking primitives for creating locks and other synchronization classes
- associate each class using it a permit (Semaphore)
- park() return immediately if permit available; otherwise blocked
park -> block ; unpark -> unblock









