# Main Memory
fetch instruction from memory -> decode -> operands fetched from memory. 
  - after instruction executed on operands, result stored back to memory
  -> sequence of memory address generated by running program
any instrucitons in execution and data used by instruction, must in direct-access storage devices
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
```
                                                      other object module           system library
                    [compile time]                       [   |           load time          |  ]
source program -> compiler/assembler -> object module -> linkage editor -> load module -> loader 
-> in-memory binary memory image [run time]
            | (dynamic linkage)
    dynamically loaded
    system library
```
logical address: address generated by CPU
physical address: loaded into memory-address register of memory

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
- code, global variable, heap(memory located), stack, C lib
loader will take all segments and assign them segment numbers

segment table: map 2D user-defined address to 1D physical address
  each entry has segment base (constrain starting physical address), segment limit (length of segment)
use segment-number as offset in segment table to find entry 
  when offset in logical address < segment limit => legal address

## paging
frames: break **physical** memory into fixed sized blocks
pages: break **logical** memory into blocks of same size, size=power of 2 (512B - 1GB / page)

logical address space totally separated from physical address space, 
  can have logical 64-bit when system < 2^64 B physical memory

address by CPU: page number(index), page offset
page table: base address of each page in physical memory
frame table: table keep info which frames allocated, which available, total frames are
```
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
```
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
```
  page number -> 10 bit page number + 10 bit offset
                   10   10    12
final structure: [ p1 | p2  | d ]
                 page number|page offset
```
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
```
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
```
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
2. if invalid, end process; if valid, page it
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

when over-allocating memory
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
=> must limit max #memory reference per instruction to 17

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
```
            |------------------------------------repeat cycle----------------------------------------
if CPU utilization too low -> increase degree of multiprogramming -> process need more pages        |
  -> more page fault, take frame from other process -> process queue up for paging device -> decrease CPU utilization
```
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
way to exchange data and instructions between CPU and peripheral devices attached to it
processor and IO device share same memory location 
use same address bus to address both memory and IO device

convenient for serial and parallel port to connect modems and printers to computer
  IO port: CPU transfer data by read & write few device registers
  programmed IO: CPU use polling to watch control bit

## kernel memory
kernel memory often allocated from free memory pool
1. kernel request memory for data structure of varying sizes, so should min waste
2. pages allocated to super process no need contiguous physical memory
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
