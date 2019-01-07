# other management tools
Docker datacenter, Mesosphere DC/OS (Mesos)

# container implementations
LXD (Canonical), rkt (CoreOS), Windows Containers (Microsoft), CRI-O 
vSphere Integrated Container (VMWare)

# Container orchestration
influenced Paas architecture in package, deployment, isolation, service discovery, scaling, rolling upgrades
- deploy core container orchestration toools
- Paas implementaiton target developer

## engine
```
Cluster Maanger / Orchestration Engine
Cluster 3: app,app | Cluster n: app
Cluster 1: app,app,app | Cluster 2
VM VM VM VM VM VM
Physical infrastructure
```
# Kubernetes architecture
at least 1 master, multiple compute node
## master
exposing API, schedule deployment, manage overall cluster

definition of Kubernetes object (pod,replica set, services) submitted to master
-> by requirement, availability of resource
-> schedules pod on specific nodes
-> node pulls image from container image registry
-> work with local container runtime to launch container

use `kubectl` to communicate

## Node
runs container runtime, eg. Docker, rkt
- run two process: 
- kubelets: communicate with master
- kube-proxy: reflect Kubernetes networking services on each node
logging, monitor, service discovery, optional add-on
can be VM / bare-metal servers

## pod
core unit of management
collection of >= 1 containers
each pod unique IP
Pod itself doesn't run 
### manage multiple container
container inside Pod communicate using localhost
container communicate outside Pod -> coordinate how to use shared network resource (ports)
shared storage columes

## replica set
maintain pre-defined set of pods at all times
single pod / replica set exposed to internal/external consumer via services
discovery of pods
- associate set of pods to specific criterion
- key-value pairs (labels, selector)

## Service
abstraction define logical set of Pods and policy to access them => micro-service
Pods target by Service determined by Label Selector

## volume
a directory on disk / in another container
lifetime same as Pod, data preserved across Container restarts
if Pod ends, data lost

## namespace
Kubernetes support multiple virtual clusters backed by same physical cluster
Namespace intended for many users across multiple teams / projects
name of resources need to be unique within namespace, not across namespace
- divide cluster resource between multiple users
- objects in same namespace has same access control policy by default

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

# API
## Ingress
manage external access to services in cluster, typically HTTP
- load balance, SSL termination, name-based virtual hosting
need ingress controller to satisfy ingress
- support GCE and nginx controllers

additional controller:
- HAProxy, Istio, Kong, Traefik
can deploy any nuber of ingress controllers within cluster


# tools
## Minikube
for run Kubernets locally, run single-node
support DNS, NodePorts, ConfigMaps, Secrets, Dashboard, Container Runtime, ingress

















