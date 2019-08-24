# introduction
since all primitive type occupy same space, Java program is more cross-platform

## type of JVM
HotSpot VM
J9 VM
Zing VM

## class file
binary file, independent of hardware
each .class file -> unique class / interface definition
claaLoader generate class and interface

# class loader
## Bootstrap class loader
implement by C/C++, use to load core lib in JDK (eg. java.lang, java.util)
- $JAVA_HOME/jre/lib
- -Xbootclasspath

## extension class loader
load extension class, provide extra function

## application class loader
access by getSystemClassLoader
- current classpath
- java.class.path

## custom class loader
by inherit java.lang.ClassLoader
1. loading: find and load .class
2. linkage: verify, prepare, parse
3. initialize

# JVM structure
thread shared: method area, heap
thread isolated: VM stack, native method stack, program counter register


## program counter (PC) register
(only conceptual model, may use different way implement)
processor need to know next command's address
- bytecode command: branch, loop, jump, exception, thread resume...

multi-threading: periodically switching and allocate process time
- PC private to thread

for native method, PC value = undefined => no OutOfMemoryError

## JVM stack
lifecycle = method from invocation to end
variable, return value, intermediate, method exit
multiple frame

- long,double use 2 slot, other primitive type use 1 slot
- when executing method not change local variable table size

StackOverflowError: required stack depth > allowed VM stack depth
OutOfMemoryError: if allow auto scale, but not enough memory

## native method stack
use C Stack
- some VM (eg. hotspot) combine native method stack & VM stack
- JVM standard no restriction on structure


## heap
almost all object instance allocated memory in heap
heap collected by GC
memory only need to be logically continuous

### Thread Local Allocation Buffer (TLAB)
heap private to thread

## method area (non-heap / permanent generation)
shared memory region, store class info already loaded by JVM
- constant pool, field, method info, static field

for hotspot, in future method area permanent generation -> native memory

JVM standard can ignore GC

### runtime constant pool
- part of method area
save string literal and symbolic reference generated in compile time
will load all in runtime

constant pool table: string literal and ref symbol formed when compile

## direct memory
not part of JVM
NIO use native function to allocate out-of-heap memory,
  and use DirectByteBuffer in heap


### reference
```java
// direct reference
System.out.println("s=" + "asdfa");

// symbolic reference
String s = "asdfa";
System.out.println("s=" + s);
```
direct reference: directly point to certain area in method area

## object in heap
1. Header
eg. hash code, lock, GC age
pointer to memory area
2. Instance Data
field info
3. Padding
just for padding

### hotspot implementation
OOP-Klass
OOP = normal object pointer
Klass = describe instance concrete type
instanceOopDesc 
arrayOopDesc = array type


# Class
Each Java class comes with a Class object
```java
class Main{}
```
when ClassLoader loading class Main in JVM, 
Hotspot VM will create Klass data structure inside VM

KClass: metadata
- virtual function table

oop: ordinary object pointer, keep object instance info
- instance mirroring this class
- when JVM load `Main` class, then create 'Main' Klass and create object
- append object to Klass's _java_mirror

newInstance: real method JVM used to create new object
getDeclaredMethod: get method

stack(ref) -> heap(obj [instanceOopDesc]) -> method area (instanceKlass)

## memory management
all data and object instance need to be allocated in heap
how to allocate?
1. pointer collision
complete memory allocation
allocated space and idle space on different side
use pointer as separation point
2. idle list
memory fragmented
maintain list of available memory block


## create new object
1. class loader validation
2. allocate object memory
3. reset memory space to zero, so that object can directly use without assign value
4. make necessary setting, eg. which class, hashcode, generation => object header
5. run `<init>` method

## object header (Mark Word)
- hash code, generation
- biased lock 
- heavyweight lock
- empty, GC mark
- biased thread ID, timestamp

many metadata need to store in Mark Word,
so dynamic structure to store as much data as possible

