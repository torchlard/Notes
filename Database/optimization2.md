# benchmark
strategy:
- full-stack
- single-component

## measurement
### throughput
number of transactions per unit of time
measure OLTP throughput

### response time or latency
total time task requires
percentile response time
- 95th percentile 5ms = 95% time finish in 5ms

### Concurrency
open connections VS actual query running concurrently

### Scalability
maintain performance under changing workload
get twice as much work done if twice resource

## tactics
mistakes
- use subset of real data
- incorrectly distributed data (missing hot spot in real system)
- unrealistic distributed parameters
- single user scenario
- benchmark distributed application on single server
- fail to match real user behavior
- running identical queries in loop
- fail to check for error
- no warm up for cache
- use default server setting, no optimization
- benchmark too quickly

do benchmark in same configuration
need to run benchmark for meaningful amount of time
- observe system in steady state

if don't know how long to run -> run forever until satisfied



# Optimize schema, data type
1. avoid extreme, avoid using very complex query
2. avoid NULL
3. use same data type to store similar / related values
4. use integer for identifiers if you can
5. watch out variable-length strings

## speed up alter table
1. create new table, move data to new one, delete old table
=> too long time
2. swapping server around, perform ALTER on non-production server
3. build new table, rename it, drop to swap two

not all ALTER TABLE cause table rebuild
expensive way:
```sql
ALTER TABLE sakila.film 
MODIFY COLUMN rental_duration TINYINT(3) NOT NULL DEFAULT 5;
```
[any MODIFY COLUMN cause table rebuild]

fast way:
```sql
ALTER TABLE sakila.film
ALTER COLUMN rental_duration SET DEFAULT 5;
```

following no table rebuild:
1. remove AUTO_INCREMENT
2. add, remove, change ENUM/SET constants

low cost changing
1. create empty table exactly same layout
2. FLUST TABLES WITH READ LOCK -> close all table in use, prevent tables opened
3. swap .frm files
4. UNLOCK TALBES -> release lock


# index
mysql can only search efficiently on leftmost prefix of index

## B-tree
default indexing
storage engine might use different storage structure internally
- NDB cluster storage use T-tree data structure
- InnoDB use B+ tree

- MyISAM refer to indexed row by physical storage location
- InnoDB refer by primary key value
different storage engine have different type of pointers to data

### type of queries
match full value
match leftmost prefix
match column prefix
match range of values
match one part exactly, match range on another part
index-only query

### shortcoming
1. lookup not start from leftmost side 
(eg. find all people named Bill, all people born on certain date)
2. can't skip columns in index
3. can't optimize access with any column to right of first range condition
```sql
WHERE last_name="Smith" 
  AND first_name LIKE 'J%' 
  AND dob='1976-12-23'
```

## hash index
hash table, useful for exact lookup
compute hash code for each row
- stores hash code in index, store pointer to each row in hash table
if multiple value same hashcode, store row pointers in linked list

adaptive hash index:
- when notice some index value can be accessed very frequently, 
  builds hash index for them in memory on top of B-tree index

### build own hash index
still use B-tree index for lookup using key's hash values


## R tree index
must use GIS function

## full text index
find keyword in text instead of comparing values directly to values in index
- subtleties (stopword, stemming, plurals, Boolean searching)
- for MATCH AGAINST operation

## advantages 
1. reduce data to examine
2. avoid sorting and temp table
3. turn random IO to sequential IO

1 star: place relevant rows adjacent to each other
2 star: rows sorted in order query needs
3 star: contains all columns needed for query

## tips
small table: index no use 
medium to large table: index very effective
enormous table: overhead of indexing start adding up
TB scale table: index replaced by per-block metadata


## prefix index
most frequent prefix occur more often than most frequent full-length value
=> selectivity lower

- cannot use for ORDER BY / GROUP BY
- not as covering index

sometimes suffix indexes make sense


## multicolumn index
mistake: 
- index many/all of columns separately
- index columns in wrong order

index merge
- intersect indexes => need single index with all relevant columns
- union indexes => indexes very selective, scan return lots of rows to merge


## good column order
place most selective column first when no sorting or grouping to consider
- depends on selectivity (overall cardinality) , but also distribution of values

if where condition enarly examine all rows, index can't help
-> solution: chnage application code to recognize special-case user ID and group ID

## clustered index
when table has clustered index, rows stored in index's leaf page
- clustered = rows with adjacent key values stored close to each other
- only 1 clustered index per table

InnoDB cluster data by primary key 
- PK > unique non-nullable index > hidden PK
- cluster records togeether only within a page

