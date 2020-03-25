# mysqlhostcopy
only for MyISAM tables

# mysqldump
not dump INFORMATION_SCHEMA / PERFORMANCE_SCHEMA by default

## tables, db
--all-databases: include everything exists
--ignore-table=db_name.tbl_name

## --add-drop-database
`CREATE DATABASE /*!32312 IF NOT EXISTS*/ test`
only warning given, run if not exists for mariadb version > 32312

## --master-data
dump master replication server
`change master to` indicate binary log coordinates (filename, position)

1: default, not written as comment, affect when dump file reloaded
2: `change master to` statement written as SQL, informative only
  - no effect when dump file is reloaded

## --opt
--add-drop-table --add-locks --create-options --disable-keys --extended-insert --lock-tables --quick --set-charset

## --flush-logs
flush server log files before dump
should use with --lock-all-tables / --master-data

## --flush-privileges
send `flush privileges` to server after dump

## --gtid
set up new GTID slave

# types
## interface
### physical backup
direct copy data files; fast

### Logical backup
slow
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


check status `show table status like 'xxx' \G`
```bsh
mysqldump --all-databases --master-data --single-transaction > backup_sunday_1_PM.sql
mysqldump -h $host -u$user -p$pwd --master-data --single-transaction $db $table > xxx.sql

mysql < backup_sunday_1_PM.sql

mysqlbinlog gbichot2-bin.0007 gbichot2-bin.0008 | mysql
```

## online?
### warm backup
read only when backup

### cold backup
offline backup, no read-write when backup

## dataset
### full backup
### partial backup

## restore
normally use full+increment / full+differential

### full backup
### increment backup
changes after last full/increment backup

### differential backup
changes after last full backup


# tools
## mysql backup
mysqldump: MyISAM(warm), InnoDB(hot), Aria(warm)
mysqldumper: multi-thread mysqldump
mysqlhotcopy: physical backup tool, warm backup

## filesystem backup
cp/tar
lvm snapshot

## sql
select clause into outfile '/path/to/files'
load data infile '/path/to/files'

## 3rd party
Innobase: commercial
innobackup
Xtrabackup: from Percona


# flow
## backup
1. sql> flush tables with read lock;
2. sql> flush logs;
3. sql> show master status; // get file and position
4. mysqldump ...
5. sql > unlock tables;

## recover
1. operations on db; want to rollback to certain point
2. mysqldump ...
3. find position of certain point
4. mysqlbinlog --start-position=xxx --stop-position=xxx ... > xx.sql

full recover  
1. set session sql_log_bin=0;
2. source xxx.sql

incremental recover
1. source xxx.sql
2. set session sql_log_bin=1;

## snapshot
1. sql > flush tables with read lock;
2. sql > flush logs;
3. mysql -e 'SHOW MASTER STATUS' > /backups/bininfo.txt
4. lvcreate ... // create snapshot
5. sql > unlock tables;
6. mount /dev/vg/snap /mnt
7. cp -a /mnt/data /backups/xxx
8. umount /mnt
9. lvremove /dev/vg/snap
10. 









