# concept
task: 1 process
control group
  - process can join 1 group / transfer to another group
  - allocate resource by group
hierarchy
  - control group in tree structure
subsystem
  - 1 subsystem = 1 resource controller
  
## rule
1. root cgroup (default), any cgroup created under this level belong to it
2. 1 layer can add several subsystem
3. 1 task can be member of multiple cgroup, but cgroup must in different layer

## cgroup subsystem
cpu
cpuacct: cpu stat
cpuset: allocate single cpu node / memory node
memory
blkio: limit io
devices: can access several device
net_cls: mark network packages in network
freezer: freeze / resume process in cgroup 
ns: can use different namespace under different cgroups

# install
libcgroup

# command


# systemd
systemd add supported controllers to `/sys/fs/cgroup`
by binding cgroup level with systemd units, systemd can limit resource from process level to application level

## lifecycle
systemd use cgroup to trace finished tasks, stop all tasks when service stopped

service, scope, slice unit directly mapped to objects in cgroup tree
when unit triggered, map to cgroup path
eg. cron.service belong to system.slice -> cgroup system.slice/cron.service/

# slice
-slice: root slice
system.slice: all service default location
user.slice
machine.slice: vm, linux container location























