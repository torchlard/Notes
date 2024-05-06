# Cloud Storage
hold any format of data

- multi-regional bucket: cross region
- regional bucket: single region
- edge caching: better performance

# SQL database
ACID

# NoSQL database
eventual consistency, data integrity
scalable, high performande, not structure-limited

# monitoring
Stackdriver Logging (Audit log)

Monitoring
- performance metrics
  - disk IO, CPU usage, network

Data Transfer Appliance: from on-premise to Google Cloud Storage
SQL dump/CSV file -> cloud storage -> cloud SQL

# cloud storage connector
don't need to transfer into HDFS first
use `gs://` instead of `hdfs://`

# storage class
regional storage: 
- for interactive spark analysis / batch job >1 per month
- any workload

nearline storage
- don't require high availability

coldline storage
- long-term, less frequent access

# key concept
cannot change bucket location, but can move data to bucket in different location

## regional
data redundancy across availability zones (sync)
no replication charges

## dual-region 
200 Gbps (per region, project)
higher availability than regional, data redundancy across regions (async)
replication charges apply on write
highest storage price

## multi-region
50 Gbps 
limited performance scaling, variable performance for reads
outbound data transfer charge when reading data

# pub/sub notification for cloud storage
send info about change to objects in bucket to pub/sub
cloud function: only trigger lightweight, standalone function

# FAQ
- Storage transfer service: perform normal data transfer
- Transfer Appliance: for on-premise trasfer, not cloud to cloud, not for repeated/scheduled
- signed URL with specific expiry, provider this to 3rd party user => temporary access
- archive cloud storage for access once every 12 months
- Bastion hosts still traverse public internet
- cloud VPN would be inefficient for 90TB of data












