# SOLID
in OOP, SOLID is combination of 5 design principle -> more flexible, understandable, maintainable
## Single responsibility principle
class only have 1 responsibility == 1 reason that cause change
## Open/closed principle
software entity open for extension, closed for modification
## Liskov substitution principle
object are replaceable with instances of subtypes without altering correctness of that program
## Interface segregation principle
client-specific interface better than 1 general-purpose interface
## Dependency inversion principle
depend upon abstractions, not concretions


# RxJava
## components
1. represent data source
2. listen to data source
3. modify and combine data

## motivation
in android environment, async is everywhere, from Activity, fragment to network request
very tedious if written in nested callback in Java
## theory
when start listening to data source, it will start/stop certain operation
operations can be sync/async
response only two outcome: success/fail
implement traditional Observer pattern

we should write code between model and async data source, as state arbiter

## code
Flowable, Observable -> can produce same kind of data, 0-n data/null
