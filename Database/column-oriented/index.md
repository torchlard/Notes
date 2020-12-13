# index
index = mapping row ids to columns that are being indexed in sorted order

columnar db store data as key-value pair in serialized manner

column value = key, rowid as value


# SQL server column store
row-oriented storage organization: heaps, B-tree

column store indexes are updatable


## structure
```
(columnar storage)
row group 1 -> encode,compress -> directory{blobs}
row group 2 -> encode,compress -> directory{blobs}
row group 3 -> encode,compress -> directory{blobs}
```

column store index & column segment not sorted

directory keep track of location of segment and dictionaries
  - all segment easily located
  - metadata about each segment
    - num of rows
    - size
    - how data encoded
    - min, max values

## caching and IO
column segments and dictionaries brought into memory as needed
not stored in buffer pool, but in new cache for large object
  - each obj stored contiguously on adjacent memmory pages
  - no "page break" worry about

blob span multiple disk pages



# read ahead
bring data pages into buffer cache before data is requested by relational engine

## sequential read ahead read
read pages in specific order 
heaps always scanned in allocation order 

## random prefetching
random IO



