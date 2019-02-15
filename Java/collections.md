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














