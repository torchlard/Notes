# feature
all config can change without restart
flexible routing by regex
detailed stat for sql performance and count
auto-reconnect, auto-re-execution of queries
query cache
connection pool, multiplexing

## function
max connection limit
auto close DB
  - over delay threshold
  - network not blocked
load balance, galera auto failover
config in SQLite
query routing
no partition

# architecture
3 layers: runtime -> memory -> disk, config file

## runtime
current config, include global variables, mysql_Servers, ...
`load`

## memory
```sql
load mysql users to runtime / load mysql users from memory
load mysql query rules to run
load|save admin variables to runtime|memory
```

# admin
`mysql -h 127.0.0.1 -u admin -padmin -P 6032`

# network
port 6032: proxysql admin window
port 6033: proxysql provide service port, redirect connection to true db

# taable
main: memory built in db, store db instance, admin authenicate, router
disk: persist config to disk, sqlite data file
stats: stat info
monitor: db health, latency check

change admin
`update global_variables set variable_value='admin:admin;<new-user>:<new-pwd>' where variable_name='admin-admin_credentials';`

# main
## variables
global_variables: port, admin account
mysql_collations
mysql_query_rules
mysql_replication_hostgroups: monitor all read_only values
mysl_servers
mysql_users
scheduler: ~cron

# config

insert into mysql_servers(hostgroup_id,hostname,port) values(10,'<ip>',3306); 
admin> insert into mysql_users(username,password,default_hostgroup) values('root','passwd',10);

















