# intro
backward compatible with SysV init scripts
extra features, eg. parallel startup at boot time, on-demand daemon

# unit types
service: system service
target: group of systemd units
automount: file system automount point
device: device file recognized by kernel
mount: file system mount point
path: file/dir in file system

scope: externally created process
slice: group of hierarchically organized units that manage system processes

snapshot: saved state of systemd manager
socket: inter-process communication socket
swap: swap device/swap file
timer

## unit file location
/usr/bin/systemd/system/: unit files installed with rpm packages
/run/systemd/system/: unit files created at runtime
/etc/systemd/system/: unit files created by `systemctl enable`

## activations
socket-based activation
  - create listening socket forall system services
  - pass socket when services started
  - allow start in parallel, not lose msg when unavailable (msg queued)

bus-based activation
  - D-Bus for IPC start on demand when attempt communication
device-based activation
  - start on demand when particular type hardware available
path-based activation
  - start when particular file/dir change its state
mount, automount point
  - use mount units for mount 
Aggresive parallelization
  - start systemd services in parallel as soon as all listening sockets in place

Transactional unit activation logic
  - before activate/deactivate unit, calc its dependencies
  - create temp transaction, verify transaction consistent
  - if inconsistent, attempt correct it, remove non-essential job

## compatibility change
only some targets directly mapped to runlevels
N for target with unknown runlevel 
  
systemctl not support custom commands (only start,stop,status from SysV)  
systemctl not communicate with service not started by systemd

system service unable read from standard input stream
when service start, connects standard input to /dev/null to prevent interaction

not inherit any context (eg. HOME, PATH env var)
if loading SysV, read dependency info in Linux Standard Base header
5 min timeout prevent system freezing

## start conflicting service
if already running, background stop it first and start another service

# command
start, stop, restart, status
enable, disable

try-start: restart if running
reload: reload config

chkconfig name on = systemctl enable name.service
chkconfig name off = systemctl disable name.service

change default target `systemctl set-default name.target`
change to rescue mode `systemctl rescue`
change to different target in current session `systmctl isolate name.target`
`systemctl emergency`
`systemctl halt|poweroff|reboot|suspend|hibernate|hybrid-sleep`

prevent systemd from sending msg: `--no-wall`


# unit file
filename: unit_name.type_extension

add custom config to sshd.service: create `sshd.service.d/custom.conf`
- sshd.service.wants/, sshd.service.requires/ can be created

## [Unit]
After: define order in which units are started, not explicitly activate specified units
Requires: config dependencies on other units
Wants: weaker dep than Requires, no impact on activation if not exists
Conflicts: opposite to Requires

## [<unit-type>]
### Type
unit process startup type that affect ExecStart
- simple: default, start as main process
- forking: spawn child process
- oneshot: process exits before starting consequent units
- dbus: consequent untis start after main process gain D-Bus name
- notify: consequent untis start after notification msg sent
- idle: actual execution delayed until all jobs finished

### other
ExecStart, ExecStop, ExecReload
Restart: service restart after process exits, except stop by systemctl
RemainAfterExit: service considered active even when all its process exited

## [Install]
Alias: alias name to unit
Also: units installed/uninstalled along with unit
DefaultInstance: (only instantiated units) 


# create custom unit file
1. prepare executable file with custom service
2. if required, prepare PID file to hold const PID for main process 
3. include enironment file to store shell variabels 
4. create unit file in `/etc/systemd/system/` with correct permission (644), execute as root
5. add service config to `name.service`

## SystemV LSB to systemd
for RHEL7, all core service has default unit files

shouldn't directly modify unit files, modification should put config files 
- create dir for supplementary cconfig files at /et/system/system/unit.d/
- create copy of original unit files /usr/lib/systemd/system and amke change
  - copy overwrites original file











  
  

