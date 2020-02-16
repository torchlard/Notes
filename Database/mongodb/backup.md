# disaster recovery
RTO: recovery time objective, recover functionality
RPO: recovery point objective, recover data

| level | RTO        | RPO       |
|-------|------------|-----------|
| 1     | 2d         | 1d-7d     |
| 2     | >24hr      | 1d-7d     |
| 3     | >12hr      | n hr - 1d |
| 4     | n hr - 2d  | n hr - 1d |
| 5     | n min - 2d | 0-30 min  |
| 6     | n min      | 0         |

# command
### create new dir (only import index)
```sh
#!/bin/bash

rm -rf /d/mongo-data/b1
mkdir -p /d/mongo-data/b1
for f in $(ls -1 /mnt/d/mongo/dump/universe2*.bson)
do
  b=$(basename $f)
  touch /d/mongo-data/b1/$b
done

for f in $(ls -1 /mnt/d/mongo/dump/universe2*.json)
do
  cp $f /d/mongo-data/b1
done
```

## copy db data from one to another
copy only db `test`
`mongodump -h=127.0.0.1:27020 -d test --archive | mongorestore -h=127.0.0.1:27021 -d test --archive`


# oplog
mongodb replica use oplog to sync replicas
all changes stored in primary node collection `local.oplog.rs`
secondary node pull oplog from primary, replay in local

record all updates in period of time

oplogReplay: replay oplog for point-int-time restore
oplogLimit: include oplog entries before provided Timestamp
oplogfile: oplog file for replay of oplog

## field
ts: timestamp
h: id
op
- i: insert
- u: update
- d: remove
- c: command
- n: no-op
ns: namespace `db.collection`
o: actual operation content
o2: only for update, target document

## command
view oplog
```js
rs.printReplicationInfo()

use local
db.oplog.rs.find().sort({ts: -1})
```
clear oplog `db.runCommand({"compact": "oplog.rs", "force": true})`
resize oplog `db.adminCommand({replSetResizeOplog: 1, size: 16000})`

search oplog after certain timestamp
```js
db.oplog.rs.find({$and: [
    {o:{ $not:{$eq: {"msg" : "periodic noop"}}  } },
    {ts:{ $gt: Timestamp(new Date("2020-01-20T15:28:43.958+08:00").getTime()/1000,1) } }
]})
.sort({ts:-1})
```



# backup with filesystem snapshot
"block-level" backup, create copies of device holds data files
create pointers between live data and special snapshot volume
  - equivalent to hard links
use copy-on-write strategy: only stores modified data

must have journaling enabled, in same logical volume as data files

restore:
1. mount snapshot image on fs
2. copy data from snapshot

## note
db must be valid when snapshot take place
all writges accepted by db fully written to disk: to journal / data files

## disk
snapshot create image of entire disk
consider isolating DB data files, journal, config on 1 logical disk

no incremental backup
if journaling enabled, can use any fs / volume/block level snapshot tool to create backups

if using aws EBS with RAID, cannot get consistent state across all disks

## procedure
### backup
after create snapshot
- mount snapshot, copy data to separate storage
- OR block level copy 

```
umount /dev/vg0/mdb-snap01
dd if=/dev/vg0/mdb-snap01 | gzip > mdb-snap01.gz
```

### restore
```
lvcreate --size 1G --name mdb-new vg0
gzip -d -c mdb-snap01.gz | dd of=/dev/vg0/mdb-new
mount /dev/vg0/mdb-new /srv/mongodb
```

# import, export 
`mongodump -h=<host> -u=<user> -p=<pwd> -d=<db> -c=<coll> --authenticationDatabase=admin`

bson: `mongorestore -d testdb -c test test.bson`
json: `mongoimport -d testdb -c test test.metadata.json`

import multiple bson + auto read corresponding metadata
`mongorestore -d <db> --nsInclude '*.bson' <src>`

(not necessary)
import multiple metadata json
`cd <src>; ls -1 *.json | sed 's/.metadata.json$//' | while read col; do mongoimport -d <db> -c $col < $col.metadata.json; done`

`mongorestore --nsFrom='fromDb.fromColl' --nsTo='toDB.toColl' --host=127.0.0.1:27017 --username=xxx --password=xxx --authenticationDatabase=admin dataSrc/`


# full backup
lock replica db `db.fsyncLock()`
dump db with oplog to replay `mongodump -u... -p... -h... --oplog`

## restore
`mongorestore <dump-dir>`

# incremental backup
get newest timestamp `bsondump dump/oplog.bson`

hot backup (cannot use "Timestamp(xxx,1)" )
```bsh
t1=$(node -p 'Math.round(new Date("2020-01-20T20:00:00+08:00").getTime()/1000)')
mongodump -h 192.168.11.103 -uroot -p123456 -d local -c oplog.rs -q '{"ts":{"$gt":{"$timestamp": {"t":1579512306, "i":1}}}}'

// OR
query='{"ts":{"$gt":{"$timestamp":{"t":'$t1',"i":1}}}}'
mongodump -h 192.168.11.201 -uadmin -p666666 --authenticationDatabase=admin -d local -c oplog.rs -q $query --out=op4

// OR
t1=$(node -p 'Math.round(new Date("2020-01-21T14:20:15+08:00").getTime()/1000)')
t2=$(node -p 'Math.round(new Date("2020-01-21T14:20:24+08:00").getTime()/1000)')
query='{"ts":{"$gt":{"$timestamp":{"t":'$t1',"i":1}},"$lt":{"$timestamp":{"t":'$t2',"i":1}}}}'

```

## restore
restore from oplog
`mongorestore --oplogReplay <oplog-dir>`





