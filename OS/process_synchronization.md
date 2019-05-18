# Process Synchronization
## critical-section problem
solution with 3 req
1. mutual exclusion
2. progress: process not executing allow to enter critical section in finite time
3. bounded waiting: 
   limit on #times other process allow to enter critical section after process made request to enter also

## Peterson's solution
restrict to 2 processes(i,j). For process i,
```c
do {
  // critical section
  flag[i] = true;
  turn = j; // allow other process to enter
  while(flag[j] && turn == j);  // need both condition satisfy

  // remainder section
  flag[i] = false;
} while(true);
```
turn: whose turn to enter critical section
flag: process ready to enter critical section
turn will set to both i,j; only i/j will be final value(overwritten) => i/j process allowed to enter

## locking
in single processor environment, prevent interrupt while shared variable was being modified
support by hardware instruction
-> not feasible in multiprocessor environment, because time consuming

if hardware support some mutual exclusive instruction like test_and_set(), when two test_and_set()
  are executed simultaneously on different CPU, they will execute sequentially in some arbitrary order

intro: someone lock=1 first and enter critical, after finish set lock=0, any thread allow to set lock=1 and pass while loop

```c
boolean test_and_set(boolean *target) {
  boolean rv = *target;
  *target = true;

  return rv;
}

do {
  while (test_and_set(&lock))
    ; // do nothing
  /* critical section */
  // do sth atomic
  lock = false;
} while(true);
```

```c
// can change variable only when value is original
int compare_and_swap(int *value, int expected, int new_value){
  int temp = *value;
  if (*value == expected)
    *value = new_value;

  return temp;
}

do {
  while (compare_and_swap(&lock, 0, 1) != 0)
    ; // trap other process that cannot enter critical
  /* critical */
  // do sth atomic
  lock = 0;
  /* remainder */
} while(true);
```
global lock is init to 0, first process invokes compare_and_swap() set lock to 1; 
  subsequent calls will not success
  when process exits critical session, set lock back to 0 => allow other process enter critical
  -> but not satisfy bounded-waiting !!

### bounded-waiting mutual exclusion 
```c
do {
  waiting[i] = true;
  // enter critical only when waiting=false
  // other process must wait for any process to leave critical
  while (waiting[i] && test_and_set(&lock)) ;
  waiting[i] = false;

  /* critical */
  j = (i+1)%n;
  // scan all waiting process, choose next one
  // ensure chosen one is waiting
  while( (j != i) && !waiting[j] )
    j = (j+1) % n;

  if (j==i) // same process
    lock = false;
  else
    waiting[j] = false; // assign another process to proceed to critical
} while(true);
```

## mutex lock (mutual exclusion) [spinlock]
acquire() lock before enter, release() lock when exit
```c
void acquire(){
  while(!available)
    ;
  available = false;
}

void release(){
  available = true;
}

do {
  [acquire lock]
    critical
  [release lock]
    remainder
} while(true);
```
disadv: need busy waiting
adv: no context switch

## semaphore
wait(), signal()
when S>0, no process in critical; S<=0, some process in critical
```c
wait(S) {
  // process blocked until S>0
  while(S <= 0)
    ;
  S--;
}
// must be executed without interrupt
// release resource
signal(S){
  S++;
}

// P1
S1;
signal(synch);
// P2
wait(synch);
S2;
```
counting semaphore: range over unrestricted domain (finite instances)
binary semaphore: range between 0 and 1

### solve busy waiting
when process execute wait() and find semaphore value not positive, process block itself
- block operation place process into waiting queue, process switch to waiting state
- control transferred to CPU scheduler

```c
typedef struct {
  int value;
  struct process *list;
} semaphore;

wait(semaphore *S) {
  S->value--;
  if(S->value < 0){
    add process to S->list;
    block();
  }
}

signal(semaphore *S){
  S->value++;Signals
  if(S->value <= 0){
    remove process P from S->list;
    wakeup(P);
  }
}
```

## priority
priority inversion: >2 priorities, 
- suppose priority L<M<H, then originally H wait L to finish using resource; 
  suddenly M also use resource, H wait longer

priority-inheritance protocol:
- all process access resource needed by higher priority process -> inherit higher priority until finished with resource
  in example, L inherit H first, so M cannot use resource

## problems
### bounded-buffer problem
assume pool has n buffer, each can hold 1 item [limited buffer]
```
          full buffer
producer -----------> consumer
         <-----------
          empty buffer
```
```c
int n;
semaphore mutex = 1;
semaphore empty = n;  // num of empty buffer
semaphore full = 0;   // num full buffer

// consumer
do {
  wait(full);
  wait(mutex);
  // remove item from buffer to next_consumed
  signal(mutex);
  signal(empty);
  // consume item in next_consumed
} while(true);
```

