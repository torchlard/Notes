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
if there are other constraints, like order to write, OS choose to do own disk scheduling, 
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
```
user process <-> stream head | read queue <- read queue   | driver end <-> device
                             | write queue -> write queue |
                             <--------stream module------->
```
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






