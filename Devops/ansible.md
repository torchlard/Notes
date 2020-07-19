# intro
IT automation engine automates cloud provisioning, config management, application deployment
intra-service orchestration

model IT infrastructure by describing how all systems inter-relate
use no agent, no additional security infrastructure

connecting nodes and push out small programs "ansible module"

# sample
```ini
[website]
www1.example.com
www2.example.com
```
# playbook
simple and powerful automation language

```
---
- hosts: webservers
serial: 5
roles:
- common
- webapp
```

# command
ansible multi -a "df -h" -f 1  // do one by one
ansible multi -b -m yum -a "name=vim state=present"
ansible app -b -a "service ntpd restart" --limit ~".*\.4"

## playbook 
-i: custopm inventory file, default `/etc/ansible/hosts`
-e: define variables to be used in playbook "key=value,key=value" format
-f: num of servers run tasks concurrently
--check

## param
a: arguments
b: become root
c: connection type used
i: inventory hsot path / host list
l: limit selected hosts
m: module name
u: connect to this user

B: async timeout
T: connection timeout

# connection
function withoout running any extra applications / daemons on servers
## OpenSSH
default use native OpenSSh
`ssh -i ~/.vagrant.d/insecure_private_key vagrant@192.168.60.4`

## faster with pipeline
instead of: copying files, running them on remote server, remove them
pipeline: send and execute commands for most ansible modules directly over SSH


# concept
## control machine / node
system where ansible is installed and configured to connect and execute commands on nodes

## node
server controlled by ansible

## inventory file
locate at `/etc/ansible/hosts`
file contains info about servers Ansible control

```conf
mail.example.com

[webserver]
foo.example.com
bar.example.com

[app]
www[01:50].example.com

[atlanta]
host1 http_port=80 maxReqPerChild=808

[app2:vars]
ntp_server=ntp.atlanta.example.com
proxy=proxy.atlanta.example.com
```
default groups: all, ungrouped
can assign variables to single hosts and use in playbook

### inharit variable values
```conf
[atlanta]
host1
host2

[raleigh]
host2
host3

[southeast:children]
atlanta
raleigh

[southeast:vars]
some_server=foo.southeast.example.com
halon_system_timeout=30

[usa:children]
southeast
northeast
southwest
northwest
```

### multiple inventory
ansible-playbook get_logs.ymnl -i staging -i production


## playbook
file containing series of tasks to be executed on remote server

## role
collection of playbook relevant to a goal
eg. installing web server







