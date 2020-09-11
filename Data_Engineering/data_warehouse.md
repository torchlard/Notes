# traditional heterogeneous DB integration
wrapper/mediator on top of hetero DB
query driven

# feature
update-driven, high performance

# OLTP (online transaction procelling)
major task of traditional relational DBMS

# OLAP
major task of data warehouse system

# OLTP vs OLAP
orientation: customer VS market
Data content: current,detailed VS historical,consolidated
DB design: ER+application VS star+subject
View: current,local VS evolutionary,integrated
Access pattern: update VS read-only,complex queries


# Data cube
allow data to be modeled and viewed in multiple dimensions
- dimension tables
  - item (item_name, brand, type)
  - time (day, week, month, quarter, year)
- fact table contains measure

# conceptual modeling
## Star schema
fact table in middle connected to set of dimension tables

fact table: contain factual/quantitative data called measure about a business

dimension table: descriptive data about business

PK of fact table = composite key of all foreign keys

## Snowflake schema
sometimes dimension in star schema forms natural hierarchy
  - eg. markets within state/region/country

2 choice
1. include all information in big flat table
2. normalize tables => snowflake schema

## Fact constellation
- multiple fact tables share dimension tables
- collection of starts (galaxy schema)

for performance reason
- eg. various users require differnet levels of aggregation


# OLAP operations
## slice-dice
slice data cube to produce simple 2D table / view
  - eg. slice for product named shoes

## drilling
analyze set of data at finer level of detail
  - eg. summary report for total sales of 3 package sizes
  - breakdown of sales by color within these package sizes

## pivoting
rotate view for particular data point to obtain another perspective
  - eg. get sales of shoes by store for same month

## roll-up
take current aggregation level and do further aggegation on more of dimensions
  - equal to GROUP BY


# design data warehouse
## top down view
select relevant info for data warehouse

## data source view
expose info being captured, stored, managed by operational system

## data warehouse view
consist of fact tables and dimension tables

## business query view
see perspectives of data in warehouse 


# Data warehouse models
## enterprise warehouse
collect all information about subject spanning entire organization

## Data Mart
subset of corporate-wide data to specific groups of users
confined to selected group 
eg. marketing data mart

## virtual warehouse
set of views over operational databases
only some possible summary views may be materialized


# OLAP Server Architectures
## relational OLAP
relational DBMS to store and manage warehouse data
greater scalability

## multidimensional OLAP
array based multidimensional storage engine
fast indexing to pre-computed summaried data

## Hybrid OLAP
low level: relational
high level: array

## specialized SQL servers
specialized support for SQL queries over star/snowflake scheme


# Update View
view refreshing: make view consistent with data warehouse base tables

view maintenance policy: when view has to be refreshed

goal: materialize a small, crefully chosen set of views that can be used to evaluate most of important queries

## data refreshing frequency
depends on user needs and OLTP traffic
DW refreshed periodically

















