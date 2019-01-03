# Service model
degree of control: Iaas > Paas > Saas
Saas: only use application, no any control
Paas: deploy own application, control app
Iaas: deploy software+OS, control OS,storage,app, limited networking


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

# Model
concrete ---- abstract
different concern point
physical model: device, hardware, interconnectivity
architectural model: structure in terms of component and relation
fundamental model: abstract perspeactive, describe issues in distributed computing

## example
mobile computing, pervasive computing, cloud computing


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

# MPI
group = ordered set of process identifier (rank)
communicator 
= encapsulation all communication among set of process
= group + context identifier (name alias to group of process)

## communicator
talk to all processes in communicator at once
- from 1 process using MPI_Scatter / MPI_Reduce
MPI_COMM_WORLD

`MPI_Comm_split( MPI_Comm comm, int color, int key, MPI_Comm* newcomm )`
create new communicators by splitting communicator into group of sub-communicators
- based on color, key values
- original communicator not go away
key: determine ordering (rank) within each new communicator

```c
MPI_Comm_rank(MPI_COMM_WORLD, &wrold_rank);
MPI_Comm_size(MPI_COMM_WORLD, &world_size);

int color = world_rank/4;
MPI_Comm_split(MPI_COMM_WORLD, color, world_rank, &row_comm);

int row_rank, row_size;
MPI_Comm_rank(row_comm, &row_rank);
MPI_Comm_size(row_comm, &row_size);
```

# compile C
1. pre-pocessing
2. compilation
3. assembly
4. Linking function calls with definitions


# clock synchronization
## passive time
account for processing delay + progress delay
overhead = (T1-T0)/2
time server process = I
T_new = T_server + (T1-T0-I)/2
accuracy = +-((T1-T0)/2 - T)

## active time (Berkeley algorithm)
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
offset = (T2+T3)/2 - (T1+T4)/2 {offset of mid points}

### event ordering
a->b: a happen before b
- a,b same process, a before b => a->b
- a->b, b->c => a->c
- a=sending, b=receive => a->b

a,b concurrent if neither a->b / b->a

#### ordering
total order
- every pair of events can be placed in some order
causal order / partial order
- some events has no possible casual relation (not A->B / B->A)


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
only includ msg sent before snapshot in snapshot
## assumption
process connected each other
no failure, all msg arrive
communication channel FIFO, unidirectional
snapshot run concurrently
process record local state + incoming channel state

## process
eg. A <-> B
1. take snapshot in one sides, set current A, mark all incoming=0
2. snapshot msg transfer to another side B, set current B, all incoming=0
3. A receive back marker, set incoming Cba, keep states unchange
=> total value in global state conserved all the snapshots

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
### Ricart-Agrawala algorithm
broadcast msg: critical section want to enter, msg:(PID, current time)
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
only process get token can enter CS

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

#### safety 
leader election non-faulty process either elect process/elect none
if not, 2 process declare victory (coordinator msg broadcast) => conflict

#### liveness
in sync, crash-recovery model
one of them become leader eventually

#### complexity
process send N-1 election msg,
next higher-id send N-2 msg ...
=> O(N^2) election msg, O(N^2) alive msg, O(N) coordinator msg

### ring election
1st stage
1. initially all = non-participant
2. a process start election, send msg clockwise to neighbor
3. when process get msg, itself = participant
4. if msg's ID larger => forward msg
5. if msg's ID smaller => replace with its own ID, forward msg
6. if msg's ID same => become leader

2nd stage (reset conditions)
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
msg: (process being blocked, process sending msg, process receiving msg)

msg arrive => receive check if waiting any process
if waiting => update 2nd,3rd field => sent to process holding needed resource
if msg go back to original => cycle exist, deadlock

### recovery
1. kill one process, get its resource give to others
2. pre-emption, take resource from some other process, handle deadlock
3. rollback process to where resource not allocated to deadlock process / process checkpointed periodically


# Crowdsourcing
job traditionally performed by designated agent 
-> outsource to large group of people in form of open call

## Application
reCAPTCHA: anti-bot service that digitize books
Wikipedia, SETI@home
Foldit: predict structure of protein -> people play to fold best protein
Amazon mechanical Turk
indoor navigation

Original challenges: high computational power

Wifi figerprint: <Mac Address, Signal Strength>
client measures WiFi fingerprint, sent back to server for localization services
server looks up database, find location WiFi fingerprint match client's one

## Benefits
explore problems little cost
payment by results
turn customers into designers and marketers

## Problems
quality assessment
intellectual property leakage
no time constraint
no much control over development


# Big Data
## what is 5V
high volume, velocity, variety, 
high veracity: accuracy, cleaning
high value

## challenges
transfer, store, search, analyze, visualize
data center, distributed FS, parallel processing

## opportunity
traditioinal application -> real-time proessing, faster & more accurate result
discover new knowledge form different source
new applicaitons only solvable with big volume of data
  eg. Google Trends (USA election, Flu Trends)
      algorithm trading

### critics
big data hubris: data may not be valid or reliable for scientific analysis
=> re-trained google flu trends to improve prediction accuracy

waste of money and talent -> profitable, but socially pointless

## Application
1. understand and targeting customer
browser log, social media data
2. personal quantification
life-time sleep quality monitoring
3. healthcare
DNA decode
4. smart transportation

## parallel algorithm
### monte carlo
randomized algorithm with deterministic running time -> almost correct answer
eg. calculate pi

### probabilistic 
Bloom filter
- test whether element is in set
- routing packets in data center switch
- test subscription

return "possibly in set" / "definitely not in set"
elements can be added to set, not removed
need impractically large memory if require error-free hasing
time & space efficient algorithm

hash each element to k positions in bit array (1/0)
initially empty Bloom filter = m bits array of 0s
k different hash functions defined, where k << m

### parallel processing
use MPI, data and work partitioned among processes
all MPI process execute same program

data source:
eg. Public Sector Information (PSI)













