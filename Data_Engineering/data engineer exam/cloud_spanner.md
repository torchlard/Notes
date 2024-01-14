# intro
new sql, similar bigtable
fully managed, highly scalable

achieve both consistency and scalability
not direct replacement for MySQL

## structure
multiple node
storage as DB1, DB2, shared across zone
each node up to 2TB

same sql dialect
tables as parent/child tables
interleave data layout

# migration from mysql
1. convert schema and data model
2. translate sql queries
3. migrate application to use Spanner in addition to MySQL
4. bulk export data from mysql, import data into Spanner using Dataflow
5. Maintain consistency between both db during migration
6. Migrate application away from mysql

# import, export
move bulk data into or out using Dataflwo

# other
provide compute and storage in >= 1 regions
strongly consistent across regions


# FAQ
- unique ID for each record as primary key, secondary indexes for both fields
- add indexes when you create table






