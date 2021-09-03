# intro
replica set = group of mongod process that maintain same data set
redundancy and high availability

get primary replica `rs.isMaster().primary`

check status `rs.status()`
check config `rs.config()`

## force primary
normal reconfig method
```js
cfg = rs.conf()
cfg.members[0].priority = 0.2
cfg.members[1].priority = 0.5
cfg.members[2].priority = 1
rs.reconfig(cfg, {force:true})  // force=true for non-master node
```

# init replica
```js
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "192.168.11.102:27017"},
    { _id: 1, host: "192.168.11.103:27017"},
    { _id: 2, host: "192.168.11.104:27017"}
  ]
})
```
don't run compact against primary replica set member
connect directly to primary, run `rs.stepDown()`



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



# read preference
&readPreference=secondaryPreferred

# repl set -> standalone
1. reconfig rs.config to memmbers include own db
2. vim /etc/mongod.conf => comment whole security, replication set
3. restart mongodb, drop `local` database
4. change replication set name in .conf, restart db
5. rs.initiate()


# add node
rs.add( { host: "mongodb3.example.net:27017", priority: 0, votes: 0 } )


172.27.1.72
172.27.0.113
rs.initiate({_id:"rs1",members:[{_id:0,host:"172.27.1.72"},{_id:1,host:"172.27.0.113"}]})

rs.initiate({_id:"rs1",members:[{_id:0,host:"172.27.0.113"}]})