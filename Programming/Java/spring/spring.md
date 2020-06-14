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

### meaning
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

## @Component VS @Bean
@Component, @Service, @Repository
  - for type
  - for auto-detect, auto-configure beans using classpath scanning
  - implicit one bean per class
  - control of wiring limited, purely declarative

@Bean
  - for method
  - explicitly declare single bean, rather than spring auto ddo it
  - let you create and configure beans


# Stereotype annotation
aim: automatic bean detection / discovery => spring managed component

## @Repository
in persistence layer/DAO layer
notify spring class contain logic to access data
- unchecked exception -> DataAccessException

## @Service
notfiy that class contains business logic
specification of @component (no additional behavior over @Compoennt)

## @Controller
for persentation layer (MVC controller)



# Tags
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

## principle
for dependency injection
when Spring managed bean discover annotation, inject related bean managed by Spring
- spring will scan custom defined package
- OR find bean method in config file 
object in signature must be bean managed by Spring

config
```xml  
<bean name="comment1" class="com.sss.Comment">
  <property name="text" value="Content of 1st comment" />
</bean>

<bean name="comment2" class="com.sss.Comment">
  <property name="text" value="Content of 2nd comment" />
</bean>
```
don't know which bean to inject -> need to specify by @Qualifier
```java
@Qualifier(value="comment1")
@Autowired
private Comment firstComent;

@Qualifier(value="comment2")
@Autowired
private Comment secondComment;
```


# Inheritance
to save time, allow bean inheritance, override value of any properties on child bean

# *Aware interface
ApplicationContextAware
BeanFactoryAware
BeanNameAware
ResourceLoaderAware
ServletContextAware
ServletConfigAware


# Bean
## meaning
create bean definition, like formula
similar to class, can instantiate multiple instance, injection config value and dep.
control scope different from java class scope

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
scan XML/annotated class/Java config class -> create bean instance -> inject bean depen.

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
```
Advice
  BeforeAdvice
    MethodBeforeAdvice
  AfterAdvice
    ThrowsAdvice
    AfterRunningAdvice
  Interceptor
    MethodInterceptor
```
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




# transaction propagation
when service method called by another method, must define how service propagate
eg. continue in current transaction / start new transaction

## propagation condition
- support current transaction
PROPAGATION_REQUIRED
PROPAGATION_SUPPORTS
PROPAGATION_MANDATORY

- not support current transaction
PROPAGATION_REQUIRES_NEW
PROPAGATION_NOT_SUPPORTED
PROPAGATION_NEVER

- other condition
PROPAGATION_NESTED

## transaction definition
default
read_uncommitted
read_committed
repeatable_read
serializable




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

### lifecycle
```
client request -> dispatcherServlet -> handler               -> HandlerMapping
      response <-      |            <- HandlerExecutionChain <-
                       v
          -----------------------------------             
          View   ViewResolver   HandlerAdapter <-> controller
```
request -> find handler -> handler chain -> request exec handler 
-> exec -> return ModelAndView -> View resolver -> return View -> View rendering


###
DisplatcherServlet: Controller
HandlerMapping: map user request to appropriate handler, eg. config file, interface, annotation
HandlerAdapter: use certain rule to run adapter


## JavaBean
JavaBean is only simple class, can inherit any class, cannot process HTTP data
Value bean, utility bean
follow getter, setter trandition

# Spring AOP IOC
## IOC
use reflection, let spring container manager
only write config, set field
prepare all before you sue

## AOP
use proxy
1. dynamic proxy -> decorator
2. static weaving, use special syntax to create aspect, create in compile time



# Testing
ValidationUtils


# Data Persistence
cater for NoSQL => 'Sprint Data' project



<!-- ================================ -->

## SpringBeanJobFactory



# annotation
## @AliasFor
1. explicit alias within annotation
2. for attributes in meta-annotation
- fine-grained control of which attributes overridden within annotation heirarchy
3. >=1 attributes within annotation declared

## @ConfigurationProperties
- @ConfigurationProperties(prefix="abc")
map to certain "xx.properties" file
```
abc.hostName
abc.port
```

## AuditorAware
@CreatedBy
@CreatedDate
@lastModifiedBy
@lastModifiedDate

```java
@Entity
@Data
@EntityListener({AuditingEntityListener.class})
public class Person {
  @CreatedBy
  @Column(name="xxx")
  private String createdBy;
}


@Component("xxx")
public class AuditorAwareImpl implements AuditorAware<String>{
  @Override
  public Optional<String> getCurrentAuditor(){
    ...
  }
}
```


# cache
1. declare some method use cache
2. config Cache support for Spring

## @Cacheable
get result directly from cache, no need re-run

can tag on method/class
method: support cache
key:
1. default strategy
2. custom defined strategy

assign 3 attrs: value(to identify cache), key, condition

```java
// only on cache1
@Cacheable(value="cache1", key="#id")
public User find(int id){}

// #p{index position}
@Cacheable(value="users", key="#p0")

@Cacheable(value="users", key="#user.id")
public User find(User user){}

// on both cache1 and cache2
@Cacheable("cache1", "cache2")
public User find(int id){}


@Cacheable(value={"users"}, key="#user.id", condition="#user.id %2 == 0")
```

builtin
```
methodName: #root.methodName
method: #root.method.name
target: #root.target
targetClass: #root.targetClass
args: #root.args[0]
caches: #root.caches[0].name
```
## @CachePut
each time run this method, and put into cache

## @CacheEvict
tag elements which cache need to be cleared

```java
// need to clear all elem in cache
@CacheEvict(value="uses", allEntries=true)
public void delete(Integer id){}

@Caching(
  cacheable=@Cacheable("users"),
  evict={
    @CacheEvict("cache2"),
    @CacheEvict(value="cache3", allEntries=true)
  })

```
default: run after method success
beforeInvocation: run before method success

## CacheManager
interface to manage cache
1. ConcurrentMap
2. Ehcache
generated by EhCacheManagerFactoryBean
(timeToIdle, timeToLive)


keyGenerator:
no param -> 0
1 param -> use that param
many params -> all param's hashCode















