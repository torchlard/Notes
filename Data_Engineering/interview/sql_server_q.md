# 2 auth mode 
windows mode
mixed mode: enable both windows auth and SQL Server Auth

# SQL profiler
system admin to monitor events in SQL server

# recursive procedure
```sql
CREATE PROCEDURE [dbo].[Fact] ( @Number Integer, @RetVal Integer OUTPUT)
AS
DECLARE @In Integer
DECLARE @Out Integer
IF @Number != 1
  BEGIN
    SELECT @In = @Number – 1
    EXEC Fact @In, @Out OUTPUT - Same stored procedure has been called again(Recursively)
    SELECT @RetVal = @Number * @Out
  END
ELSE
  BEGIN
    SELECT @RetVal = 1
  END
RETURN
GO
```

# local VS global temp table
local: visible when there's connection, deleted when connection is closed
golobal: visible to all user, deleted when connection create it is closed

`create table ##<tablename>`

# subquery
- no order by
- enclosed in ()

single/multiple row return

# trigger


# IDENTITY column
make column auto incremental

# CDC
change data capture: capture data has been changed recently













