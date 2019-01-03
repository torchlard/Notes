# Thread

## usage
### IO bound task
thread to blocking read write
### CPU bound task
### Asnyc execution
create new thread for cpu/IO bond task, take output after comlete
### Scheduling
delay, periodic (eg. timer)
### Service
Daemon, event-driven handling (eg. thread listening to port connection in server, 
  consumer in queue)

## Synchronization
1. 'synchronized' keyword
2. Immutable object
3. build in thread safe collections
4. Semaphore, ReadWriteLock, Atomics

### Semaphore
signaling mechanism
Task A                      Task B
   ...                         Take BinSemaphore   <== wait for something
   Do Something Noteworthy
   Give BinSemaphore           do something    <== unblocks

- notify sth happened

### Mutex
sleep waiting lock
locking mechanism
protect shared resources; only 1 task can acquire mutex, only owner can release lock
recursive mutex: can locked more than once

### critical session
mutex is costly operation due to protection protocol used => atomic access
other ways: disabling interrupts

### SpinLock
cost is lowest in linux
busy-waiting type lock
spinlock will not let cpu out 







