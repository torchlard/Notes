assumes that the binary log file name is the same on both the slave and the master

# IO lag
Bytes behind master = Position - Read_Master_Log_Pos

## slave SQL lagged behind replication
Bytes behind master = Position - Exec_Master_Log_Pos

## slave SQL lagged begind IO
Bytes behind master = Read_Master_Log_Pos - Exec_Master_Log_Pos

To work out what's causing the lag, you must determine which replication thread is getting backed up. Replication relies on three threads per master/slave connection: one is created on the master and two are created on the slave.

1. The Slave I/O Thread. 
  When you issue START SLAVE on a slave server, the slave creates this thread which connects to the master and requests a copy of the master's binary log.
2. The Binlog Dump Thread. 
   When the slave connects to the master, the master uses this thread to send the slave the contents of its binary log.
3. The Slave SQL Thread. 
  The slaves creates this SQL (or applier) thread to read the contents of the retrieved binary log and apply its contents.


# rds recover
1. on read replica, call mysql.rds_stop_replication to correct error
2. `CALL mysql.rds_skip_repl_error` to skip 1062 error
3. change sql_slave_skip_counter to speed up slave

# command 
since rds_skip_repl_error can only skip 1 error, need to repeat many times
```sql
call mysql.rds_start_replication; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_start_replication; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error; call mysql.rds_skip_repl_error;
```

# sample
Read_Master_Log_Pos: 2632851
Relay_Log_Pos: 4742161
Exec_Master_Log_Pos: 4741852


