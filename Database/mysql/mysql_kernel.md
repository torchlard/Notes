# definition
1. database: collection of filesystem and other file type
2. instance: backend threads + shared memory

we cannot directly control database, but throught db instance to control db file process
- mysqld: database daemon
- mysql_safe: check and init mysqld, when mysqld has error, mysql_safe check it and restart if appropriate

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

# isolation
## MVCC (multi version concurrency control)
read uncommited
- since no lock on query -> dirty read
read commited
- no lock between records, allow inserted near locked records -> non-repeatable read
repeated read
- multiple read on same data range -> return first query result (phantom read)
serializable
- InnoDB implicitly add shared lock on all query, solve phantom read problem

default repeated read, but next-key can solve phantom read to some extend























