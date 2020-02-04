# optimization
## speed
find > aggregate > map-reduce

## command
dropIndex, dropIndexes
reIndex(), getIndexes()
totalIndexSize

`db.collection.createIndex({name: -1})`
clear cache: `db.referenceDataPoints.getPlanCache().clear()`


# query planner
namespace: <db>.<collection>
indexFilterSet: whether index filter applied
queryHash: hash of query shape
planCacheKey: hash of key for query shape and available index
optimizedPipeline: 

## winningPlan
stage: name of stage
inputStage: child stage
inputStages: child stages

### stage
COLLSCAN: collection scan
IXSCAN: scan index keys
FETCH: get documents
SHARD_MERGE: merge results from shards
SHARDING_FITLER: filter out orphan docs from shards

# rules
1. use text index instead of multiple field index search
2. sparse index if many document missing this key
3. TTL remove old data
4. each collection index < 5
5. shorter field name
6. use default _id value, custom _id insert slower
7. archive large dataset periodically


# performance
## locking
if `globalLock.currentQueue.total` consistently high => large numnber of requests waiting for lock
if globalLock.totalTime > uptime, db in lock state for many times

## num of connections
if numerous concurrent request, heavy demand
read-heavy: increase size of replica set and distributed read operations to secondary member
write-heavy: sharding, add more shards to sharded cluster to distribute load mong mongod instances

all official driver implement connection polling
extremely high number of connections often indicate driver/config error

config: maxIncomingConnections


# ulimit
per user limitation for various resources
if mongod instance execute as user running multiple processes / multiple mongod => resource contention 

hard ulimit: max number of processes that user can active at any time
soft ulimit: limit enforced for a session / process

```
vim /etc/sysctl.conf
fs.file-max = 6553560   // restart to activate

ulimit -HSn 102400  // only active in current terminal
```
to change mongod ulimit setting using systemd
`vim /usr/lib/systemd/system/mongod.service`






























