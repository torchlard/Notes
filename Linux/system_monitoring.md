# view system process
unix option: `-`
BSD option: no `-`
GNU long option: `--`

## ps
default selects all processes with same effective user ID as current user & same terminal 
display PID, terminal associated, cumulated CPU time, executable name


command:
- a: lift "only yourself" restriction
- x: lift "with tty" restriction



## top
### CPU
us: time cpu executing process in userspace
sy: time cpu running kernelspace processes
ni: priority of process (higher value nicer to process, so lower priority)
id: time cpu idle
wa: time cpu waiting IO to complete
hi: time handling hardware interrupt
si: time handling software interrupt

### header
C/CP: CPU usage
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

### process
Tasks total = process number

can find PID of process, see /proc/$PID/status
describe which signals are blocked, ignored or caught

SigCgt:
(hex) 00000000280b2603 ==> 101000000010110010011000000011 (bitmask)
each 1-bit = caught signal, counting from right to left









