# introduction
O(N^2) if all nodes connect to each other, not scalable
use global ISP as central -> multiple ISPs

access net -- "ISP A" -- IXP -- "ISP B" -- access net
ISP: eg. PCCW, HK broadband

Content provider network: run own network to bring service, bypass tier-I, regional ISPs
Tier1: national & international coverage

Tier 1 ISP -- Tier 1 ISP -- Google
Tier1 ISP -- IXP -- Regional ISP
Google -- IXP -- Regional ISP

Regional ISP -- access ISP
IXP -- access ISP
Tier1 ISP -- access ISP

## layering
each layer has different role, easy to maintain, update

- application: communication protocol, interface method [FTP, HTTP]
- transport: host-to-host communication service [TCP, UDP]
how fast, reliable
- network: how to route from source to destination
- link: data transfer between network elements
how to forward packet in subnet (eg. to gateway router)
- physical: bits signal

presentation: allow app to interpret meaning of data (encrpty, compress)
session: synchronization, checkpoint, recovery data exchange
in TCP/IP, these layers incorporate into "application" level

## encapsulation
application -> transport -> network -> link -> physical [source]
=>
physical -> link -> physical [switch]
=>
physical -> link -> network -> link -> physical [router]
=>
physical -> link -> network -> transport -> application [destination]

## process

1. client only has its MAC
want: gateway ip, local DNS ip
action: use DHCP request by UDP
```
client          server
 | -- discovery --> 
 | <-- offer ------ (maybe multiple)
 | -- request ---->
 | <-- ack --------
```
client may receive multiple DHCP server offers, only confirm 1 offer
final ACK contain: DNS ip, gateway ip

2. client get assigned IP, DNS ip, gateway ip
ARP query: client broadcast, router receive, give MAC address based on ip

3. client get assigned IP, DNS ip, gateway ip, router MAC
client want "google.com" ip
-> ask its ip from DNS server [DNS query]
ip datagram forward to outer network, routed by RIP/OSPF/BGP 
-> local DNS server ask different DNS servers accordingly
-> target DNS server reply to client with ip of "google.com"

now client has (gateway ip+MAC, local DNS ip, "google.com" ip)

4. connect to "google.com"

# SMTP
user agent: client to read, change mail
mail server: 
- mailbox: incoming msg for user
- msg queue: to be sent mail msgs
- SMTP protocol: standard for mail transmission
> send mail: client/server, receive: server

send from client to server via TCP port 25
send from server to server

## phases
1. handshake
2. transfer msg
3. closure

(commands, response)
Alice -> Alice's mail server --> Bob's mail server -> Bob

## header
to, from, subject
## body
the message

## mail access protocol
receive from server
- POP: authorization, download
- IMAP: more features, can change msg on server
- HTTP: gmail, hotmail ...

## POP3 protocol
- authorization
- transaction

1. POP 3
download and delete/keep
stateless across sessions
2. IMAP
keep all msg in server
allow user to organize msg in folder
keep user state across session

# Socket
process send/receive msg to/from its socket
process need to have identifier (ip, port number) to receive message

## UDP
unreliable datagram
no handshake between sending data
sender attach (ip,port) to each packet
- data may lost / receive out-of-order

## TCP
reliable, byte steam-oriented

AF_INET: ipv4 server-server communication
AF_INET6: ipv6 server-server communication
SOCK_STREAM: TCP socket
SOCK_DGRAM: UDP socket


# Transport layer
logical communication 
send: break msg into segments
receive: reassemble segments into msg

TCP: congestion control, flow control, connection setup
delay guarantee, bandwidth guarantee

multiplex at sender
- handle multiple sockets, add transport header
demultiplex at receiver
- use header to deliver segments to correct socket

source IP, destination IP address, each carry 1 transport-layer segment

## UDP
every msg send by UDP has (ip, port)
when host receive UDP segment, check port, direct it to socket of that port
- streaming multimedia, DNS, SNMP
- add reliability at application layer for reliable transfer

## TCP
TCP identified by (source ip,source port, dest ip,dest port)
web server have different socket for each connecting client

