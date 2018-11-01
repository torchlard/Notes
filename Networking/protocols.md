# socket.io
socket.io use websocke when possible, but not implementation of WebSocket
add metadata to each packet (packet type, namespace, ACK id)


socket.io has multiplexing support
- each packet belongs to given namespace '/'

client can send, receive EVENT packets

## packet
connect
disconnect
event
ACK
error
binary_event
binary_ack

## EVENT
data(array): event name, ... args
id(number)

## functions
can pass through firewall, proxies, anti-virus

## connection
disconnected client will try to reconnect forever, until server available again

## room
within each namespace, can define arbitrary channels => room
sockets can join and leave
can broadcast to any given room, reaching every socket joined


# WebRTC
web real time communication
signaling server: let 2 clients know each other

## 
use UDP, not that reliable
end-to-end encrption
no need server to transfer data

## signal server
### create server
chat server send info as JSON between clients and server
support register new user, setting username
signaling, ICE negotiation

### exchange session description
type: eg. "video-offer", "video-answer"
name: sender's username
target: username of receiver
SDP: Session Description Protocol describe local end connection from perspective of sender
=> exchange offer and answer

### exchange ICE candidates
negotiate actual connection between peers
keep sending candidates until run out of suggestions
candidate's SDP used by each peer to construct and open connection

- if later agree on better candidate, stream may change formats as needed
send by other peer over server to remote peer
type: "new-ice-candidate"
target: username of negotiated person
candidate: SDP candidate string

- suggest communication protocol(TCP/UDP), IP address, port num, connection type, NAT
developer don't attempt to change SDP
just use "onicecandidate", "addIceCandidate", receiving ICE candidate msg from signaling server


# ICE/STUN
many reasons that peer A and peer B cannot directly communicate
interactive connectivity establishment: framework to connect to end point
NAT

## STUN
communicate across local area network
host STUN server yourself / find existing STUN server
- job: return external IP
inexpensive

STUN server != signaling server
signaling server: pass information between peers at start up of session, SDP(offer,answer)
- ALWAYS needed to negotiate and connect
STUN server: let 2 peers send media to each other
- needed when 2 parties not in same network


## TURN
STUN can manage most NAT problem, not symmetric NAT
TURN server is also a STUN server, will redirect media data
- job: media delay
expensive

## TCP
if UDP connection stopped, switch to TCP
### STUN over TCP
remote candidate include TCP related candidate
### TURN over TCP


# NAT
## types
### full cone NAT
1-1 mapping
most permissibe form of restriction
map private(ip,port) to open internet (ip, port)

### restricted cone NAT
mapping
only source ip network matters

### port restricted cone NAT
restrict connection from other ports

### Symmetric NAT

## security
NAT =/= firewall, have different goals
NAT router break protocol stack layer separation, may break application
once mapping is in NAT translation table, traffic can reach internal network

NAT implemented in router











