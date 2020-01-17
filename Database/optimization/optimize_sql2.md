# query optimize
1. index predicate in JOIN, WHERE, ORDER BY, GROUP BY
2. avoid functions in predicate
3. avoid wildcard(%) at beginning of predicate
4. avoid unnecessary columns in select
5. use INNER JOIN instead of outer join
6. UNION ALL instead of UNION
7. avoid DISTINCT, UNION which cause sorting
8. performance impact on ORDER BY

# 
push predicate into OUTER JOIN clause if possible


# outer join
LEFT OUTER JOIN: 
  predicate of right table WHERE -> ON
  left table predicate stay at WHERE
RIGHT OUTER JOIN: predicate for right table WHERE -> ON

# splitting queries
split queries joining many table -> myltiple queries
- minimize num of views used in join

# query optimize 2
1. avoid using !=, <> in `where`
2. avoid full table scan
3. avoid is null checking in where
4. avoid or in where
5. `select id from t where name like '%abc%'`
6. may use between instead of `in`
7. avoid calculation in where (left/right side of =)
8. avoid temp table if possible
   - if use temp table, then truncate table -> drop table
9. avoid cursor if data > 10,000 rows
  - set over cursor
  - for small amount of data, use FAST_FORWARD
10. avoid sending huge amount of data back to client
11. avoid huge transaction, enhance concurrency

# reason for slow query
1. no index / index not used
2. IO throughput small
3. no computed column -> query not optimized
4. memory not enough
5. netowrk slow
6. data to be query too massive
7. lock / deadlock
8. sp_lock, sp_who => check user activity
9. return unnecessary row/column
10. bad query statement, no optimization

# ways deal with slow query
1. put data, log, index into different IO device
2. vertical, horizontal partition
3. upgrade hardware
4. optimize indexing
5. speed up network
6. increase memory
7. CPU number
8. if use like, simple index is not enough
9. separate OLTP, OLAP
10. 



# explain
```sql
explain select * from test1 where id=1;
```
EXPLAIN work with SELECT, DELETE, INSERT, REPLACE, UPDATE
join: nested-loop join

EXPLAIN PARTITIONS, EXPLAIN EXTENDED for backward compatibility

## id
SELECT identifier

## select type
simple: simple select
primary: outermost select
union
dependent union
subquery
derived: derived table
materialized: materialized subquery
uncacheable subquery
uncacheable union: second/later 

## table
which table
`<union M,N>`: union of rows with id value of M,N
`<derived N>`: row with id=N (eg. from subquery in FROM)
`<subquery N>`: materialized subquery row id=N

## partitions


## possible_keys
possible indexing applied to table
  - if empty => no possible index
  
## key
INDICATE KEY
- NULL => not using index
- FORCE INDEX|USE INDEX => force use index
- IGNORE INDEX => force ignore index

## key_len
index length, length as short as possible without loss of accuracy

## ref
columns compared to index
- if possible => const

## rows 
num of rows believe need to examine

## filtered
estimated percentage of rows filtered by table condition

## extra
additional info about how to resolve query
- to make query fast -> look for Using filesort | Using temporary

const row not found
- for query such as SELECT ... FROM tbl_name

deleting all rows: remove all rows in fast way

distinct: stop searching more rows after found first matching

FirstMatch: semi-join firstmatch join shortcutting

Full scan on NULL key: 
- subquery optimization as fallback strategy, when optimizer cannot use index-lookup 

Impossible HAVING|WHERE: HAVING|WHERE clause always false -> cannot select any row
Impossible WHERE noticed after reading const tables: read all const(+system) tables

LooseScan(m..n): semi-join loosescan
no matching min/max row; no matching row in cosnt table; no matching after partition running
no table used: no from clause
not exists: 
```sql
select * from t1 left join t2 on t1.id=t2.id
  where t2.id is null;
```

plan isn't ready yet
range checked for eachrecord: found no good index to use

scanned N databases
select tables optimized away


## explain join type
system: only 1 row
join type (from best to worst)
- const > eq_reg > ref > range > index > ALL
  

const: at most 1 matching row
- `select * from tb1 where key=1;`

eq_ref: 1 row read from table foreach combination of row from previous tables
- best possible join type
- indexed column compared using `=`

ref: all rows with matching index value, foreach combination of rows from prev table
```sql
select * from ref_table, other_table
  where ref_table.key1 = other_table.col
  and ref_table.key2 = 1;
```      

fulltext: join by FULLTEXT

ref or null: join type is like ref, but contain NULL

index_merge: index merge optimization used

unique_subquery: index lookup function replace subquery completely for better efficiency

index_subquery: ~ unique_subquery
`value in (select key_col from single_table where some_expr)`

range: rows in given range retrieved, using index to select rows

index: same as ALL, except index tree scanned

all: full table scan, foreach prev table row combination
- very bad


# example
```sql
EXPLAIN SELECT tt.TicketNumber, tt.TimeIn,
               tt.ProjectReference, tt.EstimatedShipDate,
               tt.ActualShipDate, tt.ClientID,
               tt.ServiceCodes, tt.RepetitiveID,
               tt.CurrentProcess, tt.CurrentDPPerson,
               tt.RecordVolume, tt.DPPrinted, et.COUNTRY,
               et_1.COUNTRY, do.CUSTNAME
        FROM tt, et, et AS et_1, do
        WHERE tt.SubmitTime IS NULL
          AND tt.ActualPC = et.EMPLOYID
          AND tt.AssignedPC = et_1.EMPLOYID
          AND tt.ClientID = do.CUSTNMBR;
```
## version 1
```
table type possible_keys key  key_len ref  rows  Extra
et    ALL  PRIMARY       NULL NULL    NULL 74
do    ALL  PRIMARY       NULL NULL    NULL 2135
et_1  ALL  PRIMARY       NULL NULL    NULL 74
tt    ALL  AssignedPC,   NULL NULL    NULL 3872
           ClientID,
           ActualPC
      Range checked for each record (index map: 0x23)
```
examine rows = 74 x 2135 x 74 x 3872 = 45,268,558,720 rows

