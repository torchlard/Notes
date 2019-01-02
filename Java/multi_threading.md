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













