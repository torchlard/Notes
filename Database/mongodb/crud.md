
## DBRefs
convention foir representing a document, not specific reference type
`$ref`: collection name, `$id`: _id value, `$db`: db name






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


# DBRef
3 fields wrapped up for $id field
- $ref: name of collection where ref doc resides
- $id: contains value of _id in ref doc
- $db: name of db where ref doc resides

ObjectId pointed to $ref name for collection that object id in
$db if in different db

## manual reference
including one document's _id in another document
issue second query to resolve referenced fields as needed