varchar, char considered same if declared as same size
tt.ActualPC `char(10)`, et.EMPLOYID `char(15)` => length mismatch

Solution: tt.ActualPC varchar(10) -> varchar(15)

## version 2 
```
table type   possible_keys key     key_len ref         rows    Extra
et    eq_ref PRIMARY       PRIMARY 15      tt.ActualPC 1
do    ALL    PRIMARY       NULL    NULL    NULL        2135
      Range checked for each record (index map: 0x1)
et_1  ALL    PRIMARY       NULL    NULL    NULL        74
      Range checked for each record (index map: 0x1)
tt    ALL    AssignedPC,   NULL    NULL    NULL        3872    Using
             ClientID,                                         where
             ActualPC
```
eliminate column length misatch
AssignedPC, ClientID: char(10) -> char(15)

## version 3
```
table type   possible_keys key      key_len ref           rows Extra
et    ALL    PRIMARY       NULL     NULL    NULL          74
tt    ref    AssignedPC,   ActualPC 15      et.EMPLOYID   52   Using
             ClientID,                                         where
             ActualPC
et_1  eq_ref PRIMARY       PRIMARY  15      tt.AssignedPC 1
do    eq_ref PRIMARY       PRIMARY  15      tt.ClientID   1
```

analyze table tt


  - if Using temporary / Using filesort => mysql cannot use index, slow query
  - distinct: found matching row
  - not exists: optimize LEFT JOIN
  - Range checked for each Record: slowest
  - Using filesort: use extra step to discover how to sort rows
    + by connection type, stored 
  - Using index: 

## filesort
extra pass to find out how to retrieve rows in sorted order
- going throught all rows by join type, sorting sort key and pointer to rows
- for all rows match where clause

to avoid filesort, can use composite index
`alter table testing add index room_number_id(room_number,id);`

kind external sort

### external sort
large file sort: cannot put all data into memory at once
- sort every partition
- multiple merge sort for all subfiles


# derived table 
avoid derived table, sometimes even temp table faster
use view table to replace subquery in from



# group by optimization
1. apply grouping operation together with all range predicate
2. first run range scan, then group resulting tuple
  
## loose index scan
index used to directly get grouping columns
- access fraction of keys in index

## tight index scan



# order by
to avoid filesort
1. use index to satisfy filesort
2. 

use index (key1, key2)
```sql
select pk, key1, key2 from t1 order by key1, key2;

select * from t1 
  where key1 = const
  order by key2;
```

cannot use index:
```sql
select * from t1 order by key1, key2;
select * from t1 where key2=const order by key1, key3;

-- query use order by with expression that include teerms other than index column name
select * from t1 order by abs(key1);


```

cannot use index:
- query join many tables, columns in ORDER BY not all from 1st table
- index only on prefix of column (eg. only first 10 B of char(20) indexed)
- index not store rows in order



<!-- ================= -->

# testing
reset query cache;


# example
## join example

```sql
CREATE TABLE joye_rank (
  rank_id int(10) NOT NULL AUTO_INCREMENT,
  rank_personId int(10) NOT NULL, '玩家上传分数使用的人物ID'
  rank_score int(10) NOT NULL COMMENT '最高分',
  rank_uploaduser varchar(50) NOT NULL COMMENT '上传用户',
  rank_uploadtime datetime NOT NULL COMMENT '上传时间',
  rank_regtime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (rank_id),
  UNIQUE KEY idx_uploaduser (rank_uploaduser) USING BTREE,
  KEY idx_score_time (rank_score,rank_uploadtime) USING BTREE,
  KEY idx_personid (rank_personId) USING BTREE
)

CREATE TABLE joye_person(
  person_id int(10) NOT NULL AUTO_INCREMENT,
  person_name varchar(10) NOT NULL COMMENT '人物名称',
  person_sort int(10) NOT NULL COMMENT '排列序号',
  person_regtime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (person_id),
)

SELECT rank.rank_score, rank.rank_uploaduser 
FROM joye_rank AS rank
INNER JOIN joye_person as person ON rank.rank_personId=person_id 
WHERE rank_score > 0
ORDER BY rank.rank_score DESC, rank_uploadtime DESC LIMIT 100;

-- ===>
select person_id, person_name, 
  rank.rank_person, rank.rand_score, rank.rank_uploaduser
from (
  select rank.rank_personId, rank.rank_score, rank.rank_uploaduser
  from joye_rank as rank
  where rank_score > 0
  order by rank.rank_score DESC, rank_uploadtime desc limit 100
) tmp
inner join joye_pperson as person on tmp.personId = person.person_id
```
rank: 10000 row
person: 3 row



```sql
create view view_rank as 
select rank.rank_personId, rank.rank_score, rank.rank_uploaduser
from joye_rank as rank
where rank_score > 0
order by rank_score desc, rank_uploadtime desc limit 100;

select 
  person_id, person_name, 
  rank.rank_person, rank.rand_score, rank.rank_uploaduser
from view_rank as rank
inner join joye_person as person on tmp.personId = person.person_id

```







