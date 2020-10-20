# polymorphic table function
monomorphic table function: 
  definition of both output table and set of input param
  fixed at function create time

map reduce paradigm could be implemented using PTF
function may have generic generic table input param
- row types unknown at creation time
- when PTF invoked in query, RDBMS and PTF interact through family of 1-4 sql-invoked pprocedures

## PTF component proccedure
1. describe
2. start
3. funfill
4. finish

```sql
function CSVreader(
  File varchar(1000),
  Floats descriptor default null,
  Dates descriptor default null
) return table 
not deterministic contains SQL;

select * from table (
  CSVreader(
    File => 'abc.csv',
    Floats => descriptor ("principal","interest"),
    Dates => descriptor ("due_date") )
) as s
```

## user defined join table function
function that has input tables, introduce options related to input table semantics

```sql
create function UDJoin (
  T1 table pass through 
    with set semantics prune when empty
  T2 table pass through
    with set semantics keep when empty
) returns only pass through;

select E.*, D.*
from table (
  UDJoin (
    T1 => table (emp) as e
          partition by deptno,
    T2 => table (dept) as D
          partition by deptno order by Tstamp
  )
);
```
take T1,T2 as input table, match rows according to use defined join criterion might not built into db

- partition 2 tables first, then join later on virtual processor

# row pattern recognition
search ordered partition of rows for matches to regular expression

# T-SQL (Transact-SQL)
set of programming extensions from Sybase and Microsoft
  - add several features to SQL
  - include transaction control, exception, error handling, row processing

T-SQL contains procedural programming and local variable, SQL not
T-SQL is proprietary, SQL is open format
T-SQL is extension to SQL, SQL is programming language

# ANSI-SQL
official features of SQL language
every brand of SQL RDBMS implements a subset of ANSI SQL













