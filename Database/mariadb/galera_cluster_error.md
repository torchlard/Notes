# 1
situation: rsync: failed to connect to x.x.x.x: No route to host
reason: firefall blocked
solution: iptables -A INPUT -p tcp -s xx.xx.xx.xx --dport 873 -j ACCEPT

















