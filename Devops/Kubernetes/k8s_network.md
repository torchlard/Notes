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
cni plugin: config network, include 2 interface
- AddNetwork, DelNetwork

ipam plugin: allocate ip address to container, eg. host-local,dhcp

## bridge
create bridge in host, use veth pair connect bridge to container netns

```json
{
    "cniVersion": "0.3.0",
    "name": "mynet",
    "type": "bridge",
    "bridge": "mynet0",
    "isDefaultGateway": true,
    "forceAddress": false,
    "ipMasq": true,
    "hairpinMode": true,
    "ipam": {
        "type": "host-local",
        "subnet": "10.10.0.0/16"
    }
}
```

## dhcp
start dhcp daemon `/opt/cni/bin/dhcp daemon &`
```json
{
  ...
  "ipam": {
    "type": "dhcp"
  }
}
```
## host-local
give container ip address
```json
{
    "ipam": {
        "type": "host-local",
        "subnet": "10.10.0.0/16",
        "rangeStart": "10.10.1.20",
        "rangeEnd": "10.10.3.50",
        "gateway": "10.10.0.254",
        "routes": [
            { "dst": "0.0.0.0/0" },
            { "dst": "192.168.0.0/16", "gw": "10.10.5.1" }
        ],
        "dataDir": "/var/my-orchestrator/container-ipam-state"
    }
}
```

# flannel
provide each machine a subnet to provide virtual network
based on Linux TUN/TAP
use UDP encapsulate ip create overlay network, use etcd maintian network allocation

# Weave Net
multi-machine network solution, support decentralized control plane
each host's wRouter create full mesh TCP connection; Gossip sync control message
no central K/V store needed

data centric, not "algorithm centric" like RAFT/Paxos

# Calico
3 layer data center network solution based on BGP, no overlay/NAT
good integration with OpenStack, Kubernetes, AWS, GCE ...

implement efficient vRouter using linux kernel
each vRouter use BGP protocol to transport routing msg in whole Calico network
- small scale: direct conneciton
- large scale: certtain BGP route reflector



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



# port-forward
`kubectl port-forward <pod-name> <host-port>:<container-port>`

























