# oplog
in voting, will choose secondary with largest ts as new primary
## param
ts: time operation occured
h: unique ID for this operation
v: oplog version
op: 
  - i: insert, u: update, d: delete, c: db command, n: no operation
ns: namespace
wall: record timestamp
o: actual document representing the op


# log message
`<timestamp> <severity> <component> [<context>] <message>`

## check log level
`db.getLogComponents()`
`db.runCommand({getParameter:1, logLevel: 1})`

## set log level
-1: inherit verbosity of parent
0: default, include informational message
1-5: increase verbosity to include Debug messages

## severity
F: fatal
E: error
W: warning
I: informational (for verbosity = 0)
D: debug, for verbosity > 0

## components
access  : access control, eg. authentication
command : database command, eg. count
control : control activities, eg. initialization
election: msg specifically to replica set election
ftdc    : diagnostic data collection mechanism
GEO     : parsing of geospatial shapes, eg. GeoJSON
index   : indexing operations
initsync: init sync operation
network 
query   : eg. query planner activities
repl    : replica set related, eg. initial sync, heartbeats, steady state replication, rollback
repl_hb : replicaset heartbeat
rollback
sharding
storage : eg. fsync
recovery
journal 
txn     : multi-document transactions
write   : write operaitons, eg. update


# slow log
profiling











