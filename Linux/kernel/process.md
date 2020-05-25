# process
prcoess is basic logical unit of scheduler

structure
```
session
  process group (PG)
    process
      thread
```
each session/PG has a leader, usually first process in group
each session/PG given an ID by fir process's PID
each session given terminal

in a session, terminal attached to one of PG (foreground PG)
  - other called background process group

## example
```sh
find / 2> /dev/null | wc -l &
sort < longlist | uniq -c
```
```
session (400)
  process group (400) [background PG]
    bash (pid=400, ppid=399, pgid=400, sid=400)
  process group (658) [background PG]
    find (pid=658, ppid=400, pgid=658, sid=400)
    wc (pid=659, ppid=400, pgid=658, sid=400)
  process group (660) [foreground PG]
    sort
    uniq
```
## shell
each time login to shell, shell process open a session
  - each command = 1 process group
  - use fg/bg/jobs manage PG

deamon process also has session, but no tty

## signals
IPC method in unix, async notification
when signal sent to process, interrupt control flow and non-atomic operations

eg. ctrl+c = termination signals
application can be multi-processing, need kill all process to stop app
  - send termination signal to PG, including all processes

# Linux thread
threads in same process has same pid, some has thread id
for multithread process, PID = thread group id

kernel level scheduler treat thread and process the same, 
thread = special process sharing resources

linux use clone syscall to start thread => child process without new PID/context








