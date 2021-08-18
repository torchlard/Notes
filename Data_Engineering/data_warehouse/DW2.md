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


# facts, dimension schema
## adv
1. easier to understand and ngvigate
2. performance benefits
3. extensible to accommodate change, no built-in bias 

atomic data has the most dimensionality

can add new facts to fact table, assuming level of detail consistent with existing fact table

# Kimball's DW/BI architecture
## operational source system
capture business's transactions
little / no control over the content and format of data 

## ETL
extraction: read, understand source data, copy data needed into ETL system
T: cleasing, combining data from multiple source, dedup data
loading: physical structuring and loading of data into presentation area's target dimensional model


## Presentation Area 
where data is organized, stored, made available for direct querying by user, analytical BI applications

1. use dimensional model
2. must contain atomic data 
  - users' requirements are unpredictable and changing, must provide access to details
3. All dimensional structures built using common, conformed dimensions
4. Adherence to bus architecture
  - can build distributed DW/BI system
  - when used as framework, can develop enterprise DW in agile way


## BI applications
capabilities provided to business users
can be as simple as ad hoc query tool


# independent data mart architecture
a single department identifies requirements for data from operational source system

different department may interested in same data mart
discourage this approach
- myriad standalone point solutions

## CIF (Inmon)

 3NF database; this normalized, atomic
repository is referred to as the Enterprise Data Warehouse (EDW)

they’re frequently
departmentally-centric (rather than organized around business processes) and popu-
lated with aggregated data

## Hybrid Hub-and-Spoke and Kimball Architecture

# dimensional model
## usage
should not be designed by focusing on predefined reports / analyses
should center on measurement processes

Conformed dimensions are built and maintained
as centralized, persistent master data in the ETL system

reused across dimensional models to enable data integration and semantic consistency

## think dimensionally
lulled into focusing on set of required reports  / dashboards
=> ask yourself business process measurement events producing report / dashboard metrics

when prioritizing jobs and DW/BI roadmap, business processes are unit of work

## agile
- focus on delivering business value
- encourage close partnership with business

bus matrix => framework, master plan for agile development

with the focus on agile development
techniques, it’s “impossible” to take the time to get organizational agreement on
conformed dimensions.

bad: team worked with a small
set of users to extract a limited set of source data and make it available to solve
their unique problems.


# fundamental concepts
## dimension design process
1. select business process
business process generate / capture performance metrics translate into facts in fact table

2. declare the grain
grain is binding contract on the design
Atomic grain: lowest level at which data is captured by given business process

rolled-up summary grains are important for performance tuning
different grains must not mixed in same fact table

3. identify dimensions
dimension provide who, what, where, when, why, how context surrounding business process event
contain entry point and descriptive labels enable analysis

4. identify facts
facts measurement almost always numeric

## dimension extension
- facts consistent with grains can be added by creating new column
- dimensions can be added to existing fact table by creating new foreign key
- attr added to dimension table by creating new column

# fact table
## additive fact
can be summed across any dimensions associated with fact

## semi-additive fact
summed across some diemnsion, not all

## non-additive fact
eg. ratio

## nulls 
nulls must be avoided in fact table's foreign keys
associated dimension must have default row representing unknown / not applicable condition

## conformed facts
if same measurement appears in separate fact table
=> make sure definitions of facts identical

## types
### transaction fact table
measurement event at a point in space and time

### periodic snapshot 
summarize many measurement events occurring over a standard period

### accumulating snapshot
summarize measurement occur at predictable steps between beginning and end of a process

as pipeline progress, accumulating fact revisited and updated

## factless fact table
eg. event student attending class on given day may not recorded numeric fact
but fact row with foreign key for calendar day, student, teather, location, class well-defined

## aggregate / OLAP cube
simple numeric rollup of atomic fact table
aggregate navigation: BI tools smoothly choose appropriate aggregate level at query time

## consolidated
combine facts from multiple processes into single fact table


# dimension table
## table structure
every dimension table has single primary key column
wide, flat denormalized tables with low-cardinality text attributes

## dimension surrogate keys
1 column serving as unique PK
PK can't be operational system's natural key
- will be multiple dimension rows for natural key when changes tracked over time

natural keys maybe created by >= 1 source system
should create anonymous int PK for every dimension

## natural, durable, supernatural keys
natural keys in operational source outside control of DW/BI system
eg. employee number (natural key) may subject to change if employee resign 

durable supernatural key: new durable key must be created that is persistent, doesn't change 

## drilling down
most fundamental way data analyzed
adding row header to existing query in GROUP BY experssion

## degenerate dimension
dimension has no content except for its primary key
eg. invoice number without invoice attributes

remains valid dimension key

## denormalized flatten
resist normalization

## multiple hierarchies
many dimensions contain more than 1 natural hierarchy
day-week, day-month-year

## flags and indicators as textual attr
T/F flags, operational indicators, cryptic abbreviation
should supplement meaningful full text word 

## NULL attributes
unknown / NA in place of null

## Calendar Date
attached to virtually every fact table
eg. never want to compute Easter in SQL, rather lookup in calendar date dimension

## role-playing dimensions
eg. a fact table can have several dates, each represented by foreign key to date dimension

roles: each foreign key have independent dimension views

## junk dimension
transaction profile dimension
create single junk dimension to collect miscellaneous, low cadinality flag and indicator






