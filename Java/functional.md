# behavior parameterization
situation: filter apples by different combination of criteria
  eg. by size, weight, color ...
1. use predicate  
```java
// strategy design pattern
public interface ApplePredicate {
  boolean test(Apple apple);
}

public class AppleHeavyWeightPRedicate implements ApplePredicate {
  public boolean test (Apple apple){
    return apple.getWeigth() > 150;
  }
}
// abstract criteria
static List<Apple> filterApples(List<Apple> inventory, ApplePredicate p) {
  List<Apple> result = new ArrayList<>();
  for(Apple apple: inventory){
    if(p.test(apple))
      result.add(apple);
  }
  return result;
}

```

# Predicate
```java
// Integer: type of input; Output type = Boolean (always)
Predicate<Integer> p1 = i -> i>3;
Predicate<Integer> p2 = i -> i>10;

p1.and(p2).test(8); // false
p1.negate().test(5); // false

Predicate<Integer> p4 = Predicate.isEqual(3);
p4.test(3);   // true


```

# Function 
functional interface, single in, single out

Rule:
pure higher order functions MUST BE static methods in Java!

```java
void m1(Integer a, Function<Integer,String> f){
  System.out.println(f.apply(a));
}
Function<Integer, String> f1 = s -> "Hi I am "+s ;
m1(3, f1);    // Hi I am 3


Function<Integer, Integer> times = i -> i*2;
Function<Integer, Integer> squared = i -> i*i;

times.compose(squared).apply(4);  // (4^2)*2 = 32
times.andThen(squared).apply(4);  // (4*2)^2 = 64

```

# Consumer
accept input to function, return nothing

```java
Consumer<Integer> c1 = i -> System.out.println("hi "+i)
Consumer<Integer> c2 = i -> System.out.println("hierr "+i)
// hi 3
// hierr 3
c1.andThen(c2).accept(3);

```

# Supplier
kind of generator
```java
Supplier<Double> s1 = () -> Math.random()*10;
Stream.generate(s1).limit(10).forEach(System.out::println);
// OR
Stream.generate(() -> Math.random()*10).limit(10).forEach(System.out::println);

// example
IntSupplier randomPorts = () -> MIN_PORT + random.nextInt(PORTS_IN_RANGE);
return IntStream.generate(randomPorts)
                .limit(MAX_PORT_CHECK_ATTEMPTS)
                .filter(portChecker::isAvailable)
                .findFirst();

// advanced version
public <T> Optional<T> findFirst(long maxAttempts,
      Supplier<T> generator,Predicate<T> condition){
        return Stream.generate(generator)
                     .limit(maxAttempts)
                     .filter(condition)
                     .findFirst();
    }
Integer value = findFirst(10, new Random()::nextInt, v -> v>2_000_000_000).orElse(42);

```

IntUnaryOperator: accept int, return int
IntBinaryOperator: accept 2 int, return int


# Comparator
impose total ordering on some collection of objects
used in `Collections.sort` or `Arrays.sort`
```java

// List<String> ls = new ArrayList<>(List.of("efrr","Ef","aws","zld","d","fg",null));
List<String> ls = Arrays.asList("efrr","Ef","aws","zld","d","fg",null);

// Comparator<String> cmp = Comparator.comparingInt(String::length).thenComparing(String.CASE_INSENSITIVE_ORDER);
Comparator<String> cmp = Comparator.comparing(String::length).thenComparing(String.CASE_INSENSITIVE_ORDER);
Comparator<String> cmp2 = Comparator.nullsFirst(cmp);

ls.stream().sorted(cmp2).forEach(i -> System.out.print(i+" "));

```

# Collector
Mutable reduction operation that accumulates input elements into mutable result container
- optionally transform result into final representation
- performed sequentially / parallel

eg. accumulate elem into Colleciton, concat strings using StringBuilder

supplier(): create new result container
accumulator(): incorporate new data elem into result container
combiner(): combine two result containers
finisher(): optional final transform


# Collectors
implementation of Collector
1. reducing, summarizing stream
2. grouping elements
3. partitioning elements
- split into 2 groups {true, false}


toList(), toMap(xx,xx), toSet(), toCollection(), 

