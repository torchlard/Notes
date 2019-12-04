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
