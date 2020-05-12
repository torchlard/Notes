# UUID
128-bit number, eg. 83fda883-86d9-4913-9729-91f20973fa52

## version
1/2: time based
3: purely random

## storage
store as b-tree for primary key (clustered index)

if table has primary key and 5 secondary index
PK value store 6 times for each row

good performance: use storage with low latency and high endurance
secondary index use primary key values as pointers

70% storage for these values

## performance
integer compared 8 byte at a time
UUID compared char per char


2 byte for UUID


char(22), binary(16)

UNHEX("4D617269614442")









