
## micro partitions
traditional warehouse rely on static partitioning of large tables
  - manipulated independently using special DDL
=> maintenance overhead, data skew

snowflake use micro-partitioning, overcome known limitations
all data auto divided into micro-partitions -> contiguous units of storage
  - between 50MB and 500MB of uncompressed data
groups of rows mapped into individual micro-partitions, organized in columnar
  - size and structure allow extremely granular pruning of very large tables
  - can up to millions, hundered M micro-partitions

stores metadata about all rows stored in micro-partition
  - range of values for each columns in micro-partition
  - number of distinct values
  - additional properties for optimization, efficient query processing

### benefit
derived automatically, no need explicit
enable extremely efficient DML, fine-grained purning
can overlap in range of values
columns compressed individually within micro-partitions
  - determine most efficient compression algorithm for each micro-partition

### DML
all DML operation take adv of metadata, simplify table maintenance
  - eg. deleting all rows = metadata-only operations

### qeury pruning
enable precise pruning of columns at query runtime
eg. query acces 10% of value range = scan 10% micro-partitions

not prune micro-partitions based on predicate with subquery

# data clustering
data sorted/ordered along natural dimensions: "clustering"

clustering metadata collected and recorded for each micro-partition
avoid unnecessary scan of micro-partitions

1. prune micro-partitions not needed for query
2. prune by column within remaining micro-partitions


### clustering depth 
average depth ( >= 1) of overlapping micro-partitions for specified columns
smaller avg depth, better clustered table wrt. specified columns
  - minitoring clustering health of large table
  - determine whether large table benefit defining clustering key

no micro-partition = clustering depth 0
if query performance degrades over time, table no longer well-clustered

### SYSTEM$CLUSTERING_INFORMATION
```sql
select SYSTEM$CLUSTERING_INFORMATION('<table_name>', '("<col_name>")')
```
average_overlaps: high number indicate table not well-clustered

### selecting clustering keys
large enough num of distinct values to enable effective pruning 
small enough num of distinct values group rows in same micro-partitions

if want to use column very high cardinality,
recommend defining key as expression on the column
=> reduce cardinality

### reclustering
periodic/regular reclustering of table required to maintain optimal clustering 
use clustering key to reorganize column data

reclustering use more storage (old micro-partitions marked delete)
to enable time travel and fail safe

## automatic clustering
can suspend / resume automatic clustering
```sql
ALTER TABLE ... SUSPEND / RESUME RECLUSTER
```



# tip
ordering columns from lowest to highest cardinality
  => faster pruning on table