A server socket listens on single port
all client connection can connect to same server port, as long as each (source ip|port, client ip|port) pair is unique
on client side, randomly choose a port to connect server

## UDP checksum
detect errors in transmitted segment

sender
1. add up every 16 bits data
2. if there's leading digit, add to result
3. get one's complement of sum
4. put checksum into UDP checksum field

receiver
1. compute checksum of received data
2. compare checksum values

assume data is '4500 0073', each digit has 4 bit
4500 + 0073 -> 4573 -> 6ABC


# reliable data transfer
unreliable channel under reliable data transfer

rdt_send() -> udt_send()
=>
rdt_rcv() -> deliver_data()

## rdt 1.0
underlying channel perfectly reliable, no error/loss
## rdt 2.0
with bit error, use checksum to detect error

```python
sender rdt_send(data)
udt_send(sndpkt)
wait for reply
if receiver find error:
  send NAK
else:
  send ACK
if sender receive NAK:
  udt_send(sndpkt)
  wait for reply
else:
  receive msg, done
```
## rdt 2.1
add sequence number to each package
sender retransmit current package if ACK/NAK corrupted
receiver discard duplicate package

- sender
```python
rdt_send(data)
make_pkt(0)
udt_send(sndpkt)

'wait for ACK/NAK 0'
if corrupted pkg || NAK:
  udt_send(sndpkt)
elif received && ACK && not corrupted:
  pass

rdt_send(data)
make_pkt(1)
udt_send(sndpkt)
'wait for ACK/NAK 1'
...
```
- receiver

```python
'wait for 0'
if received && not_corrupt && seq==0:
  extract data, deliver
  send ACK
  go 'wait for 1'
elif received && corrupted:
  send NAK
elif received && not_corrupt && seq==1:
  send ACK [buffer]
  go back 'wait for 0'

'wait for 1'
if received && corrupt:
  send NAK
elif received && not_corrupt && seq==0:
  send ACK [buffer]
  go back 'wait for 1'
elif received && not_corrupt && seq==1:
  extract, deliver data
  send ACK
  go for new 'wait for 0'
```

## rdt 2.2
do not use NAK, just use seq num,ACK
```python
"<sender>"
'wait for 0'
rdt_send(data)

'wait for ACK 0'
if received && (corrupt || ACK1):
  udt_send(sndpkt)
elif received && not_corrupt && ACK0:
  go to next

"<receiver>"
'wait for 1'
if received && notcorrupt && seq==1:
  extract data
  send ACK1
  go 'wait for 0'

'wait for 0'
if received && (corrupt || seq==1):
  udt_send(pkg)
  'wait for 0'
```
## rdt 3.0 
channel with error and loss packets (data, ACK)
sender wait for reasonable amount of time for ACK
retransmit if no ACK

only has packet 0,1, send 0,1 iteractively
use stop-and-wait mechanism, wait packet 1 by 1

- sender
```python
rdt_send(data)

'wait for ACK0'
if received && (corrupt || ACK1):
  udt_send(sndpkt)
elif timeout:
  udt_send(sndpkt)
  restart timer
elif received && not_corrupt && ACK0:
  stop timer
  'wait for 1'
```
disadv: time consuming to stop and wait for reply

## rdt pipeline
since performance is too low for long round trip time,
sender allows multiple packets sent at same time

range of seq num increase
buffer at sender and/or receiver

### go-Back-N
- sender
sender have up to N un-ACKed packets in pipeline
sender has timer for oldest un-ACKed packet
when time expires, resend all packets starting from oldest un-ACKed packet in window

