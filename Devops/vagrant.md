# intro
virtual machine construction tool
use vagrantfile describe VM and bring it to hypervisor

# command
```
[example]
xx.xx.xx.xx
```
`ansible example -a "free -h" -u [username]`

prepare
```
vagrant init
vagrant box add geerlingguy/centos7
vagrant up
```
`vagrant ssh <boxname>`


# VS virtualbox
1. forward ports to VM, share public network connection
2. shared folder management usin NFS / native folder sharing
3. multi machine management
  - control multiple VMs within one Vagrantfile
4. when run vagrant up for first first, auto privision 

vagrant passes off VM to Ansible, tell Ansible to run defined Ansible playbook












