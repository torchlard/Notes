# JDK
## different version
OracleJDK
OpenJDK
Zulu build of OpenJDK: from Azul Systems company

# GC
## G1
current GC collector

## zgc
all stages concurrent
application thread work along with GC thread, non-blocking
can handle heaps from few hundred MB - many TB 

### principle
mark in pointer, add Load Barrier when accessing pointer
when object moved by GC, color on pointer different
barrier will renew pointer to effective addrss and return
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

# JIT (just in time compilation)
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

## htospot's implementation
all method start off being interpreted
hot method identified by sample-based profiling
hot method compiled
non-hot method interpreted

### C1 compiler
for client use, less optimization

### C2 compiler
for server use, heavy optimization

## AOT (Ahead of Time)
MyClass.java --javac--> MyClass.class ------------->|--> java
                         |--jaotc--> my_class.so -->|
shared machine code among different JVM

tiered compilation
class data sharing


# IO
synchronous not equal to blocking
sync = do nothing before client send data to here
blocking = whenther thread sleep for calling function











