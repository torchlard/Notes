# consumer
## consumer group 
set of consumers cooperate to consume data from some topics
partitions of all topics divided among consumers in group

group member may change =>
rebalance group: partitions re-assignmed so that each member receives proportional share of the partitions

older: depend on ZooKeeper for group management
newer: uses group protocol built into Kafka itself

one of broker designated as group's coordinator
- responsible for managing members and partition assignment

coordinator of each group chosen from leaders of internal offsets topic
`__consumer_offsets`: store committed offsets
- group id hashed to one of partitions in topic

when consumer starts up
- find coordinator of group
- sends request to join group
- begin group rebalance
- each member must send heartbeats to coordinator
- if exceed session timeout, kick member out and rebalance

## offest management
1. consumer receive assignment
2. determine initial position for each assigned partition
3. when group first created, before any msg consumed, position set according to `auto.offset.reset`

consumer read msg from partition
- must commit offset corresponding to msg it has read
- if consumer crashed/shutdown, partitions re-assigned to another member
  - begin from last committed offset of each partition

by default consumer configured to auto-commit offsets
- give 'at least once' delivery
- guarantees that no msg will be missed, but duplicates possible

auto-commit works as corn with period `auto.commit.interval.ms`
if want to reduce window for duplicates, can reduce auto-commit interval




