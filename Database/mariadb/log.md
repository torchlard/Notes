# error log
always enabled
all critical errors logged
get warnings logged by setting log_warnings

## setting
```
log_error=/var/log/mysql/mariadb.err
```
```
log-basename=mariadb
log_error
```
--skip-log-error

## log warning level
### >= 1
event scheduler, system signals
--user, kill slave, disabled plugins, DNS lookup

### >= 2
access denied error, connection abort
table handler, info of binary log dump

### >= 3
all error during myisam repair
old-style lang options

### >= 4
too many connection, conn closed normally
abort due to kill

### >= 9
init plugins

## syslog
on unix, error can rdirect to syslog
start with mysqld_safe OR systemd


# general query log
log all query to file/table
useful for debugging / auditing queries
toggle by `SQL_LOG_OFF`, `--general-log`

```
general_log_file=mariadb.log

// if disable
log_disabled_statements='slave,sp'
```

# slow_log
`mysqld --slow-query-log`
log all queries to file/table
find query cause performance problems
log query take > long_query_time

```conf
# write to file
slow_query_log_file=xxx.log

# write to table
log_output=TABLE
slow_query_log

# disable log for specific statements
log_slow_disabled_statements='admin,call,slave,sp'

# slow query log time
long_query_time=5.0 (seconds)

# log query not use index
log_queries_not_using_indexes=ON

min_examined_row_limit=100000
log_slow_admin_statements=ON
log_slow_filter='filesort,filesort_on_disk,tmp_table,tmp_table_on_disk'

# throttling slow query log (reduce IO)
log_slow_rate_limit=5
log_slow_verbosity='query_plan,explain'

```


## log filter

## log content


# binary log
`mysqld --log-bin`
used for machine are/maybe replication masters
for point-in-time recovery
for replication, used with mysqlbinlog to apply on backup

only log query with effects, ignore (eg. SELECT, SHOW)

## filter
`--binlog-ignore-db=<db_name>`
`--binlog-do-db=<db_name>`
`SQL_LOG_BIN=0 `(disable)

## example
next query is slow, don't want to log 
`SET LOCAL SLOW_QUERY_LOG=0`

## format
always binary format, rather than plain text

### statement-based logging
`binlog_format=STATEMENT`
statement logged exactly as they were executed
some cases statement not deterministic => not safe for replication
- eg. use LIMIT => set of rows included cannot be predicted

#### unsafe statement
insert ... on duplicate key update
insert-delayed
insert with auto_increment column
insert with trigger/stored procedure execute update

update statement use limit
user-defined function
function:
  FOUND_ROWS(), GET_LOCK(), LOAD_FILE(), RAND(), ROW_COUNT()
  SLEEP(), SYSTEM_USER(), UUID() ...

refer to log tables, self-logging tables, system variables

### row-based logging
`binlog_format=ROW`
DML statement not logged
each insert,update,delete performed on each row logged

### mixed logging
`binlog_format=MIXED`
default statement-based logging, if not safe, use row-based logging

## purge log file
delete all `RESET MASTER`
delete before certain datetime: 
`PURGE BINARY LOGS TO 'mariadb-bin.000063'`
`PURGE BINARY LOGS BEFORE '2013-04-22 09:55:22'`

auto removed with expire_logs_days
force log rotate: `FLUSH BINARY LOGS` on regular basis

## mysqlbinlog
save binlog:
`mysqlbinlog mariadb-bin.000480 > 480.txt`
`mysqlbinlog -r filename binlog-filenames`

recover server:
`mysqlbinlog xxx | mysql -u root -p`

can run myltipple log file
`mysqlbinlog xx1 xx2 | mysql -u root -p`


# relay log
log files created by slave during replication
same format as binary log, contain record of events affect data/structure

`mysqlbinlog --start-position=1847 --stop-position=2585 mysql-bin.000008 > test.sql`


# binary log format
```
#200112 18:41:47 server id 1  end_log_pos 697 CRC32 0xceadcc44 	Annotate_rows:
#Q> INSERT INTO test.t1 (id,name)
#Q> 	VALUES (5,'12'
#200112 18:41:47 server id 1  end_log_pos 745 CRC32 0xe29a031a 	Table_map: `test`.`t1` mapped to number 18
#200112 18:41:47 server id 1  end_log_pos 787 CRC32 0x977d6c11 	Write_rows: table id 18 flags: STMT_END_F
```
Table_map: defines table name used by query
Write_rows/Update_rows/Delete_rows: defines event type

```
BINLOG '
GvcaXhMBAAAAMAAAAPQBAAAAABIAAAAAAAEABHRlc3QAAnQxAAIDDwL8AwJaSvvu
GvcaXhgBAAAANwAAACsCAAAAABIAAAAAAAEAAv///AQAAAADAGRkZPwEAAAABABkZGRlbQ8Aug==
'/*!*/;
### UPDATE `test`.`t1`
### WHERE
###   @1=4
###   @2='ddd'
### SET
###   @1=4
###   @2='ddde'
```
row events encoded as base-64 strings 
actual SQL shown after `###`



## argument
--start-datetime="2015-01-12 21:40:00"  --stop-datetime="2015-01-12 21:45:00" 
--base64-output=decode-rows: omit base64 binlog string