- class pointer

## locate object in heap
1. use handler
allocate memory for handler pool
reference store handler address
handler include instance data + object class data
```
reference -> (handler pool) instance pointer -> (instance pool) instance data
                                             -> (method area) class data
```
good for write: when move obj, only need change instance data pointer

2. use direct pointer
reference -> (heap) instance data -> class data
good for read: save 1 redirect

## memory overflow
### direct memory overflow
test method: use reflection to get Unsafe instance
- only want class in rt.jar use Unsafe functions


# GC
What memory need to be collected?
When collect memory?
How to collect?

young generation, old generation
goal: distinguish alive and dead object -> mark garbage -> collect

## garbage marking algorithm
hard reference: not collect even out of memory
soft reference: if not enough memory, then collect it
weak reference: collect it anyway
virtual/phantom reference: same as no reference, will get system notification when collected

## reference counter
+1 when more ref, -1 when lose ref, 0 -> garbage
if 2 objs mutual ref, counter never be 0, cannot collect

### GC in Python interpreter
```python
a = 1000.0
a = 2000.0
```
in 1st sentence, create PyFloatObject, ob_fval = 1000.0 (value), ob_refcnt = 1 (ref count)
in 2nd sentence, counter-1 -> 0, so collect garbage a; 
  create new PyFloatObject, value=2000.0

- avoid circular reference in python, use single directional ref
- when obj is useless, set ref to other obj -> null


## reachability analysis
GC root can be: VM stack, static obj, method area frequent obj, 
- native method stack referenced obj

choose some objects as GC root, search from root downward
if obj not accessible -> garbage

### marking
obj must be marked twice before dead
if obj no finalize() / finalize() called => no need first mark
if need finalize(): put in F-Queue, execute by Finalizer thread

finalize() not guarantee executed
- maybe obj execute finalize() too slowly / dead loop
- if obj link itself with any other obj in finalize()
  - when 2nd mark:
    - then escape from GC
    - else GC

=> don't use finalize(), very uncertain

### GC in method area
collect useless constant and class

useless class condition (need all)
1. all instance collected
2. that class's ClassLoader collected
3. corresponding java.lang.Class not referenced by reflection

## GC algorithm
### Mark-Sweep
1. stage 1: mark
mark all obj need to be collected
2. stage 2: sweep
collected marked objects

problem:
1. low efficiency of mark and sweep
2. memory fragmentation

### copying
divide all memory into 2 half, each time only use one half
- when whole memory used up, copy alive obj to another half
- collect whole half memory

adv: efficient, easy
problem: need double memory

### optimized copying
since 98% object died soon, no need 1:1 divide
- larger one as Eden, 2 smaller Survivor space (default 8:1)
- each time use Eden & 1 survivor
- when collect, copy alive obj to another Survivor

adv: only 10% memory wasted

if survivor not enough to store all alive obj, move to old generation

### mark-compact
first half same as Mark-Sweep,
when collect, move alive obj to one end, then clear memory outside boundary

### generational collection
divide memory space according to alive age
- normally new + old generation
new: when most obj die, use copying algorithm
old: when most obj alive, use Mark-Sweep/Mark-Compact algorithm


## lifecycle
1. created
allocate space -> build object -> init static in parent and child class
-> call parent's constructor -> call child's constructor
2. in use
3. invisible
not any hard reference, eg. process outside object's scope
4. Unreachable
not any hard ref, and object unreachable
5. colected
GC prepare to reallocate memory space, call finialize if any
6. Finalized
End stage, wait GC collect
7. Deallocated
object eliminated

## operations
mark: start from root, walk object graph, mark obj as live
delete/sweep: delete unreachable objects
compacting: compact memory by moving around objects, make allocation contiguous

## generational collector
young generation
  - eden space
  - survivor space from
  - survivor to

old generation
permanent generation (method area, final/static const, const pool)

time passes:
- eden space -> space from -> old generation
  
