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







