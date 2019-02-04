# Physical layer
data, signal, code
simplex, half duplex, full duplex
baseband signal: unmodulated digital/analog signal 
bandpass signal: modulated signal by carrier wave (only that freq range can pass channel)
modulation
singla-to-noise radio: (dB) = 10*log_10(S/N)
channel multiplexing
bit rate, baud rate
ADSL, HFC network

## keypoint
- source system, transfer system, target system
- optical fiber: PON, EPON, GPON
- goal:
how to connect different media, hide difference in transfer media and communication method


# Data Link layer
link: physical link to neightboring node
data link: 
Cyclic Redundancy check
frame: data link transfer unit (header+packet)
maximum transfer unit
bit error rate
Point-to-point protocol
MAC address
bridge: connect >= 2 device in LAN
switch

## 
1. point-to-point channel and broadcast channel two types
2. pack as frame, transparent transfer, error checking
3. CSMA/CD ethernet
4. ethernet adapter can filter, only accept multicast, broadcast, single cast frame
5. ethernet use connectionless method

## 
bridge between software and hardware
2 subsystem:
1. Logical Link Control
logical addressing protocol
2. Media Access Control
physical addressing & media requirement
```
| Header | Packet(Data) | Trailer |
```

method of control depends on
- mdia sharing
- topology
  + physical topology
  + logical topology


method for shared media
### Controlled
- each node has its own time use media
- no collision
- some network use token passing
- device want to trasmit wait for their turn
- eg. Token Ring, FDDI

### Contention-based
- all nodes compete to use medium
- statio ncan transmit at any time
- collision exists
- mechanism to resolve contention: CSMA/CD, CSMA/CA
- eg. Ethernet, Wireless

#### CSMA/CD
collision detection / collision avoidance
carrier sense multi-access

## topology
### PPP
all frame travel to/from 2 nodes

### multiaccess
every node sees all frames
frame require address to identify intended node






















