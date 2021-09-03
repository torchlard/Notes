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


# threads count
show global status like '%thread%';

select command,state from information_schema.processlist where command !='Sleep' ;

# view deadlock
show engine innodb status|mutex

# command
```sql
SELECT trx_state,trx_query from information_schema.INNODB_TRX it 

-- trx_query,trx_rows_modified 

SELECT info FROM information_schema.PROCESSLIST p WHERE COMMAND != 'Sleep'

SELECT * FROM information_schema.INNODB_LOCK_WAITS;

SELECT * FROM information_schema.INNODB_LOCKS;

SHOW status WHERE Variable_name LIKE '%conn%'

SELECT @@global.time_zone, @@session.time_zone
```




