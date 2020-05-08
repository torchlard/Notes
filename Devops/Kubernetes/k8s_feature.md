# feautres
## Workload scalability
applications packaged as microservices
adding support to stateless application (eg. Cassandra, MongoDB replica sets)

## High Availability
tackle availability of both infrastructure and applications
by means of:
- replica sets, replication controllers, pet sets
each component (etcd, API server, ndoes) can be configured for high availability

## security
API endpoint: TLS
Kubernetes API created automatically by API server
secret: Kubernetes object that contains small amount of sensitive data
- pod access secret at runtime through mounted volumes / environment variables

restricted network traffic
- network policy: how selections of pods allowed to communicate with each otehr & network endpoints

## portability
can choose any OS, cloud platform, virtualization environment


# functions
## Resource Management
ResourceRequest
  - combined set of resources being requested for container / Pod

ResourceLimit
  - upper boundary that container/pod can consume

ResourceCapacity
  - amount of resource available on cluster node

## Scheduling
pod matched to available resource
consider 
  - resource requirement, availability, user-provided constraints
  - QOS, affinity requirement, data locality

PriorityFunctions: score host that fit predicate by user-configurable priority functions
workloads has variable number of pods

## load balancing
spreading application load uniformly across variable number of lcuster

Kubernetes use pods to realize horizontal scaling
- when scale, multiple pods share common label across cluster hosts
- target number of pods running -> create/destroy pod to keep
- each pod with virtual IP
