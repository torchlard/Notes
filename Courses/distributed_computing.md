# keywords
## Introduction
distributed computing (3 features)
application
distributed system (definition)
  - nodes, link (network structure)
  - network structure
usage of distributed computing
pervasive computing

## System network models
physical, architectural, fundamental model
  example of physical model
  early, internet-scale, contemporary

architectural model: goal, definition
communicating entities (IDL, OOP, interface)

inter-process communication
remote invocation 
  remote procedure call (steps)
  remote method invocation

Indirect communication
  Group communication
  Publish-subscribe systems

Data Structure
  Message queue
  tuple space
  distributed shared memory
  
Role and responsibilities
  client-server
  peer-to-peer

Placement (consider what?)
  service, server mapping
  Caching
    Web cache
      user cache
      shared cache
      gateway cache
  Java applet    

Architectural model
  layering
  tiered architecture
  function decomposition of app
    presentation logic
    application (business) logic
    data logic
  Two-tier solution
  Three-tier solution
  n-tier solution
  Web interaction
  Thin client

Fundamental model
  Interaction model
    performance
    clocks, timing event
    synchronous distributed system
    asynchronous distributed system
    event ordering
  Failure model
    omission failure
      how to process failure
      send-omission failure
      receive-omission failure
      channel omission failure
    arbitrary failure
    timing failure
    handling failure
      reliability of 1-to-1 communication
        validity, integrity
        threats
  Security model
    attacker

Networking model
  Latency
  Data transafer rate
  Packet loss rate
  security
  reliability
  mobility
  multicast      
  Quality of service (example)

Network principles
  packet transmission
  switching
    broadcast
    circuit switching
    packet switching
  Protocol
    definition
    protocol layers
    packet assembly
    addressing
    ports
    internetworking

## Interprocess communication
Process
  definition, types
  how OS manage process
  
Layering



































  
  
  
  
  
  
  
  
========================================================================

# network
## UTM
Unified threat management
- include firewall, VPN, ID&P, gateway antivirus
different from intrusion detection and provention (ID&P)

## Core Switch
high capacity switch positioned within backbone or physical core of network

## Internet Tier
Level 1: Point of presense (within city, same provider)
Level 2: Across city, same provider
Level 3: Internext Exchange Point (IXP), across provider
Level 4: Global Internet

Tier 1: transit free network using only peer

### Internet transit
allow network traffic to cross / transit computer network
connect ISP to Internet
- advertise customer router to other ISP
- advertise other ISP's router in form of default route / full set of routes to all destination

> traffic between 2 ISPs and downstream customer exchanged, neither ISP see upstream routes over peering connection

### comparison
Transit: network operator pay to another network operator for Internet access
Peer: 2 network exchange traffic between users freely
Customer: network pay another network money to get Internet access

# Data Structure
## tuple space
implementation of associative memory (content-addressable memory)
=> a form of distributed shared memory
- compare input search data against table of stored data
group of processes produce data:
  post data as tuple in space
group of processes use data:
  get data from space that match certain pattern

### Object space
virtual repository



# clock synchronization
## global average
each node broadcast local clock time (T0 + iR)
after waiting period, estimate skew of own clock wrt. all other nodes
discard highest m and lowest n

## localized averaging
nodes in specific patterns ring/grid
node exchange clock time with neighbors, setclock time to avg

## NTP mode
symmetric active mode: send periodic NTP data msg willing to sync + be synced by peer
client: willing be syned by peer, not sync
server: willing sync, not be syned
broadcast: send out periodic msg, willing sync all receiving host, not be synced

## idea
Client      Server
T1  -------> T2
T4  <------- T3

round trip delay = (T4-T1) - (T3-T2) {diff of time passed in 2 sides}
offset = [(T2+T3) - (T1+T4)]/2  {offset of mid points}

## event ordering
a->b : a happen before b
If a->b & b->c, then a->c

a,b concurrent if not related by any happened-before relation

## logical clock
event order is more important than true time
logical clock correct if events properly ordered using these clocks
C(a) -> C(b)
clock always go forward

increment C on any successive event

## Vector clock
events in distributed system totally ordered with property 
  if a happen before b, then C(a) < C(b)







