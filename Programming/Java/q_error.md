# P1,P2,P3 ready; P4,P6 waiting; P5 executing
P6 waiting -> ready call process scheduling

# java method rewrite
1. 3 same: same method name, same param, same return type
2. 1 smaller: smaller exception thrown
3. 1 bigger: access modifier larger or equal

# java MyTest a b c
args[0] = a
args[1] = b

# interface valid method
public void main(String[] args);

# enum
when enum compiled, converted to concrete class inherites java.lang.Enum
enum AccountType -> class AccountType
```java
private AccountType(){
  System.out.println("It is a account type");
}
// becomes
private AccountType(String s, int i){
  super(s,i);
  System.out.println("It is a account type");
}

public static final AccountType SAVING;
public static final AccountType FIXED;
public static final AccountType CURRENT;

static {
  SAVING = new AccountType("SAVING", 0);
  ...
  CURRENT = new AccountType("CURRENT", 0);
  $VALUES = new AccountType[]{
    SAVING, FIXED, CURRENT
  }
}
```

# if return value
```java
int x=3;
int y=1;
if(x=y) {...}
```
1. assignment has return value of assigned value. In this cass=1
2. in C if >0, return true; in Java, not compare with 0, directly put result into if

# java init sequence
parent static
child static
parent class member init
parent constructor block
parent constructor method
child class member init
child constructor block
child constructor method

```java
class Parent {
  // constructor block
  {
    System.out.println("a");
  }
  // constructor method
  public Parent(){}
  // static block
  static {
    System.out.println("static");
  }
  // class member
  int a;
}
```
static method = class method

# char constant
"a": string constant
'\123': 'S' = 8-bit system

#
cannot call class member in static block

# GC
copy algorithm:
- 2 region A,B, move between A,B

mark algorithm: 
- mark accessible object, collect not accessible objects

segment appears
=> mark-management algorithm

Serial New: new generation, copy algo
serial old: new gen copy algo, old gen mark
Parallel new: new gen copy algo, old gen mark algo
parallel scavenge: new gen mark algo
parallel old: old gen mark
CMS: mark
G1: global mark, local copy

# forward
server will directly access URL, but not transfer control

# interface abstract
all method defined on interface are public and abstract by definition

# double
double d = 5.3e12;
- correct

```java
double d = 3; // correct: auto boxing
Double d = 3; // wrong. auto box must correspond to type
Double d = 3.0; // correct
```

#
```java
int i=5;
int s = (i++)+(++i)+(i--)+(--i);
// 5+7+7+5
```

# class loader
1. Bootstrap Classloader
load all class in jre/lib/rt.jar 
2. Extension ClassLoader
load jar with extension function (jre/lib/*.jar)
3. App ClassLoader
record down asigned jar package in classpath and class in directory
4. Custom ClassLoader
eg. tomcat, jboss self-defined ClassLoader by j2ee standard

Check if class loaded:
- custom classLoader -> app classloader -> extension classloader -> bootstrap classloader

Bootstrap classloader is native code, other classloader are Java class


# ThreadLocal
threadlocal is not to solve problem of shared variable, not manage sync
- mechanism manage each thread's state, each thread get copy of initial value


# spring transaction management
spring only has method level, not class level

# transaction
mandatory: must in transaction
nested: run in nested transac
never: never in transaction
not_supported: if trans, suspend method
required: if not, new
requires_new: run in own transac
supports: can join transac, not necessary

# Servlet
Servlet
  init
  getServletConfig
  service
  getServletInfo
  destroy

HttpServlet
  doGet
  doHead
  doPost
  doPut
  doDelete
  doOptions
  doTrace

RequestDispatcher
  forward
  FORWARD_CONTEXT_PATH
  FORWARD_PATH_INFO
  FORWARD_QUERY_STRING
  RORWARD_REQUEST_URI
  FORWARD_SERVLET_PATH


# db source in spring
DBCP
C3P0
DriverManagerDataSource
JNDI

# spring check
ApplicationContext init will check if correct
BeanFactory will throw exception if first time use not injected

# Collection, Map interface
Collection interface: List, Set, Queue, sortedSet
Map interface: HashMap, HashTable, TreeMap, IdentityHashMap, WeakHashMap

# Float
```java
Float f = 1.0f // correct
Float f = 1.0  // wrong
```

# SQL
Statement
PreparedStatement
CallableStatement
-------
BatchedStatement: not standard

# access static variable
static variable can be accessed by class or object of that class, same effect


# wait
wait() will release lock

# internal lock
only way to get interna lock is to enter synchronized block

# 
for function foo(){
  a += 1;
}

output can be (3,2), (2,3), (3,3), (2,2)








