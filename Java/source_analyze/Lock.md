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








































