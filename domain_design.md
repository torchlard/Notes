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
















