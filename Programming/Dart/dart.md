# concept
everything place inside variable is object
every object is instance of class
number, functions, null are objects
object inherit from `Object` class

- type annotation are optional by type inference
- support generic type eg`List<dynamic>`
- support top-level functions, top-level variables

no public,protected,private keywords, identifier start with `_` are private to library

expression: runtime values
statements: no runtime values

## default value
uninitialized variable has null value

## final, const
don't change variable: final / const
- final: set only once
- const: compile-time constant

# class
no interface keyword, all classes implicitly define an interface

# async
```dart
Future<void> printWithDelay(String msg) async {
  await Future.deplayed(oneSecond);
  print(msg);
}
```



