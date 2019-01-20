# concept
Inversion of control == Dependency injection

JavaBeans(POJOS) standard mechanism for creating java resource configurable in constructor & setter

## dependency pull
dependent object -> lookup -> JNDI registry <- container

## Contextualized dependency lookup
Dependent object -> lookup -> Container

## constructor dependency injection
dependency provided in its constructor
declares constructor, taking as arguments its dependencies

## Setter DI
IoC container inject component's dependencies via JavaBean-style setter method

## lookup VS injection
lookup style IoC for EJB
spring: injection style

lookup difficult to test in isolation from container
lookup design more complex

prefer setter injection
shouldn't always place setter for dep in business interface

Configuration VS Dependency
still need dependency lookup to access dependent object

Spring BeanFactory Container --DI--> Dependent object
IoC container can act as adapter between DI container and external dependency lookup container

## Bean
bean = component managed by container
BeanFactory: manage container, include dependency, life cycle

each bean assigned an ID, name
anonymous bean / inner bean

give bean more than one name for variety of aliases

## meaning
all properties private
default constructor
provide getter, setter
implement serializable

=> at beginning: standard for getting and setting value of object

## types
persistent object: for DB, cache
Value object: for frontend display
data transfer object: for interface to call each other, return value, data transfer, msg queue

## keyword
POJO: plain ordinary Java Object
- only has part of setter/getter method
- not follow any specific Java object model / framework (eg. EJB)

theoretically any Java Class can be Bean
-> normally Java Bean created by container (eg. Tomcat)
- should have parameterless constructor

Java Bean cannot accessed across process
component technology => reusable

EJB: very complicated kind of bean with many requirement

## Tags
Autowired: auto link bean from one bean (~ require)
Inject
Resource

# instantiate
## mode
1. shared object without state
2. shared object with read-only state
3. shared object with shared state
4. high-throughput objects with writable state
better keep singleton, sync all write access

use non-singleton when
1. object with writable state
cost sync > cost creating new instance for each request
2. objects with private state

## scope
Singleton: default, 1 obj per IoC container
Prototype: new instance per request
Request: per HTTP request
Session: per HTTP session
Global session: shared among all portlets within same app
Thread: per new thread
Custom: implement interface, register custom scope in config

# Autowire
1. byName
2. byType
same type in ApplicationContext
3. constructor
match greatest number of arguments in constructor
4. default
choose between Type and constructor automatically
5. no

# Inheritance
to save time, allow bean inheritance, override value of any properties on child bean

# Bean
- receive notification from Spring container
- make beans spring aware
interact with ApplicationContext instance that configure it
- FactoryBeans
bean act as factory for other beans
- JavaBeans PropertyEditor
bean property value <--> String representation
- use Java class for config
- Spring ApplicationContext

portability among IoC containers: be careful

## Bean lifecycle
### types
post-init
pre-destruction

interface-based
- beam implement interface specific to type of notification want to receive
- spring notify bean via callback in interface

method-based
- portability
- few beans of particular types that needs callback

annotation-based

### process
- Bean instantiation, DI
scan XML/annotated class/Java config class -> create bean instance -> inject bean dep

- Spring Awareness
BeanNameAware[setBeanName()] -> BeanClassLoaderAware[setBeanClassLoader()] -> ApplicationContextAware[setApplicationContext()]

- Bean creation
@PostConstruct -> InitializingBean[afterPropertiesSet()] -> init-method

- Bean Destruction
@PreDestroy -> DisposableBean[destroy()] -> destroy-method

### bean destruction
do when app shuts down
clean up any reousrce bean holding open

###
adv dependency injection over dependency lookup:
bean not need to ware of implementation of container that is managing them

## FactoryBean
adapter for objects that cannot be created and managed using 'new'

when need to instantiate JavaBeans by non-Spring application
define bean in xml

## Application Event
publish and receive events by ApplicationContext

event = class derived from ApplicationEvent
listen for event by implementing ApplicaitonListener<T>

ApplicationEventPublisher.publishEvent()

suitable for lightweight, non-critical events

## access resource
unified way to access resource
methods:
contentLength(), exists(), ...

## Java config
@Bean === `<bean>`
method name === `id`
setter injection by calling method to get message provider === `<ref>`

## annotation
@PropertySource: load properties file into ApplicationContext
@Lazy: instantiate bean only when requested
@Scope: define bean scope
@DependsOn: certain bean dpends on some other beans

## config
spring can mix XML and Java config class -> useful for legacy code

# Spring Boot
take guesswork out of manually gathering dependencies, provides some most common featres (eg. metrics, health checks)

get away from XML complexity
no configuration

# AOP
crosscutting concern = logic in app that cannot be decomposed from rest of application
-> code duplication, tight coupling

AOP for modularizing logic -> concerns
- AOP basics
- types of AOP
- spring AOP architecture

## Concept
Joinpoints: well-defined point during execution of application
- eg. call to method, method invocation
- define points insert additional logic using AOP

Advice: code executed at particular joinpoint
- eg. execute before, after joinpoint

Pointcuts: collection of joinpoint define when advice executed
- eg. method invocation, collection of all method invocations in particular class

Aspects: advice + pointcuts encapsulated in class

Weaving: insert aspects into code at appropriate point
- compile-time AOP: weaving at build time
- runtime AOP: weaving at runtime

Target: object that execution flow modified by AOP process

Introduction: process modify structure of object by adding method/fields to it

## types
static AOP
- weaving process form another step in build process
- need recompile entire app for modify

dynamic AOP
- weaving at runtime
- perform not as well as static AOP

## AOP in Spring
1. AOP core
2. set of framework services

spring AOP based on proxies

### implementation
JDK dynamic proxies (default)
CGLIB proxy

## Aspect in spring
PointcutAdvisor
IntroductionAdvisor

## Advice
Before: preprocessing before method executes
After-Returning: after method invocation at joinpoint, returned value
After: advised method completes normally
after throwing: when throw exception
aroung

-------------------

Advice
  BeforeAdvice
    MethodBeforeAdvice
  AfterAdvice
    ThrowsAdvice
    AfterRunningAdvice
  Interceptor
    MethodInterceptor


## AspectJ
joinPoint: what target function can be captured
pointcut(target method): method in joinPoint need to be cut into
Advice: action need to be done at pointcut
aspect: advice apply to what pointcut
weaving: process to apply pointcut to target function

### theory
#### JDK proxy
use JDK dynamic proxy, target obj need implement interface, callback
new proxy obj has all method in interface, rewrite invoke method

#### CGLIB
not require target object has interface
by inheritance, implement method interceptor, rewrite intercept()

## declarative options
1. use ProxyFactoryBean
2. Spring AOP namespace (XML)
3. @AspectJ-style annotations

## example





# servlet/tomcat/spring mvc relation
## servlet
receive and responce request from web client, across HTTP
generic servlet: implement javax.servlet.GenericServlet
HTTP servlet: implement javax.servlet.HttpServlet
lifecycle: init -> running -> destroyed

## tomcat
servlet container, control lifecycle of servlet
tomat receive request -> map to appropriate servlet -> if not loaded, load and compile servlet, run init -> response

## Spring MVC
MVC framework
Spring Boot use tomcat as default container
entry point of spring MVC = servlet (DispatcherServlet)

## JavaBean
JavaBean is only simple class, can inherit any class, cannot process HTTP data
Value bean, utility bean
follow getter, setter trandition





# Testing
ValidationUtils


# Data Persistence
cater for NoSQL => 'Sprint Data' project





















