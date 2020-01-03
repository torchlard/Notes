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


# firewall
`systemctl status firewalld`

`firewall-cmd --list-all`

# iptables
check existing `iptables -L -n`
check rules `iptables -S`

eg. open port 3306
`iptables -A IN_public_allow -p tcp -m tcp --dport 3306 -m conntrack --ctstate NEW,UNTRACKED -j ACCEPT`











