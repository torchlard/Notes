# Java technology architecture
1. Java language design
2. JVM for different platform
3. Class file format
4. Java API class lib
5. 3rd party java class

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

# Encoding
text input -> unicode -> UTF-8

# Decorator pattern
`var br = new BufferedReader(new InputStreamReader(System.in));`

# System.in
`ctrl+d` stop input stream

# bytecode
```java
int a = 1;
int b = 2;
int t = a + b;
```
```bytecode
iconst_1: take first constant (1)
istore_1: save 1st const (1) to 1st position in local variable (a)
iconst_2: take 2nd const (2)
istore_2: save to b
iload_1: load 1st
iload_2: load 2nd 
iadd
istore_3: save to t
return
```

# function
function: function that exists in global namespace
Java has no function, only has method in class

create frame in memory for storing local variable and other info of function
execution: creating stack of frames [function stack]
function stack not have pop() operation, only has add()

## object
only copy value to caller frame if primitive type
if do so for object, the memory usage will be huge

so use heap to store actual object's data, leave address to heap

# bit shift
- n mod 16
n & 0xf

- is odd
n & 1 == 1

- n*7
n << 3 - n

- remove last 1
n & (n - 1)

- count num of 1
while(n != 0){
  remove_last_1(n)
  count++
}

- swap a,b
a = a XOR b
b = a XOR b
a = a XOR b

## XOR
- same = 0, different = 1
a XOR b XOR a = a XOR a XOR b = 0 XOR b 
= b

# generic
```
Container<Integer> ci
Container<String> cs
```
when compile, types of ci,cs are erased, leaving Container type
JVM cannot distinguish Container<Integer> and Container<String>
- so no corresponding exception catching

therefore we need constraint statement `<T extends Addable<T>>`,
if not, compiler treat T as `Object` type
```java
public static <T extends Addable<T>> T add(T o1, T o2){
  return o1.add(o2);
}

interface Addable<T> {
  T add(T t);
}
```

# Class
Each Java class comes with a Class object
```java
class Main{}
```
when ClassLoader loading class Main in JVM, 
Hotspot VM will create Klass data structure inside VM

oop: ordinary object pointer
- instance mirroring this class
- when JVM load `Main` class, then create 'Main' Klass and create object
- append object to Klass's _java_mirror

newInstance: real method JVM used to create new object
getDeclaredMethod: get method












