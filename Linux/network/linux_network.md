# hosts
DNS: convert url to IP
computer first check /etc/hosts to find mapping of URL to IP;
if not found, then query DNS 

- in absence of name server, any network program consults this file to determine IP corresponds to host name
format:
```
IPAddress  Hostname  Alias
208.164.186.1   deep.openna.com   deep
```

# icmp (Internet Control Message Protocol)
apply to IP control msg send, return all kinds of problem
diagnose network

# tools
## curl
use URL to upload/download file, support many protocols (ftp,http,https,sftp,pop3,smtp)
support SSL, HTTP (POST,PUT), proxies, HTTP/2, cookies, proxy tunnenling

## Arial2
support BitTorrent, http, https, ftp
use JSON-RPC, XML-RPC to do remote HTTP download control

## wget
legacy download tool
problem: support too few protocol, only HTTP 1.0, too complex



# netfilter
linux kernel packet filter framework

hooks:
NF_IP_PRE_ROUTING: L2 -> L3 packet filter before routing
NF_IP_LOCAL_IN: after routing -> local
NF_IP_FORWARD: source and destination not local
NF_IP_LOCAL_OUT: source=localhost, destination=other
NF_IP_POST_ROUTING: before leaving local after routing

## implement
use priority as if/elseif/else

classification with rules, then decide restart classification / ends



# Linux Virtual Server (lvs)
work on L4 (transport layer), work on TCP,UDP
one of best load balancer, built into kernel
- include ipvs (kernel module), ipvsadm (tool)

Director Server: load balancer node
Real Server: backend service node 

## NAT
redirect source IP,port to send to real server

director server need to be gateway of real server, must be in same network 
no special setting in real server
easy become bottleneck

## DR (direct route)
modify source MAC redirect to real server

- need set vip on real server's `lo`, set `arp_ignore`, `arp_announce`
- response not pass director server

## TUN (tunneling)
encapsulate data into another IP
directly return msg from real server

don't need director server as gateway


# ifconfig
flags=4163<up,running,broadcast,multicast>
= 0x1043 = 0x1000 + 0x40 + 0x2 + 0x1
= multicast + running + broadcast + up

ether: mac address
txqueuelen: transmit queue length
prefixlen: prefix length in ipv6 = subnet mask in ipv4
  - 2001:db8:abcd:0012::0/64 
    - 2001:db8:abcd:0012:0000:0000:0000:0000 to
    - 2001:db8:abcd:0012:ffff:ffff:ffff:ffff

scopeid: distinguish specific network refer to link-local address
RX|TX packets: total number of packets received and transmitted respectively


# set fixed ip (centos)
vim /etc/sysconfig/network-scripts/ifcfg-eth0

BOOTPROTO="static"
NM_CONTROLLED="yes"
IPADDR=192.168.11.203
NETMASK=255.255.255.0
GATEWAY=192.168.11.1
DNS1=8.8.8.8
DNS2=8.8.4.4


## files to consider
/etc/resolv.conf : for DNS
/etc/hosts
/etc/sysconfig/network-scripts/ifcfg-eth0
/etc/sysconfig/network

# command
nmcli d











