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

# CNI (container network interface)
CoreOS initiated container network standard
1. crate container 
2. create network namespace
3. call cni plugin config netns
4. start process in container

## component




# network plugins
probe plugin when start up, execute selected plugin at appropriate time 

specific support for kube-proxy
iptables proxy depends on iptable, container traffic available to iptables

if using other bridge (eg. open vSwitch), wnsure container traffic properly routed
if no plugin specified, use noop plugin
  - `net/bridge/bridge-nf-call-iptables=1`

## CNI plugin
adhere to appc/CNI spec
plugin present in `/opt/cni/bin`

command-line param:
- cni-bin-dir: probe dir for plugins on startup
- cni-conf-dir: default /etc/cni/net.d
- network-plugin: must match name reported by plugin probed from plugin dir

support hostPort



## kubenet plugin


