### readers-writers problem
process as reader and writers
multiple reader can read at same time, only 1 writer write at same time
1. no reader kept waiting unless writer has permission to use shared object
2. once writer ready, writer perform write as soon as possible

```c
semaphore rw_mutex = 1; // common to both writer and reader
semaphore mutex = 1;    // mutex when variable read_count updated
int read_count = 0;     // keep track how many process reading object

// writer process 
do {
  wait(rw_mutex);
  // writing performed
  signal(rw_mutex);
} while(true);

// RW lock in reader process
do {
  wait(mutex);  // ensure atomic read_count update
  read_count++;
  if(read_count == 1)
    wait(rw_mutex);   // if someone writing, wait..
  signal(mutex);
  ...
  // reading performed
  ...
  wait(mutex);  // ensure atomic read_count update
  read_count--;
  if(read_count == 0)
    signal(rw_mutex);
  signal(mutex);
} while(true);
```
when 1 writer in critical section, n readers waiting
  => 1 reader on rw_mutex, n-1 reader on mutex
  -> after writer execute signal(rw_mutex), may resume waiting reader / single waiting writer

## dining-philosopher problem
5 philosopher think and eat, they share circular table with 5 chairs, each belong to 1 philosopher
when philosopher gets hungry, pick up 2 chopsticks closest to her, but can only pick 1 chopstick at a time
after eating, put down both chopstick

attempt 1: (may create deadlock. eg. all people pick left at same time)
```c
semaphore chopstick[5];
do {
  wait(chopstick[i]); // pick left
  wait(chopstick[(i+1)%5]);   // pick right
  /* eat for awhile */
  signal(chopstick[i]);   // put back left
  signal(chopstick[(i+1)%5]);   // put back right
  /* think for a while */
  ..
} while(true);
```

possible solutions:
1. allow at most 4 people sitting simultaneously at table
2. allow philosopher pick up chopstick only if both chopsticks available
3. odd numbered people first pick left, even numbered people first pick right

### monitor type

abstract data type: encapsulate data with set of functions operate on data
monitor construct ensure only 1 process active at a time
- mutiple thread that share resource
- multiple resource related variable
- mutex lock
- invariant for avoiding racing condition

process
- process take mutex lock before running 
- -> until finish / waiting for certain condition release lock
- if all theads confirm invariant always true, then no racing

wait c: waiting for c to be satisfied to resume
signal/notify c: called by some thread to assert c is true
=> blocking / non-blocking condition variable

#### blocking condition variable


#### non-blocking condition variable

still get starvation problem:
```c
monitor DiningPhilosophers {
  enum {THINKING, HUNGRY, EATING} state[5];
  condition self[5];

  void pickup(int i){
    state[i] = HUNGRY;
    test(i);
    if(state[i] != EATING) // if not yet ready for eating
      self[i].wait();
  }

  void putdown(int i){
    state[i] = THINKING;
    // send wake up signal to two neighbors
    test((i+4)%5);
    test((i+1)%5);
  }

  // pause if two neighbors are eating
  void test(int i){
    if((state[(i+4)%5] != EATING) && (state[i]==HUNGRY) &&
      (state[(i+4)%5] != EATING) ) {
        state[i] = EATING;
        self[i].signal();
      }
  }

  initialization_code(){
    for(int i=0; i<5; i++)
      state[i] = THINKING;
  }
}
```
implementation using semaphore:
- for each monitor, mutex is prodided; for each condition x, introduce x_sem
```c
semaphore x_sem = 0, mutex = 1;
semaphore next = 0; // to suspend themselves
int x_count = 0, next_count=0; // num of process suspended in next

x.wait(){ // process must wait(mutex) before enter monitor
  x_count++;
  if(next_count > 0) // there's process suspended
    signal(next);
  else
    signal(mutex);   // no process suspended
  wait(x_sem);
  x_count--;
}

x.signal(){   // signal(mutex) leaving monitor
  if(x_count > 0){
    next_count++;
    signal(x_sem);
    wait(next);
    next_count--;
  }
}
```
ensure correct use of high-level operation `x.wait()`, `x.signal()`, we define `ResourceAllocator`
```c
monitor ResourceAllocator {
  boolean busy;
  condition x;

  void acquire(int time) {
    if(busy)
      x.wait(time);
    busy = true;
  }
  void release(){
    busy = false;
    x.signal();
  }
  initialization_code(){
    busy = false;
  }
}
```


