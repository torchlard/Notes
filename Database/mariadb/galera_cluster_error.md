# 1
situation: rsync: failed to connect to x.x.x.x: No route to host
reason: firefall blocked
solution: iptables -A INPUT -p tcp -s xx.xx.xx.xx --dport 873 -j ACCEPT


## edit the grastate.dat file manually and set safe_to_bootstrap to 1 
sudo vim /var/lib/mysql/grastate.dat

change `safe_to_bootstrap: 1`

## ist not allowed
set node address to private ip in VPC
disable SELinux

# cannot sync
reason: selinux enabled
solution:
sudo vim /etc/selinux/config

`SELINUX=disabled`














