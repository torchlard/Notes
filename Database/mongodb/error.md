# not master and slaveOk=false
secondary replica default not allow read/write

in secondary DB: `db.getMongo().setSlaveOk()`



#  /var/lib/mongo/WiredTiger.turtle: handle-open: open: Permission denied
chown -R mongod:mongod mongo








