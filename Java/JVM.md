# introduction
since all primitive type occupy same space, Java program is more cross-platform

## type of JVM
HotSpot VM
J9 VM
Zing VM

# class file
independent of hardware & language
each .class file -> unique class / interface definition
claaLoader generate class and interface

## .class struture
format: 8 byte as unit, binary file
no separator, big Endian

similar to C struct

### symbol
1. unsigned number
basic data structure
u1: 1 byte, u2, u4, u8: 8 bytes
=> describe number, index ref, value, UTF-8 string

2. table
consist of multiple unsigned number + other table as composite data structure
all end with "_info"
eg. cp_info, field_info, method_info, attribute_info

### actual format
[4] magic
[2] minor_version, [2] major_version
[2] constant_pool_count, [cp_info] constant_pool (amount=constant_pool_count)
[2] access_flags
[2] this_class, [2] super_class
[]2 interfaces_count, [2] interfaces
[2] fields_count, [field_info] fields
[2] methods_count, [method_info] methods
[2] attributes_count, [attribute_info] attributes

### magic, version
magic number determine if file can be accepted by VM as class file
for class file, magic = 0xCAFEBABE

Java version number start from 45
eg. JDK 1.0-1.1 use 45.0 - 45.3
- higher version JDK compatible with previous class file version

### constant pool
const count start from #1
- leave 0 index empty: allow other field point to #0 (not exist)

store 
- literal: text string, `final` variable
- symbolic references
  - class and interface fully qualified name
  - field name and descriptor
  - method name and descriptor

when compile by javac, will not `linkage` like C/C++
- when VM load .class, do dynamic linkage
- class file not store method, field, final memory allocation info

=> field and method symbolic ref need runtime conversion to get real memory addr

#### cp_info types
CONSTANT_<xxx>_info
utf8, integer, float, long, double, class, string
fieldref, methodref, interfaceMethodref, NameAndType
MethodHandler, MethodType, InvokeDynamic

CONSTANT_Class_info ([1] tag = 7, [2] name_index: ->CONSTANT_Utf8_info)
CONSTANT_Utf8_info ([1] tag = 1, [2] length, [1] bytes)
- since max length = 2 bytes = 65536 bit, so method name must < 64 KB

CONSTANT_Float_info ([1]tag = 4, [4]bytes)
...

### access flag
identify class / interface level
eg. this Class = class/interface? public? abstract? final?

ACC_<xxx>
public, final, super, interface, abstract, synthetic, annotation, enum

### this_class, super_class, interface
use these 3 field to confirm inheritance relation
- describe implements/extends what interface

### field_info
access_flags, name_index, descriptor_index, attributes

attributes: public/private/protected? static? final? ...
- fully qualified name, simple name

field descriptor: field type, param list (amount, type, sequence), return value

B:byte, C:char, D:dobule, F:float, I:int
J:long, S:short, Z:boolean, V:void, L:reference type (eg. Ljava/lang/Object)

eg. `void inc()` => `()V`

### method info
structure same as field_info, more access_flags

java code inside method stored in `Code` attribute
if method not overriden, no method_info from parent class

to overload a method, same method name and different feature signature
- can have multiple different return value, coexist in same class file

### attribute_info
contains in .class, method_info, field_info

[method_info] Code: bytecode command 
[field_info] ConstantValue : `final` variable
[class,field_info,method_info] Deprecated
[method_info] Exceptions
[.class] EnclosingMethod

InnerClasses
LineNumberTable: line num <-> bytecode command
LocalVariableTable
StackMapTable: type checker
Signature: generic
SourceFile, SourceDebugExtension
Synthetic: compiler auto gen
LocalVariableTypeTable: feature signature
RuntimeVisibleAnnotations: dynamic annotation
RuntimeInvisibleAnnotation, AnnotationDefault
BootstrapMethods: invokedynamic command ref 


# Code
attribute_name_index, attribute_length
max_stack: operand stack max no.
max_locals: local variable space (Slot)
code_length, code
exception_table_length, exception_table
attributes_count, attributes

for byte,char,float,int,short,boolean,returnAddress => each occupy 1 Slot
double,long => 2 Slot

## Exception
1. if try throws Exception/its subclass, jump to catch
2. if try throws exception not under Exception, jump to finally
3. if catch throws any exception, jump to finally

## LineNumberTable
not compulsory, default generate into .class
if not exist, when throw Exception, stacktrace won't show error row number

