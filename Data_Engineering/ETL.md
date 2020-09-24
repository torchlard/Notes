# extraction
data extracted from source system into staging area
transformation done in staging area
  - opportunity to validate extracted data 

Data warehouse need to integrate systems have different DBMS
  - need logical data map before data extracted 

1. full extraction
2. partial extraction without update notification
3. partial extraction with update notification

## validations
data type check
remove all types of duplicate/fragmented data
no spam/unwanted data

# transformation
direct move: not require transformation

# loading
deposit information into data storage system


# ELT VS ETL
transform data before / after loading into data repository?

## ETL
any data load into OLAP data warehouse must transform into relational format before warehouse can ingest it
  - data mapping may be necessary to combine multiple data source
  - based on correlating information

continuous, ongoing process with well-defined workflow
data go through cleansing process, gets enriched and transformed

require detailed planning, supervision and coding 
take time for data to go through each stage

### adv
- allow more efficient and stable data analysis
- remove, mask, encrypt specific data field to protect privacy

## ELT
no need data staging, basic transformation in data warehouse
use cloud-based warehouse for all different types of data

transformation still necessary before analyzing data with BI platform
- data cleansing, enrichment, transform after load data into data lake

### adv
ingest anything 
transform only data you need
  - can transform data in different ways on fly
  - produce different types of metrics, eg. forecast, report
- less reliable than ETL

1. high speed
2. low maintenance
3. quicker loading























