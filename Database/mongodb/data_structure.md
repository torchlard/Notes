# concept
## format
bson = binary format of json

## _id
always first field, as primary key

options:
- auto generate ObjectId
- auto incrementing number
- generate UUID in application code
- driver's BSON UUID facility

## data structure
String, Integer, Boolean
Double
Min/Max keys: compare a value with max & min of BSON element
Arrays
Timestamp, Object, Null
Symbol: basically equivalent to String
Date
ObjectID
Binary date
Code: store JS code
Regular Expression

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
