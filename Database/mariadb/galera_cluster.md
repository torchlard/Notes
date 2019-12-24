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
## 1st node
```
wsrep_on=ON
wsrep_provider=/usr/lib/galera/libgalera_smm.so
wsrep_cluster_address='gcomm://'    
wsrep_cluster_name='mariadb_cluster'
wsrep_node_address='192.168.0.56'   
wsrep_node_name='mariadb_node1'    
wsrep_sst_method=rsync
 
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
bind-address=0.0.0.0
```

## 2nd, 3rd node

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
`sudo mysqld --wsrep-new-cluster`
`sudo galera_new_cluster`

other nodes start normally:
`sudo service mysql start`
`sudo systemctl start mariadb`

`journalctl -fu mariadb`

# problem
## edit the grastate.dat file manually and set safe_to_bootstrap to 1 
sudo vim /var/lib/mysql/grastate.dat

change `safe_to_bootstrap: 1`

## ist not allowed
set node address to private ip in VPC
disable SELinux




















