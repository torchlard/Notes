# P1,P2,P3 ready; P4,P6 waiting; P5 executing
P6 waiting -> ready call process scheduling

# java method rewrite
1. 3 same: same method name, same param, same return type
2. 1 smaller: smaller exception thrown
3. 1 bigger: access modifier larger or equal

# java MyTest a b c
args[0] = a
args[1] = b

# interface valid method
public void main(String[] args);

# enum
when enum compiled, converted to concrete class inherites java.lang.Enum
enum AccountType -> class AccountType
```java
private AccountType(){
  System.out.println("It is a account type");
}
// becomes
private AccountType(String s, int i){
  super(s,i);
  System.out.println("It is a account type");
}

public static final AccountType SAVING;
public static final AccountType FIXED;
public static final AccountType CURRENT;

static {
  SAVING = new AccountType("SAVING", 0);
  ...
  CURRENT = new AccountType("CURRENT", 0);
  $VALUES = new AccountType[]{
    SAVING, FIXED, CURRENT
  }
}
```

# if return value
```java
int x=3;
int y=1;
if(x=y) {...}
```
1. assignment has return value of assigned value. In this cass=1
2. in C if >0, return true; in Java, not compare with 0, directly put result into if

# java init sequence
parent static
child static
parent class member init
parent constructor block
parent constructor method
child class member init
child constructor block
child constructor method

```java
class Parent {
  // constructor block
  {
    System.out.println("a");
  }
  // constructor method
  public Parent(){}
  // static block
  static {
    System.out.println("static");
  }
  // class member
  int a;
}
```
static method = class method

# char constant
"a": string constant
'\123': 'S' = 8-bit system

#
cannot call class member in static block

# GC
copy algorithm:
- 2 region A,B, move between A,B

mark algorithm: 
- mark accessible object, collect not accessible objects

segment appears
=> mark-management algorithm

Serial New: new generation, copy algo
serial old: new gen copy algo, old gen mark
Parallel new: new gen copy algo, old gen mark algo
parallel scavenge: new gen mark algo
parallel old: old gen mark
CMS: mark
G1: global mark, local copy

# forward
server will directly access URL, but not transfer control

# interface abstract
all method defined on interface are public and abstract by definition

# double
double d = 5.3e12;
- correct

```java
double d = 3; // correct: auto boxing
Double d = 3; // wrong. auto box must correspond to type
Double d = 3.0; // correct
```

#
```java
int i=5;
int s = (i++)+(++i)+(i--)+(--i);
// 5+7+7+5
```





