### principles
1. model immutable state in algebraic data type
2. model behaviors as functions in modules, separate state from behavior
3. behaviors operate on types that ADT represent

equational reasoning: demonstrate some properties of the model and verify the correctness

### reactive
responsiveness: bind latency to a limit acceptable to users

1. responsive to user interaction: bounded latency
2. resilient: responsive to failure
3. elastic: responsive to varying load
4. message-driven: loose coupling, async msg passing

instead of including exception handling logic within application code,
  place them in separate module that handles failure
=> use centralized ahndler

events: messages that encapsulate a domain concept

### domain event
domain event: before and after action done
self-tracing models: domain event logs make out model traceable at any point in time

- uniquely identifiable as type
- self-contained as behavior
- observable by consumer: event consumed for further action by downstream component
- time relevant: monotonic time for event stream

### ADT
define structure of data in model

## algebraic approach
adv: 
1. loud and clear
2. compositionality
3. verifiability: by defining laws of algebra

## step
1. algebra-based API design -> subset of functionality
   - behavior evolved independently using types of objects as contracts

try[Account] abstracts evalution of `open` operation
monad to compose effectful operations

algebra: refer to types that form the contract but not implementation
  you have no idea what your type Account, Balance look like, or how you'll implement 
  behavior of debit or credit, but complete implementation of function is done

## strategy
Option is the minimal error checking type for use
Try and Either are more expressive that can give reason it fails

## problem with pattern matching
1. expose object representation: anti-modular
2. can't define custom patterns for matching
-> consider using Scala's Extractor pattern

when create aggregate, API responsible to ensure domain rules honored

## lens
plain `a.copy` doesn't scale with increasing level of nesting objects
- lens need to be parametric on type of object `O`, field to update `V`
  - `case class Lens[O,V] (..)`
- 1 lens per field
- getter to access current value of field `get: O => V`
- setter take an object and new value, return new object `set: (O,V) => O`

### reader monad
- decomplects implementation
- make implementation more domain friendly
- dependency injection: defer injection of concrete repository implementation, make design more modular
- make unit testing easy

may need to inject multiple repositories / another service / some configuration parameter
-> can combine all dependencies into single environment type

# functional patterns
two distinct parts
1. algebra: completely generic and reusable code
2. interpreter: context-specific implementation that varies across all instances

## details
it is found implementations make use of fold => use Monoid 
define Monoid for Money 

abstraction over context
`List[A]` provides an effect of repetition of elements of type A
`Option[A]` model effect of uncertainty
`Try[A]` provide effect of reification of exceptions

Applicative functor VS Monad
- shape of computation preserved that all context get executed, execution of one not depend on success of another context
- applicative: need to make independent set of computation
- monadic effect: have graph based on conditional executoin, need to fail first

1. apply function with custom behavior at point of application
- eg. flatMap apply `A => F[B]` to `F[A]` and then flattens `F[F[B]]` to `F[B]`
2. power of funciton composition over additional structure (effects)
- Kleisli composition: `f: A=>F[B]` compose with `g: B=>F[C]` gives `A=>F[C]`
3. automatic failure handling

principle: use least powerful abstraction that works for your use case

can also create special-purpose monads by subtyping to extend Monad trait
Scala can use parametric polymorphism, subtype polymorphism

name concept once, implement it once, reuse code forever

for dynamically typed languages, it enforce constraints in runtime checking,
for static typed languages, have many additional options (get free tests by type constraints)

## higher kind
(*->*): List[_]
(*->*->*): Map[_,_], Function1[_,_]
  given a type, then another, produce final type

eg. List[String]

covariant functor: Functor[F[_]] : ((*->*)->*)

# module
## cretiria 
1. specific and well-defined: each module with specific functionality
2. cohesive: loose coupling with each other
3. never expose implementation details -> only publish well-formed algebra to clients
4. module as first class construct -> compose to form larger module
5. have proper name

## published algebra
Name: AccountService
Operation names: open, close, debit, credit
Trait as the container: define operations and mixin composition
type aliases
parameterized: define module with parameterized types
compositionality: all operation return type AccountOperation
implementation independence: module definition has no implementation details
make collaboration explicit: type definition make it explicit you use dependency injection

good to commit to specific implementation as late as possible =>
  only part that model use module implementation is end-user application
  - if implementation leaks out, modules become coupled with each other

## aggreagate modules at bounded context
in reporting context, Account is value object; in other context, Acccount is entity
bounded context smaller models within larger model
- single coherent data and domain model
- completely different semantics with other bounded context
- min coupling

## communication
anticorruption layer: set up explicit layer of communication between 2 bounded context
provide isolation between 2 components -> no uncontrolled communication across context
messaging: natural mapping for types, decouple in space and time -> use protocol

## free monad
after having algebraic data types, define multiple interpreters, each with its own semantics of execution
features
- behaviors as pure data forming closed ADT
- strict separation between creation of computation and execution
- execution come in form of interpreters, have multiple

### theory
Free monad = normal form of monad 
  - for any monad, can be written in constructor by free monad
  - eg. 1+1 -> Add (Lit1) (Lit1)
