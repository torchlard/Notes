
# Cloud Bigtable
extremely high throughput, low latency
High performance, only makes sense for >1TB

Client -> front end server pool 
-> Node (Cloud Bigtable cluster) -> SSTable [Shared Log]

Node handle cluster requests
- no data stored on dnoe except metadata to direct request
- replication and recovery very fast

## configuration
must configure nodes
entire bigtable project called instance
Node grouped into cluster
auto-scaling storage

sync data between clusters

### replication
sync data between cluster
add/remove nodes and cluisters with no downtime
change disk type need new instance

cbt tool / HBase Shell

## data organisation
Only One big table
thousands of columns / billions of rows
table is sharded across tables

row key: first column, only column indexed
columns grouped into column families
field promotion: move fields from column data to row key

proper schema design

## schema design
keep all entity into a single row
relevant entities should be in adjacent rows

reverse domain name to distribute loads
time series data: use tall and narrow table (1 event per row)
