# redo log
aim: assure transaction persistence
content: physical format, record physical data update
when begin: start of tx
when ends: after dirty page of tx write in disk, redo log can be overwritten

## physical file
data/ib_logfile1
data/ib_logfile2

config:
innodb_log_group_home_dir: location
innodb_log_files_in_group: file number

innodb_log_file_size: file size
innodb_mirrored_log_groups

redo log has buffer `innodb_log_buffer`, default 8M
after write to buffer,
1. master thread flush buffer to redo log each second
2. every transaction commit will flush to redo log file
3. if buffer less than half, flush to redo log file


# undo log
aim: rollback, pprovide for MVCC
content: logical format, when rollback, only logically recover to state before tx
when begin: before tx
when end: after tx commit, push to linked list wait for cleaning; 
  - purge thread determine if other tx use previous undo log version

## physical file
before 5.7: data file > ibdata
after 5.7: independent undo table space


# binlog
content: logical format, sql processed
when begin: when tx commit, all sql write to binlog all together
when release: `expire_logs_days`

## physical file
log_bin_basename


# redo log VS binlog
similar: both recover db
difference:
1. redo log is tx level, binlog is db level
2. physical vs logical
3. release time different
4. redo log higher efficiency recover db

when 2PC, first write redo log, then write binlog; keep redo_log, binlog consistent










