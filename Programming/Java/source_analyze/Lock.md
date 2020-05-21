# Lock
more extensive locking operations, more flexible structuring
support multiple associated Condition objects

eg. some algorithm for traversing concurrently accessed data structure
- need use "hand-over-hand" OR "chain locking"
- lock A -> B -> release A, acquire C -> release B, acquire D ...

lack of automatic lock release
```java
Lock l = ...;
l.lock();
try {
  // access resource
} finally {
  l.unlock();
}
```

## synchronized
implicit monitor lock associate with every object
force all lock acquisition and release occur in block-structured way

when multiple locks acquired must be released in opposite order
locks must release in same lexical scope

# Condition (condition queue / condition variables)
factor out Object monitor methods (wait,notify,notifyAll) 
-> distinct object having multiple wait-sets per object

provide means for 1 thread to suspend execution (wait) until notified by another thread that some state condition becomes true
- atomically release associated lock, suspend current thread  == Object.wait

Condition instance is intrinsically bound to a lock

free to remove possibility of spurious wakeups
- recommand assume that can occur => always wait in loop
3 forms of condition waiting: interrupting, non-interruptible, timed


# AbstractQueuedSynchronizer
framework to construct lock and other synchronizer component
- change sync state: getState, setState, compareAndSetState
- can exclusively/share get sync state 

exclusive: tryAcquire, tryRelease
shareable: tryAcquireShared, tryReleaseShared, isHeldExclusively

## template method
acquire(Shared): if fail, go to sync queue
acquire(Shared)Interruptibly: same as acqurie + response to interrupt
tryAcquire(Shared)Nanos: time limit
release(Shared)
getQueuedThreads: get all sync queue threads

## implementation
use FIFO bidirectional queue to manage sync state
- if acquire fail: use Node store current thread + state info + prev,next Node
  - add to sync queue, block current thread

each node check if head, if yes, get sync state; else wait again

## shared VS blocking
blocking write, shared read

tryReleaseShared must be sync using loop & CAS

doAcquireNanos() = support interrupt + timeout
if nanosTimeout < spinForTimeoutThreshold (1000ns)
=> then won't wait, instead go spinning
- reason: timeout cannot be very accurate in very short duration

tryAcquireShared() 
- if return value > 0, get sync state
- else doAcquireShared() to spin
  - if find itself == head, try to get sync state
    - if return > 0, success get sync state, exit spin

## reentrantLock
- thread can lock repeatedly, not like mutex block itself
fair lock not as efficient as non-fair lock

## ReadWriteLock
```
 high 16bit  low 16bit
<----------><----------->
   read         write
```
S&0x0000FFFF = S>>>16
when state + 1 = S+1

S+(1<<16) = S + 0x00010000

count that each thread get lock stored in ThreadLocal
- if current already get read lock => add read state

if other thread get write lock, then get lock fail => waiting

### lock downgrade
write lock -> read lock
each time lock release will decrease read state: 1<<16

|                       | Object Monitor Methods | Condition                        |
| --------------------- | ---------------------- | -------------------------------- |
| pre-requisite         | get object lock        | Lock.lock(), Lock.newCondition() |
| call method           | object.wait()          | condition.await()                |
| #queue                | 1                      | many                             |
| release lock & wait   | Y                      | Y                                |
| timeout               | Y                      | Y                                |
| wait for certain time | N                      | Y                                |
| wake up 1/all         | Y                      | Y                                |


## ConditionObject
internal class, for Condition getting related lock

when current thread call Condition.await(), construct node,
add node to waiting queue from end

nodes move from waiting queue to sync queue
```
Synchronizer[head,tail] -> Node[prev,next] <-> Node[prev,head]
                        -> Node[prev,nextWaiter] --^
    ^
Condition[firstWaiter,lastWaiter] -> Node[nextWaiter]
```

# Collection
## HashMap
hashmap not thread safe
hashtable low efficiency, when other thread access sync method, enter blocking/polling state
- every thread content for same lock

## ConcurrentHashMap
multiple locks in same container
- multi-threads access different data segment, each segment a lock

