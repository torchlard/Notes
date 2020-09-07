# Dataframe VS SQL
dataframe allow construct SQL statement whilst avoiding verbose and illegible nesting

naturally run things line by line in repl (even in Spark)
can viewed as high-level API to SQL routines
  - not all rendered to some SQL planner

to use SQL, imply using database
  - lot of use-cases only need bits of data for 'one-to-one' tasks (from cs, web api)
  - loading, storing, manipulating, extracting from database not viable

## adv
- use Python environment to load, clean, manipulate, visualize data
- Python very flexible and accessible to people from various backgrounds
- lower IO coase and latency than repeatedly querying database
- can apply arbitrary functions to rows and columns of data
  - instead of just functions available to Hive, Redshift
- very convenient able to go from raw data -> web presentation -> data visualization

## disadv
- store data in memory of single machine
- lack of parallel computing advantages built into queries to modern distributed databases

## SQL disadv
in SQL, need to parse whole script, jumping around to fully grasp what's happening

## use case
when speed isn't everything, want a more loose constraint