### advantage
1. keep related data close together (eg. a few page VS own disk IO)
2. fast data access
3. queries using covering index can use PK values in leaf node

### disadv
1. if data fits in memory, clustering not much benefit
2. insert speed depend heavily on inertion order
3. update clustered index columns expensive => move each updated row to new location
4. clustered table slower for full table scan
5. secondary index larger
6. secondary index access require 2 index lookup instead of 1


## covering index
definition: index that contains all data needed to satisfy a query
- index find rows efficiently / get column's data
- mysql can only use B-tree index to cover queries

when issue query covered by index => "Using index" in Extra column in EXPLAIN

```sql
select * 
from products
where actor='sean carrey' and title like '%apollo%'

==>

select *
from products
join (
  select prod_id
  from products
  where actor='sean carrey' and title like '%apollo%'
) as t1 on (t1.prod_id = products.prod_id)

```
2nd version do subquery first using covering index

### benchmark
actor: 30,000 rows  title: 20,000
==> 5 query/s | 5   
==> most time spent reading and sending data

actor: 30,000   title: 40
==> 7 | 35    
==> 2nd filter leave small dataset, needing read only 40 full rows, instead of 30,000 in first query

actor: 50   title: 10
==> 2400 | 2000
==> set of result left after index filtering so small, more expensive than reading all data from table


many tricks are result of limited storage engine API
if mysql could send query to data, instead of pulling data into server where it evaluates query
=> huge improvement

## index condition pushdown (using index condition)
start from mysql 5.6
goal: push down where condition

without pushdown:
1. read matching index record
2. follow pointer in index to read table record

with pushdown:
1. read matching index record
2. evaluate where condition, read table record only when satisfy condition

limitation:
1. only on secondary index
2. explain type (range, ref, eq_ref, ref_or_null)


## order by limitation
cannot use index for sorting:
1. 2 different sort directions
2. order by refer to column isn't in index
3. WHERE and ORDER BY don't form leftmost prefix of index
4. query has range condition on first column, can't use rest
   - multiple equality on fist column = range
   
```sql
select count(*) from userinfo WHERE state_id=5;
```
if index (state_id, ...), may lower query speed


## locking
InnoDB locks rows when access it ONLY IF can filter ouit undesired rows at storage engine level
- can unlock rows after server filters them out
  
if no index for query, mysql do full table scan => lock every rows in table
"Using where": mysql server applying WHERE filter after storage engine returns the rows

### select ... for update
add exclusive lock on rows accessed
other thread cannot access these rows unless COMMITTED

InnoDB can place shared lock on secondary indexes, exclusive lock require access to PK

SELECT FOR UPDATE much slower than LOCK IN SHARE MODE


## case study
situation: user's country, state/region, city, sex, age, eye color ...

create many different combination of columns prefixed with (sex, country)
trick: add "AND sex in ('m', 'f')"

general principle:
- don't just consider index needed for existing query, but consider optimizing queries too
- if column not very selective, not used a lot => skip
- keep column with range search at end

```sql
where eye_color in ('brown','blue','hazel')
  and hair_color in ('black', 'red', 'blonde', 'brown')
  and sex in ('m', 'f')
```
optimizer cover 4x3x2 = 24 combinations


## avoid multiple range condition
both `actor_id > 45` and `actor_id in (1,4,99)` are type = range in EXPLAIN
but they perform differently


## index and table maintenance
### finding and repairing table corruption
corrupted index => return incorrect result
run `CHECK TABLE` check
fix table `REPAIR TABLE`

### maintaining accurate index statistics
record_in_range(): return num of records in that range
info()
`ANALYZE TABLE` regenerate statistics

### reduce fragmentation
B tree index can become fragmented => reduce performance
leaf pages still perform better if physically sequential and tightly packed

row fragmentation:
row into pieces stored in multiple place

intra-row fragmentation:
logically sequential pages/rows not stored sequentially on disk
affect full table scan, clustered index range scan

free space fragmentation:
lot of empty space in data pages => wasteful



# Optimize query
## ways to apply WHERE
1. apply condition to index lookup -> filter (storage engine)
2. use covering index to avoid row access -> filter (server layer)
3. get rows from table, need to read rows -> filter (server layer)

mysql not tell you how many rows accessed used to build result set
=> only tell total number of rows accessed
=> many rows could be eliminated by WHERE clause

## restructure query
1. rewrite into equivalent form
2. change result set, change application code

### Complex query VS many queries
- traditionally favour complex and fewer query, because of high networking cost and overhead
mysql handle network well
- running multiple queries not bad thing

### chopping up query
original
```sql
DELETE FROM messages WHERE created < DATE_SUB(NOW(), INTERVAL 3 MONTH);
```

