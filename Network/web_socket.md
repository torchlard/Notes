# principle
allow sync bidirectional communication between client and server
upgraded HTTP connection, exchanging variable-length frames between 2 parties, instead of stream

NO specific messaging protocol

## port
work via port 80,443, use HTTP as proxy
=> compatible to HTTP

handshake use HTTP Upgrade header
duplex bi-directional connection

# STOMP (Simple/Streaming Text Orientated Messaging Protocol)
derived on top of websocket
defines protocol for client and server to communicate with messaging semantics
not define any implementation details, address easy wire protocol for messaginng integration

frame types that mapped onto WebSockets frames
- connect
- subscribe 
- unsubscribe
- send (send to server)
- message [send from server] (BEGIN, COMMIT, ROLLBACK)

## format
```
COMMAND
header1:value1
header2:value2

Body^@
```











