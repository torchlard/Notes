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

# FAQ
- signed URL with specific expiry, provider this to 3rd party user => temporary access
- archive cloud storage for access once every 12 months
- Bastion hosts still traverse public internet
- cloud VPN would be inefficient for 90TB of data

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
