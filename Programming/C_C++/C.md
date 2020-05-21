# compile process
1. pre-processing
file.c -> file.i
remove comments, expand macro, expand included files
2. compilation
file.i -> file.s
compile to assembly level instruction
3. Assembly
file.s -> file.o
existing code convert into machine language
4. linking
file.o -> executable
link all function calls with their definitions

gcc by default do dynamic linking

# header files
define types, macros, variables, functions

declaration: only provide info that fn or variables exists, give type
definition: allocate storage for variable, say what function does

# scope
global, local, block

## static
```c
void count(void);
int main(void){
  for(int i=0; i<10; i++){
    count();
  }
  return 0;
}

void count(void){
  static int c=1;
  printf("%d\n", c);
  c++;
}
```
output: 1 2 3 ... 10

static variable keep in memory after function completes, until program finished
- cannot access c outside count()

```c
static void some(){
  ...
}
```
restrict calling of some() in same file, make it private

## extern
```c
void main(void) {
  extern double some_var;
  // error: extern double some_var = 100;
  printf("%f\n", some_var);
}
```
tell compiler some_var defined in other locations

## inline
```c
int power_two(int num){
  // can be expanded by compiler
  return power(num, 2);
}
inline int power(int n, in p){
  int r=1;
  for(int i=0; i < p ; i++){
    r *= n;
  }
  return r;
}
// math.h
int power_two(int);
int power(int, int);
```
since calling function need extra resource to allocate memmory
if written as inline funciton, then will hint compiler auto expand function in calling location
- compiler may not use the hint, may ignore inline


# macro
adv: produce inline expression that considerably faster than actual function call




#  char *a = "hello"; 
when you start to write char *a = "hello";, location of "hello" becomes executable
and read only

# compile pthread
gcc -pthread test01.c -o out

# vscode debug C
gcc -g xxx.c

