# Performance Schema
turn on: set `performance_schema=on` in my.cnf

# size
see size of tables
```sql
select table_name, round(((data_length+index_length)/1024/1024),2) as "Size(MB)" 
from information_schema.TABLES where table_schema="<db>" 
order by (data_length+index_length) desc limit 30;
```






























