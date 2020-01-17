# Common table expression (CTE)
## non-recursive CTE
```sql
with engineers as (
  select * from employees
  where dept='Engineering'
)
select * from engineers where ...
```
// similar to derived tables

```sql
select * from (
  select * from employees
  where dept='Engineering'
) as engineers 
where ...
```
query-local VIEW

## recursive CTE
recursive view 
while loop in SQL, support infinite loops

```sql
WITH RECURSIVE cte(n) AS (
  SELECT 1 UNION ALL
    SELECT n+1 FROM cte WHERE n<3
)
SELECT * FROM cte
```


# lateral
foreach loop of SQL
play well with outer and cross joins

```sql
select ..., ldt.*
from t2
  left join lateral (
    select col1,col2 from t1
    where t1.x = t2.y
  ) as ldt
  on (true)

```

# grouping sets
multiple group by in one go

```sql
-- old
select year,month,sum(revenue)
from tb1
group by year,month

UNION ALL

select year,null,sum(revenue)
from tb1
group by year

-- new 
select year,month,sum(revenue)
from tb1
group by grouping sets ((year,month), (year))

```

# filter
```sql
select year,
  sum(sales) filter (where month=1) jan,
  sum(sales) filter (where month=2) feb,
  ...
from sale_data
group by year;
```

# partition over
id value balance
1 10 10
2 20 30
3 -10 20

```sql
select 
  id,value, 
  sum(value) over (order by id 
    rows between unbounded preceding and current row)
from transactions t
```
## moving average
```sql
avg(...) over (order by ...
  rows between 3 preceding AND 3 following
) moving_avg
```

# within group
grouped rows cannot be ordered prior aggregation
(how to get middle value of a set)
```sql
-- old
select d1.val 
from data d1
  join data d2
    on (d1.val < d2.val OR (d1.val=d2.val and d1.id<d2.id) )
group by d1.val
having count(*) = (
  select floor(count(*)/2) from data d3
)  

-- new
select percentile_disc(0.5) within group (order by val)
from data
```

# temporal tables
table can be system versioned, application versioned or both


# stored aggregate function
```sql
delimiter //
create aggregate function if not exists aggregate_count(x INT) returns INT
begin
  declare count_stu int default 0;
  declare continue handler for not found
  return count_stu;
    loop
      fetch group next row;
      if x then
        set count_stu = count_stu+1;
      end if;
    end loop;
  end //
delimiter;
```

# locking
## for update
apply only when autocommit=0 / select enclosed in transaction
- lock on rows to prevent writing rows and read from them

if autocommmit=1, lock in share mode | for update  no effect

## lock in share mode
if specify in select, wait until all transactions that modify row committed
- write lock acquired
- all tx can read rows

innodb support row-level locking

## wait n | nowait
nowait == wait 0 : immediately fail if lock cannot be obtained
wait n: wait for n seconds to get lock



# optimizer hint
## high priority
apply only if storage engine only support table-level lock (MyISAM, memory, merge)

## sql_cache / sql_no_cache
cause query to be cached / not cached

## sql_buffer_result
force optimizer to use temp table to process result
free locks as soon as possible

## sql_small_result | sql_big_result
tell optimizer result very big or not
- normally group by / distinct use temp table
- temp table not convenient if data too big

sql_small_result: force temp table
sql_big_result: avoid temp table

## straight_join
read tables in order they appear in SELECT

## sql_calc_found_rows
only applied when using limit
`select found_rows()` get count(*)



# row_count()
number of rows updated/inserted/deleted by preceding statement
- select,show,desc,help: return -1
- truncate,(statement no result set): return 0


# handler
direct access to table storage engine interface foir key lookups and key/table scans

handler read: 50% speedup, no parsing, all data transformed in binary

```sql
handler <tbl> OPEN;
handler <tbl> READ FIRST;
handler <tbl> READ NEXT;
handler <tbl> READ NEXT;
handler <tbl> CLOSE;
```

suitable to access few rows very quickly


# trigger

```sql
set @sum = 0;
insert into account values(1,2,3),(4.5.6),(7,2,8);
select @sum as 'total amount inserted'
```

```sql
create trigger ins_transaction before insert on account
for each row precedes ins_sum
set
@deposits = @deposits + if(NEW.amount > 0, NEW.amount, 0),
@withdrawals = @withdrawals + IF(NEW.amount < 0, -NEW.amount, 0);
```

```sql
delimiter //
create trigger upd_check before update on account
for each row
begin
  if NEW.amount < 0 then
    set NEW.amount = 0;
  ELSEIF NEW.amount > 100 then
    set NEW.amount = 100;
  END IF;
END;
delimiter ;
```
can define multiple trigger for given table that have same trigger event, action time
- eg. can 2 BEFORE UPDATE triggers

affect trigger order, use `for each row`

##
insert trigger: NEW.col_name
delete trigger: OLD.col_name
update trigger: OLD.col_name, NEW.col_name

## error
before trigger fails: operation not performed
after trigger executed only if before trigger success

# coalesce
return first non-null value
`select coalesce(null, 1, 2, 'W3School.com'`


# generated column
## virtual
column calculated on the fly when record read from table
## stored
column calculated when new record written/updated in table
only stored can be indexed











