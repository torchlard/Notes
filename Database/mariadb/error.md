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




