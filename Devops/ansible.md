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












