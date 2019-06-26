# conference
A level: PLDI, POPL > OOPSLA, ECOOP
B level: ESOP
C level: APLAS

journal: TOPLAS


# programmign language research
1. pure PL
  - language designs and extensions
  - type system
  - language semantics and program logics
2. PL support environment
  - optimization, transformation
  - virtual machine, GC
3. PL application
  - program analysis
  - program verification
  - program synthesis


# program analysis
## static analysis
Q: for certain input, can part of program satisfy certain condition / property?

## Abstraction
get abstract object for analysis

### over approximation
we cannot try all possible route of programs
```
if(e) x=1
else x=0
@Label A
```
we can approx at Label A, x = 0/1
can adjust route abstraction granuality (context,flow,path-sensitivity)


# Pointer/Points-To/Alias analysis
given variable/ref p, find what value can p have
- if p1 and p2 point to same thing, then they are mutual alias

can construct interprocedural control flow grpah, call graph














