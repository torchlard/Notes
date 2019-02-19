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

- invoke `join` method on task blocks caller until result produced by task ready
- `invoke` method not use within RecursiveTask -> always fork/compute()
- natural invoke in left and right subtasks
- fork/join need warm up time for optimization by JIT compiler

### work stealing
difficult to find right threshold of starting sequential processing

work stealing: task more or less evenly divided on all thread
- each thread hold doubly-linked queue of task
- if one thread complete much faster, randomly choose queue, take from tail
- forking large number of fine-grained task better

## Spliterator (splitable iterator)
traverse elements of source
- tryAdvance(), trySplit(), estimateSize(), characteristics()

1. Split spliterator1 -> 2
2. split 1->3, split 2->4
3. split 1->null, 2->null, 3->5, 4->null
4. try split all until null

characteristics:
- ORDERED: defined order
- DISTINCT: all eleemtns unique
- SORTED
- SIZED: source with known size
- NONNULL
- IMMUTABLE
- CONCURRENT: source safely concurrently modified without any synchronization
- SUBSIZED: both Spliterator and all further Spliterators are sized

tryAdvance
- feed Consumer with Character
trysplit
- define logic to split

```java

class WordCounter {
  private final int counter;
  private final boolean lastSpace;
  public WordCounter(int counter, boolean lastSpace){
    this.counter = counter;
    this.lastSpace = lastSpace;
  }

  public WordCounter accumulate(Character c){
    if(Character.isWhitespace(c)){
      return lastSpace ? this : new WordCounter(counter, true);
    } else {
      return lastSpace ? new WordCounter(counter+1, false) : this;
    }
  }
  public WordCounter combine(WordCounter wordCounter){
    return new WordCounter(counter+wordCounter.counter, wordCounter.lastSpace);
  }

  public int getCounter() {
    return this.counter;
  }
}


class WordCounterSpliterator implements Spliterator<Character> {
  private final String string;
  private int currentChar = 0;

  public WordCounterSpliterator(String string){
    this.string = string;
  }

  @Override
  public boolean tryAdvance(Consumer<? super Character> action){
    action.accept(string.charAt(currentChar++));
    return currentChar < string.length();
  }

  @Override
  public Spliterator<Character> trySplit(){
    int currentSize = string.length() - currentChar;
    // end split 
    if (currentSize < 10){
      return null;
    }
    for (int splitPos = currentSize/2 + currentChar;
        splitPos < string.length(); splitPos++){
      if (Character.isWhitespace(string.charAt(splitPos))) {
        Spliterator<Character> spliterator =
          new WordCounterSpliterator(string.substring(currentChar, splitPos));
        currentChar = splitPos;
        return spliterator;
      }
    }
    return null;
  }

  @Override
  public long estimateSize(){
    return string.length() - currentChar;
  }
  @Override
  public int characteristics(){
    return ORDERED + SIZED + SUBSIZED + NONNULL + IMMUTABLE;
  }
}

public class Solution {
  public static int countWords(Stream<Character> stream){
    WordCounter wordCounter = stream.reduce(new WordCounter(0, true),
                                  WordCounter::accumulate, WordCounter::combine);
    return wordCounter.getCounter();                                  
  }

  public static void main(String[] args) {
    final String SENTENCE = "afds fdsfds";

    Spliterator<Character> spliterator = new WordCounterSpliterator(SENTENCE);
    Stream<Character> stream = StreamSupport.stream(spliterator, true);

    System.out.println("found: " + countWords(stream) + " words");
  }
}
```

# Refractoring old Java code
## anonymous class -> lambda expression
```java
doSomething(new Task(){
  public void execute(){
    System.out.println("danger");
  }
});
// TO
doSomething((Task)() -> System.out.println("danger"));
```

## lambda -> method references
## impreative data processing -> Streams

# Improve code flexibility
## adopt functional interface
### conditional deferred execution
```java
if(logger.isLogger(Log.FINER)){
  logger.finer("Problem: " + generateDiagnostic());
}
// TO
public void log(Level level, Supplier<String> msgSupplier)
logger.log(Level.FINER, "Problem: " + generateDiagnostic()); 

```

### execution around
```java
String 
```




