consist of Segment(ReentrantLock), HashEntry(key value pair)
- to change data in HashEntry, first get its Segment lock

initialCapacity, loadFactor, concurrencyLevel
- init segment array, segmentShift, segmentMask
- cap = 2^n, segment volume threshold = (int)cap*loadFactor
default loadFactor = 0.75

## locate segment
when insert and get element, use hash algorithm to locate Segment
- use Wang/Jenkins hash to hash the hashCode again
- if all element in same segment, get element very slowly

eg.
0b0001111 & 15 = 15
0b0011111 & 15 = 15
0b0111111 & 15 = 15
0b1111111 & 15 = 15

if low level the same, no matter what high level is, same hash output

```java
final Segment<K,V> segmentFor(int hash){
  return segments[(hash >>> segmentShift) & segmentMask];
}
```
default segmentShift=28, segmentMask=15

### get 
no need locking, unless value is empty => Reentrantlock
- use volatile for shared variable

### put
must add lock to shared variable
1. determine if need scale up HashEntry array
  - only enlarge volumne for certain segment
2. locate where to add element
3. add element in HashEntry

### size
count all sizes of segments
problem: count may change when counting different segments
solution 1: (low efficiency) lock put,remove,clean methods in Segment
solution 2: 
- since low probability count change while counting, use modCount
- if run put,remove,clean, then modCount++
  

## ConcurrentLinkedQueue
formed by head and tail nodes, items connected by next
- default head is empty, tail node = head node

`private transient volatile Node<E> tail = head`

thread safe queue
1. blocking: 1 lock for both in,out queue; 1 for in + 1 for out
2. non-blocking: loop CAS

no boundary linked nodes safe queue
- FIFO
- wait-free algorithm

### add to queue

### poll (take away)
1. get head element, elem == null?
2. if null, then another thread already poll element
3. if not null, CAS set node = null
  1. if CAS not success, another thread already refresh ehad
    - get head again


## Blocking Queue
blocking insert: when queue full, block insert until not full
blocking remove: when queue empty, block remove until not empty

| method | exception | special value | blocking | timeout            |
| ------ | --------- | ------------- | -------- | ------------------ |
| insert | add(e)    | offer(e)      | put(e)   | offer(e,time,unit) |
| remove | remove()  | poll()        | take()   | poll(time,unit)    |
| check  | element() | peek()        | NA       | NA                 |

ArrayBlockingQueue: array bounded 
LinkedBlockingQueue: linked list bounded
PriorityBlockingQueue: priority sorted unbounded
DelayQueue: priority unbounded
  - support get element after specific delay 
  - can use as cache system, timer
SynchronousQueue: no element storage
  - each put need to wait for take, otherwise cannot add element
  - default non-fair access, support fair (FIFO)
  - suitable for transfer data, higher throughput
LinkedTransferQueue: linked list unbounded
  - transfer: if consumer waiting elem, then elem producer made immediate transfer
    - return after consumer consumed
  - tryTransfer: test if elem form producer can transfer to consumer
LinkedBlockingDeque: linked list bidirectional 


# Atomic
## primitive
AtomicBoolean
AtomicInteger
AtomicLong

in unsafe, only provide 3 CAS method: 
- compareAndSwapObject, compareAndSwapInt, compareAndSwapLong

for AtomicBoolean, Boolean->Int, compareandSwapInt, Int->Boolean

## atomic reference type
AtomicReference
AtomicReferenceFieldUpdater
AtomicMarkableReference


# Synchronizer
## CountDownLatch
await() method block current thread, until N=0
await(time) not block current thread after time t
~thread.join()
- only use once

## CyclicBarrier
recyclable barrier
block any thread that arrive at barrier until the last thread comes
- can reset()

## Semaphore
control num of threads access certain resource

## Exchanger
exchanger coordinate how threads coorporate
- provide sync point

## Phaser
more flexible form of barrier to control phased computation among multiple threads

# Thread Pool
## principle
when new task submitted to thread pool
1. test if all threads in pool executing tasks (corePoolSize)
  - if not, create new worker thread to execute task
  - if yes, next
