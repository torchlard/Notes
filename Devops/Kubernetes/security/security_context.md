# intro
define privilege and access control for Pod / container

1. discretionary access control: based on uid and gid
2. SELinux
3. running as privileged / unprivileged
4. linux capability: give process non-root privilege 
5. AppArmor
6. Seccomp: filter process's system call
7. AllowPrivilegeEscalation: control whether process gain more privileges that parent process
8. readOnlyRootFilestystem

# setting
```yaml
runAsUser: 1000
runAsGroup: 3000
fsGroup: 2000
```
for any containers in Pod, all processes run with userID 1000
primary group ID of 3000 for all processes in containers in Pod

any files created will also owned by user 1000 and group 3000 
all processes part of supplementary group ID 2000