### minor GC
1. 1st round
in young generation, when eden full, move to "survivor from", clear eden
2. 2nd round
all move to "survivor to" after deleting unreachable
3. 3rd round
back to "survivor from"

survivor: avoid compact 
each object count num of times migrated (age)
if count > MaxTenuringThreshold, move to old generation

### major GC
for whole heap
if old generation full, start major GC


# GC problem
## stop the world
all thread except GC thread are paused, wait GC to finish
needed to confirm all objects consistent


# Hotspot GC strategy
use OopMap know where store obj ref
- must ensure ref relations unchange

if create OopMap for each instruction, too costly
- only create OopMap at Safepoint
- eg. method call, loop, exception

how to move all threads to safepoint and pause all?
1. preemptive suspesion
- interrupt all threads, if some not at savepoint, resume them until to savepoint
- no VM use this method

2. voluntary suspension
- set mark at safepoint, let thread to poll this mark
- when thread find mark=true, thread interrupt itself

## safe region
if thread sleep / blocked, cannot response to mark in voluntary suspension
- define safe region that ref relation not change


# GC type
## serial collector
single thread
default collector of client mode

## concurrent collector
multithread version of serial collector
GC along with application
not wait old generation to be full, stop wworld only during mark/re-mark
- need more memory, more CPU
- short pauses => responsible

example: ParNew, CMS

## parallel collector
multiple CPU to run GC, multi-thread do mark/sweep
start when heap nearly full
- use less memory, lesser CPU
- good for high throughput, can withstand pause

if tune down -XX:MaxGCPauseMillis, 
each GC run shorter timer, but collect less garbage
so need to run more GC

# GC example
Hotspot can have multiple collectors to execute GC

## Concurrent Mark Sweep (CMS)
1. initial mark
2. concurrent mark
3. remark
4. concurrent sweep

## G1
(current GC collector)
whole heap divided into regions
dynamically select set of region as young generation in next GC
region with more garbage will collect first
- more tunable GC pause
- parallelism and concurrency together


## zgc
all stages concurrent
application thread work along with GC thread, non-blocking
can handle heaps from few hundred MB - many TB 

### principle
mark in pointer, add Load Barrier when accessing pointer
when object moved by GC, color on pointer different
barrier will renew pointer to effective address and return
=> only single object access is possible to decelerate

### 
colored pointer, load barrier
ZGC basically has no pause time

suport Numma
parallel processing

### GC cycle
pause mark start
- scan threads
- walk object graph
pause mark end: sync point
- reference processing
- relocation set selection
pause relocate start: scan thread stacks
- compact heap

pause time < 10 ms

# GC performance
1. throughput
size of memory collected in unit time
2. pause time
3. allocation speed
4. Heap usage efficiency
reduce fragmented memory space


# JIT (just in time compilation)
- slower if everything load from .class, better to precompile some in machine code first
methods get compiled
compilation is expensive
JIt faster than interpreter?

way of executing computer code that involve compilation during execution of program
JIT  = AOT + interpretation

dynamic compilation, allow adaptive optimization
far better performance than interpreter, sometimes better than static compilation
1. optimized to targeted CPU, OS
2. system collect statistics about how program actually running
3. do global code optimization without losing adv of dynamic linking

disadv: noticeable delay in initial execution of application (warm-up time)

## hotspot's implementation
all method start off being interpreted
hot method identified by sample-based profiling
hot method compiled
non-hot method interpreted

### C1 compiler
for client use, less optimization

### C2 compiler
for server use, heavy optimization

## AOT (Ahead of Time)
```
MyClass.java --javac--> MyClass.class ------------->|--> java
                         |--jaotc--> my_class.so -->|
```                         
shared machine code among different JVM

tiered compilation
class data sharing


# JVM command
jinfo: configuration info
jmap: memory map
jhat: java heap analysis tool
jstat: JVM statistics monitoring tool, watch GC