```java
// groupingBy || groupingByConcurrent
Function<Integer,Integer> f5 = i -> i>2 ? 0 : 1
Stream.of(1,2,3,4).collect(Collectors.groupingBy(f5));
// {0=[3,4], 1=[1,2]}

// {3=[{title: cat, likes: 3}, {title: cow, likes: 2}], 4=[{title: pett, likes: 2}], 5=[{title: hello, likes: 1}, {title: catio, likes: 3}]}
Map<Integer,List<BlogPost>> ps1 = 
  posts.stream().collect(Collectors.groupingBy(BlogPost::getLen));
// {3=2.5, 4=2.0, 5=2.0}
Map<Integer,Double> ps2 = 
  posts.stream().collect(Collectors.groupingBy(BlogPost::getLen, 
                          Collectors.averagingInt(BlogPost::getLikes)));
// {3=5, 4=2, 5=4}
Map<Integer,Integer> ps3 = 
  posts.stream().collect(Collectors.groupingBy(BlogPost::getLen, 
                            Collectors.summingInt(BlogPost::getLikes)));

// {bb=2, cc=2, a=1, d=1}
Stream.of("a","bb","cc","d").collect(Collectors.toMap(i->i, i->i.length()));

// reducing
//// mutable reduction, can't work in parallel
collect(reducing(0, Dish::getCalories, (i,j) -> i+j))
collect(reducing(0, Dish::getCalories, Integer::sum))
collect(reducing((d1,d2) -> d1.getCalories() > d2.getCalories() ? d1 : d2))

//// immutable reduction
stream.reduce(new ArrayList<Integer>,
  (List<Integer> l, Integer e) -> {
    l.add(e); return l;
   }, (List<Integer> l1, List<Integer> l2) -> {
    l1.addAll(l2); return l1;
  });

//// 36
Stream.of(0,1,2,9).collect(Collectors.reducing(0, (x,y)->x+y));

Map<Dish.Type,Set<CalorieLevel>> calorieLevelsByType =
  menu.stream().collect(
    groupingBy(Dish::getType, mapping(
      dish -> {
        if (dish.getCalories() <= 400) return CalorieLevel.DIET;
        else if (dish.getCalories() <= 700) return CalorieLevel.DIET;
        else return CalorieLevel.FAT;
      }, toCollection(HashSet::new)
    ))
  );

// {"aa",12},{"bb",34} 
LinkedList<BlogPost> ls = 
  Arrays.asList(new BlogPost("aa", 12), new BlogPost("bb", 34))
    .stream()
    .collect(Collectors.toCollection(LinkedList::new));

// parititioning
Map<Boolean, Map<Dish.Type, List<Dish>>> vegetarianDishesByType =
  menu.stream().collect(
    partitioningBy(Dish::isVegetarian, groupingBy(Dish::getType))
  );

```

# flatMap 
```java
// flatMap
Student obj1 = new Student();
obj1.setName("mkyoung");
obj1.addBook("Java 8 in action");
obj1.addBook("Spring Boot in action");
obj1.addBook("Effective Java");

Student obj2 = new Student();
obj2.setName("zilap");
obj2.addBook("Learning python");
obj2.addBook("Effective Java");

List<Student> list = new ArrayList<>();
list.add(obj1);
list.add(obj2);

List<String> collect =
  list.stream().map(x -> x.getBook())
                .flatMap(x -> x.stream())
                .distinct()
                .collect(Collectors.toList());
collect.forEach(x -> System.out.println(x));
```

# parallel

```java
// last one control globally (parallel)
stream.paralle()
      .filter().sequential()
      .amp().parallel()
      .reduce();
```

parallel stream use ForkJoinPool

in simple case, parallel sum much slower than sequential sum
- iterate generate boxed objects -> unbox before they add
- difficult to divide into independent chunks to execute in parallel

don't call imperative(sequential) code directly (with mutable state)
if no lock, parallel execution will get incorrect results

solution:
1. use primitive stream (IntStream, LongStream, DoubleStream) to avoid autommatic boxing and unboxing
2. some operations expensive in parallel stream. eg. limit, findFirst
3. for data structure, ArrayList split much more efficiently than LinkedList, because random access
- get full control of decomposition process by Spliterator
4. whether terminal operation has cheap/expensive merge step

Decomposability:
ArrayList, IntStream.range > HashSet, TreeSet > LinkedList, Stream.iterate

## fork/join
recursively split parallelizable task into smaller tasks
-> implement ExecutorService













