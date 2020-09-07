# sum vs np.sum
- build-in sum go through an array, iterate one-by-one, covert each to Python object
  - calling element's `__add__` operator 
- np.sum sum array using optimized loop in native code, no conversion of individual values
  - know type beforehand, contiguous in memory

`sum(list)` a lot faster than `sum(array.array)`








