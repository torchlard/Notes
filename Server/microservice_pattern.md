# saga pattern
example: suppose Order service + Customer service

## Choreography-based saga
1. order service create order in pending state, publishes OrderCreated event
2. Customer service receive event attempts reserve credit for that order
  - publish Credit reserved / creditLimitExceeded event
3. Order Service receive event, change state of order to either approved / cancelled

## Orchestration-based saga
1. Order service create order in pending state, create CreateOrderSaga
2. CreateOrderSaga send ReserveCredit command to Customer Service 
3. Customer Service attempt to reserve credit, send back reply
4. CreateOrderSaga get reply, send ApproveOrder / RejectOrder
5. Order Service change state of order to approved / cancelled

### benefit
no distributed transactions
maintain data consistency

### drawbacks
programming model more complex

### issues
must auto update db, publish message/event
cannot use distributed transaction that span db and msg broker

### related patterns
auto update state and publish msg/events: event sourcing, transactional outbox
publish event: Aggregates, domain events


# event sourcing
not store newest state of obj, but store all events produced by obj
by event sourcing get newest state of obj

events are immutable
optimize: create snapshot of differnet time in memory

# Aggregate
cluster of domain objs that can be treated as single unit
eg. car (aggregate root), wheel, tire

1. single obj
2. group of related objs, one as ROOT, external agent can only interact inner objs through root


# Actor model
objs cannot call each other directly, but by sending msg
each actor has mailbox, will put all msg in mailbox, then single loop manager msg in Mailbox

actor state modification is event driven, updated to newest by event sourcing


## problems in microservice
1. must implement own commit and rollback
2. request multiple times = 1 time
3. concurrency


# Axon
## core principles
1. separate business from infrastructure
business logic is about what to happen

2. components communicate through message
components interact without explicitly knowing they do so => loose coupling
CQRS

when? what? business logic related
how? which protocol? format of message? how to handle communication error?

3. location transparency
component don't need to know where that other component locate in communication
















