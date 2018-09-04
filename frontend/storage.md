# IndexedDB
provide an object store in browser
not relational database

## methods
### transaction
return transaction object (IDBTransaction) containing `objectStore` method, which can use to
access the object store

```js
// if need read-write mode
// don't open read-write mode unless necessary, will slow down
const transaction = db.transaction('my-store-name', 'readwrite')

```

### add
in separate thread creat structured clone of value
listen for transaction's `complete` event to determine if add operation success












