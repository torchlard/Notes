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


# Data Vault
combine normalisation and dimension model benefit

## raw fault 
where source data stored, unchanged

## staging layer
handle batch/streaming

## reporting layer
designed for reporting, cleansed and secured

## data lake
store data files for ad hoc use, data exploration

## central table (hub)
store key code, eg. client no, id
pick stable business keys

## link table
3NF multi to multi relation
hubs connected by link table

## satellite table
hub and link table carry no descriptive attributes
always type 2 form

## reference table
lookup code

## example
hub: customer no, metadata
hub: order no, metadata
link: customer no, order no
satellite: customer name, customer phone, customer address, metadata
satellite: order date, order amount, metadata
reference: currency code, currency description


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


蜈蚣事实表: 一张事实表中有太多维度的事实表
  eg. 也有建模师将日期相关的日期ID、月ID、年ID都放入事实表中
disadv: 存储空间的大量增长

事实表相关的维度在15个以下为正常，如果维度个数超过25个，就出现了维度过多的蜈蚣事实表
=> 自己核查，将相关的维度进行合并，减少维度的个数。

系统记录域：这部分是主要的数据仓库业务数据存储区，数据模型在这里保证了数据的一致性。

内部管理域：这部分主要存储数据仓库用于内部管理的元数据，数据模型在这里能够帮助进行统一的元数据的管理。

汇总域：这部分数据来自于系统记录域的汇总，数据模型在这里保证了分析域的主题分析的性能，满足了部分的报表查询。

分析域：这部分数据模型主要用于各个业务部分的具体的主题业务分析。这部分数据模型可以单独存储在相应的数据集市中。

反馈域：可选项，这部分数据模型主要用于相应前端的反馈数据，数据仓库可以视业务的需要设置这一区域。

# layers
ODS > ------- DW ------> ADS
       DWD, DWM, DWS

## ODS (operational Data store)
layer closest to data in data source
save raw data in original form
数据仓库源头系统的数据表通常会原封不动地存储一份
准备区, simple cleaning


## DW (data warehouse)
将一些数据关联的日期进行拆分，使得其更具体的分类，一般拆分成年、月、日，
而ODS层到DW层的ETL脚本会根据业务需求对数据进行清洗、设计

### DWD (data warehouse details)
data cleansing, standardize
eg. clear null, dirty data, out of range data

### DWB (data warehouse base) / MID / DWM (data warehouse middle)
store objective data, normally use as intermediate layer 

light synthesis and summary statistics of production data of DWD
mid integration layer fine-grained for analytical application stat 

### DWS (data warehouse service)
aggregate data for certain topic
result as wide table, for OLAP, business request

## ADS (application data service)
provide data for product and analysis
normally stored in mysql, ES




## DA
1. transactional data
2. Fine report
3. ad-hoc analysis
4. OLAP




