```python
 sent,not ACKed  usable,not sent
|--------------|----------------|
base       nextSeqNum
<----------window size(N)------->

if nextSeqNum < base+N:
  send(packet[nextSeqNum])
  if base == nextSeqNum:
    start_timer()
  nextSeqNum++
else:
  refuse_data

if timeout:
  restart_timer()
  send(packet[base, ..., nextSeqNum-1])
elif received && corrupt:
  do nothing
elif received && not_corrupt:
  // if receive packet before base
  if base >= getACKnum(packet)+1:
    ignore
  else:
    base = getACKnum(packet)+1
    if base == nextSeqNum:
      stop_timer()
    else:
      start_timer()


if receive req num Rn > Sb:
  Sm += Rn - Sb
  Sb = Rn
if no packet in transmission:
  transmit packet that Sb <= Sn <= Sm
  packets transmit in order  
```
- receiver
receiver only sends cumulative ACK
```python
expectedSeqNum = 1

if received && not_corrupt && seqNum==expectedSeqNum:
  extract, deliver data
  expectedSeqNum ++ (Rn++)
  send ACK,expectedSeqNum (request Rn)
else:
  send last ACK, request Rn
```
discard out of order packet, no buffering, re-ACK with highest in-order seq



### selective repeat
- sender
sender have up to N un-ACKed packets in pipeline
maintain timer for each un-ACKed packet
when expire, only resend un-ACKed packet

```python
if data from above:
  send all available seq in window
if timeout(n):
  resent pkt n, restart timer
if ACK(n):
  mark it as received
  if n == base:
    base = next un-ACKed seq
if otherwise(corrupted):
  ignore
```
- receiver
send individual ACK for each packet, no need consequential
if pkt 3,4 ACKed, but pkt 2 unACK => wait for pkt 2 ACK, deliver all

```python
if packet n in [base, base+N-1]:
  send ACK(n)
  if out-of-order:
    buffer
  elif in-order:
    deliver (buffered, in-order pkts)
    base = next un-ACKed pkt
elif pkt n in [base-N, base-1]:
  ACK(n)
else:
  ignore
```
seq num size need to be 2x of window size, if not receiver may have wrong recognition
eg. window=3, packets=[0,1,2,3,4,5,0,1,2,...]


# TCP
point-to-point, reliable byte stream, pipelined
full duplex, connection-oriented, flow control

## header
source port, destination port
seq num, ACK num
command bit: [URG(urgent data), ACK, PSH(push data now), RST(setup), SYN, FIN(teardown)]
receive window, checksum

total 20 bytes

## seq num, ACK
seq num = byte stream num of first byte in segment's data
ACK = seq num of next byte expected from other side

## timeout
longer than RTT

SampleRTT = measured time from seg transmission until ACK receipt
EstimatedRTT = (1-a)*EstimatedRTT + a*SampleRTT
DevRTT = (1-b)*DevRTT + b*|SampleRTT - EstimatedRTT|
- normally a = 0.125, b = 0.25

timeout = EstimatedRTT + 4*DevRTT




# TCP congestion control
additive increase: each time +1 maximum segment size
multiplicative decrease: cut window size by half

## slow start
increase window after connection init & after timeout
init = 1
window x2 every RTT

## congestion avoidance
start when exceeds ssthresh threshold
window +1 every RTT

## packet loss
### timeout
ACK not received before timeout
perform fast retransmit of lost packet
=> slow start

### 3 duplicate ACK
receiver send ACK if receive out-of-order segment
sender assume loss if 3 duplicate ACK
=> congestion avoidance

## TCP RENO
### 3 dup ACK
window = window/2 (eg. 5/2 = 2)
ssthresh = window
"fast retransmit"
=> fast recovery
=> wait for ACK of window before -> congestion avoidance
=> if no ACK -> timeout & slow-start

## TCP Tahoe
ssthresh = cwnd/2
window = 1
=> slow-start

avg throughput = 3/4 * W/RTT

# TCP transmission
```
--seq=92, 8B data-->
--seq=100, 20B data-->
<--ack=100--
<--ack=120--
```

# TCP flow control
receiver control sender, tell sender buffer size => not use up all buffer
sender limit amount of un-ACKed data to receiver's rwnd value (buffer size)

## flow control VS congestion control
flow control: restrict sender's sending speed, receiver related
congestion control: on network


# TCP handshake
## 2-way handshake
x             server
  --req_conn(x)-->
  <--acc_conn(x)--

variable delays
may have message loss, need retransmission

failed when:
after req_conn(x), client resent req_conn(x)
=> half open connection (no client)
OR
=> resend data from client

