# other engine
## archive engine
support only insert and select
best for logging and data acquisition

## blackhole engine
no storage mechanism at all
- for fancy replication setup and audit logging

## CSV engine
treat CSV as tables, not support index
copy file into and out of db while server running
write data into CSV table, external program can read it right away

## Federated engine
~ proxy to other server
open client connection to another server, execute queries against table there
- many problem, disabled by default
- successor: FederatedX

## memory engine
need fast access to data that never change / no need to persist after restart
- hold up order of magnitude faster than MyISAM
- all data stored in memory

good use
- lookup/mapping tables
- caching results of periodically aggregated data
- intermediate results when analyzing data

table level locking => low write concurrency
not support TEXT / BLOB
support fixed-size rows

## Merge storage engine
variation of MyISAM
- combine serveral MyISAM into 1 virtual table
- deprecated for partitioning

## NDB
cluster storage engine as interface between SQL and native NDB protocol

## 3rd party engine
pluggable storage engine API
### OLTP storage engine
Percona's XtraDB storage engine
PBXT, GMBH
RethinkDB for SSD


grant all privileges on *.* to 'root'@'%' identified by 'example';




