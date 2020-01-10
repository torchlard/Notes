# intro
replica set = group of mongod process that maintain same data set
redundancy and high availability

get primary replica `rs.isMaster().primary`

check status `rs.status()`
check config `rs.config()`

## force primary
```js
cfg = rs.conf()
cfg.members[0].priority = 0.2
cfg.members[1].priority = 0.5
cfg.members[2].priority = 1
rs.reconfig(cfg)
```

# security
make keyfile
```s
openssl rand -base64 756 > /var/lib/mongo/keyfile && 
chmod 400 /var/lib/mongo/keyfile && 
chown mongod:mongod /var/lib/mongo/keyfile

# to 2 replicas:
rsync -av /var/lib/mongod/keyfile root@<instance-ip>:/var/lib/mongod
rsync -av /var/lib/mongod/keyfile root@<instance-ip>:/var/lib/mongod
```

## maintenance
enable/disable maintenance mode for secondary member of replica set
must run on replica
`{replSetMaintenance: <boolean>}`




