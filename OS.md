# thread-safe
not thead-safe: 
  if use multiple threads, then may cause error
## multi-threading
1. same program block, cpu new/create multiple threads to execute
2. different program blocks, cpu execute at different time
3. hybrid

for condition 1, if exists global variable, then very likely not safe
for condition 2, also condsider thread code whether share same global variable

program block can be class/function
each thread has its own stack, auto(local) level variable don't have sharing problem.
  because they store variables inside memories of each thread

## methods
1. locking mechanism (mutex, criticalsection, event, semaphore)
2. let certain thread do all jobs with global variables

# process
## history
early only 1 program executed at a time => full control of system

## process in memory
[stack | ->   <- | heap | data | text]
text: program code
stack: temporary data (function parameter, return address, local variable)
data: global variable
heap: memory dynamically allocated at run time

program = passive, executable file
process = active, with set of instructions and resources
program becomes process when executable file loaded into memory

program can have many copies, be an execution environment for other code
eg. Java program executed in JVM, whereas JVM executes as process that interpret Java code+take action

## states
new, running, waiting, ready, terminated

process control block [all stat related to process]
[process state | process number | program counter | registers | memory limits | files | ...]

each time process interrupted, save state to process control block(PCB), 
  reload state from PCB when restart

process can have multi-threads
### fields of process
[state of process, scheduling information, parent, children, list of open files, address space of process]
doubly linked list of task_struct

### scheduling
ready queue: contain pointer to next PCB

ready queue -> CPU --------->
|                        |
|<---------IO request  <-|
|<---------time splice <-|
|<---------fork child  <-|
|<------wait interrupt <-|

#### long-term scheduler(job scheduler)
select process from pool, load into memory
may need invoke when process leave system -> control degree of multiprogramming
better to select good mix of IO bound & CPU bound processes
some system dont have this

#### short-term scheduler(CPU scheuler)
select one of process ready to execute to run
at least every 100ms

#### medium-term scheduler
swapping: remove partially executed process from memory, later swapped in ready queue

## context switch
save current state of process in PCB, and restore another state of different process
typical speed = few ms

## systemd
- service, target, mount, timer, snapshot, path, socket, swap .. as Unit
eg. auditd -> auditd.service
- use socket activation, DBus activation to improve dependency management
- cgroup replace PID to trace process, so every process under control even after fork
- target replace runlevel
- built in journald
- new commands localectl, timedatectl help config system

[
Systemd Utilities: systemctl, notify, cgls ...
Systemd Daemons: systemd,journald,networkd     Systemd Targets: bootmode, multi-user, graphical, user-session
Ssytemd Core: unit, login, namespace, cgroup
Systemd Libraries: dbus-1, libpam, libcap, libaudit ..
Linux kernel: cgroups, autofs, kdbus
]

Slice: Unit type for creating cgroup hierarchy for resource management
Scope: organizational unit that groups services' worker processes
Service: process/group of processes controlled by systemd

/home -> home.mount
/dev/sda2 -> dev-sda2.device
default .service
name@sring.service: instance of name@.service, `string` as identifier

### target
0 : poweroff
1 : single user mode
2,4 : user-defined, default == 3
3 : multi-user, non graphical
5 : multi-user, graphical
6 : reboot
emergency : emergency shell

### priority level
emergency, alert, critical, error, warning, notice, informational, debug


## D-Bus
software bus for inter-process communication and remote procedure call
inefficient and reliable to communicate one-to-one for all
- process can connect any number of buses
- as framework to integrate different components of user application
- information sharing, modularity, privilege separation
### bus model
unique bus name, immutable, cannot be reused
use well-known names to refer to service using prearranged bus name

### object model
want to replace component-oriented communication system
- process offer service exposing object, client connected to bus interact with object using method
- client can listen to signals object emit when state changes(underlying service, eg.USB, network )
- to use certain service, indicate object path and bus name
- interface = set of declaration of methods and signals
- administrative bus operation defined by org.freedesktop.DBus

### communication model
- based on exchange of messages with well defined structure, close to RPC mechanism than classic IPC, message will be validated
- one-to-one request-response
- publish/subscribe
- consists of header (bus name,object path,method/signal name..), body(data)
- wire protocol: how to build messages, not define transport method

