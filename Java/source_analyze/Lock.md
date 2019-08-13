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
framework to construct lock and other synchronizer componnet
- change sync state: getState, setState, compareAndSetState
- can dominately/share get sync state 

dominate: tryAcquire, tryRelease
shareable: tryAcquireShared, tryReleaseShared, isHeldExclusively

## template method
acquire(Shared): if fail, go to sync queue
acquire(Shared)Interruptibly: same as acqurie + response to interrupt
tryAcquire(Shared)Nanos: time limit
release(Shared)
getQueuedthreads: get all sync queue threads

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

tryAcquireshared() 
- if return value > 0, get sync state
- else doAcquireshared() to spin
  - if find itself == head, try to get sync state
    - if return > 0, success get sync state, exit spin

## reentrantLock
- thread can lock repeatedly, not like mutex block itself
non-fair lock not as efficient as fair lock

## ReadWriteLock

 high 16bit  low 16bit
<----------><----------->
   read         write

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
|-----------------------|------------------------|----------------------------------|
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
thread safe queue
1. blocking: 1 lock for both in,out queue; 1 for in + 1 for out
2. non-blocking: loop CAS

no boundary linked nodes safe queue
- FIFO
- wait-free algorithm























































