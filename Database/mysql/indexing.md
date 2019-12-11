# indexing
most of time use B+ tree to build index
index: 
- clustered index: store all information of the row
- secondary index: bookmark for searching record

clustered index = B+ tree order by primary key, store data in leaves
- actual physical storage way
secondary index only help fasten search
there are multiple secondary indexs for a table

if search by secondary index
-> then first search B+ tree of secondary index
-> get primary indexes
-> search by primary index B+ tree again to get full records

# lock
InnoDB (mysql 5.7) use pessimistic lock
- apply lock on resource, ensure only 1 thread access at same time

shared-lock: read-only
exclusive lock: read-write
intention shared|exclusive lock: transaction want to get certain record's shared|exclusive lock

intention lock is for others to know someone is working on table, 
- no need to scan whole table to know if some rows are locked
- just wait for intention lock released

record lock: lock on indexed record
gap lock: lock records inside range
- eg. `select * from users where id between 10 and 20 for update;`
next-key lock: record lock + gap lock
- eg. `select * from users where age=30 for update;`
- lock records with id 21-40























