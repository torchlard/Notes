# NTP
get accurate clock, sync time with server

# dracut-shutdown
for ramfs, initial loading file systems to ram

# ebtables
ethernet firewall

# exim
mail transfer agent
general and flexible mailer with extensive facilities for checking incoming e-mail

# getty
manage phyical / virtual terminals (TTY)
when detect connection, prompts for username, auth user

# irqbalance
distribute hardware interrupts across processors on multiprocessor system

# kdump
create crash dump in event of kernel crash
exports memory image (vmcore)
dumped image of main meory export as ELF object, access via `/proc/vmcore`

# kmod-static-node
kmod: manage linux kernel modules
static-nodes: output static device nodes info provided by modules 

# plymouth
provide flicker-free graphical boot process
relies on kernel mode setting to set native resolution of display as early as possible
- splash screen leading to login manager

# polkit
application level program define and handle policy that
- unprivileged process speak to privileged process
- framework centralizing decision making wrt granting access

# rc.d
`/etc/rc*.d` link to scripts under `/etc/init.d`
`*`=system runlevel
S: higher priority

# NIS
network information system
manage account of multiple machine

# syslog
system logging

# binfmt
read config files from 
  - /etc/binfmt.d/*.conf
  - /run/binfmt.d/*.conf
  - /usr/lib/binfmt.d/*.conf
to register in kernel additional binary formats for executable

# machine-id
in `/etc/machine-id`
when install OS, auto gen random hex string, never change again
unique ID to recognise machine

# readahead
initiate read ahead on file so that subsequent reads from same file get from cache

# systemd-sysusers
use files from sysuser.d to create system users and groups at package installation / boot time
access /etc/passwd, /etc/group directly

# udev
device manager for kernel, successor of devfsd and hotplug
- load kernel modules asynchronously for parallelism

# utmp
allow one to discover information about who currently using system

# tuned
fine tune system setting at runtime

# ypbind
ypbind finds server for NIS domains, maintians NIS binding info

# ypserv
activate at system startup
runs in NIS server with NIS db
simple network lookup service








