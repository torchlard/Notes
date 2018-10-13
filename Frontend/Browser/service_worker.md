# service worker
## background
as proxy server sit between web application and browser and network
for better offline experience

event-driven worker, async, run in worker context
different thread from main JS thread
use heavily of promises (wait for response to come throught)

## restriction
no DOM access, in firefox cannot use in private browsing mode
cannot use XMLHttpRequest, localStorage
only run over HTTPS

## lifecycle
download -> install -> activate -> idle -> Fetch / Message
                                        -> terminated
                    -> Error

install: `self.addEventListener('install', function(event){..})`
activate: `self.addEventListener('activate', function(event){..})`

register using `ServiceWorkerContainer.register()` 
first time downloaded to client, after that download every 24 hours (at least)
installation run when downloaded file is new
after new worker installed, worker waiting, activate when no page using old service worker

activate using `ServiceWorkerGlobalScope.skipWaiting()`
existing page claimed by active worker using `Clients.claim()`

listen to `InstallEvent`, as prepare worker for usage when fires
activate event, good time to clean up old cache
worker can response to request using `FetchEvent.respondWith` event

## use case
- background data sync
- respond to resource request
- centralized update to expensive calculation, eg. geolocation, gyroscope
- dependency management, dev purpose
- hooks for background service
- custom template by URL pattern
- performance enhancement, eg. pre-fetch 
- handle push message

realted specification using service worker
- background sync
- reacting to push message
- react to time and date
- entering geo-fence (perimeter awareness)

## concept
                                 | online -> server
applicatoin -> service worker -->|
                                 | offline -> offline cache



# web worker
## background
simple means for web content to run script in background thread

worker run in another global context different frm current window
`self` repalce `window`
context: `DedicatedWorkerGlobalScope`
shared worker: `SharedWorkerGlobalScope`

data sent between workers and main threads via system of messages
send: `postMessage`, respond: `onmessage` handler

## use case
can use WebSocket, IndexDB ...
can perform IO by XMLHttpRequest
can spawn new workers, as long as worker within same origin

import scripts and libraries
`importScripts('foo.js')`

## restriction
can't directly change DOM inside worker
cannot use some default method and property of `window`

main thing can't do is directly affect parent page, have to change via message

## lifecycle
created using `Worker()`
immediately terminate worker: `.terminate()`
close: `close()`

## Shared Workers
accessible by multipel scripts, even in different windows/iframes/workers
from exact same origin (same protocol, host, port)
have to communicate via port object
`myWorker.port.postMessage(..)`

## thread safety
worker spawn real OS level threads, but very hard to cause concurrency problem
no access to non-thread safe components/DOM

data passed between main page and workers is copied (structured cloning)
objects are serialized before send, de-serialized on the other end

## content security
not governed by content security policy
prevent any scripts using `eavl`


# audio worker
provide ability for direct scripted audio processing in web worker context
















