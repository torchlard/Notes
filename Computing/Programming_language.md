# keyword
## Program Errors
trapped error: cause program to stop
untrapped error: execute even after error

## Forbidden behaviors
include all untrapped errors, may also include trapped error

# types
## strong VS weak type
strong: all program well behaved, no forbidden behaviors
weak: eg. overflow in C (trapped errors); weaker type checking, more implicit

## dynamic VS static type
dynamic: runtime refuse ill behaviors
static: compile time refuse ill behaviors

### static: implicit VS explitic
explicit: type is part of syntax
implicit: type deduced by compiler

## example
no type: assembly
weak,static: C/C++
weak,dynamic: PHP
strong,static: Java,C#
strong,dynamic: Python, Scheme
static,explicit: Java,C
static,implicit: Ocaml,Haskell


















