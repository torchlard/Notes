# core principle of concurrency
2 core: JMM, happen-before rule
3 properties: atomicity, visibility, ordering

# properties
## atomicity
all success / all fail
```java
// atomic
int a = 10; 
// not atomic
a++;
int b = a;
a = a+1;
```
JMM atomic operation
1. lock: main memory
2. unlock: main memory
3. read: variable main -> worker memory
4. load: value from read -> worker memory
5. use: worker memory's variable -> execution
6. assign: value from execution -> worker memory
7. store: worker -> main memory
8. write: value from store -> main memory

lock & unlock operation not opened to programmer
-> expose monitorenter, monitorexit command
=> `synchronized`

## ordering
within thread, all operations ordered; 
from 1 thread observe another thread, all operations unordered
- goal is to ensure JMM block invalid reordering

## visibility
when 1 thread changes shared variable, other thread immediately knows the modification

synchronized: atomicity, ordering, visibility
volatile: ordering, visibility


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

## synchronized optimization
### CAS
Compare and swap
if value in memory match with expected => 
  then replace with new value, else do nothing

use loop to continuously get value in memory, 
  if it is not what we expect, then extract new one and calc again
  if is expected one, then overwrite old value

Synchronized VS CAS : blocking synchronous VS non-blocking synchronous
- CAS will not suspend anyway, but certain trial after failure

#### CAS problem
1. if old value A->B->A in short time, think that old value not chagned
- solution: optimistic lock
2. spinning time too long
3. aotmic variable
- CAS cannot ensure atomicity when multiple atomic variable
- solution: use atomic class with multiple variables (AtomicReference)

### Java object header
fields: lock state, hashCode, baised lock, generation age, lock identifier
level: no lock < baised-lock < lightweight lock < heavyweight lock
lock can only upgrade, not downgrade

#### baised lock
when thread get lock, store thread ID in header, start CAS once 
-> later thread enter and exit synchronized block don't need CAS
-> if already get lcok, just enter
when competition occurs, CAS faield -> that thread release lock

#### lightweight lock
T1 access sync block -> CAS success -> Mark World point to T1 -> execute block
T2 run CAS fail -> spinning acquire lock fail -> lock upgrade to heavyweight lock -> blocking
T1 CAS fail -> release lock -> waiting
T1,T2 notified, compete enter block

#### comparison
baised lock
- adv: nano second extra cost compared to no lock
- disadv: extra cost when competition
- usage: single thread access

lightweight lock
- adv: competition thread non-blocking
- disadv: spinning, waste CPU
- usage: faster response time, sync block execute rapidly

heavyweight lock
- adv: no spinning, not consume CPU
- disadv: blocking, slow
- usage: high throughput, long time running block

# volatile
ensure every thread can get latest value from variable, avoid dirty read
- send lock prefix command when write to `volatile` variable
Lock prefix command:
1. write processor cache to memory
2. invalidate old value cached in other processors

## JMM memory barrier
1. LoadLoad barrier: load1 before load2
2. StoreStorebarrier: store1 before store2
3. LoadStore Barrier: load1 before store2
4. StoreLoad Barrier: store1 before load2
JMM insert barrier instructioin at certain position to stop rearrangement

| rearrange?     |              2nd operation                 |
| 1st operation  | normal RW | volatile read | volatile write |
| -------------- | --------- | ------------- | -------------- |
| normal RW      |           |               | NO             |
| volatile read  | NO        | NO            | NO             |
| volatile write |           | NO            | NO             |

StoreStore; volatile write; StoreLoad;
volatile read; LoadLoad; LoadStore;
- target: to stop all possible prohibited rearrangement according to table

# final
JMM prohibit rearrange to outside of constructor
`final xxx; StoreStore;`

primitive type:
1. final wirte: stop final write and constructor rearrange
- when that object visible to all thread, that final field already initialised
2. reference data type

pre-requisite: constructor cannot be seen by other threads, no overflow allowed


# AbstractQueuedSynchronizer
int field for sync state `private volatile int state;`
FIFO for waiting queue

subclass must rewrite methods that changes sync state
state change method:
- getState, setState, compareAndSetState

abstract class only defined several sync state acquire and release
- allow monopoly / shared way

Lock: for user, defined interface how user interact with lock; hide detail
Synchronizer: for lock implementation, simplified how lock implement
- hide sync state manage, thread queue, wait, notify
- subclass responsible for sync semantic

## template design pattern
tryAcquire: exclusively get sync state, CAS
tryRelease: exclusively release

tryAcquireShared: if >0 then success; else fail
tryReleaseShared: release sync state
isHeldExclusively: check if synchornizer used exclusively (normally current thread)

acquire: exclusively acquire sync state; if success then return; else enter waiting queue -> tryAcquire
acquireInterruptibly: if interrupted then InterruptedException
tryAcquireNanos: timeout
acquireShared: if fail then enter waiting queue
acquireSharedInterruptibly
tryAcquireSharedNanos

release: exclusively release
releaseShared
getQueuedThreads

## implementation
Node: waitStatus, prev, next, thread, nextWaiter
Status: 
- CANCELLED, SIGNAL(notify waiting threads)
- CONDITION (enter waiting queue), PROPAGATE(sync state propagate anyway), INITIAL

doubly-linked list



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

# Locks
## Reentrant lock
support lock n times, need unlock n times also to exit sync state
fair lock: order of acquiring lock follow FIFO order
- need frequently switch context
unfair lock: not follow FIFO
- higher throughput, default choice

## ReadWrite lock
for scenario of many read few write, certain dirty read not affect data correctness
- read write allow multiple thread read same time; all read,write thread blocked for write access

### ReadWrite reentrant lock
1. fair / unfair
2. reentrant
3. lock downgrade: write lock -> read lock, no upgrade

# Condition
Condition work with Lock to finish waiting/inform mechanism
Condition, Lock is language level, higher extensibility and controll
1. Condition support interrupt, Object not support
2. Condition support multi queue, Object only 1
3. supoort timeout, Object not

for Object's wait():
- await(), awaitNanos(time), await(time, unit), awaitUntil(deadline)

for Object's notify/notifyAll():
- signal(), signalAll()

# Exchanger
wehn 1 thread executing, wait for anotehr thread alsoexecute this method => achieve sync




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

# Semaphore
permit control number of concurrent access

# Read-copy-update (RCU)
based on mutex
- allow multiple thread efficiently read from shared memory by deferring updates after pre-existing reads (write after grace period)
- ensure new readers read updated data
- suitable for system read >> write


# Collections
[ts]: thread safe
```
Collection
  List
    LinkedList
    ArrayList
    Vector [ts]
      Stack [ts]

Map
  Hashtable [ts]
  HashMap
  WeakHashMap
```

# Bernstein condition
if P1 and P2 satisfy this condition, then they can execute concurrently

R(P1) ∩ W(P2) ∪ R(P2) ∩ W(P1) ∪ W(P1) ∩ W(P2) = {}

# real time OS
1. raise reliability
2. raise responsiveness


# process
child process can get parent process's data space, heap and stack copy
process: unit of allocating and having resource 

























