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


### execution
MySQL always begins with 1 table and finds matching rows in next table
=> left-deep tree

can join in different orders to get same result
more table, factorial growth of possibility => 10 tables = 3,628,800 different ways
if too much table, full analyse -> greedy search
some operation (eg. LEFT JOIN) cannot be reordered => restrict possibility

## sort optimization
call both sort (in memory / on disk) filesort
if values sorted fit into sort buffer, mysql perform quicksort in memory
if not enough memory,  sort values in chunk

### filesort algorithm
1. two passes (old)
read row pointers and order by columns -> sort -> scan sorted list, reread rows for output
expensive, read rows twice
2. single pass (new)
read all columns needed -> sort -> scan sorted list, output specified columns
use a lot more space (hold all desired columns)

ORDER BY clause refer only to columns from first table in join order 
=> filesort this table, proceed with join
all other cases 
=> must store results in tmp table


## Query execution engine
operations in plan use methods implemented by storage negine interface (handler API)
- only need dozen of operations to execute most queries

## returning results to client
even query empty result, return information about query (eg. num of rows affected)
server generate and sends results incrementally
- as soon as mysql process last table, gen 1 row successfully => send that row to client
1. server avoid holding row in memory
2. client get results as soon as possible


## optimizer limitation
worst offering: IN() subquery in WHERE

original
```sql
SELECT * FROM sakila.film
WHERE file_id IN (
  select film_id from sakila.film_actor WHERE actor_id = 1);
```

optimially should transform to sth like
```sql
SELECT * FROM sakila.film
WHERE film_id IN (1,23,23, ...)
```

reality: mysql want push correlation into subquery from outer table
dependent subquery, can't be executed first
```sql
SELECT * FROM sakila.film
WHERE EXISTS (
  SELECT * FROM sakila.film_actor WHERE actor_id = 1
  AND film_actor.film_id = film.film_id );
```
=> full table scan on film table, execute subquery for each row it finds

### correlated subquery limitation
```sql
select film.film_id from sakila.film
  inner join sakila.film_actor USING(film_id);

-- ==optimized as==>  
select film_id from sakila.film
where exists (
  select * from sakila.film_actor
  where film.film_id = film_actor.film_id
)
```

### union limitation
mysql sometime can't push down condition from outside of UNION to inside

```sql
(
  select first_name, last_name
  from sakila.actor
)
UNION ALL
(
  select first_name, last_name
  from sakila.customer
)
order by last_name
limit 20

-- == optimize limit ==>
(
  select first_name, last_name
  from sakila.actor
  order by last_name
  limit 20
)
UNION ALL
(
  select first_name, last_name
  from sakila.customer
  order by last_name
  limit 20
)
limit 20
```

### equality propagation
huge IN() list that equal to same column on other table
=> copy list to all related tables

### parallel execution
not possible in mysql

### hash join
mysql can't do true hash join (everything nested-loop join)
mariadb support hash join

### loose index scans
scan non-contiguous ranges of index
- mysql require defined start and end point

scan entrie range of rows within these end points

cannot optimize: range query on 1st column, equality on 2nd column
loose index scan possible in max,min values in grouped query

### min(), max()
```sql
select min(actor_id) from sakila.actor where first_name = 'penelope';
```
primary key is strictly ascending, can stop after matching first row
=> mysql can't optimize this
- workaround: add `limit 1` at the end

### select and update on same table
```sql
update tb1 as outer_tb1
set cnt = (
  select count(*) 
  from tb1 as inner_tb1
  where inner_tb1.type = outer_tb1.type
)

==>

update tb1
  inner join (
    select type, count(*) as cnt
    from tb1
    group by type
  ) as der using(type)
set tb1.cnt = der.cnt
```
use derived table to overcome limitation
- materialized subquery result as temp table
- select subquery opens and closes table before outer UPDATE opens table

## query optimizer hint
HIGH_PRIORITY, LOW_PRIORITY
- prioritize statement relative to other statements
- hints work on table-level lock => not needed with fine-grained lock
  
DELAYED
- for INSERT, REPLACE
- place inserted rows into buffer, insert in bulk when table is free
  
STRAIGHT_JOIN
- use after/in SELECT, any statement between 2 joined tables
- force table joined in specified order
  
SQL_SMALL_RESULT
- SELECT
- result set will be small, can put into indexed temp table, avoid sorting for grouping
  
SQL_BIG_RESULT
- result set will be large, better to use temp table on disk with sorting

SQL_BUFFER_REUSLT
- put result into temp table, release table lock as soon as possible
- use server's memory instead of client's

SQL_CACHE, SQL_NO_CACHE
- query is/not candidate for cacing in query cache

SQL_CALC_FOUND_ROWS
- tell mysql to calc full result set when there's LIMIT clause
- can get total number of rows via FOUND_ROWS()

FOR UPDATE, LOCK IN SHARE MODE
- place locks on matched rows
- disable some optimization (eg. covering index)

USE INDEX, IGNORE INDEX, FORCE INDEX

### configuration variables
optimizer_search_depth
- how exhaustively examine partial plans

optimizer_prune_level
- skip certain plans based on num of rows examined

optimizer_switch
- contains set of feature flags 
- eg. index merge


## version dependent optimization
(fast, accurate, simple) pick 2

### count()
works in 2 ways
1. count values: how many tiems that expression has a value
2. count rows
always use COUNT(*) to count rows
use approximate count if you don't need accuracy

### optimize JOIN
1. if join from table B to A, no need to index column on table B, only need A
2. ensure GROUP BY / ORDER BY only refer to single table

### optimize subquery
usually prefer join where possible (may not true in future)

### optimize group by, distinct
when can't use index => temp table / filesort
more efficient to group by lookup table's identifier (not vlaue)
```sql
select first_name, last_name, count(*)
from film_actor
  inner join actor using(actor_id)
group by first_name, last_name;

-- ==more efficient==>
select first_name, last_name, count(*)
from film_actor
  inner join actor using(actor_id)
group by actor_id;

-- === another way ==>
select min(first_name), max(last_name) ...
```
use fact that actor's first_name, last_name dependent on actor_id

bad idea to select non-grouped columns in grouped query
- result non-deterministic
mysql auto orders grouped queries by column in GORUP BY
- unless specify ORDER BY explicityly
- if not care order => `ORDER BY NULL`
- add optional DESC/ASC after GROUP BY to order results

### optimize limit
deferred join
```sql
select film_id, descrip
from film
order by title limit 50,5;
-- ==>
select film_id, descrip
from film
  inner join (
    select film_id from film
    order by title limit 50,5
  ) as lim using(film_id);
```

### optimize SQL_CALC_FOUND_ROWS
add SQL_CALC_FOUND_ROWS hint to query with limit
better design
1. add "next" link, assume 20 results per page => limit 21 rows, display only 20
- if 21st exists, then next page
2. fetch and cache many more rows than you need (eg. 1000)
- retrieve them from cache for successive pages
3. use separate count(*) if above not works

### optimize UNION
always execute UNION by creating temp table, fill with UNION results
have to manually "pushing down" WHERE, LIMIT, ORDER BY conditions

always use UNION ALL, unless remove duplicate rows
- if omit ALL, mysql add distinct option to temp table => examine full row

### use user-defined variables
mixture of procedural and relational logic
purely relational query treat everything as unordered set that manipulate all at once

user-defined variables = temporary container 
persist as long as connection to server lives

#### disadv
- disable query cache
- can't use as table / colummn names, in LIMIT
- connection-specific
- connection pool => causing isolated parts of code to interact
- optimizer might optimize away variables in some condition
- order of assignment can be non-deterministic


























