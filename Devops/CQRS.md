# CQRS (command query responsibility segregation)
command side: receive all insert,update,delete commands
Query side: read only

since command and query has own Repository, eg. C side RMDB, Q side NoSQL

CQRS has limitation, suitable for read >>> write

## principle
CQRS not imply working with microservice / messaging infrastructure / DDD / events
just do projection from write data => read data (1 write model, N read model)

## concurrency
simplify concurrency and locking (transactional db) management
often DDD-oriented: data from aggregates carefully defined


### projecting events
events can be created by anything, eg. scheduler
choose event sourcing or not
1. update aggregate state independently of event
2. create new state of Aggregate by playing event on current state

kafka allow consumer to replay past events, catch up present
if not building aggregate from event, not event sourcing

Smart engppoints, dump pipes

## write db
event store database
system of records, transactionally-consistent state
- as book of record, "current truth" fo system
- 
## read db
built db off of event log in strong consistent / eventaully-consistent
- just older/cached representation of what real data used to look like


# CQRS read model
shared mutable state should be avoided as much as possible 
=> limit writes to single t hread
single-threaded writer + ACID transactions

thread responsible for applying events to read model
doesn't matter what it look like, can evolve alot, no pressure

## push or pull?
pull: query repeatedly for new events 
push: notification that wake up read model as soon as events saved

## restarting projection
since view model completely derived from event log
if sth wrong, easier to just start from beginning
can even fully automate recreate DB schema

## performance
single-thread write, multi-threaded read

# write model
every attribute in write model should have a business rule
just need to protect write model


# Event
## Event VS commands
Command: with origin and fixed destination
  - defined in consumer domain
Event: intentless, just broadcast to world 
  - decrease coupling between systems
  - defined in producer domain
  
## internal events 
produced and consumed by domain

tends to be normalized, contains mostly referneces (IDs)
refactor model without altering events

## external events
consumed by other domain we don't control
public consumption, often denormalized (contain name, addr, no verisons)

## event-carried state transfer
include state of aggregate alongside own event









