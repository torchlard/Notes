# ip
Cluster IP: default, expose service on internal IP

NodePort: expose service on same port of each selected node using NAT
  - accessible from outside `<nodeIP>:<NodePort>`

LoadBalancer: assign fixed, external IP to service

ExternalName: expose service using arbitrary name
  - returning CNAME record with name
  - no proxy needed

## structure
```
LoadBalancer
  NodePort
    ClusterIP
```






