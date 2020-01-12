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


# GTID
global transaction identifier

## initiative
when master failover, slave connect to new master
not friendly using file & pos

## definition
unique representatoin of committed transaction in whole replication system
`gtid_mode=ON`
format `source_id:transaction_id`

source_id = server-id of server that init tx
transaction id = related to order tx, start from 1, inc in same originating server

## GTID set
`uuid:interval [, uuid:interval]`
interval: eg. 1, 1-5
```
select GTID_SUBTRACT(
  'f76eb90f-82a2-11e5-a162-7ca23e9126c5:1-5,f76eb90f-82a2-11e5-a162-7ca23e9126c5:10-15', 
  'f76eb90f-82a2-11e5-a162-7ca23e9126c5:1-2')
```
return f76eb90f-82a2-11e5-a162-7ca23e9126c5:3-5:10-15

## lifecycle
can use GTID to know tx from which server
if tx already committed in certain server, later same GTID tx will be ignored

slave don't need (file&pos) from master anymore
- `change master to` don't need log file & log pos param

1. tx commit on master, assigned GTID, GTID immediately write to binlog
2. GTID pass to slave, save in relay log
3. slave read GTID, set to gtid_next
4. later slave committed tx must use this GTID
5. ensure GTID not used in own binlog, start tx; when commit write GTID to binlog

### GTID_NEXT
session variable, default atomatic (create new)
when read gtid-event, output set GTID_NEXT

### GTID_EXECUTED
save all gtid set executed

## replication
1. when slave connect to master, send executed tx gtid period
2. master send other tx (not executed in slave) to slave

## failover
assume master fails

### newwst slave as new master
just ok

### choose any slave as new master
assume situation:
A binlog[1 2 3]  {old master}
B relaylog[1] binlog[]
C relaylog[1 2] binlog[1 2]
D relaylog[1 2 3] binlog[1]

method 1: 
1. C as master, B connect C, wait B run C's binlog,relaylog
2. D as master, B connect D, wait B run D's binlog,relaylog
3. B as master

method 2:
1. find node with most relay log (ie. D)
2. wait D run realy log, B connect D, B run relay log
3. B as master

```
for slave in slaves:
  if slave != candidate:
    candidate(stop slave)
    candidate(change master to master_host=slave.host, master_port=slave.port)
    candidate(start slave)

    slave_executed_gtid = slave(select @@GLOBAL.GTID_EXECUTED)
    slave_queued_gtid = slave(show slave status [column = retrieved_gtid_set])
    slave_all_gtid = slave_executed_gtid + ':' + slave_queued_gtid

    candidate(select wait_until_sql_thread_after_gtid(slave_all_gtid))
```
## problem
not support create/drop temporary table