### system bus
for all user and process of system
### session bus
for each user login session in same desktop session, allow integrate desktop session as a whole

## named pipe
once named pipe established, several processes can use it for communication
UNIX: refer as FIFO [mkfifo(), open(), read(), write()]
  open, read, write file
  bidirectional, but only half duplex; 2 FIFO for full duplex
Windows: allow either byte/message-oriented data

## RPC VS Socket
RPC: protocol and service offered by OS to run remote application
Socket: programming abstraction that application can send and receive data via network transport
We implement protocols (RPC) on top of transport (TCP) with a socket

## operation
child process get resource directly from OS / constrained to parent process / share among several children

when process create new process:
1. parent execute concurrently with children
2. parent wait until some / all children terminated
   
address-space possibility:
1. child = duplicate of parent
2. hild = new program
   
new process created by fork() system call, consist of copy of address space of original process => allow parent communicate easily with child
- child inherit privilege and scheduling attributes from parentm resources

                          parent(pid>0)
                       |------------------> wait() ---> parent resume
                       |                    ^
parent --> pid=fork() -|                    | 
                       |------> exec() ---> exit()
                      child(pid=0)

parent terminate child process if
1. exceed usage of resource
2. task to child not required
3. parent exiting (cascading termination)

zombie: if process is terminated, but parent not yet called wait()
orphans: parent not invoke wait() and terminated
=> init process peridically invokes wait() => allow exit status of any ophaned proces collected

## interprocess communication
process **independent** if no effect on/by others
**cooperating** if affect/affected by others

### why process communicate?
1. information sharing
2. computation sppedup: break into subtasks
3. modularity: divide functions into separate process/thread
4. convenience: do things in parallel

### ways to share data
(3. distributed shared memory)
#### shared memory
- process must attach to address space to access shared data
normally OS forbid one process access another process's 
- producer-consumer pattern: have buffer of items, producer and consumer must be synchronized
- unbounded buffer: no limit size of bufer VS bounded buffer: fixed buffer size

#### message passing
interface: send(message), receive(message)
direct communication: explicitly name recipient/sender of communication
indirect communication: msg send to & received from mailbox (obj that msg can place)/ports
  for multi process work on same port, may have algorithm define who receive msg
  - mailbox may either own by process / OS
  - communication maybe sync(blocking) /async(non-blocking)
    - send(block/non-block), receive(block/non-block)
  - if mailbox is full:
  - 1. wait indefinitely
  - 2. wait at most n ms
  - 3. return immediately
  - 4. temporarily cache a message
sync / async communication
automatic / explicit buffering
##### advanced local procedure call (windows)
1. small messages (256B): port message queue for storage, msg copied between process
2. larger msg: passed through section object (region of shared memory with channel)
3. > section object: API allow server direct read/write to address space of client
   
##### socket
endpoint for communication: communication over network use pair of socket, one per process
identified by IP address with port number
eg. HTTP, FTP
- in Java, conneciton-oriented socket, connectionless socket, multicast socket
no structure, only raw bytes

##### Remote procedural call (RPC)
high level abstraction of procedure-call mechanism
provide stub on client side; separate stub for each separate remote procedure
  (eg. Microsoft Interface Definition Language in Windows)
for macines with different data representation (32bit vs 64bit), 
  use machien independent representation data (eg. XDR)
at most once: attach timestamp to each message, check history
exactly once: client resend each RPC call periodically until receive ACK
RPC process: client req port, server send port, client send RPC via port, server listen to it
if transfer wole file, may use several requests

##### pipe
1. bidirectional / unidirectional communication
2. if two-way, half duplex / full duplex?
3. must have relationship (eg. parent-child)?
4. pipe over network? same machine?
###### ordinary pipe
communicate in producer-consumer fashion: one-way

child fd(0)  ->|================|<-- parent fd(1)
parent fd(0) ->|================|<-- child fd(1)

in windows, termed anonymous pipe => unidirectional, parent-child relation


### performance
share memory suffer from cache coherency issue
for multi core system, IPC may perform better



### chrome process
3 types of process:
browser: manage UI, disk, network IO; only 1 browser process created
renderer: logic for handling HTML, JS, images; one renderer for each website
plugin: contain plugin to communicate renderer and browser process

