# run
## compile
`kotlinc hello.kt -include-runtime -d hello.jar`
`java -jar hello.jar`

compile library for use by other kotlin application
`kotlinc hello.kt -d hello.jar`

## REPL
`kotlinc-jvm`

## run as script
`kotlinc -script list_folders.kts <path>`


# call Java from kotlin
methods returning void => Unit

## keyword
some kotlin keyword is valid in Java (in, object, is ...)
``` 
foo.`is`(bar)
```
## platform type
since any ref in Java can be null, not compatible with strict null-safety in kotlin
- types from Java = platform type, null checks relaxed
- safety guarantee same as Java

`val nullable: String ?= item`  allowed, always words
`val notNull: String = item` allowed, may fail at runtime

## notation by IDE (not syntax)
T! == "T or T?"
(Mutable)Collection<T>! == "java collection of T maybe mutable or not, maybe nullable or not"
Array<(out) T>! == "java array of T, nullable or not"

## annotating type param
```java
@NotNull
Set<@NotNull String> toSet(@NotNull Collection<@NotNull String> elements) {...}
```

## mapped types
### primitive
byte <-> kotlin.Byte
short <-> kotlin.Short
double <-> kotlin.Double
...

### boxed primitive type
java.lang.Byte <-> kotlin.Byte?
java.lang.Short <-> kotlin.Short?
java.lang.Integer <-> kotlin.Int?
...

### non-primitive type
java.lang.Object <-> kotlin.Any!
java.lang.Enum <-> kotlin.Enum!
java.lang.String <-> kotlin.String!
...

### collection type
| Java type   | Kotlin read-only type | Kotlin mutable type | Loaded platform type  |
|-------------|-----------------------|---------------------|-----------------------|
| Iterator<T> | Iterator<T>           | MutableIterator<T>  | (Mutable)Iterator<T>! |
| Set<T>      | Set<T>                | MutableSet<T>       | (Mutable)Set<T>!      |
| List<T>     | List<T>               | MutableList<T>      | (Mutable)List<T>!     |
| Map<K,V>    | Map<K,V>              | MutableMap<K,V>     | (Mutable)Map<K,V>     |

### java array
int[] <-> kotlin.IntArray!
String[] <-> kotlin.Array<(out) String>!

Arrays in Kotlin are invariant, unlike Java
- cannot assign Array<String> to Array<Any>
- used with primitive datatype toavoid cost boxing/unboxing

### java generic
`Foo<? extends Bar>` <-> `Foo<out Bar!>!`
`Foo<? super Bar>` <-> `Foo<in Bar!>!`

List <-> `List<*>!` 
kotlin's generic not retained at runtime, ie. `ArrayList<Integer>` indistinguishable from `ArrayList<Character>`

### java varargs
javaObj.removeIndicesVarArg(*array)

### Object methods
all ref of type `java.lang.Object` turned into `Any`
- to make other members of java.lang.Object available => extension functions

wait()/notify()
`(foo as java.lang.Object).wait()`

getClass()
`val fooClass = foo::class.java`

## inheritance
at most 1 java class can be supertype for class in Kotlin

## reflection
reflection works on Kotlin class and vice versa
`instance::class.java, ClassName::class.java, instance.javaClass`

## Single Abstract Method (SAM) conversion
kotlin function literals can be automatically converted into implementation of Java interface 
- with single non-default method
eg. `val runnable = Runnable { println("this is runnable") }`

1. only support kotlin call java
2. only support itnerface, not abstract class

## JNI
`external fun foo(x: Int): Double`

## Operator
allow using any Java methods with right name and signature as operator overlaods and other conventions (invoke() etc)
- call java method using infix call syntax NOT allowed


# null
val mapped = value?.let { transformValue(it) } ?: defaultValueIfNull

```kt
fun theAnswer() = 42
===
fun theAnswer(): Int {
  return 42
}
```


# Type
everything is an object, we call member functions and properties on any variable

## Nubmer
numbers need explicit conversion, smaller types not subtypes of bigger ones due to different representation
eg. b.toInt()

### Unsigned integers (experimental)
UByte
UShort
UInt: unsigned 32-bit
ULong: unsigned 64-bit

### specialized class
UByteArray, UShortArray, UIntArray, ULongArray

# packages
## default imports
kotlin.*
kotlin.annotation.*
kotlin.collections.*
kotlin.comparisons.*
kotlin.io.*
kotlin.ranges.*
kotlin.sequences.*
kotlin.text.*

java.lang.*
kotlin.jvm.*

kotlin.js.*

## imports
import org.test.Message as testMessage

can import 
- class
- top-level functions and properties
- functions and properties declared in object declaration
- enum constants

## break and continue labels
```
loop@ for (i in 1..10){
  println("i = $i")
  for(j in 1..10){
    println("j = $j")
    if (j > 3) break@loop
  }
}


listOf(1,2,3,4,5).forEach lit@{
  if(it == 3) return@lit  // skip when it==3, can also use @forEach
  print(it)
}
```

# class
## cosntructor
priamry constructor in class (..), many secondary constructor



# syntax
## collection
Array<T> is mutable, but List<T> is immutable

val a = arrayOf(1,2,3)
a[0]=a[1]  //ok

val l = listOf(1,2,3)
l[0]-l[1]  //fail

val m = mutableListOf(1,2,3)
m[0]=m[1]  //ok

## with
```kt
class Turtle {
  fun penDown()
  fun penUp()
  fun turn(degree: Double)
  fun forward(pixels: Double)
}

val myTurtle = Turtle()
with(myTurtle){
  pendown()
  for(i in 1..4){
    forward(100.0)
    turn(90.0)
  }
  penUp()
}
```








# break main
in main, you can exit funciton anywhere by adding return





















