# change tracking
records DML changes made (insert, update, delete, metadata)

# overview
table stream take initial snapshot of every row in source table

when first stream created, pair of hidden column added to source table
- use small amount of storage

cannot track changes in materialized views

## types
### standard
tracks all DML change
  - perform join on inserted and deleted rows in change set

### append-only
tracks row inserts only, update and delete operations not recorded
- much more performant than standard stream for ELT

### insert only
tracks row insert only, do not record delete operations that remove rows from inserted set












