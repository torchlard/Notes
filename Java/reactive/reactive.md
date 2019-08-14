# Reactive aim
some opinion
1. async non-blocking programming
2. can increase performance program
3. can solve difficulties in traditional programming model

## blocking can be wasteful

## async to rescue
let execution switch to another active task using same underlying resource,
later come back to current process when async processing has finished
1. callback: not have return value, take extra callback param when result available
  - problem: callback hell, cannot compose
2. future: return Future<T> immediately, object polled until value is available
  - problem: cannot compose => use CompletableFuture


# definition
## from wikipedia
Reactive programming is declarative programming paradigm
- concerned with data stream and propagation of change
- possible to express static(arrays) or dynamic(event emitter) data streams with ease
- inferred dependency within associated execution model exists

technology
data stream: Stream
event propagation: Observable / Observer
event listener: EventObject / EventListener

## from spring 5
programming model built around reacting to change
- netwrok component react to IO, UI controller react to mouse event
- non-blocking: react to notification as operation complete / data available

## from Andre Staltz
program with async data stream
- can create data sterams of anything

# use case
## from Reactive Stream JVM
govern exchange of stream data across async boundary

## from Spring 5
generally do not make applications run faster (eg. execute remote calls in parallel)
- key benefit: scale with small, fixed num of threads and less memory
- more resilient under load since scale in more predictable way

## from reactiveX
treat streams of async event with same sort of simple, composable operations 
- free from tangled webs of callbacks
- make code more readable, less prone to bugs

## from reactor
composability and readability
- high level abstraction, rich vocabulary of operators
- nothing happens until you subscribe
- support backpressure, signal between producer and consumer


# standard
1. composable
2. lazy
3. reusable
4. asynchronous
5. cacheable
6. push / pull
7. backpressure
8. operator fusion




























