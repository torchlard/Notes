# connect
sqlcmd -S localhost -U SA

# command
select DB_NAME()
go

// for each sql type in sqlcmd, to execute them, type go at the end

```sql
Create database Testdb
Restore database Testdb from disk = 'D:\Backup\xxx.bak'

Use Testdb

```

```sql
restore database  AdventureWorks2017
from disk = '/var/opt/mssql/backup/AdventureWorks2019.bak'
WITH MOVE 'AdventureWorks2017' to '/var/opt/mssql/data/AdventureWorks2019.mdf',
MOVE 'AdventureWorks2017_log' to '/var/opt/mssql/data/AdventureWorks2019_log.ldf'

restore filelistonly from disk='/var/opt/mssql/backup/AdventureWorks2019.bak'

select name from sys.sysdatabases 
```

list all tables
select * from sysobjects where xtype='U'


# config
set showplan_all on















