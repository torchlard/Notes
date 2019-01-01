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

# structure
## program counter register
processor need to know next command's address
multi-threading: periodically switching and allocate process time
- PC private to thread


## JVM stack
variable, return value, intermediate
multiple frame

## native method stack
use C Stack

## heap
almost all object instance allocated memory in heap
heap collected by GC
memory only need to be logically continuous

## method area
shared memory region, store class info already loaded by JVM
- constant pool, field, method info, static field
can choose not to be GC

## runtime constant pool
save string literal and symbolic reference generated in compile time
will load all in runtime

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
eg. h ash code, lock, GC age
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












