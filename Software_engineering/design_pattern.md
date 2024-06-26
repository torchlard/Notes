# meaning
- reusable solution to commonly occuring problem within given context in software design
- only template for how to solve problem
- intermediate between programming paradigem and concrete algorithm

# types
## creational pattern
create objects while hiding creation logic, rather than instantiating object using new

1. Abstract factory
class requests object created from factory object
- abstract relation among objects, say clothes and weapon are independent, but realated by person
2. Factory
centralize object creation of specific type by choosing one of several implementation
- focus on how to create an objet
3. Builder
same construction process create different representation
4. Dependency Injection
class accept object from injection instead of creating objects directly
5. Lazy initializawtion
delay creation of object, wait until first time needed
6. Object pool
avoid expensive acquisition and release of resource by recycling object not in use
7. Prototype
object type determined by prototypical instance, clone to produce new object
8. Singleton
restrict instance of class to one object
- provide unified method of accessing that object
- avoid wasting much resource

### builder VS Abstract factory
Builder: focus on constructing complex object step by step
- oftern build composite
- wrapper obj around all possible paramter might want to pass
Abstract factory: family of product objects (simple/complex)
- wrapper around constructor

Builder -> Abstract Factory / Prototype / Builder


## Structural pattern
concern class and object composition. use inheritance to compose interface, define ways to
compose objects to get new functionality

1. Adapter
adapts one interface for a class into one that client expects
- adapter pipeline: multiple adapter for debugging
- retofit interface: adapter use as new interface for multiple class at same time
2. Aggregate
version of composite pattern, with methods for aggregation of children 
3. Bridge
decouple abstraction from implementation, two vary independently
4. Composite
every object has same interface that can combine together
5. Decorator
addtional functionality to class at runtime, when subclassing result in exponential rise of new class
6. Extensibility
framework, to hide complexity behind simple interface
7. Facade
single class provide simplified methods, delegate calls to methods of existing system class
create simplified interface of existing interface to ease common task
8. Flyweight
when large amount of objects (eg. 10,000 required), try to reduce memory usage by reducing number of objects
try to reuse already exising similar kind objects
9. Marker
empty interface to associate metadata with class
10. Pipes and filters
chain processes where output link to input of next
11. Opaque pointer
pointer to an undeclared or private type, hide implementation details
12. Proxy
class functioning as interface to another thing


## Behavioral pattern
concern with communication between objects
increase flexibility carrying out communication
- how to assign responsibilities between objects 
- to manage complex control flow that is difficult to follow at runtime

1. chain of responsibility
command object handled / passed on to other objects 
2. command
command object encapsulate action and its parameter
- command implementation choose method to invoke on receiveer obj
- change Command implementation without changing clien code
3. interpreter
implement specialized computer language to solve specific problems
- ~ DSL
4. iterator
iterators used to access elements of an aggregate object sequentially without exposing its representation
5. mediator
unified interface to set interface in subsystem
6. memento
can restore object to previous state
7. null object
designed as default value of object
8. observer
publish/subscribe or event listener, obj register to observe event raised
9. protocol stack
communication handled by multiple layers
10. scheduled-task
task scheduled to perform at particular interval (in real time computing)
11. single-serving visitor
optimize implementation of visitor allocated, used only once and then deleted
12. specification
recombine business logic in boolean fashion
13. state
for object to change its type at runtime
- change state and do action based on state
14. strategy
algorithm selected on fly using composition
15. template method
algorithm selected on fly using inheritance
16. visitor
- perform operation on group of similar kind of Objects
- move operational logic from an object to another class

### choice
1. use inheritance to distribute behavior
template probide abstract definition; Interpreter represent grammar as class hierarchy
2. use composition
Mediator(adapter) avoid strong coupling among objects
Chain of Responsibility even looser coupling, send request to object implicitly throught chain of candidate objs
3. state change
Observer define and maintain dependency between objects, eg. MVC
4. encapsulate behavior in object, delegate request
Strategy encapsulate algorithm; Command encapsulate request
State encapsulate state of object
Visitor encapsulate behavior distributed across class

## concurrency pattern
design pattern deal with multi-threaded environment

1. active object
decouple method execution from method invocation for objects, that each reside in their own thread of control
elements: proxy, scheduler, callback/variable
2. balking pattern

3. barrier
4. double-checked locking
```java
class Foo {
  private Helper helper;
  public Helper getHelper(){
    if (helper == null){
      synchronized(this){
        helper = new Helper();
      }
    }
    return helper;
  }
}
```
anti-pattern:
assume thread A check helper is not initialized, then it get lock and init variable
compiler allow A to update variable and point it to object before variable is initialized
thread B found that shared variable initialized, return variable -> program throw error

1. guarded suspension
2. leaders/followers
3. monitor object
4. nuclear reaction
5. reactor
6.  read write lock
7.  scheduler
8.  thread pool
9.  thread-lcoal storage

# Adapter pattern
convert interface into another interface client expects
lets classes work together that couldn't otherwise of incompatible interfaces
- provided class maybe mising methods / may have extra methods not necessary, want to hide


Client -> Target -> Adapter -> Adaptee
[Macbook] -> [Mini DP] -> [DP->VGA adapter] -> [projector]

# Decorator
subclass is compile-time operation, cannot be changed
runtime redirection
- inheritance, composition fixed at compile time

# Observer pattern
3 actor class: Subject, Observer, Client
Subject: object having methods to attach / detach observers to a client object
Observer: method to set object to watch, another method used by subject to notify them 








