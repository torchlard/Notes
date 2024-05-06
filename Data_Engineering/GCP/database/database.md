strong consistency: parallel processes see changes in same order
eventual consistency: parallel process see change out of order

# Cloud SQL
Mysql database inside Google Cloud
structured web framework
  - direct shift of traditional MySQL workload
scaling
availability
monitoring

automate backup, replication, encryption
import and export database and CSV using mysql dump

## drawback
not support user-defined functions, super privilege


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

# AlloyDB
fully managed postgresSQL-compatible db
4x faster standard postgres, 100x faster for analytical queries







