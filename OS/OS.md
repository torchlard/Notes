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
```
ready queue -> CPU --------->
|                        |
|<---------IO request  <-|
|<---------time splice <-|
|<---------fork child  <-|
|<------wait interrupt <-|
```
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
Systemd Daemons: systemd,journald,networkd     
Systemd Targets: bootmode, multi-user, graphical, user-session
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
- client can listen to signals object emit when state changes (underlying service, eg.USB, network )
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
2. child = new program
   
new process created by fork() system call, consist of copy of address space of original process => allow parent communicate easily with child
- child inherit privilege and scheduling attributes from parentm resources
```
                          parent(pid>0)
                       |------------------> wait() ---> parent resume
                       |                    ^
parent --> pid=fork() -|                    | 
                       |------> exec() ---> exit()
                      child(pid=0)
```
parent terminate child process if
1. exceed usage of resource
2. task to child not required
3. parent exiting (cascading termination)

zombie: if child process is terminated, but parent not yet called wait()
orphans: parent not invoke wait() and terminated
=> init process peridically invokes wait() => allow exit status of any ophaned process collected

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
- unbounded buffer: no limit size of buffer VS bounded buffer: fixed buffer size

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
3. section object: API allow server direct read/write to address space of client

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
connection between 2 processes

ordinary pipe: only allow process with common ancestor to communicate
named pipe: any process
1. communication based on byte stream
2. pipe in form of file, mutual exclusive, unidirectional data transfer
3. when process ends, pipe released
4. when pipe created, new buffer created with read and write ends -> pipefd[0]=read, fpipefd[1]=write

when fork any process, file descriptor remain open in parent and child
  if fork after creating pipe => share same pipe

##### ordinary pipe
special file in memory
communicate in producer-consumer fashion: one-way
```
fd(0): read file descriptor, fd(1): write file descriptor

child fd(0)  ->|================|<-- parent fd(1)
parent fd(0) ->|================|<-- child fd(1)
```
in windows (anonymous pipe) => unidirectional, parent-child relation

##### named pipe (FIFO)
stored as device file
any process can communicate as long as can access that file


### performance
share memory suffer from cache coherency issue
for multi core system, IPC may perform better

### fork
```c
fork()
fork()
```
process split when one fork() called
1 -> 2 2 -> 3 3 3 3

### chrome process
3 types of process:
browser: manage UI, disk, network IO; only 1 browser process created
renderer: logic for handling HTML, JS, images; one renderer for each website
plugin: contain plugin to communicate renderer and browser process

renderer run in sandbox, restrict access to disk, network IO


# Thread
## single-thread
```
  | code   data  files |
  | registers     stack|
  ----------------------
  |                    |
  |    thread          |
```
## thread-safe
not thead-safe: 
- if use multiple threads, then may cause error

## multi-thread
```
  | code          data       files |
  | registers | register | register|
  |   stack   |   stack  |  stack  |
  ----------------------------------
  |           |          |         |
  |    thread |  thread  | thread  |
```
1. same program block, cpu new/create multiple threads to execute
2. different program blocks, cpu execute at different time
3. hybrid

for condition 1, if exists global variable, then very likely not safe
for condition 2, also condsider thread code whether share same global variable

program block can be class/function
each thread has its own stack, auto(local) level variable don't have sharing problem.
- because they store variables inside memories of each thread

## hyperthreading
since in each CPU, amount of ALU,FPU is fixed
goal: when 1 thread only use part of resource in one CPU, start another thread to consume rest of resource in same CPU
- but if a thread already computational expensive, add thread will fight over resource, inefficient
- normally for home CPU 1C-2T is optimal in computation-power/$

## methods
1. locking mechanism (mutex, critical section, event, semaphore)
2. let certain thread do all jobs with global variables


## benefits
responsiveness
- allow program to run even part of it blocked
resource sharing
- process only share resource explicitly arranged by programmer
- threads default share memory and resources > multi threads within same addres space
economy
- lower cost to create, context-switch threads
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

