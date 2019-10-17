# Installation
window: scoop
mac: macPorts, Homebrew
linux: sdkman

# Use
## starters
set of convenient dependency descriptor can include in applicaiton
contains lot of depenedencies needed
format: `spring-boot-starter-*`

### examples
spring-boot-starter: core
aop

activemq, amqp
artemis: JMS messaging using Apache Artemis
websocket

batch: use spring Batch
cache, cloud-connectors
data
  - cassandra[-reactive]
  - couchbase[-reactive]
  - elasticsearch, jdbc, jpa, ldap
  - mongo[-reactive], neo4j
  - redis[-reactive], 
  - rest: expose Spring Data repositories over REST using Spring Data REST
  - solr: Apache Solr
jdbc: use JDBC with HikariCP connection pool
jooq
jta-atomikos, jta-bitronix

web, web-services, webflux
hateoas: hypermedia-based restful web application
integration
jersey: restful using JAX-RS and Jersey
json
mail

oauth2-client, oauth2-resource-server
security

quartz: Quartz scheduler

test

groovy-templates, freemaker, mustache

vaidation
actuator: production ready features to monitor and manage application

jetty,tomcat,undertow
reactor-netty

log4j2, logging: logback

## layout
```
com
  example
    myapplication
      Application.java
      customer
        Customer.java
        CustomerController.java
        CustomerService.java
        CustomerRepository.java
      order
        Orer.java
        OrderController.java
        OrderService.java
        OrderRepository.java
```

## Configuration
favor Java-based configuration
`@Import` import additional configuration classes

## XML config
if use XML, start with `@Configuration`, then use `@ImportResource`

## Auto config
at any point start own config to replace specific parts of auto-configration

`@EnableAutoConfiguration(excluded={DataSourceAutoConfiguration.class})`
exclude specific config

## Dependency injection
```java
@Service
public class DbAccountService implements AccountService {
  private final RiskAccessor riskAccessor;

  @Autowired
  public DbAccountService(RiskAccessor riskAccessor){
    this.riskAccessor = riskAccessor;
  }
}
```

@SpringBootApplication = @EnableAutoConfiguration + @ComponentScan + @Configuration 
@Configuration = allow register extra beans in context / import additional config classes

## developer tools
developer tools auto disabled when running fully packaged appliction
if app launched from `java -jar` / special classloader => considered production application

application use `spring-boot-devtools` auto restart whenever files on classpath changes

if IDE continuously compiles changed files, may prefer trigger restarts only at specific times
=> trigger file: special file must be modified when trigger restart check

### customize restart classloader
restart implemented by 2 classloaders
default any open project in IED loaded with "restart" classloader
any regular `.jar` loaded with "base" classloader

`restart.include`: items pulled up into "restart" classloader
`restart.exclude`: pushed down into base classloader

can deploy remotely
`spring.devtools.remote.secret=mysecret`

### File system watcher
poll class changes with certain time interval, 
then wait predefined quiet period to make sure no more changes

```
spring.devtools.restart.poll-interval=2s
spring.devtools.restart.quiet-period=1s
```

# SpringBoot
## customize banner
can be changed by `banner.txt` in classpath / `spring.banner.location`

off banner
```java
SpringApplication app = new SpringApplication(MyApp.class);
app.setBannerMode(Banner.Mode.OFF);
app.run(args);
```

## fluent builder
build ApplicationContext hierarchy (multiple context with parent/child relation)
```java
new SpringApplicationBuilder().sources(Parent.class).child(Application.class)
  .bannerMode(Banner.Mode.OFF).run(args);
```

## Application Event and listener
events triggered before ApplicationContext created, so cannot register listener by @Bean
`SpringApplication.addListeners(...)`

ApplicationStartingEvent: sent before any processing
ApplicationEnvironmentPreparedEvent: before context created
ApplicationPreparedEvent: sent before refresh started
ApplicaitonStartedEvent: sent after context refreshed
ApplicationReadyEvent: sent after app/command-line runner called
ApplicaitonFailedEvent: sent when exception at startup

