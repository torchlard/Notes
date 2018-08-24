# fundamentals
# compile & run
sbt run under config build.sbt


## import
no need to import within same package

if naming conflict, need to import sth from root of project: prefix with _root_
eg. import _root_.users._

# syntax
## final
cannot be override

#type
## sealed trait
extended only in same file
alternatives to enums
use when number of possible subtypes is finite and known in advance
```scala
sealed trait Answer
case object Yes extends Answer
case object No extends Answer
```

## sum type
in scala ADT means sum type
eg. Cat | Dog

# function
## currying
when method with fewer number of parameter lists => 
  yield function taking missing parameter

# type-level programming
`stronger your type system more flexibility you get`

instead of values we produce types
2 types of param: value, type parameter
type can constrain program to become more correct

# getter, setter
|-- declaration -- | -- getter -- |-- setter --|
| var | yes | yes |
| val | yes | no |
| default | no | no |

## w/wout ()
with (): 
  signal user method has side-effect
  there are no parameter and method access mutable state 
    only by reading field

without (): 

## override
need to override concrete method from superclass, `override` is necessary
avoid accidental overrides which could happen with mixing composition

## to trait or not
concrete class: 
1. if behavior not reused
2. efficiency is very important

trait: 
1. might be reused in multiple, unrelated class
2. no idea

abstract class: 
1. inherit from it in Java code
2. distribute it in compiled form, expect outside groups to write class inherit from it

## new
```scala
// use new keyword when refer to class's own constructor
class Foo {}
val f = new Foo

// omit new if refer to companion object's apply method
class Foo {}
object Foo {
  def apply() = new Foo
}
  // both are the same
val f = Foo()
val f2 = new Foo
```

# return
scala will infer what you return in function, usually last sentence

## constructor
constructor overloading
```scala
class Student(name: String){
  def this(name: String, age: Int){
    this(name)
    println(name+" "+age)
  }
}

var s = new Student("Rama", 100)
```

Anything place within class body other than method definitoin, is part of primary constructor

# Future
container for values that may not yet exist
value supplied concurrently => async, non-blocking code
use with combinator flatMap, foreach, filter

## flatMap
flatten and then map
```scala
val nest = List(List(1,2), List(3,4))
nest.flatMap(x => x.map(_ *2)) // List(2,4,6,8)
```

# Reactive Stream
standard for async stream processing with non-blocking back pressure
JDK9: java.util.concurrent.Flow
## goal
minimal set of interface, methods, protocols
govern exchange of stream data across async boundary - passing elemetns on to another thread / thread-pool
  while ensuring receiving side not forced to buffer arbitary amounts of data
allow queures mediate between threads to be bounded





# error
## value a is not a member of Object
```
val gods = Seq(god1, god2, god3)
gods(0).a
```
since god1,god2,god3 are from different class, they cannot be put into same seq/list.



