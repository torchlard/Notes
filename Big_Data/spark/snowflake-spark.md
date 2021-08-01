# type mapping
| Spark         | Snowflake                   |
|---------------|-----------------------------|
| ArrayType     | variant                     |
| BooleanType   | boolean                     |
| DateType      | date                        |
| DoubleType    | double                      |
| IntegerType   | integer                     |
| TimestampType | timestamp                   |
| StringType    | char, clob, object, varchar |

# data transfer
## internal transfer
temporary location created and managed internally/transparently by Snowflake

1. upon connect to snowflake, init session in snowflake, creates internal stage
2. connector use stage to store data while transferring to its destination
3. at end of session, connector drops stage, removing all temp data in stage

## external transfer
use storage location, usually temp, created and managed by user

# query pushdown
optimal performance by avoiding reading lots of data / transferring large intermediate results between systems













