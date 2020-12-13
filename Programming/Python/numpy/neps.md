# array-function-protocol
`__array_function__` protocol to allow args of numpy func 
define how that function operates onthem
=> using numpy as high level API for efficient multi-dimensional array operations
=> even with array implementations differ greatly from numpy.ndarray

## other existing implementation
GPI array (CuPy)
Sparse array (scipy.sparse, pydata/sparse)
Parallel arrays (Dask array)

various numpy like implementation in deep learning (TensorFlow, PyTorch)

## implementation
catch-all for numpy functionality not covered by `__array_ufunc__` protocol for universal functions




















