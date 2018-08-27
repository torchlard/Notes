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









