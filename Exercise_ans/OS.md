# Threads
## 4.1
responsive: 1 thread waiting, 1 main thread
## 4.2
user thread: when you want frequent context switch
kernel: heavy workload, rare switch, handled by OS
kernel need not associate with process, while user thread must associate with process

## 4.3
save CPU register value from thread switched out
restore CPU register being scheduled

## 4.4
process: large data set hold PCB, open list of file, memory map, environment variable
thread: small data structure hold register, stack, priority

## 4.5
timing is crucial in real-time system, so need to attach to LWP ensure served with high priority
## 4.6
- process with high data dependency
- very short execution time

## action taken by user thread to context switching.
similar to kernel thread switching, depends on thread library, how user thread map to kernel thread
save ad restore register state via LWP

## 4.8
thread share heap memory, global variable
## 4.9
yes, page fault

## multi-threaded on multicore VS single core
no benefit, because see multi-threaded as single process

## 4.16
- thread and process similar let scheduler consider two in equal footing without special code
- not easy to impose process-wide resource constraint

## 4.18
a. some core idle
b. make full use; if thread blocked inside kernel(eg. page fault), have to remain idle
c. blocked kernel thread can swap out in favour of another kernel thread ready to execute

# 5
## 5.1
system clock updated at each interrupt
if no interrupt, system clock easily loose time, loose scheduling purpose
solution: only stop interrupt for short time

## 5.2
spinlock: multiprocessing system don't want context switch, allow busy waiting, easy
mutex: locking resource
semaphore, conditional variable: synchronization for long period of time, since busy waiting not good long time
adaptive mutex lock: mutex implemented with spinlock

## 5.3
busy waiting = process waiting for some condition without putting it to sleep
can avoid it with overhead to sleep, block on condition and awake in future time

## 5.4
only process that can break process out of spinlock is by different process

## 5.5
assue two wait() execute, if not execute atomically, then semaphore value will be decrement two times

## 5.6
do {
  wait(semaphore);
  signal(semaphore);
} while(true);

## 5.8
flag[2] ensure mutual exclusive
turn variable ensure toggle control among processes



















