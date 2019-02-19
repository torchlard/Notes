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
