deleting 10,000 rows a time
add sleep time between DELETE to spread load
```
rows_affected = 0
do {
  row_affected = do_query(
    "DELETE FROM messages WHERE created < DATE_SUB(NOW(), INTERVAL 3 MONTH) LIMIT 10000"
  ) 
} while rows_affected > 0
```

### join decomposition
decompose join by running multiple single-table queries, perform join in application

adv:
1. caching more efficient
if only one of tables changes frequently, decomposing join can reduce number of cache invalidation
2. reduce lock contention
3. easier to scale database by placing tables on different servers
4. using IN() instead of join let mysql sort row ID and get rows more optimally
5. reduce redundant row access
retrieve each row only once, reduce network traffic and memory usage
6. manually implementing hash join instead of nested loops join


## MySQL client/server protocol
protocol half-duplex => at any time either sending or receiving message, but not both
(max_allowed_packet is important for large query)
- once client send query, no control anymore, only wait for result

when client fetch rows from server, actually server pushing rows 

library connect to mysql, 2 ways handle
1. fetch whole result set and buffer in memory (default)
2. fetch each row as you need it

until all rows fetched, MySQL server not release locks, other resources requried by query
- query in "Sending data" state

most client library make as if fetching from server
- actually fetch from buffer in library's memory

```php
$link = mysql_connect(...);
$result = mysql_query('SELECT * FROM huge_table', $link);
while ($row = mysql_fetch_array($result) ){
  // do sth
}
```
code fetch entrie result into buffer with `mysql_query()`

### query state
each mysql connection / thread has state at any time

Sleep: 
thread wiating for new query from client

Query: 
thread either executing query / sending result back to client

Locked: 
thread waiting for table lock to be granted at server level

Analyzing and statistics: 
thread checking storage engine statistics, optimize query\

Copy to tmp table: 
thread processing query, copying result to tmp table (probably GROUP BY)

Sorting result:
thread sorting result set

Sending data:
1. thread sending data between stages of query
2. generating result set
3. returning result set to client

### query cache
before parsing query, mysql check it for query cache
case-sensitive hash lookup, if query differ, won't match


## optimization process
### parser
build parse tree
- validate query token, proper order

check resulting parse tree for additional semantics
- check tables, columns exist
- resolve names, aliases
- check privileges

### optimizer
cost-based optimizer
- try to predict cost of various execution plans => choose least expensive

calc cost based on
1. number of pages per table / index
2. cardinality of index
3. length of rows and keys
4. key distribution

may not always choose best plan
1. statistics could be wrong (InnnoDB not maintain accurate statistics)
2. cost metric not exactly same as cost of running query
(eg. sequential read make disk IO faster, page already cached in memory)
3. MySQL goal not make query fast, but minimize cost
4. not always do cost-based optimization
maybe just follow rules (eg. MATCH() -> FULLTEXT)
5. not consider cost of stored function or user-defined functions
6. can't estimate every possible execution plan

static optimization:
- inspecting parse tree
- eg. transform WHERE clause into equivalent form by applying algebraic rule
- value independent 
- compile-time optimization

dynamic optimization:
- based on context, eg. which value in WHERE
- runtime optimization

MySQL can do static optimization once, but re-evaluate dynamic optimization everytime execute query


#### type of optimization
1. Reordering joins
2. OUITER JOIN -> INNER JOIN
some factors like WHERE can cuase OUTER JOIN = INNER JOIN
mysql recognize and rewrite join
3. applying algebraic equivalence rules
simplify, canonicalize expression
eg. (5=5 AND a>5) === a>5
4. COUNT(), MIN(), MAX()
index, column nullability help optimize away expression
eg. only read first row in index to find min value

5. evaluating and reducing const expression
6. covering index
7. subquery optimization
convert to more efficient alternative forms
8. early termination
LIMIT, impossible condition
eg. find movies without any actors
- as soon as finds 1 actor, stop processing current film
9. Equality propagation


## join strategy
mysql consider every query a JOIN
eg. UNION
mysql execute UNION as series of single queries => store in temp table
treat every join as nested-loop join

FULL OUTER JOIN can't be executed with nested loop & backtracking when no matching row
=> not support FULL OUTER JOIN

mysql not generate bytecode to execute query (many other DB do)


## Semi-join materialization 
subquery materialization

```sql
select * from Country
where Country.code IN (
  select City.Country
  from City
  where City.Popultion > 7000000
) 
and Country.continent = 'Europe'
```

### materialization scan
- full scan on materialized table
- from materialized table to countries in Europe

