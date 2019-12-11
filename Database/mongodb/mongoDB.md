## tree structure
![tree img](img/data-model-tree.png)

1. parent ref
```js
db.categories.insert( { _id: "MongoDB", parent: "Databases" } )
db.categories.insert( { _id: "dbm", parent: "Databases" } )
db.categories.insert( { _id: "Databases", parent: "Programming" } )
db.categories.insert( { _id: "Languages", parent: "Programming" } )
db.categories.insert( { _id: "Programming", parent: "Books" } )
db.categories.insert( { _id: "Books", parent: null } )
```
2. child ref
```js
db.categories.insert( { _id: "MongoDB", children: [] } )
db.categories.insert( { _id: "dbm", children: [] } )
db.categories.insert( { _id: "Databases", children: [ "MongoDB", "dbm" ] } )
db.categories.insert( { _id: "Languages", children: [] } )
db.categories.insert( { _id: "Programming", children: [ "Databases", "Languages" ] } )
db.categories.insert( { _id: "Books", children: [ "Programming" ] } )
```

3. array of ancestors
efficient way find descendants and ancestors of node
```js
db.categories.insert( { _id: "MongoDB", ancestors: [ "Books", "Programming", "Databases" ], parent: "Databases" } )
db.categories.insert( { _id: "dbm", ancestors: [ "Books", "Programming", "Databases" ], parent: "Databases" } )
db.categories.insert( { _id: "Databases", ancestors: [ "Books", "Programming" ], parent: "Programming" } )
db.categories.insert( { _id: "Languages", ancestors: [ "Books", "Programming" ], parent: "Programming" } )
db.categories.insert( { _id: "Programming", ancestors: [ "Books" ], parent: "Books" } )
db.categories.insert( { _id: "Books", ancestors: [ ], parent: null } )
```

4. materialized path
can add index on path
```js
db.categories.insert( { _id: "Books", path: null } )
db.categories.insert( { _id: "Programming", path: ",Books," } )
db.categories.insert( { _id: "Databases", path: ",Books,Programming," } )
db.categories.insert( { _id: "Languages", path: ",Books,Programming," } )
db.categories.insert( { _id: "MongoDB", path: ",Books,Programming,Databases," } )
db.categories.insert( { _id: "dbm", path: ",Books,Programming,Databases," } )
```
5. nested set
each node in tree as stops in round-trip traversal of tree
![tree img](img/nested-set.png)
```js
db.categories.insert( { _id: "Books", parent: 0, left: 1, right: 12 } )
db.categories.insert( { _id: "Programming", parent: "Books", left: 2, right: 11 } )
db.categories.insert( { _id: "Languages", parent: "Programming", left: 3, right: 4 } )
db.categories.insert( { _id: "Databases", parent: "Programming", left: 5, right: 10 } )
db.categories.insert( { _id: "MongoDB", parent: "Databases", left: 6, right: 7 } )
db.categories.insert( { _id: "dbm", parent: "Databases", left: 8, right: 9 } )

// find descendant of a node
var databaseCategory = db.categories.findOne({_id: "Databases"})
db.categories.find({ left: {$gt: databaseCategory.left }, right: {$lt: databaseCategory.right} })
```

## numeric model
decimal BSON type: decimal-based floating-point format, provide exact precision
`NumberDecimal()`

scale factor: convert to monetary value to 64-bit integer (long BSON type)

## non-numeric model
1 field exact monetary value as non-numeric string ,
1 field binary-based floating-point (double BSON type)

## time
store times in UTC by default, convert any local time representations into this form

## DBRefs
convention foir representing a document, not specific reference type
`$ref`: collection name, `$id`: _id value, `$db`: db name




# mongo shell method
## insert new field
db.account.update({_id:154}, {$set: {username: 'peter'}})

## import 
bson: mongorestore -d universe -c test test.bson
json: mongoimport -d universe -c test test.metadata.json

## collections
aggregate()
count()
createIndex()



# ~sql operation
## select
```sql
select id,name 
from db.universe 
where (id in (40, 35)) OR name = "Denamrk"
order by id DESC
limit 10
```
=>
```js
db.universe.find({
  $or: [
    {"id": {$in: [40,35]}},
    {"name": "Denmark"}
  ]
}, {"id":1, "name":1} )
.sort({"id": -1})
.limit(10)
```

## insert
- insert, insertOne, insertMany

## update
- updateOne, updateMany
```
db.people.updateMany(
   { age: { $gt: 25 } },  // condition
   { $set: { status: "C" } }  // set value
)
```

## save
update(): update existing value in document
save(): replace old document with new one

## delete
- deleteOne, deleteMany

delete from people
=> db.people.deleteMany({})

delete from people where status="D
=> db.people.deleteMany({ status: "D" })





# SQL <=> MongoDB
database              = database
table                 = collection
row                   = document / BSON document
column                = field
index                 = index
table joins           = `$lookup`, embedded documents
primary key           = primary key
select into new_table = `$out`
merge into table      = `$merge`
transactions          = transactions

mysqld = mongod
mysql  = mongo

# operator
## String
`sql: xx like '%x' => { $regex: /x$/i }`

## between
```
$and: [ {"age": {$gt:20}}, {"age": {"$lt":60}} ]
  ===
"age": {$gt:20, $lt:60}
```
## field operations
`$expr: {$lt: ["$num", "$age"]}`

## computational filter
```
$expr: {
    $lt:[ {
      $cond: {
          if: { $gte: ["$qty", 100] },
          then: { $divide: ["$price", 2] },
          else: { $divide: ["$price", 4] }
        }
    }, 5 ] }
```

## array
exact match: `{arr: [1,2]}`
contains all: `{ arr: {$all: [1,2]} }`
contains any: `{arr: { $elemMatch: {$gt: 3}}}`
match size of array: `{arr: {$size: 2}}`

### get first
```
find({ arr: {$gte: 3} }, {"arr.$": 1 })

// get first 2 elements of arr
find({arr: {$gte: 3}}, {arr: {$slice: 2}})
// get last 2 elements 
find({arr: {$gte: 3}}, {arr: {$slice: -2}})
// offset 1, take 2
find({arr: {$gte: 3}}, {arr: {$slice: [1,2]}})
```

## unwind
expand array to rows
```json
{
  "jane": "jane",
  "likes": ["golf","racquetball"]
}
==>
{ "jane": "jane", "likes": "golf" }
{ "jane": "jane", "likes": "racquetball" }
```

## special
`$exists`: whethere document has specific field






## concurrency
takes following locks:
- read phase => every 100 documents : read lock
- insert into temp collection => single write : write lock 
- output collection not exist => create output collection : write lock
- output collection exist => output action : write lock (global, block all operations)



## single purpose aggregation operation
db.people.count()

`select distinct sex from people`
==> `db.people.distinct("sex")`


# database
switch to (create if not exists) db: `use testdb`
`show dbs`
show collections

## drop db
use testdb; db.dropDatabase()




























