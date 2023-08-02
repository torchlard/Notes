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

# Managed Database
## Cloud SQL
structured web framework
  - direct shift of traditional MySQL workload
scaling
availability
monitoring

# Cloud Datastore 
key-value, semi-structured 
NoSQL/non relational db

not for:
- analytics, extreme scale, ACID, 0 latency

single datastore database per project

## structure
Kind (table) > Entities (row)
Property (Column)
Key (Primary Key)

## query
entity kind, filter, sort order
Google query language

## indexing
queries get result from indexes
built-in or composite index config

default: create entry for every possible combination of property value


# Cloud Spanner: RDBMS



# Cloud Storage: unstructed data
# BigQuery: large data analytics



SQL dump/CSV file -> cloud storage -> cloud SQL









