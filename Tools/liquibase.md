# problem
1. manual update db
2. cannot share changes in db among team
3. use differnet way to update db / data
4. use manual way to manage versioning

# usage
1. create changelog file
  - can be xml/json/yaml/sql
2. create changeset in changelog file
3. use command line / build script to run change set
4. check modifications in db

## command
### update
update: update db to certain version
`updateCount <value>` apply next value change set
`updateSQL` write sql to update db to stdout

### rollback
rollback
rollbackToDate
rollbackCount
rollbackSQL

### diff
`generateChangeLog` generate new changelog when adding liquidabase to new project
`diff` write description of differences between 2 db to stdout

### maintain
`changelogSync` mark all changes as executed in db
`clearCheckSums` remove current checksums from db
`dropAll` drop all db owned by user
`status` outputs count of unrun changeset
`tag <tag>`  tag current db state for future rollback
`validate`

## param
--changeLogFile
--username
--password
--url
--driver


# liquibase
source control for database
changelog file: databaseChangeLog file, support xml, ymal, json, SQL

## principle
create 
DATABASECHANGELOG: track cheangsets not been deployed
DATABASECHANGELOGLOCK: prevent conflict from different callers' update on secondary table

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























