# view system process
unix option: `-`
BSD option: no `-`
GNU long option: `--`

## ps
default selects all processes with same effective user ID as current user & same terminal 
display PID, terminal associated, cumulated CPU time, executable name
works by reading virtual files in /proc

SIZE,RSS not count some part of process, eg. page tables, kernel stack, struct thread_info ...

### command
- a: lift "only yourself" restriction
- x: lift "with tty" restriction

every process with standard syntax `ps -e`
process running as root `ps -U root -u root u`
about threads `ps -eLf`
process three `ps -ejH`

by command name show its pid `ps -C mysqld -o pid=`
process id 42 `ps -q 42` `ps 42` `ps --pid 42`
process with user-defined format `ps -eo pid,tid,ni,pgid,comm`
sort by pid `ps -e --sort pid`

### format specifier
C/CP: CPU usage (% time spent running during entire lifetime of process)
TIME: total CPU usage
TT/TTY: terminal associated

SZ/VSZ: virtual memory size in KB
RSS: non-swapped physical memory size 
ADDR: memory address of process
WCHAN: memory address of event process waiting for

SID: session ID for session leader
PGID: process group ID from leader
TPGID: tty process group ID for process group leader
PID/TGID: process ID / thread group ID
PPID: ID number of process's parent process
LWP/TID: thread ID
NLWP: number of threads

F: flag
PRI: priority
S/STAT: process status code
START/STIME: time when process started

cls/class: scheduling class of process
EIP: instruction pointer
ESP: stack pointer
fname: first 8 bytes of base name of process's executable file
ipcns: unique inode number describing process's namespace   
label: security label, for SELinux context data
LXC: name of LXC container



### user
real user ID (RUID)
effective user ID (EUID): describe user whose file aceess permission used by process

### process
Tasks total = process number

can find PID of process, see /proc/$PID/status
describe which signals are blocked, ignored or caught

SigCgt:
(hex) 00000000280b2603 ==> 101000000010110010011000000011 (bitmask)
each 1-bit = caught signal, counting from right to left

### process state
D: uninterruptible sleep (IO)
R: running / runnable
S: interruptible sleep (wait event to complete)
T: stopped, either by job control signal / begin traced
X: dead
Z: defunct/zombie
I: idle kernel thread

<: high priority
N: low priority
L: pages locked into memory
s: is session leader
l: is multi-threaded 
+: is in foreground process group

## top
### CPU
us: time cpu executing process in userspace
sy: time cpu running kernelspace processes
ni: priority of process (higher value nicer to process, so lower priority)
id: time cpu idle
wa: time cpu waiting IO to complete
hi: time handling hardware interrupt
si: time handling software interrupt


# memory
## free
GB `free -g`

# block device
## lsblk
display list of available block device


# disk IO
## iostat 
monitor input/output device 

interval: seconds between reports 
tps: number of transfers per second
  - transfer = IO request to device
  - multiple logical requests can combine into single IO request

Blk_read/s (kB_read/s, MB_read/s): num of blocks read from device, block=512 B
Blk_wrtn/s (kB_wrtn/s, MB_wrtn/s): num of blocks written to device per second

Blk_read (kB_read, MB_read): total num of blocks read
Blk_wrtn (kB_wrtn, MB_wrtn): total num of blocks written

rrqm/s: num of read requests merged per second, queued to device
wrqms/s: write req merged/s queued

r/s: num of read (after merges) per second queued
w/s: num of write (after merges) per second queued

rsec/s (rkB/s, rMB/s): num of sectors read
wsec/s (wkB/s, wMB/s): num of sectors write

avgrq-sz: average size (in sectors) of req issued to device
avgqu-sz: average queue length of requests

await: average time (in ms) to serve IO requests
r_await: average time (in ms) serve read req
w_await: average time (in ms) serve write req

### param
c: cpu
d: device utilization
`-g <group name>`: stat for gorup of device
h: human readable
`-j {ID | LABEL | PATH | UUID}`: display persistent device names
k: KB/s
m: MB/s
N: registered device mapper names (LVM)
p: stat for block devices and all partitions used
T: used with option -g, indicate global stat for group
t: print time
x: extended stat
y: omit first report stat since system boot
z: omit non-active device 

`iostat -p sda -d 2 6` display 6 reports at 2 sec interval for device sda










