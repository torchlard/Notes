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

## shell
each time login to shell, shell process open a session
  - each command = 1 process group
  - use fg/bg/jobs manage PG











