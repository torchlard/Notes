# profile
java -jar -Dspring.profiles.active=dev build/libs/demo-0.1.0.jar

# annotation
@Component: any component that managed by Spring container
@Controller, @Service, @Repository: specific kind of component

@Repository: repository (Data layer, DAO), has auto exception conversion
@Service: service layer, link DAO and presentation
@Controller: presentation layer

## why service
in simple system, Service layer basically same as DAO layer
but even if simple app, should treat them differently

DAO: keep it simple, only implement CRUD & some abstraction to multiple DB
Service: contain business logic

adv
1. security: even client hacked, cannot attack DB directly
2. modular, extensible

### problems
traditional web-service-dao layer result in huge service layer
-> more like procedural code, not OO

for non-specific service:
1. business logic scattered in service layer
when search/test certain logic, difficult to find
redundant code
2. each entity has corresponding service class
too much dependency on service layer, even cyclic dependency
- ideally service layer should be single-responsibility, loosely coupled

### solution
1. make service specific
Domain service: put entity related business logic into same domain service
Application service: only deal with business logic
2. write service correspond to entity
service very small single responsibility
eg. put person curd & account related operation into different services

## 3 service model in DDD
### Domain Service
place domain object related business logic, but those logic not suitable inside entity
eg. BookBorrow service & entity(book, client, inventory)
- participate in decision making process (same way entities & value objects do)

### Application service
provider app service to extenal client / customer
eg. client run CRUD for certain entity
use domain service & repository to deal with external request
- make sure app service not contain any domain service
- hint: order of calling domain service not affect result

### Infrastructure service
abstract certain technical issue
eg. msg queue, email service

#### work flow
1. prepare all info needed for business operation
2. load participating entities from DB -> retrieve any required data from external source
3. execute operation, operation with >= 1 business decision made by domain model
4. decision result change model's state, generate artifact
5. apply result of operation to outside world

for simple CRUD app, no step 3,4 => all operations performed by application service

# Java
## BIO
- each connection 1 thread
for few connection and fixed architecture
only option before jdk 1.4
## NIO
- each request 1 thread
for many and short-time connections
eg. instant messaging server
support after jdk 1.4
## AIO
non-blocking async, each effective request 1 thread
for many and long-time connection
support after jdk 1.7

# Tomcat mode
## BIO
blocking sync IO, each request one thread => not good for high concurrency
tomcat <= 7 
## NIO
tomcat >= 8, default NIO
non-blocking sync IO, each request one thread
- connection registered in multiplexer
- only deal with IO when IO request
+ use single thread/CPU/few thead/few CPU accept socket
+ thead pool manage threads in pipe / pool

## APR
Apache Portable Runtime, library support Apache HTTP server
read write mode based on JNI file, higher version tomcat default this one
- Tomcat use JNI to call Apache HTTP's core DLL to manage files / network transfer

# Utility
## CommandLineRunner
funcitonal interface to indicate that bean should run when contained within SpringApplication



# Other
springboot add @EnableWebMvc automatically wehn see spring-webmvc on classpath



# Annotation
@Value
1. ${property: default_value}
2. #{obj.property ? : default_value }

inject default value







<!-- ==================================== -->

# gradle 
- collect all jar on classpath, build single, runnable "xxx-jar"
- search `main()` flag as runnable class
- built-in dependency resolver set version number to match Spring Boot dependency



# command
gradle bootRun
mvn spring-boot:run





































