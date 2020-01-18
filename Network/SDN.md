# terms
data plane: 
  - all functions and process that forward packets/frames from one interface to another
  - move packets from input to output
control plane: all function and process determine which path to use
  - eg. routing protocols, spanning tree, ldp
management plane: all functions that monitor and control devices

# Overlay
## VXLAN
L2 over UDP, data length: 50 B
L2 = data link layer

MAC in UDP, has 24bit ID section = 16,000,000 unique section
ID randomly generated from UDP port (hash)

map MAC to unique UDP port group
  - L2 broadcast -> IP broadcast

use VTEP to pack and unpack packacts

no control plane, rely on data plane's flood-and-leearn
if switch not support multicast, then back to broadcast
- use HER to do unicast => Head-End replication

### MPBGP EVPN VXLAN
each VTEP as BGP Speaker
send local MAC,ip to other VTEP via EVPN

### VXLAN encapsulation
assume there's 2 tenanats at 2 physical server
use VNI=100, VNI=200 to do logical separation


## NVGRE
L2 over GRE, data length: 42 B

## STT
stateless TCP, ~TCP in L2
data length: 58-76 B

# GRE (generic routing encapsulation)
IP in IP technology
```
original IP datagram 
[original IP header | IP payload]

GRE packet with new IP header
[new IP header | GRE header | original IP header | IP payload]

```

# Open vSwitch
open source OpenFlow capable of virtual switch
hypervisor to interconnect 
  - VM within host 
  - VM between different hsot across networks

tunnel mapping need mapping of VM MAC address to Vtag IPs

## implementation
usepace's process `obsdb-server`, `ovs-vswitchd`
`ovs-ofctl dump-flows` check OpenFlow rules

# Cisco CEF
device divided into 2 layers
control plane: store all redirect msg (RIB)
data plane: store actual redirect msg (FIB)

redirect occurs in data plane; 
if data plane no FIB, then query RIB to construct FIB


# OpenFlow
## DPDK
bypass OS kernel, in userspace by PMD (poll mode driver) directly control network card send and receive queue
- poll network card
- bypass interrupt signal management, shorten call stack
- need occupy some CPU and memory, avoid resource conflict

### shortcoming
1. high redirect speed due to multi server, load balancing
  - mostly hardware switches / network card, not defined by software
  - if huge traffic, CPU core very high
2. need very powerful CPU
3. cannot use network monitoring tools default in linux kernel

## linux TC (traffic control) flower
mount point for netdev device, control network flow speed, altency, priority
include Classifier-Action subsystem, carry out action based on package header
- add OpenFlow support, map OpenFlow rules to TC rules

### adv
1. higher performance than DPDK, since not enter OS
2. directly use network card
3. TC Flower offload directly supported by driver



# tools
## mininet
network emulator which creates network of virtual hosts, switches, controllers, links








