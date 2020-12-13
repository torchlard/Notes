# external table
data stored in files in external stage
store file-level metadata about data files
  - filename, version identifier

read-only, no DML operation on them
can used for query and join
allow view

# temporary table
storing non-permanent, transitory data (ETL data, session-specific)
temp table only exist within session
persist only for remainder of session, not visible to others
  - once session ends, data stored purged completely, not recoverable

temp table belong to specific db and schema

if create temp table same name as existing table => hide existing table
create new table same name as existing temp table => new table hidden by temp table

# trainsient table
persist until explicitly dropped and available to all users with privilege
similar to permanent tables except no fail-safe period

designed for data maintained beyond each session
don't need same level of data protection and recovery as permanent table

```sql
create transient table t (id number, creation_date date)
```

# view
allow result of query accessed as if it were table

used almost anywhere table can be used
both non-materialized and materialized views are secure

## non materialized
view = named definition of a query
result created by executing query at time view referenced in query
result not stored for future use

selecting some columns in table
selecting specific range of data in table column
joining data

## materialized view
results stored allow faster access
some more restriction

## advantage
create modular SQL code

```sql
create table employees (id integer, title varchar);
create view doctors as select * from employees where title='doctor';
create view nurses as select * from employees where title='nurse';

create view medical staff as 
  select * from doctors 
  union 
  select * from nurses
```

grant access to subset of table

### performance
non-materialized:
query optimizer process view and query together
sometimes enable evaluated more efficiently

materialized:
contain copy of subset of data in table
depend on amount of data in table
scanning materialized view much faster than scanning table

## limitation
- definition of view cannot be updated
- changes to table not auto propagated to view
- views are read-only

### when use materialized view
- result is small num of rows / cols relative to base table
- contain results that require significant processing
  - aggregates take long time to calc
- query on external table, slower performance compared to native table
- base table doesn't change frequently 

### adv
- improve performance that use same subquery results repeatedly
- auto and transparently maintained 
- up to date data














