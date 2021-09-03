# mysql.sock
when mysql client and server in same machine, use unix domain socket
- faster than tcp

client program: mysql
server program: mysqld

mysql.sock create each time mysql server loads

# connection type
1. TCP/IPP
2. socket

if use sock connect, no need define host IP
- even if mysql external port changes, still can connect
  












