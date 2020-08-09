## this()
this reference to certain constructor signature

```java
public class Rectangle {
  private int x,y;
  private int width,height;

  public Rectangle(){
    this(0,0,1,1);
  }
  public Rectangle(int width, int height){
    this(0,0,width, height);
  }
  public Rectangle(int x,int y,int width, int height){
    this(x,y,width,height);
  }
}
```
# lambda
functional interface = interface contains only one abstract method

```java
interface CheckPerson {
  boolean test(Person p);
}
// using java.util.function simplify to 
interface Predicate<Person> {
  boolean test(Person t);
}
```

Consumer<T> interface has method `void accept(T t)`

## compile
.class -> normal class
$xx.class -> inner class
```java
class C {}
class A {
  class B {}
  public void f2(){
    C c = new C(){};
  }
  public void f1(){
    B c = new B(){};
  }
}
```
C.class, A.class, A$B.class, A$1.class, A$2.class

using lambda can avoid creating '.class' file
not new object, but put code in memory, ~ call function

## only write method name
```java
interface B {
  public void doStringWork(String s);
}
interface C {
  public double doCompWork(float x, float y);
}

public class A {
  public A(){
    B b = this::printOnce;
    b.doStringWork("hwllo");
  }
  public static void main(String[] args){
    B b = A::printTwice;
    b.doStringWork("hi");
    new A();
  }
  public static void printTwice(String s){
    System.out.print(s);
    System.out.println(s);
  }
  public void printOnce(String s){
    System.out.println(s);
  }
}
```

# Null checking
```java
Stream.of("a","c",null,"d")
      .filter(Objects::nonNull)
      .forEach(System.out::println);

```

## Optional
```java
public String getUserName(User user){
  Optional<String> userName = Optional.ofNullable(user).map(User::getName);
  return userName.orElse(null);
}
```
get: unsafe
orElse: default value for null
orElseGet: delayed version of orElse
orElseThrow: ~get, custom Exception
ifPresent

# Thread
```java
I: Runnable  void run()
I: Callable<T>  T call()

ExecutorService:
<T> Future<T> submit(Callable<T> task)
Future<T> submit(Runnable task)
<T> Future<T> submit(Runnable task, T result)

I: Future<T>
C: FutureTask<T> implements RunnableFuture<T>
I: RunnableFuture<T> extends Runnable, Future<T>


```
Future: cancel, query Runnable, Callable tasks, get result
- determine if task finished
- can interrupt task
- get result of task

boolean: cancel, isCancelled, isDone
Type: get(), get(timeout, unit)

## Thead VS Runnable
when extends Thread class, no chance of extending any class
if implement Runnable, can extend other class

## sync execution
```java
Thread t1 = new ThreadA();
Thread t2 = new ThreadA();
t1.start();
t2.start();
```
## async execution
```java
Thread t1 = new Thread()
```

# IO
based on stream, flow of data from writer to reader
abstract class: 
- InputStream, OutputStream
- lowest-level byte streaming

Reader, Writer: abstract class, deal with character, correctly handle unicode chars
System.in, System.out, System.err

InputStreamReader, OutputStreamWriter
`InputStreamReader reader = new InputStreamReader(System.in, "UTF-8")`

## Stream wrapper
BufferedInputStream: filter stream reads ahread and buffer certain amount of data
DataInputStream: eg. read double value [readDouble()]

PrintWriter: println

## resource path
1. simply open file and read bytes
2. construct URL pointing to location in filesystem or network

`URL reousrce = MyApp.class.getResource("/config/config.xml"); `
resource located relative to given class file / system classpath

## serialization
can serialize object, including any object reference
capture entire graph of interconnected objects


# java.net
## socket
Sockets (TCP), DatagramSockets (UDP)
MulticastSockets: variant of DatagramSocket

# Reactive programming
better than Future API
Java reactive stream: earliest implementation is RxJava
Reactive Stream Specification, define Publisher/Subscriber/Subscription

combine observer pattern and iterator pattern

## api
Publisher<T> {
  subscribe(Subscriber<? super T> s): add given Subscriber if possible
}
Subscriber<T> {
  onSubscribe(Subscription): async send subscription
  onNext(T t): invoke with subscription's next item
  onError: when Publisher/Subscriber has error
  onComplete: finish sending data, and no error to cease subscription
}
Subscription {
  request(long n): subscriber request some item
  cancel: subscriber cancel request
}
Processor<T,R> extends Subscriber<T>, Publisher<R>:
  for data conversion among Subscriber and Publisher