explain select * from Country where Country.code IN (select City.Country from City where  City.Population > 7*1000*1000);
+----+--------------+-------------+--------+--------------------+------------+---------+--------------------+------+-----------------------+
| id | select_type  | table       | type   | possible_keys      | key        | key_len | ref                | rows | Extra                 |
+----+--------------+-------------+--------+--------------------+------------+---------+--------------------+------+-----------------------+
|  1 | PRIMARY      | <subquery2> | ALL    | distinct_key       | NULL       | NULL    | NULL               |   15 |                       |
|  1 | PRIMARY      | Country     | eq_ref | PRIMARY            | PRIMARY    | 3       | world.City.Country |    1 |                       |
|  2 | MATERIALIZED | City        | range  | Population,Country | Population | 4       | NULL               |   15 | Using index condition |
+----+--------------+-------------+--------+--------------------+------------+---------+--------------------+------+-----------------------+

MySQL [world]> explain select * from Country where Country.code IN (select City.Country from City where  City.Population > 7*1000*1000);
+----+--------------------+---------+-------+--------------------+------------+---------+------+------+------------------------------------+
| id | select_type        | table   | type  | possible_keys      | key        | key_len | ref  | rows | Extra                              |
+----+--------------------+---------+-------+--------------------+------------+---------+------+------+------------------------------------+
|  1 | PRIMARY            | Country | ALL   | NULL               | NULL       | NULL    | NULL |  239 | Using where                        |
|  2 | DEPENDENT SUBQUERY | City    | range | Population,Country | Population | 4       | NULL |   15 | Using index condition; Using where |
+----+--------------------+---------+-------+--------------------+------------+---------+------+------+------------------------------------+


### materialization lookup
- lookup primary key
- from countries in Europe to materialized table

explain select * from Country where Country.code IN (select City.Country from City where  City.Population > 1*1000*1000) ;
+----+--------------+-------------+--------+--------------------+--------------+---------+------+------+-----------------------+
| id | select_type  | table       | type   | possible_keys      | key          | key_len | ref  | rows | Extra                 |
+----+--------------+-------------+--------+--------------------+--------------+---------+------+------+-----------------------+
|  1 | PRIMARY      | Country     | ALL    | PRIMARY            | NULL         | NULL    | NULL |  239 |                       |
|  1 | PRIMARY      | <subquery2> | eq_ref | distinct_key       | distinct_key | 3       | func |    1 |                       |
|  2 | MATERIALIZED | City        | range  | Population,Country | Population   | 4       | NULL |  238 | Using index condition |
+----+--------------+-------------+--------+--------------------+--------------+---------+------+------+-----------------------+
COST = 239 + 238 = 477 reads, 238 tmp table writes


MySQL [world]> explain select * from Country where Country.code IN (select City.Country from City where  City.Population > 1*1000*1000) ;
+----+--------------------+---------+----------------+--------------------+---------+---------+------+------+-------------+
| id | select_type        | table   | type           | possible_keys      | key     | key_len | ref  | rows | Extra       |
+----+--------------------+---------+----------------+--------------------+---------+---------+------+------+-------------+
|  1 | PRIMARY            | Country | ALL            | NULL               | NULL    | NULL    | NULL |  239 | Using where |
|  2 | DEPENDENT SUBQUERY | City    | index_subquery | Population,Country | Country | 3       | func |   18 | Using where |
+----+--------------------+---------+----------------+--------------------+---------+---------+------+------+-------------+
COST = 18*239 = 4302

read 18 rows using index on City.Country
- full scan on Country table


### subquery with grouping

select * from City 
where City.Population in (select max(City.Population) from City, Country 
                          where City.Country=Country.Code 
                          group by Continent)
+------+--------------+-------------+------+---------------+------------+---------+----------------------------------+------+-----------------+
| id   | select_type  | table       | type | possible_keys | key        | key_len | ref                              | rows | Extra           |
+------+--------------+-------------+------+---------------+------------+---------+----------------------------------+------+-----------------+
|    1 | PRIMARY      | <subquery2> | ALL  | distinct_key  | NULL       | NULL    | NULL                             |  239 |                 |
|    1 | PRIMARY      | City        | ref  | Population    | Population | 4       | <subquery2>.max(City.Population) |    1 |                 |
|    2 | MATERIALIZED | Country     | ALL  | PRIMARY       | NULL       | NULL    | NULL                             |  239 | Using temporary |
|    2 | MATERIALIZED | City        | ref  | Country       | Country    | 3       | world.Country.Code               |   18 |                 |
+------+--------------+-------------+------+---------------+------------+---------+----------------------------------+------+-----------------+

















