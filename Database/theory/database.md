# indexing
## why need indexing
1. by creating unique index, ensure each row unique
2. faster search
3. avoid sorting and temp table
4. random IO -> sequential IO
5. enhance connection among tables

## why not all table 
1. cost to mantain index when add,delete,modify
2. indexing occupy space
3. take time create and maintain indexing

## how index speedup search
unordered data -> ordered data

## things to notice in indexing
1. avoid apply function to where clause
2. use domain unrelated auto-increment key as primary key, not domain field
3. NOT NULL to indexed key
4. deleted unused index in long time
5. use index when `limit offset`is slow

## mysql use which 2 data structure
1. Hash index
- if query is single record, recommand hash indexing, fastest
2. B+ tree
- rest of cases

## covering index
if index cover the value of field we want, then it's covering index
=> no need to search again

In InnoDB, if not primary key index, leaf return primary key value
=> need to search by primary key again









