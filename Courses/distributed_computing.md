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







