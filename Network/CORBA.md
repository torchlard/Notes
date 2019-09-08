# CORBA
common object request broker architecture
- distributed object
- use IDL (interface description language) describe interface
- compile tool compile many lang to sub (client) and skeleton (server)
- RPC middleware

## ORB
object request broker(proxy)
- client code send request to ORB
- ORB locate to server side ORB, manage connection and send data

## GIOP (general inter ORB protocol)
define serialization and deserialization rules for msg transfer

## IIOP (internet inter-ORB protocol)
implementation of GIOP on IP protocol
- kind of wire protocol


# problem
1. protocol too complex, like OSI/ISO VS TCP/IP
  - implementations not compatible
2. inappropriate to treat local and remote call the same
  - communication delay
  - communication address isolation
  - local error
  - concurrency

someone says: every 10 year people try to unite local and remote computation, then fail

# late comer
## Web Service
SOAP as wire protocol
WSDL as IDL to describe WS interface
XML as language

=> lose battle to RESTful API

## Protocol Buffer
compatible to many language, binary

## Thrift
serialization, include IDL