event pushed in child context -> also to parent context
application context injected and compare with context of event
=> implement `ApplicationContextAware` / @Autowired

## Web environment
MVC present -> AnnotationConfigServletWebServerApplicationContext
MVC not present, WebFlux present -> AnnotationConfigReactiveWebServerApplicationContext
else -> AnnotationConfigApplicationContext

CommandLineRunner: arg as simple string array
ApplicationRunner: arg as ApplicationArguments

use `org.springframework.core.Ordered` to define multiple runner orders

## application exit
```java
@Bean
public ExitCodeGenerator exitCodeGenerator(){
  return () -> 42;
}
```

## externalized configuration
properties considered in following order:
1. ~/.spring-boot-devtools.properties
2. @TestPropertySource
3. @SpringBootTest(properties attribute)
4. command line args
5. SPRING_APPLICATION_JSON
6. ServletConfig init param
7. Servletcontext init param
8. JNDI attr from java:com/env
9. System.getProperties()
10. OS environment variable
11. RandomValuePropertySource
12. application-{profile}.properties outside packaged jar
13. application-{profile}.properties in packaged jar
14. application.properties outside packaged jar
15. application.properties in packaged jar
16. @PropertySource in @configuration class
17. default properties 

`SPRING_APPLICATION_JSON='{"acme":{"name":"test"}}' java -jar myapp.jar`
`java -Dspring.application.json='{"name":"test"}' -jar myapp.jar`

SpringApplication converts any command line option arg (started with `--`, eg. `--server.port=9000`)
to property, add them to Spring `Environment`

### propeerty file
loads properties in `application.properties` from
1. /config subdirectory of current directory
2. current directory
3. classpath /config package
4. classpath root

java -jar myproject.jar --spring.config.name=myproject
--spring.config.location=classpath:/default.properties

### profile specific properties
application-{profile}.properties
Environment has set of default profiles

YAML file cannot loaded using `@PropertySource`

### type safe configuration properties
```java
@ConfigurationProperties("acme")
public class AcmeProperties {
  private boolean enabled;
  public boolean isEnabled(){...}
  public void setEnabled(boolean enabled){...}
  private InetAddress remoteAddress;
  ...
  public static class Security {
    private String username;
    ...
  }
}

acme.enabled
acme.remote-address
acme.security.username
```
getters and setters usually mandatory
if nested POJO properties initialized, setter not required

```java
@Configuration
@EnableConfigurationProperties(AcmeProperties.class)
public class MyConfiguration {}
```
need to list properties class to register 
bean name here is `acme-com.example.AcmeProperties`

```java
@ConfigurationProperties(prefix="another")
@Bean
public AnotherComponent anotherComponent(){...}
```
any property start with `another` maped to AnotherComponent


### relaxed binding rules
Kebab case (recommended): `acme.my-project.person.first-name`
standard camal case: `acme.myProject.person.firstName`
underscore (alternative): `acme.my_project.person.first_name`
upper case format (for system environment variable): `ACME_MYPROJECT_PERSON_FIRSTNAME`

### unit
#### time
ns, us, ms, s, m, h, d

#### data size
B, KB, MB, GB, TB

@Value: core container feature

| feature           | ConfigurationProperties | Value |
| ----------------- | ----------------------- | ----- |
| Relaxed binding   | yes                     | no    |
| meta-data support | yes                     | no    |
| SpEL evaluation   | no                      | yes   |


# Logging
support java util logging, Log4J2, logback
log level: error, warn, info, debug, trace

color-coded output: `spring.output.ansi.enabled`

## file output
default log only to console, not write to log file
`logging.file` / `logging.path`

log files rotate when reach 10MB, ERROR,WARN,INFO logged by default

## log group
group related log together to config at same time
`logging.group.tomcat=org.apache.catalina, org.apache.coyote, org.apache.tomcat`
`logging.level.tomcat=TRACE`

