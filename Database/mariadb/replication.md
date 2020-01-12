# config
```
[mariadb]
log-bin
server_id=1
log-basename=master1
```

server_id: unique number for each mariadb in network,, 1 to 2^32-1

## check
cannot skip-networking, cannot bind-address to 127.0.0.1

## run
flush tables with read lock


```
change master to
  master_host='10.0.3.2',
  master_user='replication_user',
  master_password='666666',
  master_port=3306,
  master_log_file='master1-bin.000001',
  master_connect_retry=10;
```
<!-- master_log_pos=763, -->

### master
show slave hosts;
show master status;

### slave
show slave status


# data consistency
## async replication
default, after master finish transaction immediately return to client
if master crash, no tx pass to slave

## semi-sync replication
after master finish tx, pass tx to slave
wait for at least response from 1 slave and write to relay log

adv: data consistency
disadv: delay

# middleware
## normal
1. all readwrite go to middleware, redirect writes to master, reads to slave
2. record router history, within time period (eg. 500ms)
   - if read request , route to master
3. after sync, continue route read to slave

## cache
~ procedure, use cache timeout



# data inconsistency error
## reason
1. binlog foramt = statement, may different effect after execute in slave
2. before master run sql set sql_log_bin=0, not record in binlog; slave not run
3. write operation to slave
4. master/slave shutdown, binlog/relaylog file corruption
5. master slave version inconsistent, especially slave lower not support some sql

## repair
### sql_log_bin=0
1. stop replication process
2. get sql, run manually in slave
3. reopen replication process

### write to slave
1. master set sql_log_bin=0
2. run sql
3. rollback force operation in slave

### instance run long time, hard check error
final solution: do again from beginning

percona-toolkit
  - check if consistent

manually build inconsistent table
1. stop slave
2. master: musqldump inconsistent tables 
3. find binlog and POS point
4. copy sql to slave
5. `start slave until MASTER_LOG_FILE='mysql-bin.002974',MASTER_LOG_POS=55056952`
  - sync until that point
6. mysql xxx < xxx.sql
7. start slave


# avoid inconsistency
1. binlog use ROW format
2. master slave versioin same
3. don't run set sql_log_bin=0
4. read only slave
5. periodically check consistency

















