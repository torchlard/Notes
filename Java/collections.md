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

# Implementation
ArrayList, LinkedList, Stack, Vector
HashSet, LinkedHashSet, TreeSet
PriorityQueue, ArrayDeque, LinkedList(Deque)
HashMap, HashLinkedMap, HashTable, TreeMap


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
PriorityQueue: not sync
## PriorityQueue
based on priority heap, follow natural ordering/Comparator
- not permit null, non-comparable object
- unbounded, has internal capacity governing size of array

## ArrayDeque
faster than Stack and LinkedList when used as stack/queue


# Map
## HashMap
permit null value, null key




















