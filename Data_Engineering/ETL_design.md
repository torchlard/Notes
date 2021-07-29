# overview
transactional DB 
-> csv,tsv,json,xxx file
-> Raw DB
-> Staging DB

raw DB: just load files, no logic

## Staging DB
cleansing, validate, merge data sources

QA: check aggregate data
eg. distinct amount of tx id remain the same

logging table track errors, ETL steps, scripts has run
record fail/success

# table naming
f_ : fact
d_ : satellite
agg_ : aggregation
snapshot_ 








