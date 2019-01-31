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

# OOP principle
1. Single-responsibility principle
1 class only has 1 responsibility and function
2. Open-close principle
open to extension, close to modification
3. Liskov substitution principle
subclass can substitute superclass anywhere
4. Interface segregation principle
use interface to separate modules, not strong coupling by class
5. Dependency Inversion principle
depend on abstraction, not concrete class
6. Composition over inheritance

# Multi-threading
each thread has its own stack
reason for inconsistent order among threads:
- switching mechanism of JVM

# Mutator
change ref relation among objects



# type compatibility
compatible if possible to transfer data from type T1 -> T2
eg. short -> int , but boolean --x-> int
Integer -> Number, becoz Number is (abstract) superclass of Integer

`short_variable = (short) int_variable`

`integer_var = (Integer) number_variable`
Integer `implicitly` compatible to Number
Number `explicitly` compatible to Integer

## dependency
array type `int[]` depends on primitive type `int`
`ArrayList<Customer>` dependent on `Customer`
`void increment(Integer i)` depends on type `Integer`

## covariance, contravariance
variance: directed relation
covariance: different in same direction
T1 -> T2 => A(T1) -> A(T2)    { => : implies, -> : compatible to }
eg. Integer -> Number => Integer[] -> Number[]
- implicit covariant: numberArray = integerArray
- explicit covariant: integerArray = (Integer[]) numberArray

contravariance: diferent in opposite direction
T1 -> T2 => A(T2) -> A(T1)

##
in Java, array types, parameterized types are type-dependent elements

dependent elements
- methods
- types
  - array types
  - generic types

Java compiler allow implicit compatibility if
- no danger of losing information & no loss in precision

        char --> int -> long -> float -> double
byte -> short -> 

`subGeneric.getClass() == superGeneric.getClass()`

compatibile to:
ArrayList<Integer> -> List<?> OR <T> ... List<T>
Integer[] -> <T> ... T[]
```java
// compatible to class >= SubType
Generic<? super SubType> gb;
// compatible to class <= SubType
Generic<? extends SubType> gb;

```
## call
call is covariant concerning signature

declaration (interface) <- definition class
    |                           |
    -------- call (body) --------

# JMM (Java memory model)
restrict how processor and compiler rearrange instructions
- prohibit some rearrangement that will fail under multi-threading environment
- keep happen-before rules

# paramter changing strategy
different levels
1. hard code parameter in code; if change, change code and recompile
2. config in file (properties) and restart system
3. cache config value, system check if config file changed; if changed, get latest value
4. use JMX concentrate all config in class, write MBean, start config

# Monitor
monitor: 
- mechanism to control concurrent access to an object
- synchronization mechanism placed at java.lang.Object
- wait(), notify() 




# JMX
Remote Management Level: 
- JMX console, specific console, web browser, SNMP console
  > remtoe access entry point
- connector, adaptor (for RMI, SNMP, IIOP, HTML, HTTP)
Agent Level:
- MBeanServer
  > resource registration, management
Probe Level:
- Standard MBean
  > define attribute, method, time to implement interface
- Dynamic MBean
  > all method, attr defined in runtime
- open MBean
  > improving...
- model MBean
  > use RequiredModelMBean, implemented DynamicMBean

## MBean
Object Name: id of MBean
Domain Name = package name
key properties
`MyDomain:description=Printeer,type=laser`

## Agent service
dynamic loading service: download 

monitor attribute change of MBean, if changes exceed range, emit notification
- Counter Monitor: integer, can use offset
- Gauge Monitor: integer, floating point
- String Monitor: string

JMX notification -> MonitorNotification
- attr name, measured value, triggered threshold
  - jmx.monitor.counter.threshold, jmx.monitor.gauge.high ... 

relation service
- define relation between component














