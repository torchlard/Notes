# hierarchy
database > tablespace > segment > extents > data_block

# logical storage structure
## data block
finest level, data stored in data block
1 data block = specific num of bytes on disk

## extents
many logically continguous data block
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


# oracle managed file
internally use standard file system interface to create and delete files

## data files
contain all database data
table, index

can assoicate with only 1 tablespace and 1 database
when datafile first created, allocated disk space formatted without any user data

## control file
metadata specifying physical structure of database
- db name
- timestamp db creation
- tablespace info
- log history
- backup datafile and redo log finfo
- checkpoint, current log seq number


## online redo log
>= 2 redo log
record all changes made to data


# tablespace
# enlarge database
add datafile to tablespace
`alter tablespace system add datafile 'DATA3.ORA'`

add new tablespace
`create tablespace users datafile 'DATA3.ORA'`

dynamically siziong datafiles
`alter database datafile 'DATA3.ORA' autoextend on next 20M maxsize 1000M`