default implementation
- SubmissionPublisher, ConsumerSubscriber

## Flow
establish flow-controlled components in which Publishers produce tiems consumed by >=1 Subscribers, each managed by Subscription
- reactive-streams specification

publisher ----------- subscriber
    <-- subscribe [call Publisher's subscribe]
[call Subscriber's onSubscribe] send subscription -->
    <-- request n items [call subscription's request]
[call Subscriber's onNext] send <= N items --> 
[call Subscriber's onComplete] send end of stream notification -->


# static
normal method and variable within class, need to instantiate class before use
static variable and method allocated memory in first place, no need instantiate before use

meaning: avoid creating new object each time
eg. call Math.sin(x)

static is in fact global function

## variables
1. class variable
- must be initialised in `static` block / xvariable declaration
2. instance variable
- must be non-static init block / variable instance declaration / constructor


# final
functionality
1. const for variable
2. cannot inherit for class and method -> destination
3. can be overloaded
for object, it only keep reference constant, but you can change field value

wrapper class (Integer, Boolean ...) and String are final


# == VS equals
== : compare if same object
equal: compare if values equal

literals is not object, so cannot directly access object's method

# switch
if no break, then matching key is entry point, 
run until break;


# Collection
Base: Collection
Interface: List, Queue, Deque
Class: ArrayList, LinkedList, ArrayDeque

# Set
HashSet: use hash to store data, no certain order
LinkedHashSet: order by insertion order, allow iterate inserted element
TreeSet: use tree structure to store elements, ascending order, fast access and iteration

# byte overflow
when calculation of byte number exceed limit 127, result = n - 256

periodic:
0 to 127 -> -128 to -1 -> 0 to 127 -> ...

# StringBuilder
StringBuffer: thread-save (with lock), less efficient
StringBuilder: not thread-save, ~StringBuffer, most efficient
+: normal string concat, order of magnitude least efficient


# stream
## intermediate
map, filter, distinct, sorted, peek, limit
skip, parallel, sequential, unordered
## terminal
forEach, forEachOrdered, toArray, reduce
collect, min, max, count, anyMatc, allMatch, noneMatch
findFirst, findAny, iterator
## short-circuiting
anyMatch, allMatch, noneMatch, findFirst


# simulate default paramter
1. method overloading
2. Varargs
3. Nulls
4. Optional class
5. Builder pattern
```java
class Foo {
  private final String a;
  private final Integer b;

  Foo(String a, Integer b){
    this.a = a;
    this.b = b;
  }
  // ...
}
class FooBuilder {
  private String a = "";
  private Integer b = 0;
  FooBuilder setA(String a){
    this.a = a;
    return this;
  }
  FooBuilder setB(Integer b){
    this.b = b;
    return this;
  }
  Foo build(){
    return new Foo(a,b);
  }
}

Foo foo = new FooBuilder().setA("a").build();
```
6. Maps


# annotation
auxiliary object, itself has effect
its effect depedns on object that annotation rely on 

at compile time, compiler check elements of annotation
eg. @Override, @Deprecated, @SuppressWarnings

## 
@SuppressWarnings("unchecked")
- tell compiler that we are doing sth legal about generic


# notation
## %n VS \n
%n: platform independent
\n: only applied to *nix platform

# Javax & java
javax already becomes part of standard Java API, no difference


# &,&&  |,||
& : binary operator
&& : and
| : binary operator
|| : or


# hashcode
typically use memory address -> hash
sometimes hash collision => even same hash don't mean same object


# Observer(interface), Observable(class)
extends Observer class to be observer
extends Observable class to be objects that can be observed
- define functions to set data


# Exception
Throwable -> Exception -> RuntimeException
                       -> IOException

## checked exception
exception that must be either caught or declared in method in which it is thrown
- eg. java.io.IOException
```java
public void ioOperation(boolean isResourceAvailable){
  if(!isResourceAvailable){
    throw new IOException();
  }
}
```

## unchecked exception
Exception that can be thrown without being caught or declared

## runtime exception
kind of unchecked exception

### how to deal it
if occur in backend
1. log it and return
2. rethrow it
3. construct new exception by passing current one in constructor


















