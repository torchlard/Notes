# install & upgrade
I have similar problem, I've upgraded on Ubuntu 16.04 from MongoDB 3.4 to 3.6 but I missed this important step

db.adminCommand( { setFeatureCompatibilityVersion: "3.4" } )

Then I must downgrade to 3.4 to do it and then upgrade to 3.6 again. Here is the detail steps:

1. Uninstall 3.6

Backup /etc/mongod.conf
Backup /etc/apt/sources.list.d/mongodb-org-3.6.listed (rename or move it to another folder)

sudo apt-get update
sudo apt remove mongodb-org-mongos mongodb-org-server mongodb-org-shell mongodb-org-tools

2. Re-install 3.4
Check folder /etc/apt/sources.list.d/ to see if this file exists or not: mongodb-org-3.4.list. 
If it does not exist, you can re-create by this command:

echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.0.5 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.5.list

then install by apt-get
```
sudo apt-get update
sudo apt-get install -y mongodb-org
mongod --version
sudo systemctl start mongod
```
In my case the command systemctl start mongod return error Failed to start mongod.service: Unit mongod.service not found I resolved by these commands:

sudo systemctl enable mongod
sudo service mongod restart
sudo service mongod status

3. Execute very important command
After downgrade to 3.4, run this

mongo
MongoDB shell version v3.4.10
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.10
> db.adminCommand( { setFeatureCompatibilityVersion: "3.4" } )
{ "featureCompatibilityVersion" : "3.4", "ok" : 1 }
> exit

4. Upgrade 3.6 again
Restore this file /etc/apt/sources.list.d/mongodb-org-3.6.listed

sudo apt-get update
sudo install mongodb-org-mongos
sudo install mongodb-org-server
sudo install mongodb-org-shell
sudo install mongodb-org-tools

Restore /etc/mongod.conf. Now, MongoDB 3.6 started without any problem


echo "deb [ arch=amd64,arm64 ] deb https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list


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