# JPA transaction
REQUIRES_NEW: not truely nest transaction, but pause current one
  - 2 transactions accessing same information

ORM: flush controlled by framework; 1 explicit flush before commit
  - if many entries modified, framework can do intermediate flushes

assume T1,T2
## optimistic lock
read not acquire locks, write acquire exlusive lock => T1 don't need lock

1. if T1 flush changes early, get exclustive lock
2. when T2 commit, attempt to get lock but can't; system is blocked
3. particular kind of deadlock

1. if T1 not flush early, no lock acquired
2. when T2 commit, it get and release lock successfully
3. when T1 want to commit => conflict, fails

## pessimistic lock
read get shared lock, write exclusive lock
1. if T1 flush early, turn lock into exclusive lock => ~1
2. if not flush early, T1 get shared lock
3. when T2 commit, want get exclusive lock -> blocks


# command
show global variables like 'autocommit';

```sql
set autocommit=0;
start transaction;
...
...
commit;
```











