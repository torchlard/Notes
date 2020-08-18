# intro
open source service network
monitor service and increase security

control plane
data plane

istio independent of any platform, works in internal deploy, k8s, Mesos

# Control Plane
## Mixer
access control, usage policy stats

## pilot
service discovery, proxy traffic management
timeout, retry, circuit breaker, intelligent routing

## citadel
user authentification among services, certificate management
eg. encryption

# Data Plane
## proxy (Envoy)
load balance
dynamic service discovery
TLS termination
HTTP/2, gRPC

# function
1. connect
2. secure
3. control
4. observe










