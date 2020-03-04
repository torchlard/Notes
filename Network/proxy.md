# SOCKS
internet protocol exchanges network packets between client and server through proxy server
perform at layer5 OSI (session layer)
accept incoming client connection on TCP port 1080

SOCKS operates at lower level than HTTP proxying
SOCKS can forward UDP traffic and work in reverse, HTTP proxies cannot

# ssh
## privileged port
port 1-1023

## command
A: enable forwarding of authentication agent connection
  - can bypass file permission on remote host
B bind_interface
  - bind to address of bind interface before attempting connect to destination host
  - for system with >1 address
C: request compression of all data, only good for slow network
D [bind_address:]port
  - specifies local dynamic application-level port forwarding
  - allocate socket listen to port on local side 
  - when connet to this port, forward over secure channel, applicaiton protocol determine where to connect
   
F: specify config file
f: ssh go background before command execution
  - start X11 at remote site: ssh -f host xterm
g: allow remote hosts connect to local forwarded ports
i [identity_file]
J [destination]
  - connect to target host by first make ssh to jump host
  - then TCP forwarding to ultimate destination

k: disable forwarding of GSSAPI credentials
L [bind_address:]port:host:hostport
  - local port bound with GatewayPorts
l [login name]

M: place ssh client into master mode for connection sharing
N: not execute remote command, just forwarding ports
n: prevent reading from stdin, must be used when ssh run in background
o: give options in format used in config file
  - 
p [port]
  - port to connect to remote host
Q [query_option]
    - query algorithm supported
q: quiet mode
R: reverse proxy
S: specify location of control socket for connection sharing
s: request invocation of subsystem on remote system
T|t: disable|force pseudo-terminal allocation
W: stdin, stdout on client forward to host on port over secure channel
w [local_tun:remote_tun]
  - requests tunnel device forwarding with specified tun device between client and server

X|x: enable|disable X11 forwarding
  
   


