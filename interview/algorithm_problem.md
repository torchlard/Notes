# given 1..n with 1 number missing, find missing number
find sum(1..n) - sum of number in array

## given k missing number, find all of them
Remember sum of i-th powers, where i=1,2,..,k. This reduces the problem to solving the system of equations

a1 + a2 + ... + ak = b1

a12 + a22 + ... + ak2 = b2

...

a1k + a2k + ... + akk = bk

Using Newton's identities, knowing bi allows to compute

c1 = a1 + a2 + ... ak

c2 = a1a2 + a1a3 + ... + ak-1ak

...

ck = a1a2 ... ak





