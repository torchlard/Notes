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
## constructor
priamry constructor in class (..), many secondary constructor
`init` block for constructor init code

## data class
- primary constructor at least 1 param, param must mark as var/val
- data class cannot be abstract,open,sealed,inner

public boolean JDBC.AgGameType.equals(java.lang.Object)
public java.lang.String JDBC.AgGameType.toString()
public int JDBC.AgGameType.hashCode()
public final java.lang.String JDBC.AgGameType.component1()
public final java.lang.String JDBC.AgGameType.component2()
public final java.lang.String JDBC.AgGameType.component3()

public final java.lang.String JDBC.AgGameType.getName()
public final void JDBC.AgGameType.setName(java.lang.String)
public final java.lang.String JDBC.AgGameType.getPlatformType()
public final void JDBC.AgGameType.setPlatformType(java.lang.String)
public final java.lang.String JDBC.AgGameType.getCode()
public final void JDBC.AgGameType.setCode(java.lang.String)

public final JDBC.AgGameType JDBC.AgGameType.copy(java.lang.String,java.lang.String,java.lang.String)
public static JDBC.AgGameType JDBC.AgGameType.copy$default(
  JDBC.AgGameType,java.lang.String,java.lang.String,java.lang.String,int,java.lang.Object)

public JDBC.AgGameType()
public JDBC.AgGameType(java.lang.String, java.lang.String, java.lang.String)
public JDBC.AgGameType(java.lang.String,java.lang.String,java.lang.String,int,
  kotlin.jvm.internal.DefaultConstructorMarker)


## sealed class
restricted class hierarchy, 
a value can have 1 type from a limited set, cannot have any other type
- extension of enum class

## extensions
extend class with new functionality without inheritance or design pattern like Decorator
extension functions are dispatched statically
- not virtual by receiver type
- method call determined by type of expression, not by result type of evaluating expr at runtime
- if both member function and extension same signature, member always win



# generic
## in Java
use-site variance
generic types are invariant => List<String> is not subtype of List<Object>
`? extends E` method accept collection of object E or subtype of E
- can safely read E, but cannot write to it (Don't know what subtype)
- wildcard with upper bound makes type covariant

for max flexibility, use wildcard types on input param that represent producers/consumers

```java
interface Soruce<T> { T nextT(); }

void demo(Source<String> strs){
  Source<Object> objs = strs; // NOT allowed in Java
}
```
## in kotlin
declaration-site variance
annotate type param T, it only returned from member of Source<T>, never consumed
```kt
interface Source<out T>{ fun nextT(): T }

fun demo(strs: Source<String>){
  val objects: Source<Any> = strs
}
```
class Source is covariant in parameter T, T is covariant type param
class Source being producer of T's, not consumer
`out`: variance annotation; only produce never consume
`in`: contravariance annotation; only consume never produce

## kotlin use-site variance
type projection: `from` is restricted(projected) type
correspond to `Array<? extends Object>`, only get()

```kt
fun ccpy(from: Array<out Any>, to: Array<Any>){
  assert(from.size == to.size)
  for(i in from.indices)
    to[i] = from[i]
}
```

## star projection
situation: know nothing about type argument, still want to use in safe way

`Foo<out T: TUpper>` T is covariant type param
`Foo<*>` == `Foo<out TUpper>` T is unknown, can safely read value of TUpper from `Foo<*>`

`Foo<in T>` T is contravariant type param
`Foo<*>` == `Foo<in Nothing>`

`Foo<T : TUpper>` T is invariant param with upper bound TUpper
`Foo<*>` == `Foo<out TUpper>` for reading value, `Foo<in Nothing>` for writing values

star-project like safe version of Java's raw type

## generic function
fun <T> T.basicToString(): String



# field
## Backing field
fields cannot be declared directly in kotlin class
can be referenced in accessors using `field` identifier
cannot ref to itself, since circular dependency on field itself

```kt
class Klass {
  var a : Int = 0
    get() = field+3
    set(value) { field = value -1 }
}
```

## compile time const
const val SUBSTS: String = "This subsystem is deprecated"

## late initialized properties
lateinit var subject: TestSubject

## null receiver
extention can be defined with nullable receiver type
- can check `this == null` inside body



# visibility modifier
private: only this class
protected: this class + subclass
internal: this module
public: all (default)

## modules
set of kotlin files compiled together
- intellij module
- maven project
- gradle source set
- set of files compiled with 1 invocation of `<kotlinc>` ant task



# others
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

# kotlin standard library
living essentials with kotlin
- higher-order functions (llet,apply,use,synchronized...)
- extension function providing querying operations for collections(eager), sequences(lazy)
- utilities for string and char sequences
- extension on JDK class for files,IO,threading

## libary names
kotlin, xx.annotation, collections, comparisons
concurrent, contracts (experimental DSL for custom function contracts)
coroutines, experimental (API subject to future change)
io, js, jvm, math, native.concurrent, 
properties (delegates for delegated properties, helper fn or custom delegates)
random, ranges, reflect, sequences, streams, system, text, time


# Exception
## Checked Exception
kotlin don't have checked exception
reason: 
- don't ignore exception
- large software project with checked exception decrease productivity, no improve code quality

## Exception Class
all exception class are descendants of `Throwable`
to catch an exception, use
```
try { ... }
catch(e: Exception) {...}
finally {...}
```
## Nothing type
`throw` is an expression in Kotlin

`val s = person.name ?: throw IllegalArgumentException("Name required")`




















