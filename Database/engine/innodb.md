# definition
1. database: collection of filesystem and other file type
2. instance: backend threads + shared memory

we cannot directly control database, but throught db instance to control db file process
- mysqld: database daemon
- mysql_safe: check and init mysqld, when mysqld has error, mysql_safe check it and restart if appropriate

# benefits
1. crash recovery
2. maintains own buffer pool
3. setup foreign key that enforce referential integrity, when udpate/delete related data in other tables auto update
4. checksum again data corruption
5. insert, update, delete auto optimized by change buffering
  - concurrent read & write to same table, caches changed data to streamline disk IO
6. adaptive hash index when same row accessed over and over
7. compress table and associated indexes
8. truncating file-per-table tablespace very fast, free up disk space
9. more efficient for BLOB and long text with `dynamic` row format
10. INFORMATION_SCHEMA to monitor internal working in storage engine
11. can freely mix InnoDB table with other mysql storage engine, even within same statement

## best practice
1. primary key using most frequently queried column
2. fast join, define foreign keys and declare join columns with same data type
3. disable autocommit
4. not using LOCK TABLES. exclusive write acess: select ... for update
5. enable `innodb_file_per_table` using general tablespace
6. can compress table without sacrificing read/write capability


# architecture
client 
-> connection/thread handling 
-> parser, query cache [storage process, trigger, view]
-> optimizer 
-> storage engine [extract, store data] {InnoDB}

# storage engine
all data put into tablespace (highest level)
- tablespace > segment > extent > page > row
default page size=16KB, page count=64, extent size=1 MB

table definition -> .frm file
table index -> .ibd file

page as smallest management unit
data stored in rows, every 16KB page store 2-200 rows

## InnoDB function
1. transactional
2. data storage can share table space / separate by config
3. primary key search efficiency high
4. build hash when read from disk, insert data to cache first
5. hot backup 
6. secure recovery
7. row level lock
8. foreign key


#### transmission
can change `max_allowed_packet` variable in both client and server to transfer larger file
- blob/text suitable store media file

## row file format
```
Barracuda -> compressed
          -> dynamic
          -> antelope -> compact
                      -> redundant
```
compact: record length of each row
redundant: record offset of each row
- compact save 20% space

## row overflow data
when storing very long varchar / blob
- compact/redundant: record first 768 bytes in page, and pointer to blob page
- compressed/dynamic: save pointer with 20 byte to overflow page (sotre all data)

## InnoDB page structure
fil header, fil trailer: page header
infimum: smallest value ( < any key), supermum: largest value => virtual records for placeholder
page header, page directory: page status
user record: place where actual data
free space

## insert and search
data search empty space from left to right to insert, not follow key order
use B+ tree search address of page 
-> load whole page into memory 
-> use sparse index, n_owned, next_record in page directory to get actual data

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










