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


# configuration
list of compulsory configuration types depends by action performed (init/join)
by config option used (defaults / advanced custom)
can override default values except some security settings (eg. enforce authorization-mode node)

## InitConfiguration
runtime settings
config boostrap token, all settings specific to node where kubeadm executed

- NodeRegistration: custom node name, CRI socket, setting to node only (eg. node ip)
- LocalAPIEndpoint: endpoint of instance of PAI server deployed on this node (eg. advertise address)

## ClusterConfiguration
cluster wide settings
- networking
- etcd configuration
- kube-apiserver, kube-scheduler, kube-controller-manager

## KubeProxyConfiguration
config to kube-proxy instance




### taints and toleration
node affinity: pods attracted to set of nodes
node taints: allow node to repel set of pods

ensure pods not scheduled onto inappropriate nodes


# kubeadm init
1. preflight: system env check, include os version, cgroup, port availability
2. generate certificate, default tls, put under /etc/kubernetes/pki
  - if want use own, copy to /pki/ca.crt, /pki/ca.key
3. generate api server config file, path `/etc/kubernetes`
  - admin.conf: tell kubectl connect to which api server
  - controller-manager.conf
  - kubelet.conf
  - scheduler.conf
4. generate pod config for api server, controller manager, scheduler, etcd  
  - put under `/etc/kubernetes/manifests`
5. check localhost:6443/healthz, wait for master completely init
  - after init, create boostrap token for cluster
6. install default plugin kube-proxy and dns; started as pod

# kubeadm join
any machine want to join cluster, must get ca certificate of server
use token to proof validity of node


# ConfigMap
reusable yaml config

# StatefulSet
deployment that can maintain state
when using StatefulSets need to use PV and PVC
statefulSet ensure same PVC stays bound to same Pod throughout its lifetime

## requirement
1. stable network identifier
2. persistent storage
3. elegant deployment and elastic
4. elegant delete and stop
5. rolling update
6. (if want fixed Pod IP)

after Pod re-schedule, still keep network identifier (hostname, DNS in cluster)
  - IP may change

## best practice
1. pod storage created by StorageClass, each pod create PVC by VolumeClaimTempalte
2. for data security, when delete Pods / rescale SatefulSet, will not delete PV
  - when you ensure data useless, manually delete
  - delete or not depends on ReclaimPolicy
    - Retain
    - Recycle
    - Delete (default, storage system implement)
3. since deployment is stateful, need to create headless service, note that Label must match with Label in Pods
  - create SRV records, including all backend Pods
4. Spec.selector match spec.template.metadata.labels
5. before rescale volume, ensure Pods ready

## hostname
${statefulset name}-${ordinal} // 0 to N-1
label: statefulset.kubernetes.io/pod-name

## DNS
headless dns: $(service name).$(namespace).svc.cluster.local
pod dns: $(hostname).$(service name).$(namespace).svc.cluster.local

## PV
each pod correspond to PVC (volumeClaimTemplates.name)-(volumeClaimTemplates.name)-(pod's hostname)
by VolumeClaimTemplate create N PVC

## StatefulSet VS deployment
if N replica, must create with index 0-N-1, next pod creation when pod ready / next pod delete when pod shutdown
pod.Spec.TerminationGracePeriodSeconds don't set 0





# Headless Service
service that don't need load-balancing and single service IP
load-balancing will return IPs of associated pods, don't have Cluster IP allocated
not proxied by kube-proxy, instead elasticsearch will handle service discovery















