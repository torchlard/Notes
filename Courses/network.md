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

client            server
 | -- discovery --> 
 | <-- offer ----
 | -- request -->
 | <-- ack -----

client may receive multiple DHCP server offers, only confirm 1 offer
final ACK contain: DNS ip, gateway ip

2. client get assigned ip, DNS ip, gateway ip
ARP query: client broadcast, router receive, give MAC address based on ip

3. client get assigned IP address, get router MAC,ip, get DNS ip
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


# reliable data transfer
unreliable channel under reliable data transfer

rdt_send() -> udt_send()
=>
rdt_rcv() -> deliver_data()

## rdt 1.0
underlying channel perfectly reliable, no error/loss
## rdt 2.0
with bit error, use checksum to detect error

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

## rdt 2.1
add sequence number to each package
sender retransmit current package if ACK/NAK corrupted
receiver discard duplicate package

- sender
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

- receiver
'wait for 0'
if received && not_corrupt && seq==0:
  extract data, deliver
  send ACK
  go 'wait for 1'
elif received && corrupted:
  send NAK
elif received && not_corrupt && seq==1:
  send ACK
  go back 'wait for 0'

'wait for 1'
if received && corrupt:
  send NAK
elif received && not_corrupt && seq==0:
  send ACK
  go 'wait for 1'
elif received && not_corrupt && seq==1:
  extract, deliver data
  send ACK
  go for new 'wait for 0'

## rdt 2.2
do not use NAK, just use seq num
- sender
'wait for 0'
rdt_send(data)

'wait for ACK 0'
if received && (corrupt || ACK1):
  udt_send(sndpkt)
elif received && not_corrupt && ACK0:
  go to next

- receiver
if received && notcorrupt && seq==1:
  extract data
  send ACK1
  go 'wait for 0'

'wait for 0'
if received && (corrupt || seq==1):
  udt_send(pkg)
  'wait for 0'

## rdt 3.0 
channel with error and loss packets (data, ACK)
sender wait for reasonable amount of time for ACK
retransmit if no ACK

- sender
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
|-------------|----------------|
base         nextSeqNum
<----------window size(N)------->

if nextSeqNum < base+N:
  send(packet[nextSeqNum])
  if base == nextSeqNum:
    start_timer
  nextSeqNum++
else:
  refuse_data

if timeout:
  start_timer
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
      stop_timer
    else:
      start_timer


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
send individual ACK for each packet

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
window = window/2
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