## LocalVariableTable
describe relation of variable in stack frame with Java code's variable
not compulsory
if not exist
- IDE cannot show method param name
- debug cannot get param value from context

## LocalVariableTyeTable
since generic type erased, need this to show field signature

## ConstantValue
only for static member

## InnerClass
record relation between inner class and host class

## StackMapTable
replace previous type checking based on data flow
- new one can ignore runtime check

if Code not have StackMapTable, then it has implicit StackMap attr

## Signature
to get generic type using reflection


# bytecode
1. restrict a bytecode length to 1 byte => total operand cannot exceed 256
2. give up operand length align => reconstruct data structure from bytecode
  - lower performance
  - save many padding and separator, high transfer rate

## principle
do {
  PC += 1
  by PC get opcode from bytecode stream
  if(operand in bytecode) get opcode
  execute operation defined by opcode
} while(bytecode length > 0)

## data structure
since most opcode not support byte,char,short,boolean
- need convert to int at runtime/compile time
- int as computational type

## operand
### store,load 
local var to operand stack
- iload, iload<n>, fload,fload<n>, dload, aload

value from operand stack to local var
- istore, lstore, dstore...

const to operand stack
- bipush, sipush, ldc, aconst_null, iconst_ml

local var table to access index
- wide

### arithmetic
add: iadd, fadd
subtract: isub, fsub
multiply: imul, lmul
divide: idiv, fdiv
mod: irem, frem
negation: ineg, fneg
bit shift: ishl, ishr
var increment: iinc
floating point compare: dcmpg, fcmpg

must support IEEE 754 standard

### type conversion
convert between 2 types
support int -> long,float,double
long -> float,double ; float -> double

Narrowing Numeric Conversion: i2b,i2c,i2s,d2f ...

### object create, access
new
newarray, anewarray, multianewarray
access member: getfield, putfield, getstatic, putstatic
put element to operand stack: baload, caload ...
bastore, sastore ....
arraylength
instanceof, checkcast

### operand stack management
pop 1/2 elem out of stack: pop, pop2
duplicate value & push to stack: dup,dup2, dup_x1
swap 2 top value in stack: swap

### control transfer
conditional branch: ifeq,iflt,ifne,ifgt,ifnull,ifnotnull,if_icmplt ...
composite condition: tableswitch, lookupswitch
unconditional branch: goto,goto_w, jsr, ret

### method call, return
invokevirtual: call obj instance method (most frequent)
invokeinterface: call interface method
invokespecial: special treatment, eg. instance init, private,parent method
invokestatic
invokedynamic: runtime parse methdo and run

ireturn, lreturn freturn, dreturn

### exception 
athrow: explicit throw exception

### synchronization
monitorenter, monitorexit




# class loader
1. 'class' can be class/interface
2. 'class file' is byestream exist in any form (not limited to file)

## class loading process
1. Loading
2. Verification
3. Preparation
4. Resolution
5. Initialization
6. Using
7. Unloading
[2-4: Linking]

load,verify,prepare,init.unload are fixed, resolution not fixed timing
- sometimes can parse after initialization

must immediate initialize class when:
1. if (new,getstatic,putstatic,invokestatic), init if not yet
2. relection
3. parent class not init
4. when VM start, need run class with main() 
5. java.lang.invoke.MethodHandle -> REF_(get|put|invoke)Static method handler
  - corresponding class of method not yet init

other than above 5 conditions, not trigger init => passive reference

for interface init, generate `<client>()` class constructor
- not require condition 3: no need init parent interface first

### Loading
1. get binary bytestream using fully qualified name
2. static struct -> runtime data structure
3. create object in memory

multiple ways to get bytestream
1. from zip: JAR, EAR, WAR format
2. get from network: applet
3. runtime compute: java.lang.reflect.Proxy's ProxyGenerator.generateProxyClass
4. convert from other file: JSP
5. get from DB

array class created by JVM itself, but its Element Type still load by classloader
1. if Component Type = ref type, then recursively loading
2. if not ref type (eg. int[]), then link with bootstrap class loader

loading and linking run concurrently

### verification
ensure bytestream meet JVM requirement
- for security

1. file format verify 
  - start with 0xCAFEBABE
  - major,minor version within range
  - const all support (check tag) ...

2. metadata: semantic checking
  - parent class exist (other than java.lang.Object)?
  - allow to inherit?
  - if not abstract, implemented all methods ?
  - method contradict?

3. bytecode verify
  - most complicated, use data flow and control flow analysis to verify logical
  - eg. NOT put `int` to operand stack, then load into var table as `long`
  - NOT jump to code outside method
  - ensure type conversion valid

