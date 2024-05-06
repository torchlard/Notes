# Cloud Bigtable
NoSQL, key-value, wide column
extremely high throughput, PB scale, low latency
High performance, only makes sense for >1TB

welcome migration (Dataflow) from Apache HBase, Cassandra
 
## good for
each value typically no larger than 10MB
- time-series data
- marketing data
- financia data
- graph data
- internet of things data

## architecture
Client 
-> front end server pool 
-> Node (Cloud Bigtable cluster) 
-> SSTable [Shared Log]

Node handle cluster requests
- no data stored on node except metadata to direct request
- replication and recovery very fast

# configuration
must configure nodes
entire bigtable project called instance
Node grouped into cluster
auto-scaling storage

sync data between clusters
single cluster instance provide strong consistency
more than 1 cluster eventual consistency

## replication
sync data between cluster, only 1 cluster no replicate
add/remove nodes and clusters with no downtime
change disk type need new instance

# data organisation
Only One big table
thousands of columns / billions of rows
table is sharded across tables

row key: first column, only column indexed
columns grouped into column families
field promotion: move fields from column data to row key

bigtable stores mutation sequentiall and compact them periodically
- remove table no longer needed when compact

proper schema design

## schema design
keep all entity into a single row
relevant entities should be in adjacent rows

reverse domain name to distribute loads
time series data: use tall and narrow table (1 event per row)

## time bucket 
each row represent a bucket of time, eg. hour/day/month
bucket size depends on queries plan to use on data size limits 


# encryption
by default encrypted using Google's default encryption

# FAQ
- HDD is more suitable for storing > 10TB data
- create separate project for dev/test, staging and production. Migrate relevant data between projects when ready for next stage
- a bigtable instance support up to 10k write queries per second per node

# example
asia#india#mumbai


