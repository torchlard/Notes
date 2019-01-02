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







