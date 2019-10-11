# liquibase
source control for database

changelog file: databaseChangeLog file, support xml, ymal, json, SQL
## change set
trace change execution unit, use author,id,claspath/filepath
  - when liquibase run, find changeSet that already executed, and execute changeSets that not yet executed
  - after run, insert row include author/id/filepath; save changeSet MD5 to databaseSearchLog

### fields
id, author, dbms: eg. mysql/oracle/mssql
runAlways: each time run if true
runOnChange
context: runtime if context change then run
runInTransaction
failOnError

`<rollback>`: set what rollback do

```xml
<changeSet id="1" author="bob">
  <createTable tableName="text_table">
  <rollback>
    DROP TABLE TEST_TABLE
  </rollback>
</changeSet>
```

## preconditions
changeSet running condition
```xml
<preConditions>
  <dbms type="oracle">
  <runningAs username="SYSTEM" />
</preConditions>
```

## contexts