## TCP 3-way handshake
entry table: transmission control block
contain info about endpoints, connection status, running data of packets,
buffer of send,receive data

num of session only limited by memory
#### establishment
```
       -- SYNbit=1, seq=x -->
ESTAB  <-- SYNbit=1, ACKbit=1, seq=y, ack=x+1 --
       -- ACKbit=1, ack=y+1 -->  ESTAB
```

#### close
after x sending FIN, x cannot send data anymore, but still can receive data
```
-- FINbit=1, seq=x -->
<-- ACKbit=1, ack=x+1--

<-- FINbit=1, seq=y --
-- ACKbit=1, ack=y+1 -->
```
if x first init FIN:
x can close connection only after waiting for 2*max segment lifetime
server close connection once receive final ACK 

# Network layer
transport segment from sender to receiver
encapsulate segments into datagrams
## functions
1. forwarding
2. routing

in some architecture (ATM, X.25)
3. two end host and router establish virtual connection

## service
network: between 2 host (maybe with routers for virtual connection)
transport: between 2 processes

datagram network: connectionless
virtual-circuit network: connection 

## Virtual circuits
call setup, teardown before data flow
each packet has VC identifier (not dest attr)
router maintain state for each passing connection
link, router resource allocate to VC

### detail
1. path
2. VC number
3. entries in forwarding tables
incoming interface  incoming VC#  outgoing interface  outgoing VC#
 [maintain state]

### process
    Sender             Receiver
1.init call         2.incoming call
4.call connected    3.accept call
5.begin data flow   6.receive data

## Datagram
router don't keep state 
forwarding table list range of address (too many ip)

use longest address prefix that match dest addr

## Network service model
define characteristics of end-to-end transport of packets
individual datagram
- guarentee delivery, <40 ms delay
flow of datagram
- in order delivery, min bandwidth

Internet: best effort, no (bandwidth, loss, order, timing, congestion feedback[by loss])
ATM: const/guarenteed rate, guarentee (loss, order, timing), no congestion


# IP
subnet
- higher order bit
- can reach each other without router, isolated network
host
- 

## IP addressing
CIDR: classless inter domain routing
- subnet portion of addr arbtrary length
eg. 200.23.16.0/23

class A: 0, network 8
class B: 10, network 16
class C: 110, network 24
class D: 1110, broadcast, undefined
class E: 1111, reserved

## reserved private IP
A: 10.0.0.0 - 10.255.255.255
B: 172.16.0.0 - 172.31.255.255
C: 192.168.0.0 - 192.168.255.255

## DHCP (Dynamic host configuration protocol)
dynamically obtain IP address
1. DHCP discover
2. DHCP offer
3. DHCP request
4. DHCP ack

extra: 
- address of first-hop router for client
- name,IP of DNS
- network mask

get network subnet part from ISP's address space

## hierarchical addressing
- broadcast larger ip range
Fly-By-Night-ISP
ISPs-R-U (more specific root)

ICANN (Internet Corporation for Assigned Names and Numbers)
- ISP get block of address from ICANN
- allocate address, manage DNS, assign domain names

## NAT (network address translation)
all datagram leaving local network -> same single NAT IP, different source port 
can change address of devices in local network
device inside local net not explicitly addressable

