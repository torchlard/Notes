# JDK history
## JDK 1.1 (1997)
JDBC, JavaBeans, RMI
inner class, reflection

## JDK 1.2 (1998)
J2SE, J2EE, J2ME
EJB, java plugin, Java IDE, Swing
JIT compiler

strictfp, Collections

## JDK 1.3 (2000)
math, timer
JNDI, Java 2D api, JavaSound

## JDK 1.4 (2002)
regex, exception chain, NIO
loger, XML parser, XSTL

## JDK 1.5 (2004)
auto boxing, generic, dynamic annotation
enum, var arg, foreach

## JDK 1.6 (2006)
HTTP server API, JS engine
lock,sync , GC, class loading optimize

Sun open source Java => OpenJDK

## JDK 1.7 (2012)


# VM history
## Classic VM / Exact VM
interpreter and compiler cannot work together properly
- if all use compile, cannot use high optimization due to time constraint
=> think java is slow

Exact VM: instead of using handler to find object, enhance GC, less cost
- quickly replaced by Hotspot VM

## HotSpot VM
since JDK 1.3, hotspot VM becomes default

## Apache Harmony
apache's version of open source VM => replaced by OpenJDK

## Dalvik VM
not Java JVM, not follow JVM standard, cannot run class file
use register architecture, not typical stack based JVM
- run dex (Dalvik Executable) file, can transferred from .class
- can use most of Java API

# company
Sun, BEA, IBM

# future
## modular
Java library becomes very huge, need to download and maintain whole system
- OSGi 

## mixed language
eg. parallel use Clojure, display use JRuby/Rails, middleware use Java

### JVM implementation of lang
Ada -> JGNAT
c -> C to JVM compiler
Erlang -> Erjang
JS -> Rhino
Python -> Jython

## concurrency
Fork/join
Lambda

## 64 bit VM
in early years, 64bit VM use 10-30% more RAM
- performance 15% lower than 32bit VM, 
but can use > 4GB




































