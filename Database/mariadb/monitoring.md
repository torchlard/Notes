# Performance Schema
turn on: set `performance_schema=on` in my.cnf

# size
see size of tables
```sql
select table_name, round(((data_length+index_length)/1024/1024),2) as "Size(MB)" 
from information_schema.TABLES where table_schema="<db>" 
order by (data_length+index_length) desc limit 30;
```

## start monitor sql
change table `performance_schema.setup_consumers` to enable events_statements
`update performance_schema.setup_consumers set enabled='yes' where name like 'events_statements_%';`

events_statements_current
events_statements_history
events_statements_history_long























