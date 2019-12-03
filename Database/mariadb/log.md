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
delete all: `RESET MASTER`
delete before certain datetime: 
`PURGE BINARY LOGS TO 'mariadb-bin.000063'`
`PURGE BINARY LOGS BEFORE '2013-04-22 09:55:22'`

auto removed with expire_logs_days
forece log rotate: `FLUSH BINARY LOGS` on regular basis

















