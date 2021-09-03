# redis cluster
1. support node auto discovery
2. slave -> master voting
3. hot resharding
4. cluster management
5. config (nodes-port.conf) file management
6. ASK/MOVED redirect

## redis 
all redis node connect together (ping-pong mechanism)
node fail if over half master node fail
client direct connect to redis node, no proxy
redis-cluster map all physical ndoe to [0-16383] slot

node <-> slot <-> key

## redis cluster voting
1. all master involve voting, if over half think certain node fail => trigger transfer
2. cluster_state: fail (whole cluster fail)
- if any master fails, and that master no slave => cluster fail
- if over half master fail

## redis command
cluster info, nodes

cluster meet, forget, relicate, saveconfig

cluster addslots, delslots, flushslots
cluster setslot [node|migrating|importing]
cluster keyslot

```bash
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get install redis
redis-server redis.6380.conf
redis-server redis.6381.conf
redis-server redis.6382.conf

<!-- start at port 6380 -->
cluster-cli -c -p 6380
```

# 
every node with unique ID (160 bit random number)
all nodes in cluster connected using TCP with binary protocol 

- flag (master, slave)
- set of hash slots served by node
- last time ping,pong packet
- num of slave 
- master node ID (if slave)


## consistency
final consistency, not strong consistency
- async replication between master and slave nodes

## availability
not ok in minority side of network partition

## scalability
redis cluster redirect clients for given key
scale linearly


# configuration
cluster-enabled: yes
cluster-config-file: xxx.conf
cluster-node-timeout: 5000
- in ms for consider instance failing



# persistency
RDB: snapshot of db saved in binary format to dsik
AOF: save all commands with arg to AOF file


# hash slot
not use consistent hashing, but use hash slot
default distribute 16384 slot
- when set key, use `CRC16(key) % 16384`

assume 
A: 0 - 5460
B: 5461 - 10922
C: 10923 - 16383

if add node D, get some slots from each node to D
eg.
A: 1365 - 5460
B: 6827 - 10922
C: 12288 - 16383
D: 0-1364, 5461-6826, 10923 - 12287

## slave
better set slave for each master, eg. node A1, B1, C1
when B fails, B1 replace B to work
when B resume, B becomes slave of B1
if B & B1 fail same time => cluster fails







for /l %s in (0, 1, 8191) do redis-cli -h 127.0.0.1 -p 6380 CLUSTER ADDSLOTS %s
for /l %s in (8192, 1, 12287) do redis-cli -h 127.0.0.1 -p 6381 CLUSTER ADDSLOTS %s
for /l %s in (12288, 1, 16383) do redis-cli -h 127.0.0.1 -p 6382 CLUSTER ADDSLOTS %s

```bash
# for i in $(seq 5 10); do echo $i; done
redis-cli -h 127.0.0.1 -p 6380 CLUSTER FLUSHSLOTS
redis-cli -h 127.0.0.1 -p 6381 CLUSTER FLUSHSLOTS
redis-cli -h 127.0.0.1 -p 6382 CLUSTER FLUSHSLOTS

for i in {0..8191}; do redis-cli -h 127.0.0.1 -p 6380 CLUSTER ADDSLOTS $i; done
for i in {8192..12287}; do redis-cli -h 127.0.0.1 -p 6381 CLUSTER ADDSLOTS $i; done
for i in {12288..16383}; do redis-cli -h 127.0.0.1 -p 6382 CLUSTER ADDSLOTS $i; done
```