2. test if BlockingQueue full
  - if not full: add to queue
  - if full: next
3. if all threads in working states (maximumPoolSize)
  - if no: create new thread
  - if yes: saturation strategy => RejectedExecutionException

when create thread, will package as Worker
Worker take tak from queue

## ThreadPoolExecutor
corePoolSize: when submit task, create new thread until = corePoolSize
runnableTaskQueue: save task run in future
maximumPoolSize: maximum thread num
ThreadFactory: can give each thread meaningful name (eg. guava)
RejectedExecutionHandler: if all full, define how to handle
  - AbortPolicy: throw exception (default)
  - CallerRunsPolicy: use caller's thread to run
  - DiscardOldestPolicy: throw away oldest task
  - DiscardPolicy: not run current task, discard

execute(Runnable): no return value
submit(Runnable): need return value, return Future object

## allocate thread pool
CPU intensive, IO intensive, mix
task priority, runtime
data dependency

CPU intensive time ~ IO intensive time => separate
CPU intensive time >>|<< IO time => no need separate

## monitor
taskCount
completedTaskCount
largestPoolSize: largest #thread created
getPoolSize: #thread in pool
getActiveCount: active #threads

can define beforeExecute, afterExecute, terminated


# Executor framework
separate working unit (Runnable, Callable) and execution mechanism (Executor)

Task allocation levels
```
task1 -->          --> threads -->           --> CPU 
task2 --> Executor --> threads --> OS kernel --> CPU
task3 -->          --> threads -->           --> CPU
```
ExecutorService.submit(...) => return FutureTask
FutureTask.get() wait for task to complete
 
## FixedThreadPool
use fixed num of threads 
suitable for heavy load server 

## SingleThreadExecutor
guarantee serial execution

## CachedThreadPool
create new thread on demand
suitable for many fast async task, low load server

### ScheduledThreadPoolExecutor
put pending tasks in DelayQueue
- DelayQueue wraps a PriorityQueue, sort Scheduled-FutureTask
- smaller time at front, if same time, compare sequenceNumber (submit earlier)

1. get Lock
2. get scheduled task
  - if PriorityQueue empty: current thread wait in Condition
  - else if time>current: wait time
  - else: get head element
    - if not empty: wake up all waiting thread in Condition
3. release Lock

## FutureTask
FutureTask state: not started, started, completed
when not started:
- cancel(...): task will not execute
when thread started: 
- cancel(true): interrupt thread
- cancel(false): not interrupt thread

assuem pending queue has thread A,B,C
- if thread D get(), D add to queue
- if thread E run(), wake up first thread A
  - thread A remove itself from queue, wake up B ...
  - until all threads wake up and returned from get()


# Concurrency practice
## async task pool
problem: 
1. when a task submit to task pool, if task pool restart, all tasks lost
2. task pool can only handle tasks in local machine

each machine start a task pool, each task pool has multiple thread pool
1. submit task to task pool, save task in db
2. a machine get task from db

task state: 
new: submitted to task pool
executing
retry: runtime error in task, stop, set time for retry
suspend: if task rely on other task, temporary suspend, resume after get result
terminate, finish

tasks itself must be stateless, don't need to save data in machine


# Queue
ConcurrentLinkedQueue
LinkedBlockingQueue
ArrayBlockingQueue
SynchronousQueue
PriorityBlockingQueue
DelayQueue
LinkedTransferQueue

# Concurrent collections
ConcurrentHashMap: HashMap
ConcurrentSkipListMap: TreeMap
ConcurrentSkipListSet
CopyOnWriteArrayList: ArrayList
CopyOnWriteArraySet

# concurrent data structure VS convensional
1. may proceed concurrently with other operation
2. never throw ConcurrentModificationException
3. guaranteed to tranverse elements exactly once, 
   - may reflect any modification subsequent to construction

# LockSupport
## park
method park(),unpark() provide efficient means of blocking and unblocking threads
- no problem like in Thread.suspend(), Thread.resume()
- park will return if interrupted, support timeout
















