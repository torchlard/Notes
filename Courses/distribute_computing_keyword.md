# Introduction
distributed computing (3 features)
application
distributed system (definition)
  nodes, link (network structure)
  network structure
why need distributed computing? [4]

pervasive computing
  3 properties

cloud computing
  -definition
  characteristics [5]
  service models
    SaaS
    IaaS
    PaaS
challenges [5]

# System, network models
how can we describe distributed system using models?

physical, architectural, fundamental model
  comparison
  example of physical model
  early, internet-scale, contemporary
architectural model
  goal
communicating entities 
  basic entity
  IDL, interface
  OOP abstraction

inter-process communication
remote invocation 
  remote procedure call [steps]
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

Placement (entity --> infrastructure)
  considerations for mapping
  service, server mapping
  Caching
    Web cache
      user cache
      shared cache
      gateway cache
  Java applet    

Architectural model
  layering [4 layers]
    middleware
    platform
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
      Latency, bandwidth, jitter
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
  Quality of service [example]

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
    inter-networking

# Interprocess communication  
Layering
  Middleware
  Platform

Process
  definition, 2 types
  how OS manage process
    request, queue
  liefcycle

Thread
  definition
  relation to process
  5 attributes
  3 states
  4 parameters
  functions
    pthread_create
    pthread_join()
    pthread_exit()

Inter-process communication
Message passing
  send, receive
  queue
  operation detail
    sender - server -- server - receiver
  message format
    header [4]
  synchronization
    polling
    interrupt
    how to complete sync communication
    blocking, non-blocking
  async
    how to complete

Message Buffering
  Null buffer
    -implementation
  Single message buffer
    async: assume infinite
  Multiple-message buffer
    Unsuccessful communication indication
    flow-controlled technique
  Infinite-capacity buffer
  failure handling
    msg loss
    reliable IPC protocol
      fault handling process
      4-message IPC
      3-message IPC  
      2-message IPC

Socket
  definition
  operations
    status
    control
    data transfer
  socket API
    domain
    type
    protocol

UDP
  run process
TCP
  run process
  3-way handshaking
TCP VS UDP
  similarity
  differences

MPI (Message passing inerface)
  -definition
  -brief description
  communicator
  ranks
  tags
  data types    
  Collective communication
    collective operation types
      synchronization
      collective computation (reduction)
    Data movement
      broadcast
      scatter
      gather

Group communication
  -classfication
  unicast
  many-to-one, multicast [inverse]
  broadcast

IP multicast
  how to send msg in group?  
  multicast group
    source
    receiver
    address
  
# Remote Invocation
-definition
Remote Procedure Calls
  -definition
  -steps / layers
  basic RPC operations
  complete RPC process
  stub generation
    IDL compiler
  message
    format
    example

Communication protocol
  request/replay protocol
  request/reply/ACK protocol

Client-server binding
  binding process 
    client, server, binding agent
  static binding
  dynamic binding
    at compile time
    at link time
    at call time

Remote Method invocation
  distributed object      
    local, remote invocation
  -process
    remote object reference
    remote interface
  RMI components
    proxy
    remote reference module
    dispatcher
    skeleton
  
# Clock  
3 features in distributed system  
Computer clock
  quartz crystal, register  
  num of interrupts

clock drift
clock skew

Clock synchronization
  global clock
  mutual sync
  3 errors
  how to re-synchronize?

Centralized algorithm
  passive time server
    -formula
    Cristian's algorithm
  active time server
    Berkeley algorithm
  -drawback

Distributed clock
  global average
  localized averaging
  Network time protocol
    architecture
    mode
      symmetric active
      client
      server
      broadcast
  Event ordering
    happen-before relation
  Logical clock
    conditions for a->b
    Lamport's algorithm
  Vector clock


# Distributed algorithm
Global State
  cut

Distributed snapshot
  what
  how to take snapshot
  assumption  
  process

mutual exclusion
  condition
  why not easy
  criteria

centralized algorithm

distributed algorithm
  process
  problem

token ring
election
  -assumption
  bully election
  ring election

# Deadlock
resource
  preemptible resource
  non-preemptible resource

communication deadlock
resource deadlock

Coffman condition
deadlock modeling
  resource allocation graph
  wait-for graph

handling deadlock
  ostrich
  deadlock avoidance
    problem
  deadlock prevention  
    collective request
    ordered request
    pre-emption
  deadlock detection
    centralized control
    hierarchical control
    distributed control
  recovery
  
# Crowdsourcing
objective
applications
benefits
problem

# Big Data
5V
challenges
opportunity
applications
critics

parallel algorithm
  monte carlo
  bloom filter
  MPI
  
  
  
  
  
  
  