renderer run in sandbox, restrict access to disk, network IO


# Thread
## single-thread
  | code   data  files |
  | registers     stack|
  ----------------------
  |                    |
  |    thread          |

## multi-thread
  | code      data           files |
  | registers | register | register|
  |   stack   |   stack  |  stack  |
  ----------------------------------
  |           |          |         |
  |    thread |  thread  | thread  |

## benefits
responsiveness
  allow program to run even part of it blocked
resource sharing
  process only share resource explicitly arranged by programmer
  threads default share memory and resources > multi threads within same addres space
economy
  lower cost to create, context-switch threads
scalability

### multiprocessor VS multicore
multiprocessor: > 1 CPU, work in parallel (simultaneous multiprocessing), >1 sockets in motherboard
multicore: >1 execution core on 1 CPU, meaning depends on architecture
  subset of CPU's component replicated (chip-level multiprocessing)
  eg. dedicated execution unit, L1 cache; shared L2 cache
simultanous multi-threading: core's components duplicated

## speedup
speedup <= 1/(S + (1-S)/N), S=portion of serial job, N=#cores

## user thread VS kernel thread
                           | user thread             | kernel thread
---------------------------|-------------------------|-------------------------
implementation             | easy                    | complicated
context switch time        | less                    | more
hardware support needed    | no                      | yes
perform blocking operation | entrire process blocked | another thread continue
organised by               | user                    | OS

## multicore challenge
what task? how to balance task? data splitting? data dependency?
test and debug for multi execution path?

data parallelism, task parallelism
user thread (manage by user), kernel thread (manage by kernel)
### many-to-one model
many user thread -> 1 kernel thread
entire process will block if thread makes blocking system call
### ono-to-one model
map each user thread to kernel thread
creating user thread requires creating corresponding kernel thread => overhead (restrict #threads)
### many-to-many model
multiplexes many user thread -> smaller /equal kernel threads
developer can create as many user threads as necessary, can run in parallel
tow-level model: allow a user thread bound to a kernel thread

## thread library
1. entirely user space library
2. kernel-level library
main lib: 
  POSIX Pthreads(user/kernel,global), 
  Windows(kernel,global), 
  Java(rely on host system API, accss to shared data explicitly arranged between threads)

### async threading
once parent creates child thread, parent resume execution => parent,child execute concurrently
### sync threading
fork-join: parent thread wait for all child to terminate before resume

### Java thread
all Java program comprise at least single thread of control
extend from Trhead class / implement Runnable interface
call start() method create new thread
  - allocate memory, init thread in JVM
  - call run() method
  => create parent thread (main()) and child thread (start())

implicit threading: transfer creation, management of threads to compiler and runtime library

## Thread pool
create a number of threads at process startup, place them into pool
when server receive request, awaken thread from pool; after service complete, return to pool
if no available thread, server waits until one becomes free
1. existing thread faster than create new
2. limit num of thread exist at one point
3. separate task from mechanism of create task => can use different strategy to run task
-> advanced: dynamically adjust #threaads in pool

## OpenMP
for C,C++,fortran to parallel programming in shared memory environment
identifies parallel regions as blocks of code to run in parllel
  compiler create max #threads to run simultaneously
  `pragma omp parallel` directive to indicate parallel blocks
not suitable for complex thread sync and mutex

## signal handling
signal: notify process that event occur 
1. signal generated by occurence of particular event
2. signal delivered to process
3. once delivered, signal must be handled
sync: delivered to same process that cause signal (eg. divide by 0 )
async: generated by event external to running process (eg. ctrl+c)   

signal handled by default / user-defined signal handler
1. signal -> thread which signal applies
2. signal -> every thread in process
3. signal -> certain thread
4. all signal -> specific thread

in UNIX, `kill(pid_t pid, int signal)` deliver signal
`pthread_kill(pthread_t tid, int signal)` signal -> tid

## thread cancellation
terminate thread before completed. target thread=thread to be cancelled
1. async cancellation: immediately terminate target thread
2. deferred cancellation [default]: target thread periodically checks whether it should terminate

mode     | state    | type
---------|----------|----------
off      | disabled | -
deferred | enabled  | deferred
async    | enabled  | async

## thread-local storage
each thread own copy of certain data, ~static data

## scheduler activation
lightweight process: two level model as intermediate data structure, ~virtual processor
scheduler activation: kernel provide application with set of virtual processor, appliction schedule suer threads to available virtual processor
upcall = kernel inform application certain event
upcall handler = upcall handled by thread library

## Linux thread
linux do not distinguish process and thread => task represent process/thread
`clone()` with flags to determine how much sharing to take place between parent and child task
  CLONE_FS (filesystem info), CLONE_VM(memory space), CLONE_SIGHAND(signal handler), CLONE_FILES(set of open files)
kernel data structure `task_struct`


# Process Synchronization
## critical-section problem
solution with 3 req
1. mutual exclusion
2. progress: process not executing allow to enter critical section in finite time
3. bounded waiting: 
   limit on #times other process allow to enter critical section after process made request to enter also

## Peterson's solution
for process i,
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
  // enter critical only when waiting=false/key=false
  while (waiting[i] && test_and_set(&lock))
    // after first process make key=false, all others must wait
    // other process must wait for any process to leave critical
    ;
  waiting[i] = false;

  /* critical */
  j = (i+1)%n;
  // scan all waiting process, choose next one
  // ensure chosen one is waiting
  while((j != i) && !waiting[j])
    j = (j+1) % n;

  if (j==i) // same process?
    lock = false;
  else
    waiting[j] = false;
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
wait(), signa()
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
when process execute wait() and find semaphroe value not positive, process block itself
  block operation place process into waiting queue, process switch to waiting state
  control transferred to CPU scheduler

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
  S->value++;
  if(S->value <= 0){
    remove process P from S->list;
    wakeup(P);
  }
}
```

## priority
priority inversion: >2 priorities, 
  suppose priority L<M<H, then originally H wait L to finish using resource; 
  suddenly M also use resource, H wait longer

priority-inheritance protocol:
  all process access resource needed by higher priority process inherit higher priority until finished with resource
  in example, L inherit H first, so M cannot use resource

## problems
### bounded-buffer problem

          full buffer
producer -----------> consumer
         <-----------
          empty buffer

```c
int n;
semaphore mutex = 1;
semaphore empty = n;
semaphore full = 0;

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
1. no reader kept waiting unless writer has permission to use shared object
2. once writer ready, writer perform write as soon as possible

