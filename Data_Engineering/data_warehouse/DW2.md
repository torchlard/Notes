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


# dimension design process
1. select business process
- business process generate / capture performance metrics translate into facts in fact table
- expressed as action verbs
- typically supported by operational system
- triggered by input, result in output metrics

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
answer question "What is the process measuring ?"



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
a dimension table that has multiple valid relationships with a fact table
eg. a fact table can have several dates, each represented by foreign key to date dimension
eg. Date Dim can use to fetch order_placed_date, order_shipment_date, order_closure_date

reuse same dimension, save time and memory space

roles: each foreign key have independent dimension views


## junk dimension
transaction profile dimension
create single junk dimension to collect miscellaneous, low cadinality flag and indicator

| txn successful | txn failed | no cash | invalid pin | no balance |
|----------------|------------|---------|-------------|------------|
| 1              | 0          | 0       | 0           | 0          |
| 0              | 1          | 1       | 0           | 0          |
| 0              | 1          | 0       | 1           | 0          |
| 0              | 1          | 0       | 0           | 1          |


## snowflaked dimensions
when hierarchical relationship normalized, low-cardinality appear as secondary table
- characteristic multilevel struture
- should avoid snowflake because difficult to understand

## outrigger 
dimension can contain reference to another dimension table
eg. bank account dimension -> dimension of date account openedd

outrigger dimension: 2nd dimension reference
use with caution, correlation between dimensions should be demoted to fact table


# integration
## conformed dimensions
dimension table conform when attr in separate dimension table have same column names and domain content

conformed dimensions reused across fact tables, single dimension shared by multiple fact tables
any change to conformed dimension should not break one of dimensional stars

## shrunken dimensions
conformed dim that subset of rows and/or columns of base dim
capture data at higher level of granularity

## drilling across
make separate queries against >= 2 fact tables

## value chain
identify natural flow of organization's primary business processes
each process produce unique metrics at unique time intervals, granularity

## enterprise data warehouse (EDW) bus architecture
incremental approach
decompose DW/BI planning process into manageable pieces by focusing on business processes
- standardized conformed dim reuse across processes
- technology and database platform independent

## enterprise data warehouse bus matrix
design and communicate, high abstraction and visionary planning DW architecture

EDW built on bus architecture identifies and enforces relationship 
between business process metrics (facts) and descriptive attributes (dimensions)



# slowly changing dimension (SCD)
## type 0: retain original
dimension attr never change

## type 1: overwrite
old attr value overwritten with new value
reflects most recent assignment => destroys history


| id  | name  | salary | office             | effective_Date |
|-----|-------|--------|--------------------|----------------|
| 123 | Vivek | 10000  | Gurgaon -> Houston | 10-8-2013      |

useful when
- correct data
- no business need to keep historical values

## type 2: add new row
add new row in dimension with updated attr value

| id  | name  | salary | office     | from_Date | to_date    | curr_flag |
|-----|-------|--------|------------|-----------|------------|-----------|
| 123 | Vivek | 10000  | Houston    | 10-8-2013 | 9-1-2015   | Y         |
| 123 | Vivek | 40000  | Gurgaon    | 10-1-2015 | 24-7-2015  | N         |
| 123 | Vivek | 40000  | California | 25-7-2015 | 12-12-2009 | N         |

## type 3: add new attribute
add new attribute in dimension to preserve old attr value
alternate reality, rarely used

| id  | name  | salary | current_office | historic_office | from_Date |
|-----|-------|--------|----------------|-----------------|-----------|
| 123 | Vivek | 10000  | Houston        | Gurgaon         | 10-8-2013 |


## type 4: add mini dimension
use history table to store all historical dimension records
history table add start_Date and expiry_date for historic values
original dimension (latest snapshot) only keep current dimension

suitable for rapid chaning dimensions

latest snapshot dimension
| id  | name  | salary | office  | effective_Date |
|-----|-------|--------|---------|----------------|
| 123 | Vivek | 10000  | Houston | 10-8-2013      |


history table
| id  | name  | salary | office     | from_Date | to_date    |
|-----|-------|--------|------------|-----------|------------|
| 123 | Vivek | 10000  | Gurgaon    | 10-8-2013 | 9-1-2015   |
| 123 | Vivek | 40000  | California | 10-1-2015 | 24-7-2015  |
| 123 | Vivek | 40000  | Houston    | 25-7-2015 | 12-12-2009 |


## type 5: add mini dimension and type 1 outrigger
preserve historical attr value
embed type 1 ref to mini dimension

must overwrite type 1 mini-dimension reference whenever current mini-dimension assignment change

## type 6: type 1+2+3
original column: id,name,salary,office

| id  | name  | salary | current_office | historic_office | from_Date | to_date    | curr_flag |
|-----|-------|--------|----------------|-----------------|-----------|------------|-----------|
| 123 | Vivek | 10000  | Houston        | Gurgaon         | 10-8-2013 | 9-1-2015   | Y         |
| 123 | Vivek | 40000  | Houston        | California      | 10-1-2015 | 24-7-2015  | N         |
| 123 | Vivek | 40000  | Houston        | Houston         | 25-7-2015 | 12-12-2009 | N         |


## type 7: dual type 1, 2 dimension


# dimension hierarchy
denote how data organised at various levels of aggregation
identify various trends at 1 level, 
drill down to lower levels to detect causes for these trends
roll up to higher levels to see effects trend have on whole business

## fixed depth positional hierarchies
have fixed set of levels, levels agreed upon names

eg. date can be represented into >=2 formats: 'day-month-year', 'day-quarter-year'
easily represented by single date dimension

eg. represent geographical hierarchy would be difficult
'address_line-city-state-country'
'address_line-zone-city-state-country'

## slightly ragged variable depth hierarchy
range in depth is small, not fixed
eg. geographical only has 3-6 levels

can force-fit into fixed depth positional design

## ragged variable depth hierarchy (bridge table / pathstring attr)
num of levels not fixed, range of depth large enough to complicate traversing of hierarchy tree

difficult to model and query in relational db
limited support for recursive parent/child relationship


# fact table technique
## surrogate key
implement PK for all dimension tables

fact table surrogate keys not associated with any dimension
1. as single column OK
2. serve as immediate identifier without navigating multiple dimensions 
3. allow interrupted load process
4. less risky insert + deletes

## centipede fact table
should be avoided

some go for normalized dimensions, each level many-to-1 hierarchy
- include all foreign keys in fact table
- too many low-cardinality dimension table rather than creating junk dimension


## numerical value fact / dim ?
standard list price of product

fact: primarily for calculation purpsoe
dim: predominantly for filtering and grouping

## multiple currency fact
fact table record financial transactions should contain columns
- true currency of tx
- single standard currency throughout fact table

standard currency value created in ETL process by approved business rule for currency conversion


## multipass SQL avoid fac-fact join
impossible to control cardinality of answer set 


# Retail Sales (case study)