then we can give any interpretation to the language
=> separate Monadic DSL and monadic interpretation to this DSL

DSL {say, ask}
```haskell
do
  say "hello"
  say "who are you?"
  name <- ask
  say ("nice to meet you, " ++ name ++ "!")
```
interpretation
```
say = putStrLn
ask = getLine
```
to ensure DSL constructed is direcly a Monad, no need to define it

# reactive
async as a stackable effect
combine two effects disjunction (\/) and Future

to handle error reporting, one way is to stack along with already existing effect (List)
  you can't throw exception as it violates referential transparency

Future: from standard library, no dependency
Task: clear separation between description of computation and its execution
  - can control degree of nondeterminism
  - eg. instead of sequences of binds, execute in parallel, return first completed ...
  - work on constant stack space

## async msg
asynchronous boundary between
eg. application/bounded context, threads, actors, CPU multiple cores, network nodes

Account Management (Generator context): push account info as msg
-> Message queue ->
Reporting and Analytics (consumer context): consume msg and populate reports

## stream model
challenges
- continuous flow of information
- solitary look: see data once
- storage issue
- back pressure handling

essential criteria
- async
- non-blocking
- elastic for handling back pressure
- compositional

### Akka Stream
- source: pipeline starts `Souce[+Out, +Mat]`
- sink: pipeline ends `Sink[+In, +Mat]`
- flow: where transformation of data take place `Flow[-In, +Out, +Mat]`
-> 1 source, few Flows, 1 sink (Source -> Flow* -> Sink)
- RunnableGraph: multiple Flow structures can be presented between Source and Sink, form junctions
    -> can be Broadcase, Merge

steps (~ experience using tensorflow)
1. set up source
2. split the stream into substreams
   - split stream based on account number (determined by groupBy), have validation beforehand
3. end at a sink
   - run netting computation over each substream, do with fold over Subflow
   - finally materialize into Sink to get RunnableGraph
   - Akka used bunch of actors for materializing computation
4. run the computation

back-pressure handling: Sink keep Source updated about the throttle that it can sustain at this time

## actor model
actor offer model of computation based on message passing between entities
  any entity can send msg to actorm, which receive msg in its mailbox
- process msg from head of its mailbox
- create new actors
- update its state information
- send msg to other actors

### primary features
1. async message based: msg send to actors usually typed immutable entities 
  - need define receive loop handling all types of msg
2. single thread of execution
  - actor process 1 msg at a time
  - can have mutable state within actor
3. supervisor hierarchies
  - can define parent-child relation between actors
  - when child actors fails with exception, parent decide whether to restart child
4. can send msg to anywhere
5. finite state machine: can change behavior of actor dynamically by `become` method

### drawbacks
1. actors are not type safe, since it need the power to change states and dynamically serializable
2. actors don't compose (lack of referential transparency), type `PartialFunction[Any,Unit]` is all about side effects
3. actor generally not good choice for designing end user API
  - actor ok for like track max valued debit transaction

general recommendation prefer Futures to actors

### bounded context
reliable msg system between bounded context

akka allows supervision to be implemented as separate architectural construct within model
define hierarchy within actor dedicated for handling any exception that occur within child actors

### with functional domain model
- protect shared mutable state
- resilience (elasticity): use actor as coarse abstraction
  - actors are dispatchers that delegate all domain behaviors to pure functional implementation
- use type model from Akka Stream, use actor implement those API

<<<<<<< HEAD
## implementation
front office & back office
- serialize to binary: to make transformation efficient, serialize into byte stream
- group and log: grouped logging in batches for optimization
- write to reactive socket for transmission (can handle back pressure)
- parse and split data on comma delimiter
- convert record to domain model objects
- `ActorSubscriber` summarizer abstract Akka Stream
- periodically log netted transaction

## supervison

```scala
val decider: Supervision.Decider = {
  case _ : FormatException => Supervision.Resume
  case _                   => Supervision.Stop
}
```

persistent actor: ensure all internal states of actor persisted in permanent storage in incremental fashion
  - append-only store, neven copy data => event sourcing

remove mutation bottlenect

Responsive <- resilience --> server resilience by clustering, failure resilience by supervision, data by persistence
           <- elasticity --> reactive stream, back pressure
           <- message driven --> use actor

fully mutable database, loose
1. query for history of change
2. roll back system for debug
3. start system afreash from zero

separate to read, write models
read can scale linearly, write cannot (shared mutable state)

### command query responsibility segregation (CQRS)
command: change application state, domain validation
encourage separate domain model interface for dealing with commands and queries

database level: separate write, read
domain-model level: separate commands and queries

### event sourcing
model database writes as streams of events
can roll back and obtain snapshot of aggregateat any time

domain event: record of domain activity
event generated only after some activity

characteristics of event
1. ubiquitous language: eg. name AccountOpened, AccountService
2. triggered: event generated from execution of commands
3. publish-subscribe: can subscribe to specific event stream
4. immutable: event modeled as ADT
5. timestamped: event occured at specific time

new instance: check if already been created
if work with existing aggregate, create instance from event store / latest version from snapshot store
do all business validation 

