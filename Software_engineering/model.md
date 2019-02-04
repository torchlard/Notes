# Actor model
treat actor as primitives of concurrent computation
in response to message that receive, actor can
- make local decisions
- create more actor
- send more message
- determine how to respond to next message received
+ avoid locks
+ can modify own private state

decouple sender from communication sent
recipients of messages are identified by address
actor only communicate with actors whose address it has
async message passing, no restrictio on message arrival order

















