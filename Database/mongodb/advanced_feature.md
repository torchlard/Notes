# change stream
access real-time data changes without complexity and risk to tailing oplog
subscribe to all data changes on single collection, db / entire deployment
- use aggregation framework

must use WiredTiger
replica set, sharded cluster must use protocol version 1

## target
collection: open change stream cursor for single collection (except system, admin, local, config)
db: exclude admin, local, config
deployment: replica set / sharded cluster

```js
const changeStream = db.collection('inventory').watch()
changeStream.on('change', next => {
  ...
})

const changeStreamIterator = db.collection('inventory').watch()
const next = await changeStreamIterator.next()
```
cursor remain open until 
  - explicitly closed
  - invalidate event 
  - shared removal

## startAfter
start new change stream after specific event
by passing resume token to `startAfter` when opening cursor

can resume notification after invalidate event 

## resume token
_id value of change stream event document as resume token
_data type: hex-encoded string (v1)

## use case
save time for ETL, cross-platform synchronization, collaboration functionality, notification services

## event notification
only notifies data changes persisted to majority of data-bearing members
if operation associated with transaction, change event doc include txnNumber and lsid

## limit
response documents must adhere to 16MB BSON doc limit, notification fail if exceeds

## structure of change event
operationType: insert,delete,replace,update,drop,rename,dropDatabase,invalidate
fullDocument: doc created/modified by CRUD
ns:{db,coll}: namespace affected by event
to:{db,coll}: only for rename

documentKey: doc that contain _id created/modified 
updateDescription: {updateFields, removedFields}: describe fields update/remove
clusterTime: timestamp from oplog entry associated with event

txnNumber: only for multi-document transaction
lsid:{id,uid}: identifier for session with tx