## event store
core storage medium for all domain events
selecting appropriate store
store events indexed by aggregate ID
- get list of events 
- put an event
- get all events

## distributed CQRS
event stores replicate
- across multiple locations
- nodes across single location
- process across single node

use protocol preserve causality between events
may not need distribution of service for multiple bounded context
- keep dta store local to your bounded context, ensure service only access from store

design each bounded context as independently managed and deployable unit => microservices
each context have own technique of data management

## implementation
1. define algebra for events
2. define command as free monad over event
3. use algebra of events in interpreter to do command processing 
   -> all effects within interpreter, event append to event log
4. define suitable read model (projection)

events are just serialized functions
FRM, not ORM

# Summary
1. think in expression
  - eg. function generate value by evaluating for-expression
2. abstract early, evaluate late
  - computation = abstraction over value, Try = abstract over failure, 
  - Try / scalaz.\/ = abstract outcome of operation 
3. use least powerful abstraction that fits
  - abstract level: applicative < Monad
4. publish what to do, hide how to do within combinators
  - combinator: andThen 
5. decouple algebra from implementation
  - multiple implementation for one algebra
  - traits-based modular, type class, free monad, interpreter
6. isolate bounded context


# event sourcing
## problem
reliably/aotmically publish event whenever state changes

## solution
persist state of business entity (eg. Order, Customer) as sequence of state changing events
saving event is single operation => atomic
events persist in event store, has API to add and get entity's events

instead of storing data in Order table => store as sequence of events, 
  CustomerService subscribe to order events and update its own state

## advantage
100% reliable audit log
avoid object-relational impedance mismatch problem

## drawbacks
difficult to query -> use CQRS to implement query

# CQRS
## problem
how to implement query in microservice architecture?

## solution
split to command-side (create, update, delete requests), emit events
query-side: handle queries by executing them against >=1 materialized view
-> kept update by subscribing to stream of events emitted

            | <-- command side
event store |
            | --> query side (MongoDB) <- get xx
            | --> query side (ElasticSearch) <- get xx
            | --> query side (Neo4j) <- get xx

# stateful computation
## motivation
low latency, data locality
client talk to same machine, store some data temporarily

## strategy
Gossip protocol | Consensus system
Availability <-----> Consistency

1. random placement (write anywhere, read everywhere)
2. consistency hashing 
  - may have hot spot problem
3. distributed hash table [Orleans]

reloading state

=================================================

# Entity
identified by identifier, not attributes
ensure uniqueness of object
1. continuous life cycle
2. various states not determined by its attributes
- can be persistence, contain domain logic

## problem
if everything in system traced by ID, will be very inefficient

# Value object
describe object without identifier
after value object instantiated -> represent some design element
- immutable
- can reference to entity (eg. route is value, ref to 2 cities and 1 road)
- no identifier

## feature
relation among value objects is meaningless
- just as temp object to pass parameter / complement to entity

## problem
if value change too frequently, should make value object mutable

# Service
service emphasize relation with other objects
abstract, well-defined actions
1. not natural part of entity / value object
2. interface defined by others elements in domain model
3. action is stateless

## application level service
notification

## domain level service
cehck boundary


# Module
high internal coupling, low extenal coupling
evolve with domain model


# Aggregate
in real world relation amon objects are very complex, difficult to restrict
abstract model -> reference -> collection of related objects
- each aggregate has 1 root, 1 boundary

1. root entity has global identifier -> check rules
2. within boundary entity has local identifier -> only unique within aggregate
3. external object from aggregate can only ref to root entity, not internal objects
4. external obj can temporarily keep ref to internal objs
5. only aggregate root can access DB

put entity & value obj separately in aggregate, define each aggregate's boundary
in each aggregate, choose an entity as root
- control access by root entity


# Factory
when creation of object or whole aggregate very complex / expose too much internal structure
-> use Factory to package
- manage start of lifecycle

responsibility of domain level to create complex objects
many design pattern:
- factory method, abstract factory, builder ...

1. every creation method = atomic method
2. can add optional elements after construction
3. abstract class, not create concrete class

## entity factory, value object factory


# repository
for all persistent object, part of them must be accessible based on object attributes
use repository to package solution, turn focus back to model
- manage middle & end of lifecycle

adv
1. provide simple model to get persistent object, manage lifecycle
2. decouple domain design and persistence technology
3. object access design

## why not DAO?
DAO has loosely defined interface
people continuously add method to DAO interface => huge DAO

## repository pattern
think of repository as collection of things
use `query()` method, pass criterion to repository, let repository to find this obj/objs 
  that satisfy my criteria in its own way
- repo may generate sql against DB if it's backed by DB table
- 
### specification pattern
simple predicate that take domain object, return boolean


# Bounded context
same meaning within boundary

# Context map
mapping between systems
## shared kernel
common system among 2 groups of people

## customer/supplier
one system depend on another system

### conformist
if upper system not cooperate, then lower system has to chase upper system

## anti-corruption layer
if upper system not friendly, but lower system has to depend on it
-> use transport + resolver (anti-corrupt)
- lower effect of upper system

## open host service
open service for public access

## separate way
mutual independent

micro-service = anti-corruption + open host service (RESTful)
















