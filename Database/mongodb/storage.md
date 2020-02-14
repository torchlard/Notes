# database and extents
mongodb will preallocate space for collections
adv:
1. less disk space fragmentation
2. reduce allocation when write

disadv: don't know how much space perfect
default db.0=64mb, db.1=128mb, db.2=256mb ...

each db file has many extent, index and data extents place separately
if not enough space, place in new data fiel

# size
## data size
include all documents + padding (preallocation space)
when remove document, datasize reduce; update won't change datasize

when insert data > padding size, find new region to insert data
mongodb use mmap to get data into memory
- document fragment => memory fragment

## storage size
include all doc + padding + deleted space
when delete document, storage size not decrease
if not enough space, preallocate more

## file size
size of whole database, including data & index
filesize decrease only when databse dropped

## serious fragmentation problem
(data size << storage size)  OR (storage size + index size << file size)

















