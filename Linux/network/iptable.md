# iptables
based on netfilter mechanism
check existing `iptables -L -n`
check rules `iptables -S`

eg. open port 3306
`iptables -A IN_public_allow -p tcp -m tcp --dport 3306 -m conntrack --ctstate NEW,UNTRACKED -j ACCEPT`

## principle
each table has default links
all links default no rules
rule: 
1. matching: match multiple port, ip, packet type; can include module (eg. conntrack)
2. action: `-j` ACCEPT, DROP, RETURN, SNAT, DNAT

raw: whether packet state traced, built in PREROUTING and OUTPUT
filter: INPUT, FORWARD, OUTPUT
nat: PREROUTING, INPUT, OUTPUT, POSTROUTING
mangle: for changing contnt, PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING
security: for data sercurity, INPUT, FORWARD, OUTPUT
