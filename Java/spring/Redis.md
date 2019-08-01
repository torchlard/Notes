# open source VS pro edition
open source:
- distributed objects
- distributed collections
- distributed locks and synchronizers
- distributed services
- integration with frameworks
- local cache support for map

pro only:
- local cache for map with expiring entries
- local cache for spring,hibernate cache
- data partitioning in cluster mode
- blocking fair queue
- ultra-fast engine
- JMX/dropwizard metrics


# diskless replication
RDB file transmitted from master to slaves in 2 ways:
1. disk-backed: redis master create new process write RDB file on disk
- file transferred by parent process to slave incrementally
2. diskless: new process directly write RDB file to slave sockets

diskless better for slow disks and fast networks

# delete keys
DEL: blocking deletion of object
DEL, UNLINK(non-blocking DEL), async option of FLUSHALL,FLUSHDB: user controlled

redis delete objects when
1. max-memory policy
2. expire TTL
3. side effect of command that store data on key already exist
4. during replication, when slave go full resync with its master => content whole DB removed to load RDB file

# append only mode
default redis async dumps dataset on disk
problem: power outage / process error cause writes lost

AOF VS RDB persistence, can enable at same time
append-only better durability 
- for fsync, only lost 1 second of writes

## sync mode
no: just let OS flush data when it wants
always: after ever write
everysec: default, per second


# redis cluster
every cluster node has cluster config file, not intended edit by hand
- eg. nodes-6379.conf

since last interaction with master, 
time elapsed > (node-timeout * slave-validity-factor) + repl-ping-slave-period
- slave won't try failover if longer than the time

if slave validity factor = 0, then slave always try to failover master

cluster-migration-barrier:
default 1, slave migrate only if master remain with at least 1 slave

# Optimization
## active defragmentation
allow Redis server to compact space left between small allocations and deallocation of data in memory
- defragment when server running
- start to create new copies of values in contiguous memory regions, release old copies of data


# introduction
1. support persistence, save in disk
2. support key-value, list, set, hash, string, ordered sets
3. data backup (master-slave)

## advantage
atomic operation, support transaction
support publish/subscribe, notification, key expire


## data type usage
String: for any data, eg. image
Hash: store object, update, read, modify attribute
List: fast add delete, msg queue
Set: shared frd, unique ip
Sorted Set: ranking, weighted msg queue

# command
## String
set <key> <value>
get <key>
strlen <key>
num: incr <key>, incrby <key> <increment>, decr <key>


## pubsub
`subscribe`, `publish`
unsubscribe
`pubsub channels`: list all channels
`psubscribe news.*`: subscribe by pattern


# transaction
single redis command is atomic, but transaction not atomic
- only packaged script
- failure in middle will not rollback previous command / stop executing later command

```
multi
set bookname "mastering"
get bookname
sadd tag "C++" "programming" "mastering"
smembers tag
```

# Redisson
## Object
Redisson object is serialized and stored in any of available Redis nodes backing Redisson

distributed objects follow spec in java.util.concurrent.atomic
- lock-free, thread-safe, atomic operations on objects

Redisson objects bound to Redis keys

distributed objects:
- ObjectHolder
- BinaryStreamHolder
- GeospatialHolder
- BitSet
- AtomicLong
- AtomicDouble
- Topic
- BloomFilter
- HyperLogLog

## Object Holder
represented by RBucket, can hold any type of object
max 512MB

## AtomicLong
represented by RAtomicLong, resemble AtomicLong

## Topic
support publish and subscribe mechanism


# RedisTemplate
## operation
opsForValue, opsForHash, opsForList, opsForSet, opsForZSet


# class hierarchy
## RedisCacheManager
interface: InitializingBean, CacheManager
abstract class inherit: AbstractCacheManager <- AbstractTransactionSupportingCacheManager
class inherit: <- RedisCacheManager (inner: RedisCacheManagerBuilder)






















