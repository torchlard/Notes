# intro
google big data stack 2.0
focus on serverless compute, real time analysis

query scale up to thousands of CPU across node
storage and compute separated, connected by petabit network

# user defined function
javascript/sql function

# load, read
CSV, json, avro, parquest

## faster - slower
Avro - compressed
Avro - uncompressed
Parquet
CSV
Json
CSV - compressed
JSON - Compressed

# optimization
## why not multiple table + wildcards?
limited to 1000 tables per dataset
substantial performance drop VS single table

## clustering
divides table read by specified column field


# optimization
IO: how many bytes read
shuffle: how much passed to next stage
how many bytes written

# streaming input
pub/sub : stream sensor data
-> Datafrlow: streaming insert transformed averages
-> BigQuery

# Logging, monitoring
metrics, performance
resource capacity/usage
- query count, times, slot utilization
- number of tables, stored, uploaded bytes over time
- Alerts on metrics

## Logging
who is doing what

not charged for batch load and export