predefined:
sql = org.springframework.jdbc.core, org.hibernate.SQL

# internationalization
localized message 
spring.messages.basename=messages,config.i18n.messages
- basename of resource bundle

# JSON
Gson, Jackson(preferred,default), JSON-B

# Web application
## auto config
- ContentNegotiatingViewResolver, BeanNameViewResolver beans
- serve static resources, include WebJars
- auto register Converter, GenericConverter, Formatter
- HttpMessageConverters
- MessageCodesResolver
- static index.html
- custom Favicon
- ConfigurableWebBindingInitializer

keep MVC features, add additional MVC configuration (interceptor,formatter,view controller...)
=> add @Configuration class of WebMvcConfigurer without @EnableWebMvc
declare WebMvcRegistrationsAdapter to provide custom
- RequestMappingHandlerMapping, RequestMappingHandlerAdapter, ExceptionHandlerExceptionResolver

## HttpMessageConverters
covert http requests and responses
eg. obj auto convert to JSON/XML
- default UTF-8

```java
@Bean
public HttpMessageConverters customConverters(){
  HttpMessageConverter<?> additonal = ...
  HttpMessageConverter<?> another = ...
  return new HttpMessageConverters(additional, another);
}
```
## custom JSON serializer, deserializer
```java
import com.fastxml.jackson.core.*;
import org.springfframework.boot.jackson.*;
@JsonComponent
public class Example {
  public static class Serializer extends JsonSerializer<SomeObj>{...}
  public static class Deserializer extends JsonDeserializer<SomeObj>{...}
}
```
## MessageCodesResolver
generate error code for rendering error msg

## static content
server from /static OR /public OR /resources OR /META-INF/resources
modify behavior by adding WebMvcConfigurer, overriding addResourceHandlers

`spring.mvc.static-path-pattern=/resources/**`
don't use src/main/webapp if application packaged as jar, works only with war packaging

## path matching
request `GET /projects/spring-boot?format=json` map to `@GetMapping("/projects/spring-boot")`

spring.mvc.contentnegotiation.media-types.markdown=text/markdown
spring.mvc.contentnegotiation.favor-path-extension=true

## error handling
default `/error` mapping that handles all errors
registered as global error page in servlet container

implement ErrorController, register bean definition of that type, add bean type ErrorAttributes
```java
@ControllerAdvice(basePackageClasses=AcmeController.class)
public class AcmeControllerAdvice extends ResponseEntityExceptionHandler {
  @ExceptionHandler(YourException.class)
  @ResponseBody
  ResponseEntity<?> handleControllerException(HttpServletRequest req, Throwable ex){
    HttpStatus status = getStatus(req);
    return new ResponseEntity<>(new CustomErrorType(status.value(), ex.getMessage()), status);
  }
}
```

## Custom Error Page
```
src/
  main/
    resources/
      templates/
        error/
          txx.ftl
        <other templates>
```
## CORS
@CrossOrigin
```java
@Bean
public WebMvcConfigurer corsConfig(){
  return new WebMvcConfigurer(){
    @Override
    public void addCorsMapping(CorsRegistry registry){
      registry.addMapping("/api/**");
    }
  }
}
```

# WebFlux
no servlet API, fully async and non-blocking, implements Reactive Streams spec 
functional / annotation based

```java
// annotation
@RestController
@RequestMapping("/users")
public class MyRestController {
  @GetMapping("/\{user}")
  public Mono<User> getUser(@PathVariable Long user){...}

  @GetMapping("/\{user}/customer")
  public Flux<Customer> getUserCustomers(@PathVariable Long user){...}
}

// functioinal
@Configuration
public class RoutingConfiguration {
  @Bean
  public RouterFunction<ServerResponse> monRouterFunction(UserHandler userHandler){
    return route(GET("/\{user}").and(accept(APPLICATION_JSON)), userHandler::getUser)
      .andRoute(GET("/\{user}/customer").and(accept(APPLICATION_JSON)), userHandler::getUserCustomers);
  }
}

@Component
public class UserHandler {
  ...
}
```
## auto config
configure codesc for HttpMessageReader, HttpMessageWriter
serve static resource

