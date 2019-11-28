# IndexedDB
provide an object store in browser
not relational database, but js based Object-oriented DB
store, retrieve objects that indexed with key

# Big concepts
follow same-origin policy
async API that use in most context, including web workers

1. store key-value pair
2. built on transactional db model
  - objects represent index,table,cursor ...
  - all tied to particular transaction
  - auto-commit, cannot be committed manually
3. mostly async (~ ajax)
  - not give data by returning value
  - have to pass callback function
  - request db operation happen
4. use lot of requests
  - eg. onsuccess, onerror
  - readyState, result, errorCode
5. DOM event to notify when result available
  - always have `type` property (success/error)
  - target: where event headed (eg. IDBRequest)
  - sucess event: no bubble up, can't be cancelled
  - error event: bubble up, can be cancelled
6. object oriented
  - require you create object store
  - simply persist js object that store

# defnitions
## database
reppo of information, >= 1 object stores
name, current version

## durable
readwrite transaction fired only when all data guaranteed flushed to disk
  - relax durability guarantee to increase performance

## object store
how data stored in db
  - optionally have key generator, key path

## version
when db first create, version = 1
  - only 1 version at a time
  - open db with greater version 

## db connection
can have multiple connections at same time

## db transaction
can have several active transactions at a time, 
so long as writing transactions don't have overlapping scopes

expect to be short-lived, browser can terminate transaction that takes too long
- can abort tx, roll back changes made to db

modes: readwrite, readonly, versionchange

## index

## key
type: string, date, float, binary blob, array

### key generator
way to produce new key in ordered sequence

### in-line key
key stored as part of stored value

### key path
where browser should extract key from in object store / index

## value
everything that can be expressed in JS

## scope
set of object stores and index which a transaction applies
read-only tx: can overlap scope, execute at same time
write tx: scope cannot overlapp
if several tx same scope at same time, queue up & execute one after another

## cursor (IDBCursor)
way to iterate over multipple records with key range


# limitation
1. not all langs sort in same way
2. not designed to take care sync server-side db
3. no equivalence of LIKE in SQL

## wipe out db
1. user request
2. private browsing mode; at end of session, browser wipe out db
3. disk limit reached
4. data corrupted




# methods
## add
return transaction object (IDBTransaction) containing `objectStore` method, which can use to
access the object store

```js
// if need read-write mode
// don't open read-write mode unless necessary, will slow down
const transaction = db.transaction('store-name', 'readwrite')
transaction.add(...)
```
in separate thread creat structured clone of value
listen for transaction's `complete` event to determine if add operation success

only












