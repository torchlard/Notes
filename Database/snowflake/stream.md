# change tracking
records DML changes made (insert, update, delete, metadata)

## enable tracking
```sql
ALTER TABLE ... CHANGE_TRACKING = TRUE
-- OR
CREATE OR REPLACE stream xx.xx.s1 ON TABLE xx.xx.<table>
append_only = FALSE ;
```

# overview
table stream take initial snapshot of every row in source table

when first stream created, pair of hidden column added to source table
- use small amount of storage

cannot track changes in materialized views

```sql
-- query stream
select * from xx.xx.<stream>;

-- clear stream
CREATE OR REPLACE TEMP TABLE xx.xx.reset_tbl AS 
SELECT * FROM xx.xx.<stream>;

-- detect change
select SYSTEM$STREAM_HAS_DATA('xx.xx.<stream>')
```

## types
### standard
tracks all DML change
  - perform join on inserted and deleted rows in change set

### append-only
tracks row inserts only, update and delete operations not recorded
- much more performant than standard stream for ELT

### insert only
tracks row insert only, do not record delete operations that remove rows from inserted set

# change clause
alternative to stream, not consume offset

# permission
Database: USAGE
Schema: USAGE
Stream: SELECT
Table: SELECT





