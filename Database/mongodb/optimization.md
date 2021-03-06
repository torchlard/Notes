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

## concurrency
db.adminCommand( { "setParameter": 1, "wiredTigerConcurrentWriteTransactions": "8192" } )
db.adminCommand( { "setParameter": 1, "wiredTigerConcurrentReadTransactions": "8192" } )
db.adminCommand({"setParameter": 1, "wiredTigerEngineRuntimeConfig": "cache_size=45G"})


## eviction
eviction

cache_used是很关键的指标，超过80%将触发eviction，类似LRU算法，淘汰冷数据，避免cache用量持续增长。

一个健康的MongoDB服务，其cache_used应该不超过80%，即使超过，能在短时间内降到80%也是没问题的。
如果长时间高于80%则需要重视起来，因为cache_used过高会导致数据库性能下降，体现在慢操作（读写请求耗时长）、qr/qw高（读写请求排队）等方面。所以我们要极力保证cache_used在一个健康的范围内。

eviction包括很多参数，比如eviction_trigger、eviction_target、eviction_dirty_target等，指定在什么条件下触发和停止cache eviction，这里，我更关心的是eviction线程数量。

对于eviction线程，MongoDB默认配置是eviction=(threads_min=1,threads_max=4)，根据cache使用情况，创建1-4个eviction线程去淘汰冷数据。

如果cache体积较大、读写频繁，那么需要更多的eviction线程。

如果调高threads_max仍然无法降低cache_used，建议设置更大的cache_size

动态调整配置：

  db.adminCommand({setParameter: 1, wiredTigerEngineRuntimeConfig: "eviction=(threads_min=1,threads_max=8)"})


# server status
sudo tail -n 100000  /var/log/mongodb/mongod.log | grep "serverStatus was very slow"
see what cause latency most













