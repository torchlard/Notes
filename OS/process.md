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
   
new process created by fork() system call, consist of copy of address space of original process 
=> allow parent communicate easily with child
- child inherit privilege and scheduling attributes from parent resources
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
2. computation speedup: break into subtasks
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
  |   code        data       files |
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