which suspended proces resume first?
1. first-come, first serve
define ResourceAllocator in monitor to allocate single resource

in Java, implement by `synchronized` keyword

### sync in windows
thread sync in kernel: spinlock
thread sync outside kernel: dispatcher objects
- mutex, semaphore, events(~ condition variable), timer(notify >=1 thread time expire)

signaled state: available; non-signaled state: not available
when thread blocks on non-signaled, ready -> waiting, place in waiting queue
when signaled, kernel move thead waiting -> ready state
```          
            release mutex
non-signaled ----------> signaled
             <----------
    only 1 thread acquire mutex lock
```
### sync in linux
mutex, spinlock, semaphore (+ reader-writer version)
signle processor: disable/enable kernel preemption (spin lock not suitable for single core)
multiple processor: get/release spin lock

spinlock only for short duration task, longer duration semaphore/mutex better

## transactional memory
atomic memory read-wite 
problem with tradition: 
  when #threads increase, level of contention among threads for lock ownership is very high

```c
void update(){
  atomic {
    // modify shared data
  }
}
```
adv: avoid deadlock
implement either software(instruction code) /hardware(hardware cache hierarchy, cache coherency protocol)

## OpenMP
```c
#pragma omp critical
```

## functional programming language
immutable variable

# CPU scheduling
simple: process executed until it must wait
multiprogramming: make use of waiting time, several process kept in memory at one time
- IO bound: has many short CPU burst
  CPU bound: few long CPU burst

when schedule?
1. process running -> waiting
2. process running -> ready
3. process waiting -> ready
4. process terminates

- scheduling scheme
  non-preemptive: scheduling only in 1,4
    once CPU allocated to process, process keep running until terminate/waiting
    used by old OS
  preemptive: schduling in others

disable interrup at entry, re-enable interrupt at exit
dispatcher:
  module let CPU control process selected by short-term scheduler
  switch context, switch to user mode, jump to proper location in user program to restart
  - should be less dispatch latency

## scheduling criteria
CPU utilization: 40-90%
Throughtput: #processes completed per time unit
Turnaround time: how long takes to execute that process
Waiting time: amount of time waiting in ready queue
Response time: time for submission request until first response

some condition we prefer to optimize min/max rather than average
for interactive system, min variance in response time, better than min average

## process scheduling algorithm
### first come, first serve
not good when P1=24, P2=3, P3=3
average waiting time = (0+24+27)/3
- since non-preemptive, once CPU allocated, run til end

### shortest-job-first
min average waiting time
difficulty: knowing length of next CPU request
cannot used in short-term CPU scheduling, so we predict next burst have similar length as previous one

exponential average of previous bursts
can be either preemptive [shortest-remaining-time-first] / non-preemptive

eg. for preemptive
P1,P2,P4,P1,P3

### Priority scheduling
each process has priority, CPU allocated to highest priority proess
internally defined priority: use some measurable quantity to compute
  eg. time limit, memory requirement
external: criteria outside OS
  eg. importance of process, type & amount of fund paid 

problem: indefinite blocking / starvation
solution: aging - gradually increase priority of process waiting for long time

### round robin scheduling
designed for time-sharing system
define time interval for switching process
performance: depends on size of time quantum
  if too long, same as FCFS; if too short,too many context switch overhead

### multilevel queue scheduling
classify into foreground (interactive), background (batch) process
each queue has own scheduling algorithm
scheduling among queues: ususally fixed-priority preemptive scheduling

1. system process [highest priority]
2. interactive process
3. interactive editing process
4. batch process
5. student process [lowest priority]

### multilevel feedback queue scheduling
allow process to move between queues
eg. there are 3 queues, must finish all in queue 0 before do queue 1, and then queue 2
  give highest priority to process CPU burst < 8ms, such process quickly get CPU
  go after next IO. process 24>t>8 serve quickly, though lower priority

## thread scheduling
lightweight process (LWP): 
  user thread: virtual processor schedule user thread
  each LWP attach to one kernel process
process contention scope(PCS): user level thread run on LWP
system-contention scope(SCS): decide which kernel thread schedule to CPI
PCS done by priority: select highest priority runnable thread 

### Pthread scheduling
allow PCS, SCS
PTHREAD_SCOPE_PROCESS: schedule user thread to LWP
PTHREAD_SCOPE_SYSTEM: schedle policy will create and bind LWP for each user thread on many-to-many systems

## multiple processor scheduling
assume homogeneous processors
1. asymmetric multiprocessing
all scheduling decision, IO processing, system activities handled by single processor
2. symmetric multiprocessing
each processor is self-scheduling, maybe in common ready queue/ have their own private queue for ready process

