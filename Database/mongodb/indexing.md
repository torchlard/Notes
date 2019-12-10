# index
auto create index on _id; each index need >= 8kB
mongo use B-tree index

## command
show index usage
```js
db.ag_bet.aggregate([ 
    { $indexStats: {} }    
]).toArray()

db.authors.getIndexes()
```

drop index
`db.accounts.dropIndex({ "tax-id": 1})`
remove all index
`db.accounts.dropIndexes()`

control index use
`db.people.find({zipcode: {$gt: "63000"}}).hint({ zipcode: 1})`

view execution stat for specific index
```js
db.people.find(
   { name: "John Doe", zipcode: { $gt: "63000" } }
).hint( { zipcode: 1 } ).explain("executionStats")
```

## single field field
`db.records.createIndex({score: 1})`
`db.records.createIndex({"location.state": 1})`

for single field, sort order not matter, can traverse index in either direction

## compound index
cannot create index for hashed index type
index sort order matters

`db.events.createIndex({ "username":1, "date": -1})`
can support {username:-1, date:1}, {username:1, date:-1}
cannot support {username:1, date:1}, {username:-1, date:-1}


`db.events.createIndex({ "username":1, "date": 1})`
can support {username:1, date:1}, {username:-1, date:-1}
cannot support {username:-1, date:1}, {username:1, date:-1}

## multikey index
create index key for each element in array
`db.coll.createIndex({ <field>: 1/-1})`

- cannot create compound key of 2 arrays
- if compound multiple key already exists, cannot insert doc violate restriction

### multi key bound
bound of index scan define portion of index to search during query
`a:[[3,Infinity]], b: [[-Infinity, 6]] `
if mongodb cannot compound 2 bounds, always constraint index scan by leading field (this case a)

### WiredTiger
if query specifies multiple predicates on indexed scalar field of compound multikey index
- will intersect bounds for the field

### MMAPv1
cannot combine bounds for scalar field for compound multikey index

## text index
a collection can have at most 1 text index

## hashed index
maintain entries with hash value of indexed field
support sharding using hashed shard keys
- use hashed index of field as shard key 
any single field support, collapse embedded docs; not support multi-key (ie. arrays) indexes

`db.collection.createIndex({_id: "hashed"})`
- hash index + non-hashed index both exist

## TTL index
special single-field index use to auto remove docs from collection after certain time
ignore compound indexes
`db.eventlog.createIndex({"lastModifiedDate": 1}, {expireAfterSeconds: 3600})`

## unique index
enforce uniqueness for indexed fields
single/compound index 
cannot use on field already with duplicated data, cannot use on hashed index
only 1 missing value for unique field

## partial index
only index document in collection that meet specified filter expression
```js
db.restaurant.createIndex(
  {cuisine: 1, name: 1},
  { partialFilterExpression: {rating: {$gt: 5}}}
)
```
only index documents with rating > 5
if search for doc with rating < 5, cannot use partial index
more expressive than sparse index

Cannot create multiple version of index that only differ in options
if apply both partial and unique option, unqiue constraint only applies to documents that meet filter expression

## case insensitive index
caes insensitve index not affect result of query for special collation, but increase performance

assume there exists names ("Betsy","BETSY","betsy")
```js
db.names.find({
    first_name: "betsy"
}).collation({ locale: 'en', strength: 2})
```
return result: "Betsy","BETSY","betsy"

## sparse index
only contains docs that has indexed field, even contains null
`db.address.createIndex({"xmpp_id": 1}, {sparse: true})`

if both sparse and unique index true, allow insert multiple null indexed field

## background building index
`db.people.createIndex({zipcode:1}, {background: true})`
db remains available during index building

use incremental approach slower than normal "foreground" index build
- if index > available RAM, then take much longer

## index intersection
can employ multiple/nested index intersection to resolve a query

create index: `{ status: 1 }, { ord_date: -1 }`
can support 
```
{ status: {$in: ["A","P"]}},
{ ord_date: {$gt: new Date("2014-02-01")}, status: {$in: ["P","A"]} }
{ ord_date: {$gt: new Date("2014-02-01")}}
```

# Indexing strategy
consider
1. kinds of query expect
2. ratio of reads to writes
3. amount of free memory in system

ensure index fit in RAM, avoid reading index from disk