- outgoing datagram: replace (sourceIP, port#) -> (NAT IP, new port#)
- remember in NAT translation table (sourceIP, port# <-> NAT IP, new port#)
- incoming datagram: replace (NAT IP, new port#) -> (sourceIP, port#)

16 bit port = 60,000 simultaneous connection
violate end-to-end argument

### traversal problem
client want to connect to server in local network

client (otuside) -- [138.76.29.7]NAT router[10.0.0.4] -- server[10.0.0.1]

1. statically config NAT forward at given port to server 
eg. 138.76.29.7, 2500 -> 10.0.0.1, 25000

2. universal plug and play (UPnP), Internet Gateway Device (IGD) protocol
learn public IP (138.76.29.7), add/remove port mapping

3. relay server
NATed client establish connection to relay
external client connects to relay
relay bridge packets

#### UPnP
allows end-to-end connection among PC
can use in telephone line, electric wire (PLC), ethernet, IrDA, wireless
based on IP,TCP,UDP,HTTP,XML
support zero config, auto detection, invisible network

## Internet Control Message Protocol (ICMP)
function
- error reporting
- echo request / reply
like network layer above IP

hosts, routers to communicate network info
type, code, description
MAC > IP Header > ICMP header > ICMP data

### traceout
source send series of UDP segment to dest
1st TTL=1, 2nd time TTL=2, ...
after arrive to nth router, discard datagram, send source ICMP msg
include router name, IP address

when ICMP msg arrive => record RTT
stop when arrive dest


# Routing Protocol
routing algorithm = algorithm find least cost path between 2 nodes

global: all routers have complete topology, link cost info
decentralized: router only know physically-connected neighbors cost
static: router change slowly over time
dynamic: router change more quickly

## link state, Dijkstra's algorithm
compute least cost path from 1 node (source) to all other node
after k iterations, know least cost path to k dest

need to check all nodes, O(n^2) comparisons

## Distance vector algorithm
Bellman-Ford equation (dynamic programming)

cost of least-cost path x->y
= d_x(y)
= min taken over all neighbors v of x(
  cost -> neighbor v + cost neighbor v -> destination y
)

each node:
1. wait for change{by recalc/outside changes} in local link cost / msg from neighbor
2. recompute estimate
x receive new DV => update own DV using BF equation
D_x(y) = min_v{ c(x,v) + D_v(y) } for each node y in N
3. if DV to any dest change, notify neighbor

good news travels fast
bad news travals slow -> count to infinity problem

### split horizon
if Z through Y to X, then Z will
- not advertize route to X via Y
- advertise route to X with infinite cost to Y

## LS VS DV
LS: 
n nodes, E links -> O(nE)
may have oscillation
can advertise incorrect link cost

DV: 
exchange among neighbor only, converge with time
may be routing loops, count to inf
can advertise incorrect path cost

## hierarchical routing
aggregate routers into regions => autonomous system (AS)
within same AS run same routing protocol

gateway router: link to router in another AS
forwarding table configured by intra- and inter-AS routing algorithm

AS1 learn (from inter-AS protocol) subnet x reachable via AS3 (gateway 1c)
router 1d determine least-cost path to 1c via interface I
=> forwarding table entry (x,I)

### hot potato routing
choose gateway with least cost
determine from forwarding table interface to least-cost gateway


# Internet routing
intra-AS routing = interior gateway protocols (IGP)

## RIP (routing information protocol)
distance metric: #hops (max=15), link cost = 1
use distance vector algorithm, exchange every 30s, each list up to 25 destination subnets (advertisement)

if no advertisement heard after 180s => neighbor/link dead
routes via neighbor invalidated
new advertisement sent to neighbors

RIP routing table => application-level process: route-d
advertise sent in UDP packets
### format
'dest' 'next' '#hop'
  w      A      2
  x     ---     1
  y      B      2

## OSPF (Open shortest path first)
use link state algorithm, topology map at each node
route compute => Dijkstra's algorithm

advertise 1 entry/neighbor
advertisement flood to entire AS directly over IP

all OSPF msg authenticated
multiple same-cost path allowed
unicast, multicast support

hierarchical OSPF in large domains: boundary -> backbone -> area border -> internal
2-level hierarchy: local area, backbone
node know shortest path to area border router

maintain 
- neighbor table: all neighboring routers
- topology table: all possible route to all network within area
- routing table: best route

## BGP (Border Gateway protocol)
de facto inter-domain routing protocol
eBGP: get subnet reachability info from neighboring AS
iBGP: propagate reachability info to all AS internal routers

BGP session: router exchange BGP msg
send prefix reachability, create entry for prefix in forwarding table

prefix + attributes = "route"
AS-PATH: eg. AS 67, AS 17
NEXT-HOP: router interface that begins AS-PATH

### route selection
1. local preference 
2. shortest AS-PATH
3. closest NEXT-HOP (hot potato routing)
4. additional criteria

inter-AS: policy may dominate over performance
intra-AS: can focus on performance




































