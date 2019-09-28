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




























