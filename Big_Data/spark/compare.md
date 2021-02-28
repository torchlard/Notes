# spark VS pandas
spark has no indexing to access rows efficiently
  - all transformations always performed on all records

columns and rows not interchangeable like in Pandas
  - spark designed to scale in terms of num of rows, not num of columns
  - column should always limit (100x - 1000x)

Pandas: prefer wide DataFrame with differnet cols for different measures
Spark: prefer more normalized, each row specified metrics used

data model less flexible in spark
  - focus on implementing relational algebra

Spark: Good support for deeply nested data structure, eg. json
  - structs, arrays, maps
Pandas: only work with tabular data

only support vertical concat

Pandas: can do row-wise aggregation over all columns, not possible in spark

no reshaping in Spark


# spark usage
relational execution engine working on external data
elegantly picks up terms used in SQL


# Scalability
spark inherently multi-threaded, make use of all cores in machine
from beginning designed to work in large clusters






