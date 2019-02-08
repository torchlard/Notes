# basic knowledge
## basic network concept, for setting and debug
## simple operation: login analyze, account management, editor
## cyber security: firewall, software update
## server software install, setting, debug

internet 
-> firewall(iptable, tcp_wrapper) -> server setting (http,ftp,samba)
-> privilege (SELinux) -> file system access (r,w,x)
[log]

## BGP

OSPF is used for interior routing for non-SDN AS, so not needed in SDN domain
routing information reported from data plane to centralized controller using openflow
for SDN domain, BGP function implemented in SDN controller, not data plane router

conventional inter-AS interconnection = best-effort interconnection only
  no standardized set of class, marking, forwarding behavior
  only best practice related to these parameters

QoS management:
1. SDN configured with BGP
2. BGP triggered by start/ activation event within controller
3. try to establish TCP connection with neighboring BGP entity
4. TCP connected, exchange open messages with neighbor
5. exchange completed,  

## REST
6 constraints
1. client-server
2. stateless
3. cache constraint:
    if response cacheable, then client cache given right to reuse response data
4. uniform interface
5. layered system
6. code on demand

## Network Service Abstraction Layer
- abstract view of network resources hiding data plane devices
- generalized view of control plane functionality
- ~decouple app from OS and hardware
- network virtualization capability
  
### aim
provide global view of network as if there's only 1 central controller
1. forwarding interface
   shield higher layer from forward hardware
2. distribution interface
   shield higher layers from state collection
3. specification interface
   hide detials of physical network



