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
- use `mysqlbackup` / `mariabackup`

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

### mylvmbackup
quickly create full physical backup
obtain read lock on all tables, flush all server caches to disk
- make LVM snapshot of volume containing mysql data directory => unlock tables again
- server continue normal operations

snapshot mounted to temporary directory, all data backed up by `tar`
=> backup-YYYYMMDD_hhmmss_mysql.tar.gz



## full VS incremental backup
incremental made possible by server's binary log (record data changes)

## incremental recovery
recover changes made during given time span (point-in-time recovery)
- follow full recovery from backup files


# mysql copy process
1. master write data changes to binary log
2. slave's IO process connect to master, request log after certain position
3. master's IO process return data to slave's IO + binlog-filename + binlog-position
4. log content append to slave's relay-log, filename & pos save in master-info, for next time reading
5. slave's sql process check relay-log renew content, parse relay-log and run


# backup solution
## replication
replication alone not sufficient for backup



















