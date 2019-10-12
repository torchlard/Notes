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










