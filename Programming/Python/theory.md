# under the hood
for C, integer 1 stored directly
  - already know the type

Python integer: [PyObject_HEAD | digit 1]

# python addition
1. assign 1 to a
1a. a->PyObject_HEAD->typecode = integer
1b. a->val = 1

2. assign 2 to b
2a. b->PyObject_HEAD->typecode = integer
2b. b->val = 2

3. call binary_add(a,b)
3a. find typecode in a->PyObject_HEAD
3b. a = int, value = a->val
3c. find typecode in b->PyObject_HEAD
3d. b = int, value = b->val
3e. call binary_add<int,int>(a->val, b->val)
3f. result of this is result, is an integer

4. create Python object c
4a. c->PyObject_HEAD->typecode = integer
4b. c->val = result


# data structure
## numpy array
PyObject_HEAD 
  | data -> [1,2,3,4,5]
  | dimensions
  | strides

## Python list
```
PyObject_HEAD
length
items -> xx -> head | val
         xx -> head | val
         xx -> head | val
         xx -> head | val
         xx -> head | val
```



















