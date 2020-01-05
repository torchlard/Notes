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














