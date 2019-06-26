# introduction
belief: replace lock & condition variable with transactions
- easier to write correct and eficient shared-meory parallel programs

transactional memory <-> shared-memory concurrency
  AS
garbage collection <-> memory management

# backgorund
assume using message-passing instead of shared memory

## GC
when create an object, space allocated in heap
key idea: determine reachability
- object reclaimed only after no ref (path) from root (global/local variable) to object

reachability determined by tracing / automatic reference-counting
- with high level techniques (eg. generational colleciton)
- with low level trick (eg. pointer-reversal)

space leaks when not precise approximate reachability
weak pointer: ref not count for reachability
- reclaim it = update pointer to null

real-time collection ensure GC pause < threshold

## transactional memory
preemptive scheduling = thread can be stopped at any point
threads communicate to coordinate computation
- shared memory: threads R/W to field
- use sync to prevent thread interleaving

transactional memory provide sync mechanism
`atomic{s}`: execute statement s that no interleave from other thread

TM implementation
1. detect conflicts
2. ensure all transaction's update to shared memory appears immediate

weak VS strong atomicity:
- weak one can violate transaction's isolation
  - when memory access not in scope of atomic block
  - conflict with another thread

should allow non-conflict access

obstruction-freedom: any transaction can continue even if all other transactions suspended

## motivation
performance benefit: optimistic concurrency
- transaction run in parallel unless dynamic memory conflict

1. easier to mix fine-grained and coarse-grained operations
  - eg. most hash table oepratiosn access only small part of table
  - parallel insert and lookup difficult with locks
2. Parallel access to ends of double-ended queue difficult for lock
3. can do `atomic {s1} or else {s2}`
  - try s2 atomically if s1 aborts
  - can combine alternative atomic actions

```java
class Account {
  float balance;
  synchronized void deposit(float a){
    balance += a;
  }
  synchronized void withdraw(float a){
    if(balance < a) throw new Exception();
    balance -= a;
  }
  void transfer_wrong1(Acct other, float amt){
    other.withdraw(amt);
    // race condition
    this.deposit(amt);
  }
  synchronized void transfer_wrong2(Acct other, float amt){
    // deadlock with parallel reverse-transfer
    other.withdraw(amt);
    this.deposit(amt);
  }
}

// VS

class Account {
  float balance;
  void deposit(float amt){
    atomic {balance += amt;}
  }
  void withdraw(float amt){
    atomic {
      if(balance < amt) throw new Exception();
      balance -= amt;
    }
  }
  void transfer(Acct other, float amt){
    atomic {
      other.withdraw(amt);
      this.deposit(amt);
    }
  }
}
```

# Core analogy
## problem
sharing ref counts among objects => reduce num of ref count, inc space consumption
memory management involves nonlocal properties
- correctness need to know what data will access

associate each data obj with lock, hold lock when access data
- enforce partial order forthread acquire lcok 
  - too burdensome, may reduce parallelism

eg. new fn that must update 2 thread-shared objs atomically wrt. other threads
- require many changes, add bugs

## solution












