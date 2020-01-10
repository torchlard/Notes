# data model
## embedded data model
denormalized model, store related pieces of into in same db record
with MMAPv1 storage engine, impact write performance => data fragmentation
- use Power of 2 sized allocation for document growth
- documents in mongodb must < max BSON document size
max size = 16MB; to store >16MB, use GridFS API

## normalized data model
use when
- embedding result in data duplication, but no read adv
- represent more complex many-to-many relation
- model large hierarchical data set

=> `$lookup`, `$graphLookup` for relation

## operational factor, data model
if applications require update frequently cause document growth
- may refactor data model to use ref between data in distinct documents

## atomicity
operations atomic at document level
if application tolerate non-atomic update for 2 piece of data => store in separate doc

## sharding
sharding for horizontal scaling
allow user to partition a collection within db, distribute collection's doc across multiple mongod instances / shards
- use shard key partition

## large num of collections
having many collections no significant performance penalty
- each collection few kB
- single namespace file (<DB>.ns) store all metadata (index,collection) for db
- has limit on size of .ns
- limit on num of namespace

## large num of small documents
if frequently do grouping, consider "rolling up" / embedded data model
"roll up" docs into logical grouping: seq read + fewer random disk access

## storage optimization for small doc
specify value for _id explicitly when inserting doc into collection
- can store any value in _id

use shorter field names

## data lifecycle management
Time to live / Capped collections (FIFO) only store recent documents

## validation
use `$jsonSchema` for schema validate 
```js
db.createCollection("student", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name","year","major","address"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be string and required"
        },
        major: {
          enum: ["MAth","eng","CS",null],
          description: "only be one of enum"
        },
        address: {
          bsonType: "object",
          required: ["city"],
          properties: {
            street: {
              bsonType: "string",
              description: "msut be stirng if field exists"
            },
            city: {
              bsonType: "string"
            }
          }
        }
      }
    }
  }
})
```
validation during udpates and inserts, existing docs not validate until modification

validationLevel
- strict: validate all inserts and udpates
- moderate: validate insert and updates to existing docs that already fulfill validate criteria


# mongo shell method
## insert new field
db.account.update({_id:154}, {$set: {username: 'peter'}})

## import, export 
bson: `mongorestore -d testdb -c test test.bson`
json: `mongoimport -d testdb -c test test.metadata.json`

import multiple bson
`mongorestore -d <db> --nsInclude '*.bson' <src>`

import multiple metadata json
`cd <src>; ls -1 *.json | sed 's/.metadata.json$//' | while read col; do mongoimport -d <db> -c $col < $col.metadata.json; done`


## collections
aggregate()
count()
createIndex()


# account
rename user 
`db.system.users.update({"user": "<old>"}, {$set: {"user": "<new>"}})`

create user
```
use admin
db.createUser({user: '<name>', pwd: '<pwd>', roles: [
    "root"
]})
```
connection
`mongo -u <user> -p <pwd> --host <host>`

revoke role from user
`db.revokeRolesFromUser("<user>", ["root"], {})`




