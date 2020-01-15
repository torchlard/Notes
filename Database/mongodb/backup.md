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
`mongodump -h=<host> -u=<user> -p=<pwd> -d=<db> -c=<coll> --authenticationDatabase=admin`

## import, export 
bson: `mongorestore -d testdb -c test test.bson`
json: `mongoimport -d testdb -c test test.metadata.json`

import multiple bson + auto read corresponding metadata
`mongorestore -d <db> --nsInclude '*.bson' <src>`

(not necessary)
import multiple metadata json
`cd <src>; ls -1 *.json | sed 's/.metadata.json$//' | while read col; do mongoimport -d <db> -c $col < $col.metadata.json; done`

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
record all updates in period of time

oplogReplay: replay oplog for point-int-time restore
oplogLimit: include oplog entries before provided Timestamp
oplogfile: oplog file for replay of oplog


# backup with filesystem snapshot
"block-level" backup, create copies of device holds data files
create pointers between live data and special snapshot volume
  - equivalent to hard links
use copy-on-write strategy: only stores modified data

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
















