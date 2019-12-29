# background
## other management tools
Docker datacenter, Mesosphere DC/OS (Mesos)

## other container implementations
LXD (Canonical), rkt (CoreOS), Windows Containers (Microsoft), CRI-O 
vSphere Integrated Container (VMWare)

## Container orchestration
influenced PaaS architecture in package, deployment, isolation, service discovery, 
scaling, rolling upgrades
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

```
cluster
  worker nodes
    pod
      container
```

# master
exposing API, schedule deployment, manage overall cluster
include API server, scheduler, controller, etcd

definition of Kubernetes object (pod, replica set, services) submitted to master
-> by requirement, availability of resource
-> schedules pod on specific nodes
-> node pulls image from container image registry
-> work with local container runtime to launch container

use `kubectl` to communicate

## API server
only entrance for all resource, do auth, authorization, access control
API registration, discovery

## scheduler
## controller manager
failure detection, auto scal in/out, rolling update

## etcd
keep running state of cluster


# Node
runs container runtime, eg. Docker, rkt
run two process: kubelets, kube-proxy

logging, monitor, service discovery, optional add-on
can be VM / bare-metal servers

## kubelet
communicate with master, maintain container lifecycle
CSI (container storage interface)
CNI (container network interface)

## kube-proxy
service abstract multiple pods, provide virtual IP

reposible for service & pod config => produce iptables rule
- direct traffic to service virtual IP to on right nodes


# pod
core unit of management, collection of >= 1 containers
each pod unique IP, not exposed outside cluster without service
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

# Service & label
abstraction define logical set of Pods and policy to access them => micro-service
Pods target by Service determined by Label Selector

service route traffic across set of pods
service = abstraction that allow pods to die and replicate in k8s without affecting app
discovery & routing among dependent pods handled by k8s services

eg
```
label = appB/A
label selector: A->appA, B->appB

node1: pod1 (app B)
node2: pod2 (app B), pod3 (app B)
node3: pod4 (app A)

```


# API
## Ingress
manage external access to services in cluster, typically HTTP
  - load balance, SSL termination, name-based virtual hosting
need ingress controller to satisfy ingress
  - support GCE and nginx controllers

additional controller:
- HAProxy, Istio, Kong, Traefik
can deploy any number of ingress controllers within cluster


# tools
## Minikube
for run Kubernets locally, run single-node
support DNS, NodePorts, ConfigMaps, Secrets, Dashboard, Container Runtime, ingress

















