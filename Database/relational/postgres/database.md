# overview
objects like role,database,tablespace name defined at cluster level
stored in pg_global tablespace

Multiple database inside cluster, isolated from each other
schema: contain table, functions

## full hierarchy
cluster > database > schema > table, function

## usage
when connect to database, client must specify db name in request
not possible to access >1 db per connection


# template database
`create database` copy standard system database `template1`

`create database dbname TEMPLATE template0;`

can create additional template database
















