# lock level
no lock < biased lock < lightweight lock < heavyweight lock

# biased lock
most of time lock not have mutlithread intention, got by same thread

enter sync block 
> check if object header point to current thread 
> if already get lock, continue
> else check if biased lock identifier = 1
  > yes: CAS point lock to thread
  > no: use CAS compete for lock

biased lock release lock only when competition

if sure all lock normally under contention, can close biased lock
`-XX:-UseBiasedLocking=fasle`
=> enter lightweight lock status

# lightweight lock
in current thread frame, create space to store locking record
- copy Mark Word to record (Displaced Mark Word)
> try CAS change lock pointer to current thread
  > success: get lock
  > fail: content with other thread, current thread try spin

## comparison
| lock             | adv                                   | disadv                                   | scenario                         |
|------------------|---------------------------------------|------------------------------------------|----------------------------------|
| biased lock      | no extra consumption, nano sec slower | if contention,extra waste                | single thread visit              |
| lightweight lock | contention thread non-blocking        | if thread cannot get lock,spin waste CPU | responsive                       |
| heavyweight lock | no spin,no waste CPU                  | blocking thread,slow response            | throughput,sync block run longer |


# CPU terms
Cache line: smallest cache unit
Compare and swap: input expected old value and new value; if match, then change to new value
CPU pipeline: 5-6 different electronic unit form pipeline, 
- single X86 instruction -> 5-6 steps run by these units => 1 CPU cycle complete 1 instruction
Memory order violation: multiple CPI change different part of same cache line => conflict, clear pipeline

## bus lock
CPU provide LOCK# signal
- when CPU emit signal on bus, other CPU's request will be blocked
- only that CPU can use memory

## cache lock
operation to certain memory address is atomic
exception
1. data cannot be cached in CPU, / data across multiple cache line
2. CPU not support


# JAVA memory model
Java use shared memory model
each thread has a local memory
- cache + register + write buffer + hardware & compiler optimization

JMM defines abstract relation between thread and main memory 

## 
abstract JMM structure
```
thread A <-> local memory A(shared data copies) <= JMM control  => Main memory (shared variables)
thread B <-> local memory B(shared data copies) <=              =>
```
for thread A and thread B to communicate
1. thread A put changed variable in local memory A into main memory
2. thread B read changed shared variable from main memory

## instruction reordering
1. compiler optimize
2. instruction set parallelism
3. memory system reorder: use cahce,RW buffer => load,store seems random order
- 2,3 are processor reordering

Source code -> Compiler optimize -> instruction level -> memory system -> final output order
now requrie to insert specific type of memory barrier to stop certain processor reorder

### situation
a=b=0
processor A: a=1; x=b;
processor B: b=2; y=a;

in real life: 
processor A: write a=1 to buffer; get (a,b) from memory; flush a=1 to memory;
processor B: write b=2 to buffer; get (a,b) from memory; flush b=2 to memory;

wriate buffer only visible to processor itself

x86 only allow to reorder 'store-load' operation
StoreLoad Barrier contains effect of 3 other barriers (LoadLoad, StoreStore, LoadStore)
- cost = flush all buffer into memory

## happen-before
JSR-133 memory model 
happen-before 
- not mean operation actually oeparte before 
- mean prev operation actually visible to next operation

1. program sequence: prev happen-before any later op 
2. monitor lock rules: lock happen-before unlock
3. volatile
4. transitive
5. start(): if thread A run ThreadB.start(), ThreadB.start() happen-before any op in B
6. join(): if thread A run ThreadB.join(), any op in B happen-before ThreadB.join()



## data dependency
data dependency only for single thread, single processor, not consider cross processor,cross threads

if data dependency, then compiler and processor will speculate result
eg.
writer(){ a=1; flag=true; }
reader(){ if(flag) i=a*a; }

thread A:         ; a=1; flag=true;
thread B: temp=a*a;    ;          ; if(flag); int i=temp;
- read a beforehand, guess temp => store in reorder buffer

if program is synchronized, then program execution is sequentially consistent (as-if-serial)

## non sync program
for non-sync program, JMM only provide min security

JMM not guarantee long,double is atomic
in computer, data transfer between processor and memory via bus => bus transaction

bus arbitration: when processor A and B compete for transaction, decide one of them wins

## stop reorder
*, volatile write
volatile read, *
volatile write, volatile read

impossible to discover most optimal memory barrier
=> conservative measure
volatile read -> LoadStore,LoadLoad
StoreStore <- volatile write -> StoreLoad

# lock memory semantics
thread A release lock: send signal to thread that will get lock
thread B get lock: receive signal from prev thread 

for FairSync and NonFairSync, a;; need to RW on volatile variable `state`

## x86 lock prefix 
program add `lock` prefix to `cmpxchg` command by CPU type
- if multi processor, then add

1. ensure atomic read,write,modify to memory
2. stop reorder with prev R, next W
3. flush buffer data to memory

CAS = volatile R + volatile W

## thread communication
1. A volatile write, B volatile read
2. A volatile write, B CAS volatile change
3. A CAS volatile change, B CAS volatile change
4. A CAS volatile change, B volatile read


# concurrent package implementation
volatile RW, CAS
=> AQS, non-blocking data structure, atomic variable
=> Lock, synchronizer, blocking queue, Executor, concurrent container

# final
reorder prohibit rules
1. write to final in constructor, ref to final var
2. read obj with final var, read final var


# JMM design
1. memory model easy to understand, program
2. compiler and processor less restriction, more optimization

intra-thread semantics: reorder not change output within single thread

double lock checking
```java
static Instance instance;
static Instance getInstance(){
  if(instance == null){
    synchronized(D.class){
      if (instance==null)
        instance = new Instance();
    }
  }
}
```
problem: 
thread A: allocate memory location -> instace point to address
thread B: instancce=empty? -> access instance
thread A: init instance -> access instance

solution
1. volatile static Instance instance
2. initialization on demand holder idiom
```java
class InstanceFactory {
  static class InstanceHolder {
    static Instance instance = new Instance();
  }
  static Instance getInstnace(){
    return InstanceHolder.instance;
  }
}
```
when class init, JVM will get a lock

JMM abstract difference in memory management among processors

minimum security: obj value init happen-before access obj

































