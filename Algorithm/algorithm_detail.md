# Quick Sort
1. loop once, choose first unsorted as pivot
2. swap all numbers >pivot to right to pivot
3. after loop, move pivot to end of chosen range
4. mark the pivot as sorted
5. iterate remaining columns
- move high end first
- after swap, switch moving pivot


# text pattern matching
## Brute-Force
start from beginning, match every character until mismatch,
go back to previous starting point+1 step forward

## KMP
1. construct next graph for transfer pointer if failiure
2. start from first char, match each char in match str until mismatch
3. start from current char, move to next n char to compare
next[i] depends on max overlapping of characters for certain substring length

   
# Dynamic programming
slow and naive way, need to compute again:
```c
int f(int n){
  if (n == 0 || n == 1)
    return 1;
  else
    return f(n-1) + f(n-2);
}

```

better is compute and save answer in table: 
## top-down
adv: no need to care about computation sequence
disadv: call function continuously, lower efficiency

```js
let table = Array(600);

const f = n => {
  if (n == 0 || n == 1) return 1
  if (table[n]) return table[n];

  table[n] = f(n-1) + f(n-2);
  return table[n];
}

const stairs_climbing = n => {
  for(let i=0; i<=600; i++)
    table[i] = 0

  while(n >= 0 && n <= 5)
    console.log('climb to', n, 'with', f(n), 'methods')
}
```

## bottom-up
set up computation sequence, start from smallest problem
```js
let table = Array(6)

const dynamic_programming = () => {
  table[0] = 1
  table[1] = 1

  for (let i=2; i<=5; i++)
    table[i] = table[i-1] + table[i-2]
}
```

```js
const x=8, y=8;
let c = Array(x*y)

const staircase_walk = () => {
  for (let j=0; i<y; ++j) c[j] = 1

  for (let i=1; i<x; i++)
    for (let j=1; j<y; j++)
      c[j] += c[j-1]
  
}
```

## efficient multiplication
11 << 3 == 11000
means 
3 * 2^3 == 24





