-                          | user thread             | kernel thread
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
### one-to-one model
map each user thread to kernel thread
creating user thread requires creating corresponding kernel thread => overhead (restrict #threads)
### many-to-many model
multiplexes many user thread -> smaller /equal kernel threads
developer can create as many user threads as necessary, can run in parallel
two-level model: allow a user thread bound to a kernel thread

## thread library
1. entirely user space library
2. kernel-level library
main lib: 
- POSIX Pthreads(user/kernel,global), 
- Windows(kernel,global), 
- Java(rely on host system API, accss to shared data explicitly arranged between threads)

### async threading
once parent creates child thread, parent resume execution => parent,child execute concurrently
### sync threading
fork-join: parent thread wait for all child to terminate before resume

### Java thread
all Java program comprise at least single thread of control
extend from Thread class / implement Runnable interface
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
scheduler activation: kernel provide application with set of virtual processor, 
  application schedule user threads to available virtual processor
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
  S->value++;
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


# Main Memory
first fetch instruction from memory, then decode, cause operands to be fetched from memory. 
  After instruction executed on operands, result stored back to memory
  -> sequence of memory address generated by running program
any instrucitons in execution and data used by instruction, must be in direct-access storage devices
register: accessible in one CPU cycle

## process protection
make sure each process has separate memory space:
  protect process from each other
  - need ability to determine range of legal address, ensure process can only access those address
base register: smallest legal physical memory address
limit register: size of range
- base and limit register only can loaded by OS using privileged instruction (only in kernel mode)

compare every address generated in user mode with registers

## address binding
process may move between disk and memory during execution
binding instructions and data to memory address:
1. compile time
   if you know where process reside in memory, absolute code can be generated
   if later starting location changes, need to recompile code
2. load time
   if not known position, compiler must generate relocatable code
   final binding is delayed until load time
3. execution time*
   if process can be moved between memory segment, binding must be delayed until runtime
   most OS use this method

object file in C: 
  real output from comilation phase. mostly machine code, has info that allow linker to see what 
  symbols are in and symbols(global objects,functions..) required to work

                                                      other object module           system library
                    [compile time]                       [   |           load time          |  ]
source program -> compiler/assembler -> object module -> linkage editor -> load module -> loader 
-> in-memory binary memory image [run time]
            | (dynamic linkage)
    dynamically loaded
    system library

logical address: address generated by CPU
physical address: loaded into memory-address registre of memory

compiler time, load time address binding generate identical logical and physical address;
  execution time binding differs logical and physical address
logical address as **virtual address**

logical address space: set of all logical address generated by program
physical address space: set of all physical address corresponding to logical addresses
memory management unit: manage runtime mapping from virtual to physical address
base register as **relocaton register**

## dynamic loading
to get better memory space utilization
routine not loaded until it is called
when routine need to call other routine, first check whethre it has been loaded; if not, relocatable linking
  loader called to load desired routine into memory, update program's address table
useful when large amount of code needed infrequently

dynamically linked library: system library that linked to user program when it run
static linking: system libraries treated like object module, combined by loaded into binary image
dynamic linking: linking in execution time
stub: small piece of code indicate how to locate library / how to load library, 
  included in image for each library routine reference
  when loaded, replace stub with address of routine; next time no need dynamic linking
shared library: more than 1 version of libaray can load into memory, each program use version information to decide 
  which library to use
dynamic linking and shared library need help from OS

## swapping
process can be swapped temporarily out of memory to backing store, brought back into memory for continued execution
### standard swap
when CPU scheduler decide to execute process, call dispatcher -> 
  dispatcher check to see if next process in queue is in memory;
  if no free memory, swap out
swap process must be completely idle, no async IO

improved version:
1. normal mode swap disabled, start if not enough free memory
2. swap portion of process

continguous memory allocation: each process contained in single section of memory

## memory allocation
transient operating-system code: do not keep code and data in memory (eg. not commonly used device driver code)
1. multiple partition method
   divide memory into few fixed-sized partition, each partition has 1 process
2. variable partition scheme
   OS keep table which part of memory occupied and available

if no available block of memory large enough to hold process:
1. wait until large enough block available
2. skip down input queue to see if other process meet small memory requirement

if hole is too large => split into two parts, 1 for process, 1 released

dynamic storage allocation problem:
1. first fit: allocate first hole big enough
2. best fit: allocate smallest hole big enough
3. worst fit: allocate largest hole
- simulation shows first (generally faster) and best fit better

## fragmentation
external fragmentation: free memory broken into little pieces
internal fragmentation: when keep fixed sized allocation, unused memory

### solution
1. compaction: shuffle memory content so to place all free memory together 
  if relocation is static, compaction cannot be done
2. segmentation, paging => permit logical address space of process to be non-contiguous

## segmentation
scheme that support programmer's view of memory
logical address space: collection of segments
segment: has name and length
address: specify both segment name, offset within segment
logical address: `<segment-number, offset>`

when program is compiled, compiler auto construct segment reflecting input program
eg. C compiler create separate segment for
  code, global variable, heap(memory located), stack, C lib
loader will take all segments and assign them segment numbers

segment table: map 2D user-defined address to 1D physical address
  each entry has segment base (constrain starting physical address), segment limit (length of segment)
use segment-number as offset in segment table to find entry 
  when offset in logical address < segment limit => legal address

## paging
frames: break physical memory into fixed sized blocks
pages: break logical memory into blocks of same size, size=power of 2 (512B - 1GB / page)

logical address space totally separated from physical address space, 
  can have logical 64-bit when system < 2^64 B physical memory

address by CPU: page number(index), page offset
page table: base address of each page in physical memory
frame table: table keep info which frames allocated, which available, total frames are

    (logical address)
          ------------- 
          |           |
CPU -> [p d]       [f d] (physical address)
        |  page#,   |
        |  frame#   |
        |   ...     |
        |-- ... ----|
        |   ...     |
        |           |
        |   ...     |
    if  |  p...     |
    TLB ---- f  -----
    miss    ...
            ...
          (page table) 

if 2^m logical address space size, 2^n page size => m-n bit page number, n bit page offset

smaller page size -> less internal fragmentation, but higher overhead (more page table entry), less IO efficient
  so current page size grows larger
  page size between 4KB - 8KB

paging let us use physical memory larger than what can addressed by CPU's address pointer length
each page of process need 1 frame
separation between programmer's view of memory and actual physical memory

### hardware implementation
page table as set of dedicated registers -> high speed logic to make paging-address translation efficient
CPU dispatcher reloads register, only OS can modify page table
when page table is very large(eg. 1M entries), page table kept in main memory
  page-table base register (PTBR) point to page table
  change page table only require chaning 1 register
  but two memory access needed to access a byte

-> solution: use translation look-aside buffer (TLB)
  associative, high-speed memory; 
  item: 'key, value'
  TLB as cache for frame number search
  if TLB miss, go back search for page table
  must keep small, typically 32 - 1024 entries

TLB replacement policy
  1. least recently used
  2. round-robin
  3. random

some TLB store address space identifier
CPU today provide multiple levels of TLB
  eg. intel i7, 128 entry L1 instruction TLB, 64 entry L1 data TLB
      512-entry L2 TLB

### protection
read-write, read-only, execute-only protection
separate protection bits for each kind of access, allow any combination of these access
valid-invalid bit: 
  valid: associated page in logical address space => legal page
  invalid: not in logical address space

### shared pages
allow sharing common code
each process has its own data page

## hierarchical paging
two level paging algorithm
32bit logical address space, page size=4KB -> 20 bit page number + 12 bits page offset
  page number -> 10 bit page number + 10 bit offset
                   10   10    12
final structure: [ p1 | p2  | d ]
                 page number|page offset

forward-mapped page table:
logical address -> outer page table -> page of page table -> memory

## hashed page tables
each entry in hash table has linked list element hash to same location
1. virtual page number
2. value of mapped page frame
3. pointer to next element in linked list

logical address (p|d) -> hash function -> hash table -> [q|s| ] -> [p|r| ] -> (r|d) -> physical memory

clustered page table: ~hash table, except each entry refer to several pages, not single
  good for sparse address space

## inverted page table

             -----------
 (logical)   |         |
  [pid | p | d]   [i | d]----> physical
    |           _  |           memory
    -----> .....|  |
     search.....|i |
           .....|  |
           pid|p ---
           .....
           .....
    (inverted page table)

1 entry for each real page/frame of memory
entry: virtual address of page in real memory location
  `<process-id, page-number, offset>`
inverted page table entry: `<process-id, page-number>`
  process-id assume role of address space identifier
page table sort by physical address

table usually contains several different address spaces mapping physical memory


# virtual memory
allow execution of processes not completely in memory
allow process to share files easily and implement shared memory

sometimes don't need entire program:
  error handling code
  array,list,table allocate more memory than needed
  certain options and features used rarely

adv: 
  1. program not constrained by amount of physical memory
  2. more program run at the same time, increase CPU utilization, throughput
  3. less IO to load/swap memory

sparse address space: virtual address space includes holes
demand paging: load pages only as they are needed

swapper manipulate entire process; pager concerned with individual pages of process
page table set valid and invalid bit to frames
  valid: page both legal and in memory
  invalid: not in logical address space / valid but currently on disk

page fault: access to page marked invalid

process access page not in memory:
1. check internal table (in PCB) to see if reference was valid or invalid
2. if invalid, end process. if valid, page it
3. find free frame
4. bring desired page into newly allocated frame
5. modify internal table, page table indicate page now in memory
6. restart instruction

hardware support:
1. page table: mark entry invalid through valid-invalid bit / other
2. secondary memory: swap device, swap space

problem: 1 instruction may modify several different locations

## copy on write
allow parent and child process to initially share same pages
only page that modified are copied
OS provide pool of free pages, allocated when stack/heap for process must expand
zero-fill-on-demand: pages zeroed-out before being allocated
virtual memory fork: fork() with copy-on-write

over-allocating memory: when increase degree of multiprogramming
  source: buffer IO
  result: page fault occurs

when over-allocating  memory
1. terminate user process
2. swap out process
3. page replacement

## page replacement
if no frame is free, find one not currently in use and free it
  free by write content to swap space and change page table

1. find location of desired page in disk
2. if free frame, use it. If no free frame, use page-replacement algorithm to select victim frame. 
   write victim frame to disk, change page and frame table
3. page in desired page
4. set desired frame to valid. continue user process

modify bit: each page/frame use modify bit to show whether it is modified
  if not modified, we can skip page out victim page, to reduce overhead


### page replacement algorithm
consider:
  which one has lowest page fault rate?

reference string: string of memory references
#### FIFO page replacement
first in first out, FIFO queue
increase number of frame not always decrease fault rate (Belady;s anomaly)

#### Optimal Page Replacement
replace page will not be used for longest period of time
nned future knowledge of reference string

#### LRU (least recently used) page replacement
each page with time of that page's last use
optimal page replacement algorithm looking backward in time

to calc time-of-use:
1. conunter
2. stack

#### LRU approximation
reference bit: whether page is referenced (read/write to page)
don't know order of use
##### additional reference bit algorithm
keep 8-bit type for each page
for each time period, shift register to left => keep last eight time period
##### second-change algorithm
FIFO, inspect reference bit
  if value=0, proceed replace this page
  if value=1, give 2nd chance, move on select next FIFO page
    reference bit cleared, arrival time set to current time

once victim page found, page replaced, new page inserted in circular queue

##### enhanced second-chance algorithm
(reference bit, modify bit)
1. (0,0) => best to replace
2. (0,1) => not quite good
3. (1,0) => probably will use again soon
4. (1,1) => likely use again soon

#### counting-based 
least frequently used: shift count right by 1 bit at regular intervals
most frequently used: page with smallest count

#### page buffering algorithms
system commonly keep a pool of free frames
  choose victim frame, desired page read into free frame before victim written out

maintain list of modified pages:
  when paging device idle, modified page selected and written to disk

keep pool of free frame, remember which page was in each frame
  when page fault occurs, first check if desired page in free-frame pool, if yes, no IO needed
    if not, select free frame and read

raw disk: some OS give special programs ability to use disk partition as large sequential array of logical blocks
  IO bypass any IO filesystem services


### frame-allocation algorithm
consider:
  for mutiple processes, decide how many frames allocates for each process, when page placcement required
  disk I/O is expensive

when free-frame list exhausted, page replacement algorithm used to select 1 of 93 page replaced with 94th

#### min number of frames
allocation < total #frame available (unless page sharing)
at least 1 frame -> instruction, 1 frame -> memory reference
worst case scenario: allow multiple level of indirection (eg. 16 bit word contain 15-bit address, 1-bit indirect indicator)
  load instruction -> indirect address -> indirect address -> indirect address -> ... -> until every virtual memory touched
=> must limit max #moery reference per instruction to 17

#### allocation
equal allocation
proportional allocation: frame = page/(total pages) * (total frame)
global replacement: allow process to select replacement frame from set of all frames, even frame currently allocated to others
  eg. high-priority process can select from low-priority for replacement
local replacement: can only select own set of allocated frame

#### non-uniform memory access
when multiple CPU used, access to main memory may not be equal
allocate frames for process close to CPU (less latency)
eg. latency group: schedule all threads and process and allocate all memory of process within lgroup

## Thrashing
any process not have enough frame
thrashing: high paging activity, spending more time paging than executing

            |------------------------------------repeat cycle----------------------------------------
if CPU utilization too low -> increase degree of multiprogramming -> process need more pages        |
  -> more page fault, take frame from other process -> process queue up for paging device -> decrease CPU utilization

local replacement algorithm: if one process start thrashing, cannot steal frame from another process

### working-set
working-set strategy: look at how many frames a process actually using
locality: defined by data structure, program structure
working set: set of pages in most recent D page references (D: parameter define working-set window)
  if D too large, may overlap locality

OS monitor working set of each process and provide working set enough frames
page with >= 1 bit on = in working set

### page fault frequency
establish upper and lower bounds on desired page fault rate, give/remove frame if exceed limit

## memory-mapped file
memory mapping: use virtual memory technique to treat file IO as routine memory access
  mapping disk block to page in memory
  when access, page-sized portion of file read from fs to physical page

multiple processes allowed to map same file concurrently
page hold copy of disk block
often shared memory is implemented by memory mapping files

## memory-mapped IO
each IO controller includes registers to hold commands and data being transferred
special IO instructions allow data transfer register <---> system memory

convenient for serial and parallel port to connect modems and printers to computer
  IO port: CPU transfer data by read & write few device registers
  programmed IO: CPU use polling to watch control bit

## kernel memory
kernel memory often allocated from free memory pool
1. kernel request memory for data structure of varying sizes, so should min waste
2. pages allocated to suer process no need contiguous physical memory
   certain hardware device interact directly with physical memory need contiguous page

### buddy system
memory using power-of-2 allocator
256kB -> 128+128 -> (64+64) + (64+64) -> (32+32) + ...
adv: adjacent buddies combined to form larger segments quickly -- coalescing

### slab allocation
slab: one/more physically contiguous pages
cache: >= 1 slabs
objects: instantiation of kernel data structure the cache represents

all objects in cache marked as free -> need new obj for kernel data structure -> assign free obj from cache
adv: 
  1. no waste due to fragmentation
  2. memory requests satisfied quickly. ok for frequent allocate & deallocate (obj created in advance)
in linux, SLUB allocator replace SLAB
  move metadata from slab to page structure the kernel use for each page
  remove per-CPU queue that SLAB allocator maintains for objects in each cache

## consideration
prepaging: prevent high level of initial paging, bring into memory at one time all page that will be needed
page size: medium
TLB Reach
IO interlock: prevent low priority IO to be replaced by high priority IO

# mass storage device
## magnetic disk
disk head files on microns level thin cushion of air
head crash: head damage magnetic surface, though disk platter coated with thin protective layer

seek time: time to move disk arm to desired cyliner
rotational latency: time for desired sector to rotate to disk head

IO bus: ATA, SATA, eSATA, USB, fibre channel
controller: special electronic processor controlling data transfer on bus
host controller: controller at computer end of bus
disk controller: built into each disk drive, have built in cache

disk IO command: computer place command to host controller (using memory-mapped IO port),
  host then send command via message to disk controller, 
  disk controller operate disk driveto carry out command

## SSD
faster because no seek time/latency
no moving parts

## disk structure
addressed as 1D array of logical blocks (usually size 512 B)
eg. sector 0 = first sector of first track on outermost cylinder

difficult to convert logical block -> disk address
1. hide defective sectors by substituting spare sectors from elsewhere on disk
2. number of sectors per track not constant
 
constant linear velocity: density of bits per track
constant angular velocity: density of bits decrease from inner to outer tracks

## disk attachment
host-attached storage: through local IO port
network-attached storage: over network (iSCSI: NAS protocol)
storage-area network: private network connecting servers and storage unit

when issue IO:
1. input / output?
2. disk address for transfer?
3. memory address for transfer?
4. number of sectors to be transferred?
when desired controller busy, new request placed in queue

### FCFS scheduling
first come, first serve
### SSTF scheduling
shortest seek time first algorithm [same as shortest-job-first scheduling]
good to serve all request close to current head position first
### SCAN scheduling [elevator algorithm]
disk arm start at one end of disk, move towards other end
at the other end, direction of head movement reversed

queue: 98,183,37,122,14,124,65,67 ; head: 53
schedule: 53,37,14, 0 , 65,67,98,122,124,183 

### C-SCAN scheduling (circular scan)
also move head from one end to other
but when head arrive at other end, immediately return to beginning of disk, and start scan again
-> treat cylinders as circular list; provide more uniform wait time

### LOOK scheduling
look for request before continue to move in given direction

### SSD scheduling
since no seek time in SSD, linux just use FCFS policy, but modifies it to merge adjacent requests

### selection
SCAN, C-SCAN place heavy load on disk, but less likely cause starvation problem
SSTF: optimal seek time, but higher computation 

performance depend heavily on number and types of requests, file allocation method
  location of directories and index blocks
if IO performance is only concern, OS can hand over control to disk controller
if there are other constraints, like order to write, OS chhose to do own disk scheduling, 
  feed request to disk controller one by one

## formatting
low-level formatting/physical formatting: fill disk with special data structure for each sector
  consist of (header,trailer)(info used by disk controller, eg. error correcting code), data area
  disk controller possible to choose among few sector size 

1. partition disk into >=1 groups of cylinders
2. logical formatting: creation of file system, store initial fs data strucutre 
cluster: group blocks together
disk IO via blocks, file system IO via clusters

raw disk: special program ability to use disk partition without any file system
raw IO: IO to raw disk
  eg. some database use raw IO, can control exact disk location, make app more efficient

## boot block
bootstrap stored in ROM => in fixed location processor can start execute when power up
most system store tiny bootstrap loader program in boot ROM => bring full bootstrap program from disk
boot disk/system disk: where full bootstrap program stores in boot block

## bad block
any bad block flagged as unusable so file system doesn't allocate them
controller maintain list of bad blocks, low level formatting set aside spare sectors not visible to OS
  sector sparing: replace bad blocks logically with spare sector

1. OS tries to read logical block 87
2. controller calc ECC find sector is bad, report to OS
3. next time reboot special command tell controller to replace bad sector with sparce
4. next time request block 87, request translated into replacement address by controller
  (could invalidate any optimization on disk scheduling)

sector slipping: 
  when block 17 become defective and spare 202 sector, remap all sectors from 17 to 202
  202 copied into spare, 201->202, 200->201, ... , 18->19, 17->18  

## swap-space management
some system merge swapping and paging
virtual memory use disk space as extension of main memory
swap space to hold entire process image

### Location
swap space in: 
  normal file system: easy to implement, inefficient (external fragmentation, navigate directory structure)
  separate disk partition: use swap space storage manager allocate, deallocate blocks from raw partition
    life of data much shorter

initial: swap entire process between contiguous disk region and memory
swap space only for anonymous memory
                         |--swap area--|
                        page slot
                            |
swap file/swap partition  [  |  |  |  ]   (hold swapped pages)
swap map                  [ 1  0  3  0]  (array of integer counter for #process)

## RAID (redundant array of independent disks)
solid state non-volatile RAM: write-ack cache protected from data loss during power failure
bit-level striping: splitting bits of each byte across multiple disks
block-level striping: blocks of file striped across multiple disks
parallelism:
1. increase throughput, load balance
2. reduce response time of large access

RAID 0: O O O O    non-redundant striping
RAID 1: O O O O C C C C   mirrored disks
RAID 2: O O O O P P P     memory-style ECC
RAID 3: O O O O P       bit-interleaved parity
RAID 4: O O O O P       block-interleaved parity
RAID 5: P P P P P       block-interleaved distributed parity
RAID 6: P P (PP) (PP) (PP) (PP)   P+Q redundancy

snapshot: view of file system before last update
replication: auto duplication of writes between separate sites for redundancy and disaster recovery
  sync: slower, must write locally ; async: faster, maybe data loss

hot spare: replacement hard disk for disk failure => eg. rebuild mirrored pair when one disk fail, no waiting
problem:
1. software bug
2. lack of flexibility

ZFS maintains internal checksums of all blocks, including data and metadata
inode: data structure storing file system metadata, with pointers to data
  if data mirrored, and there is block with correct checksum and one with incorrect checksum,
  ZFS auto update bad block with good one
  also have checksum for inode

Disks gathered together via RAID sets into pools of storage, a pool can hold >=1 ZFS

traditional:
FS -- volume
FS -- volume
FS -- volume

ZFS:
ZFS --|                  |-- disk
ZFS --|-- storage pool --|-- disk
ZFS --|                  |-- disk

disk write outcome:
1. success
2. partial failure: failure occur in the midst of transfer, so only some sectors written with new data, some corrupted
3. total failure: fail before start, previous data remain intact

# file system

collection of file, directory structure
file attribute: name, identifier, type, location, size, protection, time, date, user identification
extended file attribute: character encoding, file checksum, ..
file operation: create, write, read, repositioning within file (file seek: search sth), delete, 
  truncate(erase content of file but keep attribute)

file pointer: read(), write() use same pointer
file-open ocunt: trace number of opens and closes and reaches zero on last close
disk location: information needed to locate file on disk kept in memory
access right: stored on per-process table so OS can allow/deny IO

UNIX use crude magic number stored at beginning of file to indicate roughly type of file 
  not all files have magic numbers, so allow file-extension hint

file type indicate internal structure of file
some OS support minimal number of file structure, at least include executable file

UNIX define all files simply streams of bytes, each byte individually addressable by offset from beginning/end of file
internal fragmentation:
  eg. physical block = 512 B, file=1949 B
      must use 4 blocks = 2048 B to store file, 99 B wasted

## sequential access
information in file processed in order
read_next(), write_next()      

## direct access/relative access
fiexed length logical records: read, write records rapidly without particular order
random access to any file block
read(n), write(n)
relative block number: index relative to beginning of file
OS decide where files should place

## other access
on top of direct-access
indexed sequential-access method: 
  master index -> disk blocks of secondary index -> actual file blocks
  to search item:
    binary search of master index => block number of secondary index
    block read in, binary search find block containing desired record
    block searched sequentially

volume: entity containing file system
  can be subset of device, whole device, multiple device linked into RAID set

## directory
search file, create file, delete file, list directory, rename file, 
  traverse file system: save content, structure of entire fs at regular intervals

### two-level directory
user file directory: lists only files of single user
master file directory: store user 
a special user directory is defined to contain system file, so to share among users
search path: sequence of directories searched when a file is named

deletion of directory:
  if directory is empty, simply delete
  if exist subdirectory, delete subdirectory first / recursive delete

soft link: link reference to a file; in linux, when file deleted, soft link left
hard link: form acyclic graph, a file has >1 parent directory
           use counter to count #parent, decrement 1 when one link deleted

if allow cycles in directory tree, must avoid infinite loop in naviagation
  since self-referencing is possible in cyclic tree, need to use grabage collection:
    traverse entire file system, mark everything can be accessed -> 2nd pass collect everything not marked to free space
    very time consuming

## file system mounting
OS given name of device and mount point
eg. partition of user's home mounted in /home

mount over directory that contain files: 
1. disallow OR
2. make files temporarily obscured until unmounted

allow same filesystem mount repeatedly at different mount point 
  OR
only allow 1 mount 

## file sharing
owner, group

## remote file system
client-server model
spoofed: unauthorized client allowed access to server

distrubted information system / distributed naming service: unified access to information needed for remote computing
MS: common internet file system (CIFS)
lightweight directory access protocol: secure distributed naming mechanism

## failure mode
may fail disk, metadata, disk controller, cable, host-adapter
system either terminate all operations / delay
to implement recovery from failure, some kind of state information maintained on both client and server

NFS: stateless DFS
## consistency semantics
specify how multiple user system to access shared file simultaneously
  related to process sync algorithm
  
### UNIX semantics
writes to open file by user visible immediately to other user
allow user to share pointer of current location into file
  advancing of pointer by one ser affects all sharing users
### session semantics
writes to file by user not visible immediately to other user that have same file open
once file closed, changes made visible in sessions starting later
### immutable shared files semantics
once file is declared as shared by creator, name and content cannot be modified

## protection
access control
password protection

# file system implementation
1. how should file system look to user
2. create algorithm and data structure map logical file system to physical secondary storage

application program -> logical file system -> file organization module -> basic file system
  -> I/O control -> devices

IO control: device driver, interrupt handler for main memory<-->disk
basic fs: generic commands to appropriate device driver to read and write physical blocks on disk
file organization module: know about file, logical, physical blocks
  translation logical->physical, free space manager
logical fs: manage metadata, file control block(inode in UNIX) contain metadata; protection

## overview
boot control block: per volume, info to boot OS 
volume control block: per volume, volume detain, #blocks in partition, size blocks, #free-block ..
directory structure: per fs {filename, associated inode num} {master file table}
FCB: per file, detail about file

UNIX treat directory same as file
1. open() call pass filename to logical file system
   if already in use, per-process open-file table entry point to system-wide open-file table
   if not, search for given filename
2. once file found, FCB copied to system-wide open-file table
3. entry made in per-process table
4. open() return pointer, all file operation performed via this pointer

```
  user space        kernel memory     secondary storage
  
                    ......     <------ directory structure
  open(filename)--> XXXXXX ----|
                    ......     ------> file-control block

                  ...          ... --------> data blocks
  read(index) --> xxx ------>  xxx <-------- FCB
                  ...          ...
                per-process system-wide
                open-file
                table
```
entry: file descriptor / file handle

## mounting
a boot loader understand multiple filesystem and multiple OS occupt boot space
root partition: contain OS kernel checked if valid in boot time
  if invalid, have consistency checked and possibly corrected

## Virtual File System
OS concurrently support multiple types of filesystem into directory structure
first layer: file-system interface: open(),close(), read(),write()
second layer: virtual file system (VFS)
  1. separate generic operation from implementation
  2. mechanism for represent file thoughtout network
     based on file-representation structure called vnode
     inocde uniuq within only single fs

distinguish local file from remote ones

                                 |---> remote fs type1 [network]
fs interface --> VFS interface --|---> local fs type2 [disk]
                                 |---> local fs type1 [disk]

inode object: individual file
file object: an open file
superblock object: entire file system
dentry object: individual directory entry 

## directory implementation
### Linear List
linear list of file names with pointers to data blocks
create file:
1. search directory no existing file has same name
2. add new entry at end of directory
linked list can also be used

software cache to store most recently used directory information
balance tree, sorted list

### hash table
take value computed from filename and return pointer to filename in linear list
insertion, deletion: avoid collision is ok
chained-overflow hash table: each hash entry is linked list

## allocation method
### contiguous
each file occupy set of contiguous blocks on disk
filesystem remembers disk address of last block referenced
problem: 
1. external fragmentation, need expensive compacts on free space
   maybe fs unmounted when offline defragmentation
2. need pre-defined how much space needed for a file
   if too much assigned, waste space; too less, error

### linked allocation
each file is linked list of disk blocks
effective only for sequential access file
problem:
1. inefficient for direct access. eg. to access i-th block, need jump i-th times
2. more space to save pointer
3. reliability: if pointer lost/damaged, cannot read
   solution: use doubly linked list

file-allocation table(FAT):
  section of disk at beginning of each volume contain table
  1 entry for each blcok, indexed by block number
  directory entry: first block's block number of file
  table entry: block num of next block in file (chain)

### indexed allocation
bring all pointers together into index block
each file has own index block. i-th block=i-th index-block entry
allow direct access, no external fragmentation

how to set dynamic index-block size?
1. linked linst of index blocks
2. multilevel index (eg. first-level index point to second-level index block)
3. combined scheme
   eg. 15 pointers of index-block in inode; 
       12 as direct block: direct point to blocks of file data
       3 as {single,double,triple} indirect block
        point to another/2 layers/3 layers of indirect/direct blocks
index block can be canced in memory

### performance
type of access can be declared when file created:
1. sequential access -- linked
2. direct access -- contiguous

## free space management
maintain free space list: record of all free blocks
### bit vector
free=1, allocated=0
eg. 00111100111..
can sequentially check each word in bit map to find first non-0 free block
use clustering of blocks to increse efficiency; not possible keep entire vector in main memory

### linked list
link all free blocks, pointer to first free block
grouping: first free block: address of n free blocks, last block: next n free blocks address

### counting
in general several contiguous blocks allocated/freed simultaneously
each entry = {disk address:address of first free block, count:number(n) of free contiguous blocks after first}
entry stored in balanced tree

### ZFS
metaslabs: divide space on device into chunks of manageable size, each has associated space map
use log-structured fs to log all block activities (allocating, freeing) in time order
  load space map into memory in balanced tree
=> in-memory space map show allocated & free space in metaslabs
combine contiguous free blocks => single entry

## efficiency
cluster size grows as file grows
to track 'last access date', anytime file opened for reading, directory entry must read & write also => inefficient
ZFS support 128-bit pointer for massive file system

separate section of main memory for buffer cache (assume data will use shortly)
page cache -> cache file data
virtual address far better caching through physical disk block
unified virtual memory: use page caching to cache process pages and file data

without unified buffer cache, to open and access file:
1. memory mapping: need use page and buffer cache
2. call read(), write()

memory mapping: read disk block from fs and store them in buffer cache
double caching: content in buffer cache copied to page cache
=> so we use unified buffer cache to avoid waste

synchronous write: wait data to reach disk before proceed
most write async, but metadata writes can be sync
flag in system call: indicate if perform sync => atomic transaction

sequential access optimization:
  free-behind: remove previous page from buffer when next page requested
  read-ahead: requested page & several subsequent pages read and cached

## recovery
1. scan all metadata on each file => take very long
2. record state within fs metadata
consistency checker: eg. fsck compare data in directory structure with data blocks on disk, try to fix any inconsistencies
journaling file system: use log based recovery technique
  all metadata changes written to log, perform transaction
  if system crashes, any transactions not completed will complete
    transaction aborted will be undone
those updates proceed much faster than applied directly on disk data structure
  better than costly sync random metadata writes

WAFL: never overwrite blocks with new data, use transaction
  after transaction complete, metadata structure update pointer from old to new block
  if old blocks kept, create snapshot
ZFS: checksum all metadata, data blocks; no need consistency checker

backup method:
  full backup first day, then changed since day1 (incremental backup) 2nd day, ... , 
    until changed since N-1 day, go back to day1
  usually plan full backup from time to time and saved forever

## NFS
goal: 
1. some degree of sharing among independent file systems
2. work in heterogeneous environment
once mount completed, become subtree of local fs, replace subtree descending from local directory
diskless workstation :even mount their own roots from server

independence achieved by RPC primitives built on top to external data representation (XDR)
NFS protocol:
1. mount protocol: server maintian export list specifying lcoal fs for mounting
2. remote file access protocol
   - search file, read directory entry, manipulate link, file attribute, read-write
   - stateless connection, no speal measure to recover if server crash
   - modified data must commit to server disk before result returned to client
   - single NFS guarantee to be atomic, but no concurrency-control mechanism, need service outside NFS provide locking

NFS integrated into OS iva VFS

                      |--> other fs                      ---> RPC/XDR --> NFS --> VFS interface --> UNIX fs --> disk
system call --> VFS --|--> UNIX fs --> disk              |
                      |--> NFS client --> RPC/XDR --> `network`

one-to-one correspondence between UNIX system call on file operation and NFS protocol RPCs
file attribute cache: update when new attr arrive from server, 
file blocks cache: used only if cached attributes up to date


# IO system
IO subsystem of kernel: separate rest of kernel from complexity managing IO
increasing standardization of software and hardware interface
device driver: uniform device access interface for IO subsystem

## hardware
storage, transmission(netowrk connection), human-interface (screen, keyboard)
daisy chain: A connect to B, B connect to C, C plug into port on computer
controoler on board has registers for data and control signal
1. use special IO instruction to transfer data
2. memory-mapped IO: device registers mapped into address space of processor

eg. process send output to screen -> by writing data into memory-mapped region
I/O port:
1. data-in register: read by host get input
2. data-out register: write by host send output
3. status register: bits read by host indicating states (eg. current command completed?)
4. control register: write by host to start command / change mode of device

some controller has FIFO chip (hold small burst of data)

## polling (輪詢)
assume use busy bit and command-ready bit to show status
1. host repeated read busy bit until bit clear 
2. host set write bit in command register, write byte into data-out register
3. host set command-ready bit
4. when controller notice command-ready, set busy bit
5. controller see write command, read data-out register to get byte, do IO
6. controller clear command-ready bit, clear error bit = IO success, clear busy-bit = finish

for step 1, for some device if host cannot service device quickly => data lost
3 CPU cycle: read -> logical--and -> branch if not zero
since inefficient, better to let controller to notify CPU when ready => interrupt

## interrput
1. device init IO, controller init IO when ok
2. controller input ready, output complete / error gen.
3. CPU receive interrput, transfer control to interrupt handler
4. handler process data, return interrput
5. CPU resume processing of interrupted task

goal:
1. ability to defer interrupt when critical
2. dispatch proper interrupt handler 
3. need multilevel priority interrput by urgency
   non-maskable, maskable interrupt:
    address as offset to select specific interrupt handler (interrupt vector)

interrput chaining VS huge interrupt table VS single interrupt handler
can hanle exception 
virtual memory paging, page fault: page-fault handler
software interrupt/trap: 
  identify desired kernel service, save state, switch to kernel mode, dispatch kernel routine
- help manage flow of control within kernel
  - eg. start next pending IO(high priority) over copy data (low priority)
  
## direct memory access (DMA)
programmed IO: processor to watch status bit and feed data to controller register 1B at a time
better dispatch work to DMA controller

1. device driver told to transfer data, driver tell controller to transfer data
2. disk controller init DMA transfer, send each byte to DMA controller
3. DMAcontroller transfer bytes to buffer X
4. when complete, DMA interrput CPU to signal completion
host write DMA command block (source,destination of transfer, #bytes) into memory
  DMA proceed to operate memory bus directly

## application IO interface
                                | PCI bus device driver --- PCI bus device controller <--> PCI bus
kernel -- kernel IO subsystem --| keyboard device driver --- keyboard device controller <--> keyboard
                                | ...                      |-----------------hardware----------------|

character / block
sequential / random
sync / async
dedicated / sharable
latency, seek time, transfer rate, delay between operations
read only, write only, read-write

ioctl(): pass arbitraru command from application to device driver
  - enable application to access any functionality

### block and char
direct IO: disable buffering and locking (sometimes app have their own locking mechanism)
raw IO: access block device as simple linear array of blocks
basic read(), write()
char interface: get(), put()

### network
select(): return information about which socket have package waiting to be received; 
          which socket have room accept package

### clock
programmable interval timer, can use to generate interrupt
eg. periodic flushing of dirty cache by disk IO subsystem

### non-blocking, async
sync/async: relation between two modules
blocking / non-blocking: situation of 1 module

blocking: current execution suspended == sync
non-blocking: UI receive keyboard and mouse input while processing and diplaying data on screen
  - do not halt execution, return quickly
  - if answer can't return quickly, API return immediately with error and **does nothing**
async: always return immediately without waiting IO complete
  - continue to execute code, completion IO at future time

### Vectored IO
allow 1 system call perform multiple IO operations involving multiple locations
adv: avoid context-switching, system-call overhead

## kernel IO subsystem
### IO scheduling
maintain wait queue for each device
OS may attach wait queue to device-status table (device type, address, state)

### buffering
memory area (in main memory) that store data transferred between two devices / device and application
reason: 
1. speed mismatch, wait enough data batch IO
2. adaptation for device that have different data transfer size
3. support copy semantics for application IO => guarentee get version of data at time of system call
double buffering: decouple producer data from consumer

### caching
fast memory hold data copy
buffer: only hold existing copy of data
cache: hold copy on faster storage of item

### spool
buffer that hold output for a device
managed by system daemon (often kernel thread) coordinate concurrent output

### IO protection
define all IO instruction to be privileged 
kernel cannot deny all user access, eg. grpahics game us locking mechanism allow graphic memory allocate

## transform IO request to hardware operation
UNIX has mount table associate prefix of path names with specific device names, find longest matching prefix
deivce number: major: device driver ; minor: index into to device table

user process -> kernel IO subsystem -> kernel IO subsystem -> device driver -> interrput handler -> device controller

## Streams
application to assemble pipelines of driver code dynamically
full-duplex connection between device driver and user-level process

user process <-> stream head | read queue <- read queue   | driver end <-> device
                             | write queue -> write queue |
                             <--------stream module------->

write(): write raw data to stream
putmsg(): user process to specify message

stream IO is async; when write to stream, user process will block;
  assume next queue use flow control, until room to copy msg

adv: provide framework for modular approach to write device drivers and entwork protocol
  networking module use both ethernet card and 802.11 wireless network card
  support message boundary, control information

## performance IO
1. reduce context switch
2. reduce copy times
3. reduce interrupt frequency
4. increate concurrency by DMA
5. move processing primitives into hardware
6. balance CPU, memory subsystem, bus, IO performance






