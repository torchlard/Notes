# dbSchema jdbc
jdbc driver capable to execute native mongodb queries
return resultset with single object 

call method from jdbc driver DatabaseMetaData.getTables(), getColumns()
to deduce logical structure of db, presume collections are storing similar documents
- deduce virtual schema by scanning rundom documents form each collection
- num of scanned document set using scan=<fast|medium|full>

embed Rhino javascript engine inside driver to execute native mongodb queries
- each time parse and run as js 

`jdbc:mongodb://username:password@host1:port1/datbase?options`

## sample
db.mycoll.find()

1. MongoPreparedStatement start Rhino js engine, pass query to engine
2. engine receive object WrappedMongoDatabase()
  - wrap around native MongoDatabase object
3. most methods requrie bson object

db.mycoll.find({'age': 12}) => db.mycoll.find(Bson bson)









