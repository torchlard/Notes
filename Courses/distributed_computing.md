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
## passive time
account for processing delay + progress delay
overhead = (T1-T0)/2
time server process = I
T_new = T_server + (T1-T0-I)/2
accuracy = +-((T1-T0)/2 - T)

## active time
server broadcast clock
1. send server click to clients
2. clients calc time diff, send back to server
3. server take average of clock values, send to each client different adjustments
4. server reset own clock

## global average
1. each node broadcast local clock time (T0 + iR)
2. after waiting period, estimate skew of own clock wrt. all other nodes
3. discard highest m and lowest n || skew > threshold

## localized averaging
nodes in specific patterns ring/grid
node exchange clock time with neighbors, set clock time to avg

## NTP (Network time protocol) mode
symmetric active mode: send periodic NTP data msg willing to sync + be synced by peer
client: willing be syned by peer, not sync
server: willing sync, not be syned
broadcast: send out periodic msg, willing sync all receiving host, not be synced

### idea
Client      Server
T1  -------> T2
T4  <------- T3

round trip delay = (T4-T1) - (T3-T2) {diff of time passed in 2 sides}
offset = (T1+T4)/2 - (T2+T3)/2  {offset of mid points}

### event ordering
a->b: a happen before b
- a,b same process, a before b => a->b
- a->b, b->c => a->c
- a=sending, b=receive => a->b

a,b concurrent if neither a->b / b->a

## logical clock
event order is more important than true time
logical clock correct if events properly ordered using these clocks
C(a) -> C(b)
clock always go forward

### Lamport's algorithm
if meet conditions on clock
1. increment C on any successive event
2. a=send on process P, b=receive on process Q => set C > C(a)

a happen before b => C(a) < C(b)
C(a) < C(b) =/=> a happen before b 

## Vector clock
for a:(a1,a2,a3) compare to b:(b1,b2,b3) vector clock,
a1<=b1, a2<=b2, a3<=b3, at least one < ==> a happen before b

# Distributed snapshot
record all local states, messages
only includ msg sent before snapshot in snapshot
## assumption
process connected each other
no failure, all msg arrive
communication chnnel FIFO, unidirectional
snapshot run concurrently
process record local state + incoming channel state

## process
take snapshot in both sides at different time
total value conserved all the snapshots

# Mutual exclusion
critical section
- need to enter CS to read/write data

## not easy
no shared memory
delays in propagation
sync issue with clock
need ordering of events

## criteria
1. no >1 process use shared resource at same time
2. eventually process get chance to access resource

## centralized algorithm
operation: request, grant, release
master grants request in some order (FIFO, random ...)

## distributed algorithm
broadcast msg: critical section want to enter, PID, current time

1. 2 process enter CS at same moment
process with lowest TS wins
if process done, sends OK; other can come in
2. process get request from others
receiver not in CS, not want enter => send OK
receiver not in CS, want enter => compare TS => lower TS wins
receiver in CS => no reply, queue request

### problem
n points failure, may fail to response
### solve
receiver always send reply
if msg lost, sender timeout & retry

## Token ring
form ring, can allocated in numerical order
start from process 0 get token => token circulate around ring

## Election
1. identify process with highest priority, assign it as coordinator
2. inform all active process of coordinator
### assumption
each process has unique ID
all process knows all PID
all process agree on new coordinator

### bully election
start when any process cannot find coordinator
messages
1. election msg: announce election
2. reply msg: ACK election msg
3. coordinator msg: announce new coordinator

step
1. process P hold electron, broadcast election msg
2. wait reply msg to P from process with higher priority
3. if none receive within certain time, declare itself as coordinator
4. else if receive reply, accept it as new coordinator

### ring election
1st stage
1. initially all = non-participant
2. a process start election, send msg clockwise to neighbor
3. when process get msg, itself = participant
4. if larger ID => forward msg
5. if smaller ID => replace with its own ID, forward msg
6. if same ID => become leader

2nd stage
1. leader marked itself = non-participant, send elected msg to neighbor
2. get elected msg => itself = non-participant, record elected ID, forward msg
3. msg reach leader => discard msg, election ends


# Deadlock
## resource
preemptible resource
- process can take away, give back later
- only 1
non-preemptible resource
- once given, cannot reuse until release
- need many instance

## sequence
1. request
2. allocate and use resource
3. release

## type
communication deadlock
- process blocked, waiting msg -> no msg in transit
resource deadlock
- >= 2 process wait for resourse held by each other

## Coffman condition
mutual exclusive
hold and wait
no pre-emption
circular wait

## deadlock modeling
directed graph
path
cycle
reachable set

## resource allocation graph (RAG)
process node: circle
resource node: rect, >=1 instance, bullet
assignment edge: resource -> process node, process hold resource
request edge: process -> resource node, process made request for resource, waiting

state transition: transition between RAG
deadlock necessary condition: cycle in RAG 
sufficient condition: cycle in RAG, reusable resource only 1

## wait-for graph (WFG)
all resource type has only 1 unit
node = process, Pi -> Pj == Pi wait for Pj
cycle = sufficient condition

## handle deadlock
### ostrich
ignore problem, let it crash

### deadlock avoidance
allocate resource carefully
states: deadlock, unsafe, safe
decide whether granting process's request safe/unsafe

problem
- advance knowledge of resource requirement
- assume #processes fixed
- assume num unit resource fixed

### deadlock prevention
make deadlock structurally impossible
#### collective request
X hold-and-wait
process must collect all resource before start
#### ordered request
X circular wait
resource type get unique global number
#### pre-emption
X no pre-emption
resource can be taken away temporarily

### deadlock detection
detect and recover deadlock
#### centralized control
local coordinator: maintain local WFG for its process, resource
central coordinator: maintian RAG, WFG for entire system = union of all graphs

continuous/periodic/on request transfer
#### hierarchical control
controller 
- logical tree of deadlock detector 
- detect deadlocks of sites within hierarchy
- WFG = union of immediate child WFG

lowest level controller find cycle in WFG -> take action
if WFG has cycle => never pass to higher level
#### distributed control
when process wait some resource => sent probe msg 
(process being blocked, process sending msg, process receiving msg)

msg arrive => receive check if waiting any process
if waiting => update 2nd,3rd field => sent to process holding needed resource
if msg go back to original => cycle exist, deadlock

### recovery
1. kill one process, get its resource give to others
2. pre-emption, take resource from some other process, handle deadlock
3. rollback process to where resource not allocated to deadlock process / process checkpointed periodically













