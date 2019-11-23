# gradle
mavenLocal: 
get dependency from local maven repository

gradlePluginPortal: 
treat portal like maven repository, looks for plugin marker poms (plugin id -> maven coordinates)

## plugins
maven-publish: pubish gradle project to maven repository
gradle-git-properties: produce git.properties for spring-boot-actuator
node-gradle.node: execute node scripts
net.ltgt.apt[-eclipse|idea]: easier to use Java annotation processor
sonarqube: run SonarQube analysis
io.spring.nohttp: ensure that `https://` is used for everything except when it's not possible

## jib
docker generator tool, use gradle instead of Dockerfile upload to repository
only for google contaienr center, amazon elastic container registry, docker hub registry

## defaultTasks
run if no task specified


# react
## react-loadable
load react components at runtime
reduce initial bundle size, save time


# core task
## auth 
1. jwt
2. OAuth 2.0, use OpenID Connect server
3. HTTP Session Authentication
4. JHipster UAA server

## db
SQL db 
mongodb
Cassandra
Couchbase
"no db"

- production, development db

## cache
spring cache abstraction
hiberate 2nd level cache

## others
Kafka
Swagger
Elastic search
Hazelcast (clustered http sessions)
  - using HTTP session cause issue if running in cluster
  - if not use load balancer with "sticky session"
websocket

## frontend
Angular
React


# blueprint
jhipster module that provide custom client/server side templates override default one
`jhipster --blueprint kotlin`

name of blueprint saved in `.yo-rc.json`, auto used when executing sub-generators like
- entity, spring-controller, spring-service

# entity
## field type
String, Integer, Long, Float, Double
BigDecimal, LocalDate, Instant, Duration
UUID, Boolean, Enumeration, Blob

## validation
html view (eg. react validation)
java domain objects, using Bean validation
  - when use in REST controller
  - JPA
more precise db column metadata
  - required, not null
  - unique field create unique constraint
  - max length

limitation:
only support common to both client and server API

## DTO
by default not use DTO, available optionally

## filtering

### pagination
no pagination
complete pagination system
infinite scroll system

## update existing entity
config stored in .json under .jhipster
can regenerate

```sh
for f in `ls .jhipster`; do jhipster entity ${f%.*} --force ; done
```



