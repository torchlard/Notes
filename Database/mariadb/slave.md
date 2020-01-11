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

  master_log_pos=763,


### master
show slave hosts
`show master status;`


### slave
show slave status




