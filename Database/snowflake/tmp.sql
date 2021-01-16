use DEMO_DB;
use WAREHOUSE COMPUTE_WH;

-- for loading data from files into snowflake tables
-- unload data table -> files
-- external stage: S3, google cloud, ms azure containers
create or replace stage CL_STAGE
  url='azure://xxx.net/xxx'
  credentials=(azure_sas_token='xxx');

list @CL_STAGE;

create or replace table "DEMO_DB"."PUBLIC"."LOOKUP" (
  postcode char(7),
  oa11 char(9),
  laua char(9),
  lsoa char(9),
  park char(9),
  environment boolean,
  isPark boolean,
  country varchar(15),
  sector char(5)
);
  
  
// This is the 'kwargs' for raw
create or replace FILE FORMAT semi_txt
                  COMPRESSION = 'AUTO' 
                  FIELD_DELIMITER = ','
                  RECORD_DELIMITER = '\n' 
                  SKIP_HEADER = 1 
                  FIELD_OPTIONALLY_ENCLOSED_BY = '"' 
                  TRIM_SPACE = FALSE 
                  ERROR_ON_COLUMN_COUNT_MISMATCH = TRUE 
                  ESCAPE = '\\' //'NONE'
                  ESCAPE_UNENCLOSED_FIELD = '\134' 
                  DATE_FORMAT = 'AUTO' 
                  TIMESTAMP_FORMAT = 'AUTO'
                  NULL_IF = ('\\N');

copy into lookup from @CL_STAGE
pattern = 'lookup.csv' 
file_format = (format_name = semi_txt)
on_error = 'continue';


copy into "PUBLIC"."LOOKUP" ("col1","col2","col3","col4") from 
( SELECT $1,$4,$5,$32
FROM @CL_STAGE/file.csv) 
file_format = (format_name = semi_txt);
--on_error = 'continue' ;
