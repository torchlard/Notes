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


# index
indexes are a big mapping (big dict)
set of labels -> integer locations

any series of data can be converted to an index

## under the hood
tons of lookup => Klib
super fast dict implementation specialized for each type
pull out entire ndarray worth of values without bubbling up to Python level

## getting data
CSV
  - specialized reader read subset of cloumns and handle comments/headers
  - iterate over possible dtypes, try convert each one on all rows

Excel
  - use external library, take adv of hinting
  - use TextParser Python internals


# data frame data structure
data split into blocks by type under the hood

BlockManager 
- handles translation between dataframe and blocks
- manage indexes
- DataFrame -> high level API

Blocks 
- specialized by type
- only cares about locations
- operating within types with numpy

slicing within dtype no copy
cross dtype slicing generally requires copy

# groupby, hierarchical indexes, categorical
Klib against for fast dicts and lookups

# dtype
float | flat64
int | int64
datetime | datetime64[ns]
string
object














