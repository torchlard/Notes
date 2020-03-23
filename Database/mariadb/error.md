# not reading from conf file
move config file to /etc/mysql/my.cnf
use `mysql --print-defaults` to show default config

# failed to open relay log
reason: previous relay_log still exists

## solution
reset slave;
set master to ...
start slave;

# Waiting for master to send event
delete all data, reset again

# [ERROR] Unknown/unsupported storage engine: InnoDB
solution:
rm -f ib_logfile0
rm -f ib_logfile1


# fix corrupted tables
```conf
[mysqld]
innodb_force_recovery=1
```

> check table xxx;
mysqlcheck xxx

only MyISAM storage engine can run repair
if InnoDB idnex corrutped, drop index and add again





