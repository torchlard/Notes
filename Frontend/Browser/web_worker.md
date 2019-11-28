# web worker
object created using `Worker()` that run named Javascript file
- code will run in worker thread
- worker run in another global context different from current window
- cannot directly manipulate DOM inside worker
- can use many items under window, eg. WebSockets, IndexedDB

data sent between workers and main thread via msg
worker context represented by DedicatedWorkerGlobalScope object
- standard worker: by single script
- shared worker: SharedWorkerGlobalScope

both sides send msg using `postMessage()`
respond to msg via `onmessage` event handler

# Dedicated workers
dedicated worker only accessible by script that call it

```js
// main.js
const worker = new Worker("worker.js")
worker.postMessage(...)
worker.onmessage = e => { ... }

// worker.js
onmessage = e => {
  ...
  postMessage(...)
}
```















