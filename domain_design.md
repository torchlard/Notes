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