optimization: StackMapTable skip bytecode verify

4. symbolic ref verify
  - check ref to const pool
  - find all class, ref member exist, 
  - correct access modifier

### preparation
at current stage only static variable allocated in memory, not instance variable

### resolution
symbolic ref: 
- use group of symbol to reference target
- can be any literal, irrelevant to VM memory allocation
- not necessary in memory already

direct ref
- pointer point to target / relative offset / handler that can locate to target
- must already exist in memory

AIM: convert symbolic ref in const pool -> direct ref

possible to resolve same symbolic ref multiple times
other than `invokedynamic`, cache first time resolution result 

`invokedynamic`: prepared for dynamic language
- ref = dynamic call site specifier = resolution only when program run this command

#### class, interface 
1. if C not array type, class loader
2. if array type, VM create obj represent array dimension and element

#### field
1. if C itself contains this member, return
2. else search parent interface, if match return
3. else if not Object, search parent class, if match return
4. else throw java.lang.NoSuchFieldError

#### class method
if class_index find C = interface, throw IncompatibleClassChangeError
else if match in C, return
else if match in parent class => return; if found abstract method => AbstractMethodError
else NoSuchMethodError

if no access right => IllegaAccessError

#### interface method
if in class_index C = class => IncompatibleClassChangeError
else if in C match => return
else in parent interface match => return
else NoSuchMethodError


### initialization
AIM: generate and run `<client>()`

start from here can be controlled by program

`<client>()` generated from collection of all field assignment + static block
- no need explicit call parent class constructor
- VM ensure all parent `<client>()` run before subclass `<client>()`
- Object `<client>()` must run first
- `<client>()` sync, only 1 thread run until complete

#### parents delegation model
other than Bootstrap ClassLoader, each classLoader must have its parent loader

Composition relation: Bootstrap <- Extension <- Application <- custom

when class loader receive loading request, first delegate request to parent loader
- do it yourself when parent deny request (ClassNotFoundException)

reason: ensure reuse class loadeed previously (eg. java.lang.Object)

##### Bootstrap class loader
implement by C/C++, use to load core lib in JDK (eg. java.lang, java.util)
- $JAVA_HOME/jre/lib
- -Xbootclasspath

##### extension class loader
load extension class, provide extra function
- load <JAVA_HOME>/lib/ext / java.ext.dirs 
- implement by ExtClassLoader

##### application class loader
access by getSystemClassLoader
- current classpath / java.class.path
- implement by AppClassLoader

##### custom class loader
by inherit java.lang.ClassLoader
1. loading: find and load .class
2. linkage: verify, prepare, parse
3. initialize

##### problem
what if core lib want to call user API? 

solution:
use Thread Context ClassLoader to setContextClassLoader()
- if thread not set, inherit from parent thread
- cheating, let thread load class 

example: JNDI, JDBC, JCE, JBI

##### hot deploy
eg. OSGi
each bundle has its class loader, when switch bundle, change loader




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

problem
1. default #thread = (#cpu + 3)/4 => if cpu<4, performance drop 50%
2. cannot manage floating garbage => need Full GC
3. memory fragment => compact memory cannot be concurrent => long pause


## G1 (Garbage First)
(current GC collector)
based on Mark-Compat

1. whole heap divided into multiple same size regions
- previously: GC collect whole new/old generation
- now: region with more garbage will collect first

dynamically select set of region as young generation (most valuable) in next GC
- more tunable GC pause
- new & old generation not physically separated

2. parallelism and concurrency together
3. predictable pause

problem: need to scan other regions to ensure 1 obj in 1 region is garbage
solution: 
- use Remembered Set avoid whole heap scan
- when access Reference type data, Write Barrier pause and check if cross region ef
  - if yes, add info to Remembered Set by CardTable

### steps
1. initial marking
2. concurrent marking
3. final marking
4. live data counting and evacuation


## ZGC
all stages concurrent
application thread work along with GC thread, non-blocking
can handle heaps from few hundred MB - many TB 

### principle
mark in pointer, add Load Barrier when accessing pointer
when object moved by GC, color on pointer different
barrier will renew pointer to effective address and return
=> only single object access is possible to decelerate

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



# JVM bytecode exeecution
## stack frame
data structure for VM to call and execute method 
- element at VM stack
- store local var table, operand stack, dynamic linking, return addr

only stack frame at top is effective => current stack frame <-> current method in frame

### local variable table
Variable Slot as smallest unit






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

































