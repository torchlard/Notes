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


# firewalld
## concept
DBus layer: interface alter and create firewall config
core layer: config, backend (iptables, ipv6tables, ebtables, ipset ...)

firewalld not depend on NetworkManager, recommend use it

## config
`/usr/lib/firewalld` contain default and fallback config
maunal change pre-defined icmptypes/zone/service: copy file and change
if no `/etc/firewalld`, use firewalld.conf

### runtime config
actual effective config, applied to firewall in kernel
lost with firewalld stop

### permanent config
stored in config file

### firewall.conf
DefaultZone: everything not explicitly bound to another zone handled by default
Clean up on exit: firewalld config clean up on exit of firewalld

## command
show status `systemctl status firewalld`

### firewall-cmd
primary command tool, manage runtime and permanent config
#### status
--reload: permanent -> runtime
--complete-reload: reload even netfilter kernel modules
--runtime-to-permanent
--permanent: set options permanently

#### zone
get-zones, get-services, get-icmptypes
set-default-zone

list all `firewall-cmd --list-all`
get zones (networks) `firewall-cmd --get-active-zones`
`firewall-cmd --zone=public --list-services`

--permanent --zone=public 
  `--add-service=<service>`
  `--add-port=(<portid> OR <portid - portid>)/<protocol>` support port range
  `--remove-port=<portid>[-portid]/<protocol>`

eg. for mysql 3306
`firewall-cmd --permanent --add-port=3306/tcp`
`firewall-cmd --reload`

### firewall-offline-cmd
config firewalld if it's not running / active

## zone
drop: any incoming network packets dropped, no reply; only outgoing network possible
block: any incming rejected with icmp-host-prohibited message; outgoing possible
public: use in public areas, not trust other computers on network, only selected accepted
external: masquerading enabled especially for routers
dmz: demilitarized zone that publicly accessible, limited access to internal network
work: work area, mostly trust other computer
home: mostly trust other
internal: internal network, mostly trust
trusted: all connection accepted

## connection, interface, source
zone stored in ifcfg with ZONE=config
firewall not able to handle network connections with name shown by Networkmanager
  - only handle network interfaces used by connection
  - NetworkManager tells firewalld to assign interface for conn to zone
  - assignment happen before interface used

if connection > 1 interface, all supplied to firewalld
changes in names of interfaces handled by NetworkManager and supplied to firewalld


# iptables
check existing `iptables -L -n`
check rules `iptables -S`

eg. open port 3306
`iptables -A IN_public_allow -p tcp -m tcp --dport 3306 -m conntrack --ctstate NEW,UNTRACKED -j ACCEPT`








