# program
- stored in /usr/bin
## server side
mysqld: SQL daemon
mysqld_safe: start mysqld
mysql.server: on system with system-V-style run directory, invoke mysqld_safe
mysqld_multi: start/stop multiple servers installed on system
comp_err: mysql build/installation, compile err msg file
mysql_ssl_ras_setup
mysql_upgrade

## client side
mysql: command-line tool
- u:username, p:password, h:host, P:port

mysql (after enter)
- \s:show status, \h:help, \q:quit connection

mysqladmin: 
- client perform administrative operation
- eg. create, drop db; reload grant taables, flush table to disk
- retrieve version, proces, status info from server
mysqldump: dump db as SQL/text/XML file
mysqlimport: import text file using `LOAD DATA`
mysqlpump: dump db as SQL
mysqlsh: advanced client, can run js, python
mysqlshow: show all tables, db
mysqlslap: emulate client load for mysql server, report timing each stage


# log
## error log
mysqld errors
## general query log
record what mysqld is doing
eg. connection interrupted, break
    SQL statement
know what client side sent to server
## binary log
record events that change DB
eg. create table, update data, potential changes
function: copy and restore, eg. copy from master to slave

## slow query log
record query that is slower
very useful, allow developer to optimize query

## start binlog
change my.cnf
```
log-bin=master-bin
log-bin-index=master-bin.index
```

# Backup and recovery
## Physical backup
raw copies of directories and files that store database contents
- for large, important db recover quickly

characteristics
- exact copy
- faster than logical, no conversion
- output more compat 
- range from entire data directory, down to level of individual files, depend on storage engine
- include any related file, eg. log, config file
- portable only to similar hardware environment
- performed while MySQL server not running; if running, lock records
- use `mysqlbackup`

restore
- ndb_restore
- copy back to original locations with fs commands

## Logical backup
save logical database structure(create db, create table statement), content(insert, delimited-text files)
- for small amount of data, recreate on different machine

characteristics
- backup done by querying MySQL server to get DB structure, content
- backup slower; if db written, also sent to backup program
- output larger for text format
- granularity at server level, db level, table level
- no log, config file
- very portable
- server no need offline
- use `mysqldump`

restore
- use LOAD DATA / mysqlimport

```
mysqldump --all-databases --master-data --single-transaction > backup_sunday_1_PM.sql

mysql < backup_sunday_1_PM.sql

mysqlbinlog gbichot2-bin.0007 gbichot2-bin.0008 | mysql
```

## online backup
- less intrusive to client
- use appropriate locking

## offline backup
- simple backup, no interference
- clients affected

## snapshot backup
some file system allow "snapshots" -> logical copy of fs at given time
- eg. LVM, ZFS

## full VS incremental backup
incremental made possible by server's binary log (record data changes)

## incremental recovery
recover changes made during given time span (point-in-time recovery)
- follow full recovery from backup files


# Connection management
each client connection get own thread within server process
- no need created, destroyed for each new connection
- when client connect to mysql server, need authentication
- username, originating host, password
- X.509 certificate used across SSL connection

# lock granularity
some db not offer choice of lock
table lock, row lock

# transaction
mysql not manage transaction at server level, but storage engine does
=> can't mix different engine in single transaciton
rollback is problem if non-transactional table

MVCC: twist on row-level locking
- allow nonlocking reads
- only lock necessary rows during write operations


# other engine
## archive engine
support only insert and select
best for logging and data acquisition

## blackhole engine
no storage mechanism at all
- for fancy replication setup and audit logging

## CSV engine
treat CSV as tables, not support index
copy file into and out of db while server running
write data into CSV table, external program can read it right away

## Federated engine
~ proxy to other server
open client connection to another server, execute queries against table there
- many problem, disabled by default
- successor: FederatedX

## memory engine
need fast access to data that never change / no need to persist after restart
- hold up order of magnitude faster than MyISAM
- all data stored in memory

good use
- lookup/mapping tables
- caching results of periodically aggregated data
- intermediate results when analyzing data

table level locking => low write concurrency
not support TEXT / BLOB
support fixed-size rows

## Merge storage engine
variation of MyISAM
- combine serveral MyISAM into 1 virtual table
- deprecated for partitioning

## NDB
cluster storage engine as interface between SQL and native NDB protocol

## 3rd party engine
pluggable storage engine API
### OLTP storage engine
Percona's XtraDB storage engine
PBXT, GMBH
RethinkDB for SSD


grant all privileges on *.* to 'root'@'%' identified by 'example';




