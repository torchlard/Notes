# concurrency
takes following locks:
- read phase => every 100 documents : read lock
- insert into temp collection => single write : write lock 
- output collection not exist => create output collection : write lock
- output collection exist => output action : write lock (global, block all operations)

locks are fair, with reads and writes being queued in order
when 1 request granted, all other compatible requested granted at same time
=> maybe conflicting

ggghhh
fgghhjh



most read write operation use optimistic concurrency control

# lock type
R: shared lock (S)
W: exclusive lock (X)
r: intent shared (IS)
w: intent exclusive (IX)

## intent lock
only at global, db, collection level

for WiredTiger, yielding lock not necessary for accessing storage as intent locks
- avoid long-lived storage transactions
- serve as interruption points to kill long running operations
- allow operation such as index/collection drop and creations

| operation                | db  | collection |
|--------------------------|-----|------------|
| query                    | r   | r          |
| aggregation              | r   | r          |
| insert data              | w   | w          |
| remove data              | w   | w          |
| update data              | w   | w          |
| create index(foreground) | w   |            |
| create index(background) | w   | w          |
| list collection          | r   |            |
| map-reduce               | W,R | w,r        |


## replica set primary
when write to primary, also write primary's oplog
=> must lock both collection's db and `local` db

## secondaries
secondaries not allow read while applying write, in order appear in oplog


# ticket
use ticket to limit concurrency number, default 128 (very reasonable)
if no lock contention, all request redirect to engine level
- still need queue execution


# locking
when mongodb add lock, 
globalLock -> DBLock -> CollectionLock

write operation
1. globalLock
2. DBLock MODE_IX
3. Collection MODE_IX
4. pass request to wiredtiger

read op
1. globalLock MODE_IS
2. DBLock MODE_IS
3. Collection MODE_IS
4. pass request to wiredtiger








