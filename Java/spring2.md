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
Threead: per new thread
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














