# target
## scaling
hazard pointer
lock-free algorithm
fast latching, msg passing
optimistic concurrency control

## functional
row-oriented & column-oriented storage  
btree & lsm tree

## io 
key prefix compress, value dictionaries, huffman encoding
compac file format
variable-length page
block level compression


# document level concurrency
document level concurrency control for write operations
- multiple client can change different docs of a collection at same time

intent locks at global, db and collection levels
- conflict between 2 operations => incur write conflict 

some global op, short lived ops involve multiple db: global "instance-wide" lock
drop collection: exclusive db lock

## MVCC





















