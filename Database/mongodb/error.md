# not master and slaveOk=false
secondary replica default not allow read/write

in secondary DB: `db.getMongo().setSlaveOk()`


#  /var/lib/mongo/WiredTiger.turtle: handle-open: open: Permission denied
chown -R mongod:mongod mongo

# Starting mongod fork, ERROR: child process failed, exited with error number 1
config set fork=true, show any error occur in background

# Failed global initialization: FileNotOpen: Failed to open "/var/log/mongodb/mongod.log"
incorrect keyfile privilege

# replica set IDs do not match
1. stop incorrect node
2. delete all data,log from incorrect node
3. rs.add('ip:port') in primary node
4. start incorrect node
  



