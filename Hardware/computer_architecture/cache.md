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









