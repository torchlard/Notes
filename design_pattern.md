# types
## creational pattern
create objects while hiding creation logic, rather than instantiating object using new

1. Abstract factory
class requests object created from factory object
2. Factory
centralize object creation of specific type by choosing one of several implementation
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
concern with communication between objects, increase flexibility carrying out communication

1. chain of responsibility
command object handled / passed on to other objects 
2. command
command object encapsulate action and its parameter
3. interpreter
implement specialized computer language to solve specific problems
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
14. strategy
algorithm selected on fly using composition
15. template method
algorithm selected on fly using inheritance
16. visitor
separate algorithm from an object

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








