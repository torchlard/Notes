# eureka
rest based service primarily used in AWS 
locate service for load balance and middle-tier servers
=> Eureka Server

Eureka client: java based client component
- interaction with service much easier
- built-in load balancer (round-robin load balance)

## objective
unlike traditionnal load balancer with many IP address and host name
- sophisticate in register & deregister servers on fly
- miss mid-tier load balancer

## VS elastic load balance (ELB)
elb
- for edge services exposed to end-user traffic
- proxy based load balancing at instance/server/host level

## VS route 53
route 53: 
- naming service => mid-tier servers
- DNS service

eureka: ~ internal DNS, nothing to do with DNS servers


## purpose
red/black deployments with netflix Asgard
- make siwtching between older/newer release quick + seamless
- cassandra deployment take instance out of traffic
- memcached cahching service to identify nodes in ring
- additional application specific metadata

## when use
middle tier service not register with AWS ELB / expose traffic from outside
looking for simple round-robin load balancing solution / write own wrapper 
no need sticky session and load session in external cache
favor client based load balancer

# high level architecture
application client: use Eureka Client to make requests to Application Service
application service: receive request from application client, sent response back

```
zone1
  application service
    eureka client
  application client
    eureka client

zone2
  application client
    eureka client

zone3
  application service
    eureka client
```
1 eureka_cluster/region, 1 eureka_server/zone
server register with Eureka, send heartbeats to renew leases every 30s
- if client cannot renew lease for few times => taken out of server registry in 90s
- client from any zone can lookup registry info (every 30s)


## non-java services, clients
REST based endpoints exposed for all operations supported by Eureka client

## config
add/remove client node on the fly

## monitoring
use servo track info in both client and server for performance & alert


# zuul
```
client -> load balance -> zuul cluster -> A service cluster [A1, A2, A3] 
                                       -> B service cluster [B1, B2, B3]

service registry Eureka                          
config service cluster

git repository
```
route dispatch and filter
eg. /api/user -> user service, /api/shop -> shop service

zuul + ribbon = load balance

## functions
authentication
insights
stress testing
canary testing
dynamic routing
service migration
load shedding
security
static response handling
active/active traffic management













