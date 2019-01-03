# introduction
## concurrency VS parallel
conventional 'thread & lock' do not explicitly support parallel
concurrent program has uncertainty which program execute first, 
parallel program have fixed result

## parallel architecture
### bit-level 
32 bit faster than 8 bit in addition

### instruction-level
pipeline, out-of-order execution, guess execution
look like serial command, but inside processor is parallel command

### data level
SIMD

### task level 
shared memory VS distributed memory system
shared memory is easier to program, but when processor num increase, there will be bottleneck

## concurrency
not only full use of multicore, but also reactive, high performance, resilient, simple

JVM will execute threads out-of-order
when not using `synchronized`, the order of thread cannot be guarenteed

principle
1. all shared variable must be synchronized
2. all read write threads must be sync
3. get locks in global order
4. avoid calling unknown methods when getting lock
5. minimize time holding lock

## Java memory model
in processor level, allow other processor to see current data in memory
strong memory model: anytime see data
weaker memory model: must use memory barrier to refresh processor cache

as long as code relocation don't change program's meaning, compiler will move code if more optimal

Java use `volatile`, `final`, `synchronized` to let programmer tell compiler how to carry out 
concurrency, ensure correct sequence

old memory model: final does not guarentee thread safe/synchronization
incorrectly synchronized: write by one thread, read same variable by another thread, rw not ordered by synchronization => data race

synchronization ensure memory write by thread before and during sync block, are made visible in 
particular manner to other threads which sync on same monitor
- after exit sync block, release monitor
- before enter sync block, get monitor

- each action in thread follow program's order
- unlock monitor before next lock on same monitor
- write to volatile field before read on same volatile
- thread start before any action in started thread
- all action in thread happen before other thread return from join() on that thread

## over internal lock
drawbacks of internal lock
- when thread waiting for lock, cannot be interrupted
- cannot set overdue time for getting lock
- must use synchronized block

can use ReentrantLock

for analysing long text, can use producer/consumer pattern, create queue of hashmap
and raise two threads for producing and processing data chunks.
use multiple consumer to speed up, use ConcurrentHashMap to avoid too frequent locking

- use thread pool, not directly create thread
- use CopyOnWriteArrayList to listen code
- ArrayBlockingQueue for producer and consumer to cooperate

normal program only support shared memory, not distributed memory

# Functional
## bugs in Java concurrency
```java
public class Tournament {
  private List<Player> players = LinkedList<Player>();

  public synchronized void addPlayer(Player p){
    players.add(p);
  }

  public synchronized Iterator<Player> getIterator(){
    return players.iterator();
  }
}
```
not thread safe, because iterator use mutable state inside players,
so if iterator thread use with addPlayer thread, throw Exception

# separate identity and state
clojure is impure functional language
default variable not easy to mutate, only mutate when necessary

mutable variable/data: change value within lifecycle
constant: confirm immutable when compile

create atomic variable using `atom`
state = a series of time varying value

## persistent data structure
not persist to disk/DB, but keeping previous version when changing value
using shared data strucuture and linked list, minimal changes to mutate
  - have similar performance to non-persistent data structure

in imperative programming, 1 identity can only own 1 value

build 5 bit (32 element) tree for vector, to get log_32(n)'s ~ O(1) lookup time
<http://blog.fnil.net/blog/3a2ce94a8eecdeffec608b6a6ed6f190/>

### digit partition
for Map, assume key is integer, say 9230, we can split it into [9,2,3,0], and then go through 
search tree to find values 9 -> 2 -> 3 -> 0 to move to value

### bit partition
split key as bit chunk, eg. 626 => 0000 0010 0111 0010
assue tree is 2-bit, then set top level = 8, cut later 8 bits, see lowest 2 bit = 10,
then jump to 2; level -2 = 6, cut later 6 bit ...
each time check 2 bits, under all digits checked

## tail offset
either the value you want to search is in tail, or in other part of tree

## allow update
to allow transient optimisation in safe way

mutate node when
1. only accessible by original vector
2. original vector never be used after this update

check
1. check whether node was created by vector we're mutating
2. ensure no other vector already been created out of this one







