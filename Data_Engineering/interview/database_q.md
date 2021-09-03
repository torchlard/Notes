# normalization type
1NF: all rows unique
2NF: non-key attr fully dependent on primary key
3NF: non-key attr not transitively dependent on PK

# view VS data independence


# CTE VS subquery


# what is normalisation
avoid duplicate and redundant data
each normal form describe how to get rid of some specific problem

# adv NoSQL over RDBMS


# ACID
A: atomic
C: consistency
I: isolation, transaction will not be changed by any other concurrent tx
D: durability, once tx committed, changes persisted permanently in db

# Primary key vs unique key
PK: uniquely identify row, no NULL
  - only 1
  
unique key: prevent duplicate values in a column
  - allow NULL
  - allow multiple

# when to use clustered or nonclustered index
## clustered index
- if want to select multiple column values, records already sorted, 
  - SELECT faster when select other column 
- primary key ideal candidate for clustered index


## non-clustered index
speed up search operations, located in a separated location

- when you need to create multiple indexes on your db
- if only select certain column
- insert/update faster with non-clustered, no sorting required
- use additional disk space
- 

# update schema without downtime
need at least 2 instances of db server

add table









