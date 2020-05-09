# Domain Name system
hierarchical decentralized naming system for computers, service, other resources connected to internet/private network
- translate domain names -> IP
- worldwide directory service
- designating authoritative name server for each domain

2 principle namespace for WWW:
1. domain name hierarchy
2. IP address space

## common record type 
Start of Authority (SOA)
IP address
SMTP mail exchangers (MX)
name servers (NS)
reverse DNS lookups (PTR)
domain name aliases (CNAME)

## domain name space
```
zone
  resource records (associate with name)
    zone
      record
        record
        record
    zone
      record
        zone
          record
            delegated subzone
              record
                record
                record
        zone
          record
```

## format
label 0-63 characters
hostname use subset of ASCII (a-z, A-Z, -)

ICANN approve map Unicode Strings -> valid DNS 


# recursive query "www.google.com"
. -> .com -> google.com -> www.google.com

## DNS cache
multi level cache
- browser cache
- system cache
- router cache
- IPS server cache
- root domain: .
- top-level domain: edu, goc, com, net
- second-level domain: nsu, mit, google, att

# keywork
authoritative name server: name server that give answer in response to questions asked about names in zone

virtual hosting: multiple hostname correspond to single IP
load balance: single hostname many IP address


# Address resolution
"www.wikipedia.org"
=> root nameserver -> org. nameserver -> wikipedia.org. nameserver

if every resolution query root, then root is down
=> DNS server cache

## circular dependency
name server in delegation identified by name, so must also provide >=1 IP address for authoritative name server (glue)
eg. query "ns1.example.org" resolve "example.org" first

## record cachiing
cache results locally, associate result with TTL

## reverse lookup
IP address known, find domain name

## broken resolver
some large ISP violate rules, eg. disobey TTL, indicate domain name not exist because name server not respond
browser use very short caching time, eg. 1 min


# DNS protocol transport
UDP on port 53 to serve request
signle UDP request from client followed by single UDP reply form server
TCP for zone transfer

# record 
## CNAME (canonical name record)
kind of record in dns
map domain name to true domain name, CNAME is real name

| name             | type  | value            |
|------------------|-------|------------------|
| bar.example.com  | CNAME | foo.example.com. |
| foo.example.com. | A     | 192.0.2.23       |

query "bar.example.com" -> foo.example.com -> 192.0.2.23
CNAME must not contain any other record (eg. MX, A)

## DNAME
proxy name
map subdomain of certain domain to another domain name

| foo.example.com.       | DNAME | bar.example.com. |
|------------------------|-------|------------------|
| bar.example.com.       | A     | 192.0.2.23       |
| xyzzy.bar.example.com. | A     | 192.0.2.24       |
| *.bar.example.com      | A     | 192.0.2.25       |

foobar.foo.example.com -> 192.0.2.25

## A 
map domain name to host IP

## AAAA
domain name -> ipv6

## SRV
define service in specific host location, eg. hostname, port number

## NAPTR
use regular expression to map domain name


# root name server
originally restrict to 13 (A - M)
using anycast scale up to 1008 name servers





























