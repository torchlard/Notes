# Dimensional modelling
- deliver data that's understandable to business users
- deliver fast query performance

# Normalisation
## 1NF
any table classified as relation

## 2NF
non-key attr must depend on entire candidate key

## 3NF
non-key attr must depend only on a key, but not on another non-key attr

## BCNF
no dependence among keys 
free of update, insert, delete anomaly


# star VS OLAP cube
dimensional models implemented in multi-dimensional database

## OLAP deployment
star schema is good physical foundation

OLAP cube traditionally extreme performance
- less important with hardware advancement, in-memory db, columnar db

OLAP data structure more variable across different vendors than relational DBMS
- more difficult to port BI applications between different OLAP tools

support slowly changing dimension type2
- cube need reprocessed partially / totally


OLAP: using db to understand your business
OLTP: using db to run your business


analytic power of the DW/BI environment is directly proportional to the quality and
depth of the dimension attributes


# slowly changing dimension
## type 0: retain original
dimension attr never change

## type 1: overwrite
old attr value overwritten with new value
reflects most recent assignment => destroys history

useful when
- correct data
- no business need to keep historical values

## type 2: add new row
add new row in dimension with updated attr value

add 3 column
1. row effective date
2. row expiration date
3. current row indicator

## type 3: add new attribute
add new attribute in dimension to preserve old attr value

alternate reality

## type 4: add mini dimension
a group of attributes in dimension change sufficiently rapidly

## type 5: add mini dimension and type 1 outrigger


# Date dimension
cannot populate datetime for every minute, too much
maybe consider 15-min interval
OR 1 row per minute within 24 hr period

- if no need to rollup or filter on time-of-day grouping, just handled as in fact table

keep repeated low cardinality value in primary dimension table

data involved in calculations => fact table
data involed in constraints, groups and labels => dimension table

drill down: go to more specific level, add row header
drill up: go up to more general, remove row header
drill through: allow user to pass from 1 report to another while analyzing same dataset


