# data files
contain all database data
table, index

# control file
metadata specifying physical structure of database
eg. db name, names, locations of db files

# online redo log
>= 2 redo log
record all changes made to data


# logical storage structure
## data block
finest level, data stored in data block
1 data block = specific num of bytes on disk

## extents
n logically continguoug data block
store specific type of info

## segments
allocate for user object (table / index)
undo data, temporary data

## tablespace
consist at least 1 data file


# memory structure
## system global area
group of shared memory structure contain data and control information for 1 db instance
- db buffer cache, shared SQL area

## program global area
memory region that contains data and control info for server / background process














