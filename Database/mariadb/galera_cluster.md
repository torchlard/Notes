# galera cluster
## functionality
sync replicate
multi-master
auto node control, remove if node fails
new node auto replicate
parallel copy, row level
direct connect to cluster

## adv
no slavelag
both read/write extension
lower delay
node data: sync; master/slave: async
  - different slave different binlog


# installation
galera-3 installed along with mariadb-server-10.3

# config
```
wsrep_on=ON
wsrep_provider=/usr/lib/galera/libgalera_smm.so
wsrep_cluster_address='gcomm://'    #第一个启动节点配置
wsrep_cluster_name='mariadb_cluster'
wsrep_node_address='192.168.0.56'   #本机IP地址
wsrep_node_name='mariadb_node1'    #集群节点名称
wsrep_sst_method=rsync
 
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
bind-address=0.0.0.0
```

在第二台和第三台节点上配置/etc/my.cnf.d/server.cnf 文件的[galera]部分：

```
wsrep_on=ON
wsrep_provider=/usr/lib/galera/libgalera_smm.so
wsrep_cluster_address='gcomm://192.168.0.56,192.168.0.58'
wsrep_cluster_name='mariadb_cluster'
wsrep_node_address='192.168.0.57'
wsrep_node_name='mariadb_node2'
wsrep_sst_method=rsync
 
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
bind-address=0.0.0.0
```
```
wsrep_on=ON
wsrep_provider=/usr/lib/galera/libgalera_smm.so
wsrep_cluster_address='gcomm://192.168.0.56,192.168.0.57'
wsrep_cluster_name='mariadb_cluster'
wsrep_node_address='192.168.0.58'
wsrep_node_name='mariadb_node3'
wsrep_sst_method=rsync
 
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
bind-address=0.0.0.0
```

# activation
use one node as starter:
sudo mysqld --wsrep-new-cluster

other nodes start normally:
sudo service mysql start



























