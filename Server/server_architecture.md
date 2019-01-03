# architecture
## blocking single process
very poor performance
simple

## blocking multi-process
context-switch cost

## blocking multi-threading multi-process
not much difference compared to multi-process
introduce dead-lock, race condition

## non-blocking event driven
single loop checking
ignore context-switch, process copy
no dead lock

complicated program

## non-blocking coroutine
simplest coroutine = generator
process that can halt, and resume later

all happening in same thread
coroutine ~ micro-thread

coroutine switching controlled by programmer

















