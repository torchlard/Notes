# SharedMemory

close(): 1 process no longer need to access memory block needed by others
unlink(): memory block no longer needed by any process

create: True => create new block, False => attach to existing memory block
size: requested num of bytes to create new shared memory block

buf: memoryview of content of block

# ShareableList
mutable list like object where all values stored in shared-memory block

values only allowed int,float,bool,str(<10M),byte(<10M),None

# Manager
create data which can be shared between different processes
including sharing over network between processes running on different machines

manager process will shutdown as soon as garbage collected / parent process exits

## SyncManager
used for synchronization of processes

Barrier, Event, Lock, Queue, RLock, Semaphore, Array, list, dict

## Proxy object
shared object which lives in a different process, be reference of proxy