- use HttpMessageReader, HttpMessageWriter convert HTTP req and res
- config with CodecConfigurer

support freemaker, thymeleaf, mustache

WebFilter implemented to filter HTTP req-res exchanges
- MetricsWebFilter, WebFilterChainProxy, HttpTraceWebFilter

can also use JAX-RS programming model for REST endpoints, instead of Spring MVC

# Embedded servlet container
support embedded tomcat, jetty, underflow

for more flexible filters, 
use ServletRegistrationBean, FilterRegistrationBean, ServletListenerRegistrationBean

embedded servlet container don't directly execute servlet 3.0+
for servlet context init, implement `web.servlet.ServletContextInitializer`

@WebServlet, @WebFilter, @WebListener enabled using @ServletComponentScan

springboot use different type of ApplicationContext for embedded servlet container support
ServletWebServerApplicationContext = special WebApplicationContext bootstrap itself by searching for single ServletWebServerFactory
- TomcatServletWebServerFactory, JettyServletWebServerFactory, UndertowServletWebServerFactory

## customization
network
session
error management
SSL
HTTP compression

- try best to expose common settings
- dedicated namespace offer server specific config (eg. server.tomcat)


# Security
rely on spring security content negotiation whether to use httpBasic / formLogin
method-level secutiry: @EnableGlobalMethodSecurity

default UserDetailService single user; username=user, password = <random gen>
- DefaultAuthenticationEventPublisher to publish authenticationevents

## OAuth2
OAuth2ClientProperties
OAuth2LoginAuthenticationFilter default process url matching `/login/oauth2/code/*`
WebSecurityConfigurerAdapter

for common OAuth2 and OpenID providers, including google,github,facebook, provide default xx
```
spring.security.oauth2.client.registration.my-client-id=abcd
spring.security.oauth2.client.registration.my-client.client-secret=password
spring.security.oauth2.client.registration.my-client.provider=google

OR

spring.secutiry.oauth2.client.registration.google.client-id=abcd
spring.secutiry.oauth2.client.registration.google.client-secret=password
```
## Actuator security
for security, all actuator other than /health and /info disabled by default 


# Caching
suported cache provider:
- generic, JCache, EhCache, Hazelcast
- Infinispan, Couchbase, Redis, Caffeine, Simple

force cache provider by `spring.cache.type`

## Generic
>= 1 org.springframework.cache.Cache bean
CacheManager wrap all beans of that type

## JCache
javax.cache.spi.CachingProvider

## Redis
RedisCacheManager auto-configured
additional cache: spring.cache.cache-names=cache1,cache2

## Caffeine
Java8 rewrite of Guava's cache

## Simple
if none of provider found, simple implementation using ConcurrentHashMap as cache store


# Messaging
extensive support for integrating with messaging system

JMS API: JmsTemplate, AMQP: RabbitTemplate
websocket natively support STOMP

## ActiveMQ
```
spring.activemq.broker-url=tcp://192.168.1.210:9876
spring.activemq.user=admin
spring.activemq.password=secret
```

## Artemis
auto config ConnectionFactory


# RestTemplate
call remote REST service from application, can use RestTemplate class
need customized before being used
auto configure RestTemplateBuilder, to create RestTemplate instances

narrow scope: inject auto-configured RestTemplateBuilder
application-wide: RestTemplateCustomizer

for WebFlux, use WebClient to call remote REST service



# Actuator Endpoints
built in endpoints

auditevents
beans
caches
conditions
configprops
env
flyway
health
httptrace
info
integrationgraph
loggers
liquibase
metrics
mappings
scheduledtasks
sessions
shutdown
threaddump

heapdump
jolokia
logfile
prometheus



















