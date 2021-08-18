# indexing
most of time use B+ tree to build index
index: 
- clustered index: store all information of the row
- secondary index: bookmark for searching record

## non-clustered index
logical ordering of data specified by index
index tree contains index keys in sorted order
- leaf level of index containing pointer to record
- physical order of rows not same as index order
- indexed columns typically non-PK columns


## clustered index 
only 1 clustered index can be created on given table
- alter data block in certain order to match index, row data sorted

B+ tree order by primary key, store data in leaves
- actual physical storage way

## secondary index
secondary index only help fasten search
there are multiple secondary indexs for a table

if search by secondary index
-> then first search B+ tree of secondary index
-> get primary indexes
-> search by primary index B+ tree again to get full records

## covering index
special case where index itself contains required data field
can answer required data

|clustered index|non-clustered index|
|-|-|


# index type
## bitmap
store bulk of data as bit array
designed for cases where value repeat very frequently

## dense index
file with pairs of keys and pointers for every record in data file

## sparse index
file with pairs of key and pointer for every block in data file

## reverse index
useful for indexing data eg. seq no

## primary index
contains key fields of table, pointer to non-key fields of table
auto created

## secondary index
index fields neither ordering fields nor key fields


# index implementation
## balance tree

## B+ tree

## hashes


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























