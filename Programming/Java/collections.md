# before JDK 1.2
Arrays, Vectors, Hashtable
drawback:
- none of them implement standard member access interface
- difficult to write algorithm for all kinds of Collections
- Vecotr methods are final -> cannot extend Vector to implement similar Collection

# Collection framework
1. Consistent API
2. reuse Collection design
3. high performance implementation

Collection: add(), remove(), contains(), isEmpty(), addAll() ...
Set: no duplicates
List: ordered elements , allow duplicates
Queue: order elements in FIFO order
Deque: inserted and removed in both ends, LIFO/FIFO
Map: key,value pair, no duplicates

# Interface
Iterable -> Collection -> List
                       -> Set -> SortedSet -> NavigableSet
                       -> Queue -> Deque
Map -> SortedMap -> NavigableMap

[Set, List, Deque, Map]
    X
[HashTable, Resizable Array, Balanced Tree, Linked List, hash+linked list]

- Map not belongs to Collection
  
# Implementation
ArrayList, LinkedList, Stack, Vector
HashSet, LinkedHashSet, TreeSet
PriorityQueue, ArrayDeque, LinkedList(Deque)
HashMap, LinkedHashMap, HashTable, TreeMap


# Conversions
```
Arrays                Collection
    Arrays.asList(arr) ->
    <- list.toArray(new Integer[list.size()])
```

# Arrays
asList
binarySearch
copyOf, copyOfRange
equals, fill, sort

# Init array
```java
List<String> gfg = new ArrayList<>(List.of("Geeks","for","Ged"));
List<String> fg = new ArrayList<>(gfg);

// remove first occurance of element 77
d.remove((Object) 77);

// ArrayList/List -> T[]
Integer[] b = new Integer[2];
d.subList(1,3).toArray(b);


```
toArray(): T[]

subList, = : all pass by reference, not deep copy


# List
("Shared": Iterable, Collection, List)
ArrayList: RandomAccess (const time random access)
LinkedList: Deque, Queue
Stack: RandomAccess
Vector: RandomAccess

## LinkedList
add VS offer
- throw exception: add*, remove*
- special value: offer*, pool*

-- peek/peekFirst           -- peekLast
<- poll/pollFirst [-------] -> pollLast
<- remove/removeFirst       -> removeLast
-> push                     <- add/offer/offerLast

remove(index)
set(index, elem)

```java
LinkedList<Integer> l = new LinkedList<>(List.of(1,3,5));
Integer[] a2 = l.toArray(new Integer[l.size()]);
// [1,3,5]
```

### LinkedHashMap VS HashMap
#### same
1. both not synchronized (Collections.synchronizeMap() to sync)
2. iterator fail fast
3. performance similar

#### diff
1. Hashmap no order, LinkedHashMap has insertion order
2. LinkedHashMap need more memory for ordering


## Stack
-- peek [-------]
-> push
<- pop

search: times pop() to take element out

## Vector
optimize storage management by maintaining capacity and capacityIncrement

### ArrayList VS Vector
1. Synchronization
Arraylist not sync, Vector is sync
2. Resize
arraylist: grow by half of size when resized
vector: dobule size of itself by default
3. Performance
arraylist better when non-sync
4. fail-fast
- concurrent modification of object when modification not permissible
- eg. 1 thread modify collection, 1 thread iterating over it => throw ConcurrentModificationException

# Set
hashset, LinkedHashSet, TreeSet: not sync

## HashSet
- cost of iteration = size + capacity set

add, addAll, remove, removeAll

## LinkedHashSet
different from HashSet that 
- maintain doubly-linked list through all entries
- defines iteration ordering = insertion order
- less cost compared to TreeSet

constant time add/contains/remove
performance slightly below HashSet
- iteration cost = size

sync method: Collections.synchronizedSet()

## TreeSet
element ordered by natural ordering / Comparator
log(n) for basic operation (add/remove/contains)

sync: Collections.synchronizedSortedSet

<- pollFirst [--------] -> pollLast

subSet, headSet, tailSet {return range of set}


# Queue
PriorityQueue, ArrayDeque: not sync
## PriorityQueue
based on priority heap, follow natural ordering/Comparator
- not permit null, non-comparable object
- unbounded, has internal capacity governing size of array

## ArrayDeque
faster than Stack and LinkedList when used as stack/queue
                [----------]
addFirst ->                <- add/addLast
offerFirst ->              <- offer/offerLast
<- poll/pollFirst          -> pollLast
<- remove/removeFirst      -> removeLast

```java
 ArrayDeque<Integer> l2 = new ArrayDeque<>(List.of(1,2,3))
```


# Map
not sync: hashmap, 
## HashMap
permit null value, null key
```java
Map<Integer,Integer> m1 = new HashMap<>();
m1.put(1,2);
m1.put(2,3);

Map<Integer,Integer> m2 = new HashMap<>();
m2.putAll(m1);

// original: {1: 2, 3: 4, 7: 8}
m2.compute(1, (k,v) -> v+9);
// new: {1: 11, 3: 4, 7: 8}

```
"modify"
+: put, putAll, putIfAbsent
-: remove(key), remove(key,value), clear()
replace, replaceAll

"view"
get, getOrDefault, values()

"map -> set view"
entrySet, keySet: cannot modify resulting viewing set

"test"
containsKey, containsValue

## LinkedHashMap
predictable iteration order, doubly-linked list

## Hashtable
capacity: number of buckets in hash table

## TreeMap
red black tree based navigableMap, follow natural ordering
log(n) for containsKey,get,put,remove

headMap()

"key"
firstKey, lastKey, lowerKey, higherKey, ceilingKey, floorKey
subMap, tailMap



# Collections (utility class)
## synchronized
synchronized(Collection, List, Map, NavigableMap, NavigableSet, SortedMap)

## operations
rotate, shuffle, sort, binarySearch, swap, min, max
reverse, replaceAll, replace, frequency

## immutable
empty(List, Iterator, ListIterator, Map, NavigableMap, NavigableSet, Set, SortedMap, SortedSet)
singleton(T o), singletonList, singletonMap
unmodifiable(Collection, List, Map, NavigableMap, NavigableSet, Set, SortedMap, SortedSet)
nCopies(int n, T elem)

## duplicate
copy(dest, src): need same size

## conversion
Deque              Queue
    asLifoQueue -->


## type safe viewer
checked(Collection, Lost, Map, NavigableMap, Queue, Set ...)
- for debug use, see if any incorrect type element placed in Collection

### use case of Collections.emptyList()
1. method that return List of address, but this time no data to return -> so return emptyList, cost nothing
2. call method that take list as parameter, can't take null
3. base case of recursive function
