processor affinity: 
  since invalidate & rebuild cache memory in processors is high cost, process has affinity for processor currently running
soft affinity: attempt keep process running in sanme processor, not guarenteed
hard affinity: system call allow specify processor

non-uniform memory access(NUMA): CPU access some part of main memory faster than others

        slow
  CPU  access   CPU
   |---------    |
   |fast    |    |fast access
   |access  |    |
 memory     |--memory

for system with common run queue, load balance not necessary
### push migration
specific task periodically check loads on each processor, move processes to evenly distribute load
### pull migration
idle processor pull waiting tasks from busy processor
often push and pull migration implemented in parallel

## multicore processor
memory stall: processor spend significant amount of time accessing memory for data
  reason: eg. cache miss
  so assign 2 thread to each core => if 1 thread memory stall, core switch to another thread
coarse-grained multithreading: thread execute on processor until long latency event (eg. memory stall)
find-grained multithreading: typically boundary of instruction cycle for switching

need two level of scheduling for multi-threading
1. OS decide which software thread on hardware thread
2. specify how each core decide which hardware thread to run

## real time CPU scheduling
soft real-time: no guarentee when critical real time process scheduled
hard real-time: task must be serviced by deadline, service after deadline expired
event latency: time taken from event occur to serviced
interrupt latency: time taken from arrival of interrup to start of routine that service interrupt
  interrupt [-> determine interrput type -> context switch -> ]interrupt service routine
  factor: interrupt disabled while kernel data structure update
dispatch latency: time taken stop 1 process and start another

|<---------------response interval------------>|
|                                              |
|interrupt |                         |         |
|processing|<----dispatch latency--->|real     |
|<-------->|                         |time     |
|          |<-conflict->|<-dispatch->|process  | 
|          |            |            |execution|
|          |            |            |<------->|

conflict phase: preemption of any running process, high-priority take low-priority process resource

### priority based scheduling
periodic process
fixed processing time < deadline < period
1st deadline, 2nd deadline, ...
admission-control algorithm: admit process/reject request if cannot guarantee serviced by deadline
### rate monotonic scheduling
optimal, choose shorter period process as higher priority
each process execute periodically in order, remaining process execute in next cycle
problem: cannot fully maximize CPU resource; sometimes cannot guarentee meet deadline

### earliest deadline first scheduling
earlier deadline, higher priority
not require periodic processing
theoretically can meet deadline requirement, CPU utiliza 100%

### proportional share scheduling
allocate T shares among all applications, must work with admission-control

### POSIX scheduling
SCHED_FIFO: no time slicing among threads of equal priority
SCHED_RR: have time slicing among threads of equal priority
SCHED_OTHER: undefined, system specific

### Linux implementation
based on scheduling class, each class assigned specific priority
1. default scheduling class using completely fair scheduler
   record how long each task run by virtual runtime, not directly assign priority
   associate with decay factor
   scheduler pick smallest `vruntime` process to run next
   linux use 2 separate priority ranges (real time task, normal task)
2. real time scheduling class

### windows implementation
priority based, preemptive scheduling
thread given prioirty class and relative priority

## evaluation
1. deterministic modeling: put some cases to test
2. queuing model: describe distribution of times where process arrive in system
3. simulations


# Deadlocks
under normal operation mode, process utilize resource in following sequence:
  request -> use -. release 
system table records whether each resource is free or allocated, process allocated

eg. T1: get mutex lock 2,1 ; T2: get mutex lock 1,2
  possible deadlock if run in parallel

necessary condition:
1. mutual exclusion: at least 1 resource held in non-sharable mode
2. hold and wait: a process must hold at least 1 resource and wait additional resource held by others
3. no preemption
4. circular wait

## resource allocation graph

## solution
1. use protocol to prevent deadlock
2. allow system to enter deadlock, detect and recover
3. ignore problem, pretend deadlock never occur

third solution used by most OS, let application developer handle deadlock

### safe state
safe state: system can allocate resource to each process up to max
deadlock state is unsafe state

### Banker's algorithm
when process enter system, must declare max num of instance of each resource type it may need, 
  cannot exceed total #resource in system
when user request a set of resource, system must determine whethre allocatio will leave system in safe state;
  if not, wait until some other resource available

## recovery
### process termination
1. abort all deadlocked processes
2. abort one process at a time until deadlock cycle eliminated

### resource preemption
1. select a victim: decide order of preemption to minimize cost
2. rollback
3. starvation: ensure process picked as victim only finite times