```c
semaphore rw_mutex = 1; // common to both writer and reader
semaphore mutex = 1;    // mutex when variable read_count updated
int read_count = 0;     // keep track how many process reading object

/* writer process */
do {
  wait(rw_mutex);
  // writing performed
  signal(rw_mutex);
} while(true);

/* RW lock in reader process */
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
when 1 writer in critical seciont, n readers waiting
  => 1 reader on rw_mutex, n-1 reader on mutex
  -> after writer execute signal(rw_mutex), may resume waiting reader/single waiting writer

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
implementation
```c
int x_sem = 0, x_count = 0, mutex = 1;
// mutex for each monitor
x.wait(){
  x_count++;
  if(next_count > 0) // #process suspended on next
    signal(next);
  else
    signal(mutex);
  wait(x_sem);
  x_count--;
}

x.signal(){   // 
  if(x_count > 0){
    next_count++;
    signal(x_sem);
    wait(next);
    next_count--;
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
  mutex, semaphore, events(~ condition variable), timer(notify >=1 thread time expire)
signaled state: available; non-signaled state: not available

when thread blocks on non-signaled, ready -> waiting, place in waiting queue
when signaled, kernel move thead waiting -> ready state
          release mutex
non-signaled ----------> signaled
             <----------
    only 1 thread acquire mutex lock

### sync in linux
mutex, spinlock, semaphore (+ reader-writer version)

single processor          | multiple processors
--------------------------|---------------------
disable kernel preemption | get spin lock
enable kernel preemption  | release spin lock

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

disable interrup at entry, reenable interrupt at exit
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
- since nonpreemptive, once CPU allocated, run til end

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
5. student process  [lowest priority]

### multilevel feedback queue scheduling
allow process to move between queues
eg. there are 3 queues, must finish all in queue 0 before do queue 1, and then queue 2
  give highest priority to process CPU burst < 8ms, such process quickly get CPU
  go oofto next IO. process 24>t>8 serve quickly, though lower priority

## thread scheduling
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














