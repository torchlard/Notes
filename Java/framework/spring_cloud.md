# what is spring cloud
ordered collection of list of framework
simplify development of distributed system
reuse spring boot framework, easy maintain and deploy

# features
1. distributed/versioned configuration
2. service registration and discovery
3. routing
4. service to service calls
5. load balancing
6. circuit breakers
7. global locks
8. leadership eletion, cluster state
9. distributed messaging

# main projects
- config: centralized external config management in git repo
- netflix: integrate with netflix OSS component
- Cloudfoundry
- open service broker: starting point to build service broker 
- cluster: leadership election & common stateful patterns for Zookeeper, redis, hazelcast, consul
- Consul
- Security
- Sleuth: distributed tracing, compatible with Zipkin, HTrace, log based tracing
- Data flow: cloud native rchestration service for 
- stream: event driven microservice framework, declarative send+receive msg using Kafka/RabbitMQ
- stream app starters: spring integration applications integrate with external system
- task: short-lived microservice framework with finite data processing
- task app starters: any process that not run forever
- zookeeper
- AWS
- connectors: easy for PaaS application in variety platforms connect to backend service like db, msg brokers
- starters: easy dependency management
- cli
- contract: help user implement cuonsumer driven contracts approach
- gateway: programmable router based on project reactor
- OpenFeign: autoconfig, bind to spring environment
- pipeline: opinionated deployment pipeline for zero downtime fashion, easy roll back
- function: implement business logic via functions, uniform programming model across serverless providers 

# Spring cloud context
operate by creating bootstrap context (parent context for main application)
- load configuration properties
application.properties / bootstrap.properties

every context in hierarchy has own bootstrap(maybe empty) property source
if exists config server, every context has different `spring.application.name`

SpringApplicationBuilder let share Environment amongst whole hierarcy


# start same client with different port
java -jar xxx.jar --server.port=8882


# spring cloud commons
service discovry, load balancing, circuit breakers


## config server
/{application}/{profile}[/{label}]
/{application}-{profile}.yml
/{label}/{application}-{profile}.yml
/{application}-{profile}.properties
/{label}/{application}-{profile}.properties

## config bus
set git server to store config
use config bus to auto refresh config fetch without restarting server
- using spring boot actuator
- rabbitmq as message bus

client send post requset `localhost:8881/actuator/bus-refresh` to config-client
- that client send msg to bus, bus refer msg to another config-client


# spring cloud sleuth
service tracing in distributed system
- each machine expose REST interface
- 1 service need multiple calling => complicated call stack

## terms
span: basic working unit, each new req make new span ID
  - use 64 bit unique ID 
trace: form tree sturcture with spans
annotation: record existence of an event, record req start and end time
  - client sent, client received
  - server sent, server received



















