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


# Inversion of control (IoC)
trials
1. new instance
2. factory pattern decouple component and service implementation, declaration

## problem
1. direct ref cause dependency, need recompile
2. component rely on may not be complleted since parallel development
3. hard unit test, need run all config
4. need copies of service instance, distribute across system
5. init param different
6. init process use lot of resource

## dependency injection
Inversion of Control = methodology
Dependency injetion = implementation of IoC

convention:
1. caller create object instances
2. caller run instance methods by object

DI:
1. other component create object instances
2. caller run those instances directly

target: loose coupling

## service locator
another implementation of IoC

1. service provider bind interface and implementation
2. register service instance to service container
3. dependency injection / service interface / alias to get instance
4. call instance method





