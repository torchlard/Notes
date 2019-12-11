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












