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




























