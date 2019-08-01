# ODBC
open database connectivity
standard API accessing DBMS

# intro
software enable Java talk to database
gives out connection to database, impllement protocol for transferring query and result

## JDBC-ODBC bridge
type 1
use ODBC driver connect to database
- not support complete Java command
- discourage to use if pure-Java driver available
- limitd portability, performance overhead

## Native-API driver
type 2
use client-side library
- platform dependent

## Network-protocol driver (middleware)
type 3
make use of middle tier between calling program and database
convert JDBC calls directly / indirectly into vendor specific db protocol
platform-independent
pure Java driver
- middleware server provide service like caching, load balancing, logging, auditing
- single driver can handle any database if middleware support
- client driver to middleware -> database independent

## Database-protocol driver
type 4
direct call to verdor-specific database protocol
- no translation or middleware needed, improve performance
- JVM manage all aspect of connection
- drivers are database specific


# interface
Connection, Statement, PreparedStatement, ResultSet, CallableStatement
DriverManager (class)

## process
1. register and load driver
2. init connection
3. build SQL sentence
4. create statement, send sql
5. execute sql
6. handle sql result set
7. close statement and connection

when call Class.forName()
-> class will call registerDriver()
-> put Driver information in Vector of drivers
-> driver's class implement java.sql.connection

# DAO
data access object: 
- data accessor pattern: separate data access and business logic
- active domain pattern: service data -> object

components
1. DAO interface
2. DAO implementation class
3. DTO (data transfer object): Value object/domain


# Resultset
ResultSet object maintian cursor point to current row
- initially positioned before first row
- next method move cursor to next row, false if no more rows
- default not updatable, cursor moves forwawrd only

```java
Statement stmt = conn.createStatement(
  ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);
ResultSet rs = stmt.executeQuery("SELECT a,b from table2");
// rs will be scrollable, won't show changes made by others
// will be updatable
```

getter method: JDBC attempts to convert underlying data to Java type

updater method
```java
rs.absolute(5); // move cursor to fifth row of rs
rs.updateString("NAME", "ainsworth"); // update NAME column of row 5 to xx
rs.updateRow();

rs.moveToInsertRow();
rs.updateString(1, "ainsworth");
rs.updateInt(2,35); // update second column to be 35
rs.updateBoolean(3, true);
rs.insertRow();
rs.moveToCurrentRow();

```

## position
absolute(int row)
first(), last()
next(), previous()
relative(int rows)



getRow()









