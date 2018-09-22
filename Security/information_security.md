# technology
1. physical entity
electromagnetism, device corruption
2. firewall
control what data package can in/out network
3. intrusion detection system
abnormal communication, backdoor
4. honeypot
mimic server vulnerable to attack, let hacker fall into trap
5. identification
6. identity 
7. encrpytion
8. watermark
9. physical separation
10. VPN
11. disaster recovery
12. reaction to intrusion

# Web
## https
SSL/TLS
based on signature from trusted certification organization
1. user believe website uses https, install correct certificate
2. user believe the organization is trustworthy
3. website provide effective certificate
4. certificate can validate website
5. user believe TLS/SSL cannot be eavesdropped

## session
mechanism for server, server use hash structure to store data
when client send request, server create new Session;
  if client has identifier for Sesion, then search by identifier; 
  else create new

Cookie: client maintain state
Session: server maintain state

## encoding
### URL
US-ASCII, use % as prefix for extension character
### Unicode
hex unicode (%u)
### HTML
convert symbols with special meaning in HTML with encode
### base64
represent binary (64 chars)

## SQL injection
eg. 
normal: xxx.asp?ID=1
injected: xxx.asp?ID=1 and user>0

hacker can guess secret of database based on error message
1. steal password, data
2. attack server
3. get system constrol
4. destroy data
5. pass through gateway server to other server

### select
xx?ID=1 and 1=1 <-- test integer
xx?ID=1' and '1'='1 <-- test string
may try small and capital letter for 'select', 'and' to overcome defense
### insert
try to figure out how many arguments and argumemnt type allowed
### update
can update admin password if allow injection
### delete










