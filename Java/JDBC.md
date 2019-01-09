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


# 





