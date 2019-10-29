# Transaction isolation level
## repeatable read
[default] 
read operation that use snapshot to present result at point of time, regardless changes by other transactions at same time
- if queried data change, original data reconstructed based on `undo log`

reduce concurrency, forcing wait for other transactions to finish
snapshot established by first read

if issue plain select statement within same transaction, SELECT statement consistent with each other

locking read: (select + for udpate / for share)
- unique index with unique search condition: only lock index record
- other condition: locks index range scanned, gap locks / next-key locks

## read committed
each consistent read sets and reads own fresh snapshot

locking reads: 
locks only index records, not gap between them
- free insertion of new records next to locked records

update/delete: 
- lock only rows that it updates/delete
- record locks for non-matching rows released after evaulate where

update:
- if row already locked, run "semi-consistent" read
- return latest committed version to mysql
- determine whether row matches where condition of update



# locks
## gap lock
select c1 from t where c1 between 10 and 20 for update
=> prevent tx inserting value 15 into column t.c1

## next-key lock
record lock on index record + gap lock on gap before index record

# terms
## consistent read










