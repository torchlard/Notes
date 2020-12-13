# search optimization service
significantly improve performance of point lookup query
  - returns small number of distinct rows

table-level property
maintian search access path
  - take time to populate data
  - work in background
when data is updated, auto update search access path to reflect changes to data

speeds only equality search

## target
table size >= 100GB
for smaller tables (<10GB), cannot improve query performance enough 

table is not clustered
/ table frequently queried on columns other than primary cluster key

query runs at least tens of seconds
one of columns accessed through query filter at least 100k-200k distinct values

not directly improve join, improve filtering rows from either table prior to join

indirectly improve view
if base table for a view has optimize, if query use selective predicate

### not support
  - external table
  - materialized view
  - column concatenation
  - analytical expression
  - cast on table columns

### data type
fixed-point number (integer, numeric)
date, time, timestamp
varchar
binary

not support: floating point, semi-structured




# clustering table
speed up range, equality search when on clustering key
table clustered on only 1 single key


# create materialized views (clustered / unclustered)
define different clustering keys on same source table / subset
  / conjunction with falttening JSON / variant data
















