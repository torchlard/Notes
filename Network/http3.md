# overview
HTTP over QUIC
support for HTTP/3 added to Chrome in 9/2019

# background
browser need more concurrency when fetching and rendering web page
number of resources (CSS, JS, images) required increase over years

## problem
HTTP/2 solve problem of inefficient use of single TCP connection
new problem: all req and res equally affected by packet loss

role of TCP: deliver entire stream of bytes in correct order
if TCP packet lost, create gap in stream
TCP cannot know whether application able to process without missing bits


# QUIC 
general-purpose, transport layer network protocol by Google
"qucik UDP internet protocol"

improves performance of connection-oriented web applications currently using TCP
establish a number of multiplexed connections between 2 points over UDP

## characteristics
aims nearly equivalent to TCP connection, much lwoer latency
1. reduce overhead during connection setup
  - make exchange of setup keys and support protocols in intial handshake process
  - client opens connection => send data for future encryption
  - other protocols can serve in same way, combine multiple steps into single request-response
2. use UDP as basis, not include loss recovery
  - each QUIC separately flow controlled, lost data retransmitted at level of QUIC, not UDP
  - if error in 1 stream, protocol stack continue serve other streams
  - TCP: all data is blocked / flushed when error detected 
  - QUIC: data free to be processed while single multiplexed stream is repaired
3. packets encrypted individually, no need wait for partial packet (not possible under TCP)
  - improve overall latency and throughput
4. improve performance during network-swtich events
  - connection identifier uqniuely identifies connection to server regardless of source
  - connection re-sestablish simply by sending packet
5. QUIC can implement in application space
  - no change require to kernel
6. problem: TCP widely adopted, many middle-boxes tuned for TCP
  - only small number of connections blocked
  - rapid fallback-to-TCP

















