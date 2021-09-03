# timestamp
generally define which moment in time row added/updated, default use current TS
valid range: "1970-01-01 00:00:01" to "2038-01-19 03:14:07" 



## operation
`timestamp default current_timestamp`

`<field> timestamp on update current_timestamp`
- when updated, use latest time

`timestamp default 'yyyy-mm-dd hh:mm:ss' on update current_timestamp`

@@session.time_zone
@@global.time_zone

`set time_zone='+00:00'`
- change session time zone
- filtering, display follows changed time zone


`show variables like '%time%';`
- show all global variables related to time

`select curtime()`
- check current time to find current time zone


## create time zone tables
`mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -u root -p mysql`
inject system timezone info into mysql table


## java jdbc
getString: use system's timezone
getTimestamp: if not specified, use system's timezone; else can use `setTimeZone` 

sql from jdbc, its where filtering on timestamp also use system's timezone



# timeout
mysql use TCP protocol, after 3 handshake ACK, client enter blocking mode

connect_timeout: time for TCP handshake, authentication
wait_timeout, interactive_timeout: 
- for interactive mode (login by `mysql -uroot -p`)
- timeout if no operation for long time

innodb_lock_wait_timeout: row lock timeout
innodb_rollback_on_timeout: if ON, then rollback whole transaction; else only rollback row lock statement
innodb_flush_log_at_timeout: time (sec) write and flush to InnoDB redo log

lock_wait_timeout: metadata lock timeout
net_read_timeout: network problem when reading
net_write_timeout: network problem when writing

deadlock_timeout_long: Long timeout in μs for 2 step deadlock detection (Arai only)
deadlock_timeout_long: Short timeout in μs for 2 step deadlock detection (Arai only)

delayed_insert_timeout: time wait for INSERTS 
feedback_Send_timeout: max time to send data

idle_readonly_transaction_timeout: time server wait for idle read-only transactions
idle_transaction_timeout: time waits for idle transaction (0 = conn never killed)
idle_write_transaction_timeout: time wait idle read-write transactions 

rpl_semi_sync_master_timeout: time for semi-sync replication in master
  - if timeout, revert to async replication
rpl_semi_sync_slave_kill_conn_timeout: time to kill slave io_threads's conn on master

thread_pool_idle_timeout: time before idle worker thread exits
  - only meaningflul on Unix
  - thread_pool_min_threads -> comparable for windows






