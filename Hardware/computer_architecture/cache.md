# metric
latency (start -> done)
throughput (# / sec)

# locality
```c
int sum = 0;
for(int j=0; j<1000; j++){
  sum += arr[j]
}
```
spatial locality: arr
temporal locality: j, sum

# cache performance
average memory access time (amat)
amat = hit time + miss rate * miss penalty

# L1
16 KB - 64 KB
large enough to get 90% hit rate
small enough to hit in 1-3 cycles

block size / line size: how many bytes in each entry
line = entry in cache

## cache tag
block number as tag, to find data in which data block
tag match some bit of block number

hit = (tag == block number) && (valid bit)

# type
fully associative: any block can be in any line
set-associative: n lines where a block can be

## direct mapped
a block can go into 1 line

adv: fast, cheap, energy-efficient
disadv: block must go in one place, many conflict

[tag|index|offset]

# cache replacement
random 
FIFO
LRU: least recently used
  NMRV: not most recently used

# write policy
do we insert blocks we write?
1. *write allocate
2. no write allocate

to cache / also to memory?
1. write through: update memory immediately
2. *write back: write to cache, write to memory when replaced

## write back cache
dirty bit to every block in cache
0: block is clean (not written since last brought from memory)
1: block is dirty (modified, need write to memory)

write back only when new cache replace  

# optimization
## reduce hit time
reduce cache size
reduce cache associativity
overlap cache hit with another hit
overlap cache hit with TLB hit
optimize lookup for common case
maintain replacement state more quickly

## pipeline cache
usually L1 cache is pipeline


## TLB
physical address point to cache

physically accessed cache
physical cache
physically indexed - physically tagged cache (PIPT)

### virtually accessed cache
virtual address
  -> cache -> data
  -> TLB -> physical address

adv: hit time = cache hit time
disadv: flush cache on context switch

#### alias
since 2 virtual address can point to same physical address 
(eg. mmap)
```
            cache
WR A,16 -->  4->16
RD B    -->  4
```
when cache changed in 1 place, need to check alias change other as well
=> expensive operation


### virtually indexed physical tagged

virtual address
- index -> set in cache
- page number
  -> TLB -> physical address -> TAG check

hit time = cache hit time (TLB very fast)
no flush on context switch
no aliasing problem

#### alias
if all index bit come from page offset, then no aliasing















