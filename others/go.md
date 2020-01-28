# isntall
```bsh
sudo add-apt-repository ppa:longsleep/golang-backports
sudo apt-get update
sudo apt-get install golang-go
```
# build
cd src/hello
go build

# basic types
bool, string

int[32 bit] int{8|16|32|64}
uint[32 bit] uint(8|16|32|64)
uintptr[32 bit]

byte (alias uint8)
rune (alias int32)

float32 float64
complex64 complex128

## default values
numeric: 0
boolean: false
string: ""

# syntax
```go
package main

import (
  "fmt"
  "math/rand"  
)

func add(x int, y int) int {
	return x+y
}
// can omit type from all but last
func add2(x, y int) int {
  return x+y
}

// can return any number of results
func swap(x, y string) (string, string){
  return y, x
}

// return named values as pair
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

// var can be at package / function level
var c, python bool

func main(){
  var i int
  var k, j int = 1, 2
  c, python, java := true, false, "no!"
  var (
    ToBe bool = false
    MaxInt uint64 = 1<<64 -1
  )

  fmt.Println("xxx", rand.Intn(10))
  a, b := swap("hello", "world")
}

// explicit conversion
var x int = 3
var z uint = uint(x)

// cannot declare const using :=
const pi = 3.14

```
`k := 3` == `var k = 3`

name exported begins with capital letter, eg. Pi
any unexported names not accessible from outside package

if type not specified, then type inferred from value
42 -> int
3.142 -> float64
0.867+0.5i -> complex128
pointer -> null

untyped constatn takes type need by its context

# loop
```go
for i:=0; i<10; i++ {
  sum += i
}

sum := 1
for ; sum<1000; {
  sum += sum
}

// forever loop
for {}

if x<0 {
  return 1
}

func pow(x,b, lim float64) float64 {
  if v:= math.Pow(x,n); v<lim {
    return v
  }
  return lim
}

// auto break; switch cases need not be constants
switch os := runtime.GOOS; os {
  case "darwin":
    fmt.Println("OS X")
  case "linux":
    fmt.Println("linux")
  default:
    fmt.Println("%s. \n", os)
}

// execute f() if i != 0
switch i {
  case 0:
  case f():
}

func main(){
  // defer execution until surrounding functions returns
  defer fmt.Println("1")
  defer fmt.Println("2")
  fmt.Println("hello")
  // return hello \n 2 \n 1
}

var pow = []int{1,2,4}
for i,v := range pow {
  fmt.PRintf("%d : %d", i, v)
}
for _,v := range pow {}
// 0 : 1
// 1 : 2
// 2 : 4

```
only 1 looping construct `for`
no parentheses needed for `for`. braces always required


# pointer
no pointer arithmetic
```go
// *int: pointer to int value
var p *int

i := 42
p = &i

fmt.Println(*p) // read i through pointer p
*p = 21
fmt.Println(i)  // 21


type Vertex struct {
  x int
  y int
}
p := Vertex{1,2}
p.Y += 2
fmt.Println(p) // {1 4}

v := &p
(*v).x = 1e9 // same as v.x = 1e9
fmt.PRintln(p) // {1e9 4} 

var (
  v1 = Vertex{1,2}
  v2 = Vertex{x:1} // y:0 is implicit
  v3 = Vertex{} // x=0, y=0 implicit
  p = &Vertex{1,2}  // type *Vertex
)

var a [2]string
a[0] = "hello"
a[1] = "world"

primes := [6]int{2, 3, 5, 7, 11, 13}
// slice just ref to arrays, not copy data
var s []int = primes[1:4]

s := []struct {
  i int
  b bool
}{
  {2, true},
  {3, false},
  {5, true},  // force add comma on all lines
}

a := make([]int, 5) // len(a)=5

board := [][]string{
  []string{"_", "_","_"},
  []string{"_", "_","_"},
  []string{"_", "_","_"},
}

type Vertex struct {
  Lat, Long float64
}
var m map[string]Vertex = make(map[string]Vertex)
m["Bell Labs"] = Vertex{
  40.684, -74.1235
}
m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}

m["a"]=1
delete(m, "a") // return to 0

func compute(fn func(float64, float64) float64) float64 {
  return fn(3,4)
}

// functional value
hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
}	

```

length `len(s)`
capacity `cap(s)`

`func append(s []T, vs ...T) []T`
functional are values too, can be passed around

closure: function value that references variables from outside its body
```go
// adder function returns closure
func adder() func(int) int {
  sum := 0 
  return func(x int) int {
    sum += x
    return sum
  }
}

pos, neg := adder(), adder()
for i := 0; i<10; i++ {
  fmt.Println(pos(i), neg(-2*i))
} 
```

# method
go does not have classes, can define methods on types

method just function with receiver argument
```go
type Vertex struct {
  x, y float64
}

func (v Vertex) abs() float64 {
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main(){
  v := Vertex{3,4}
  fmt.Println(v.abs())
}
```

# pointer receivers
```go
func (v *Vertex) Scale(f float64){
  v.X = v.X*f
  v.Y = v.Y*f
}

func main(){
  v := Vertex(3,4)
  v.Scale(10)
}

var v Vertex
p := &v
fmt.Println(v.Abs())  // ok
fmt.Println(p.Abs())  // ok, interpret as (*p).Abs()
```
pointer receiver: can modify value to which receive points
value receiver: method operate on copy of original value

reason use pointer receiver
1. can modify value where receiver point to
2. avoid copying value on each method call


# interface
interface type = set of method signature
value of interface type hold any value that implement those methods

```go
type Abser interface {
  Abs() float64
}

type MyFloat float64
func (f MyFloat) Abs() float64 {
  if f<0 {
    return float64(-f)
  }
  return float64(f)
}

func main(){
  var a Abser
  f := MyFloat(-math.Sqrt2)
  a = f // a MyFloat implements Abser
  fmt.Println(a.Abs())
}
```
interfaces are implemented implicitly

empty interface = interface type that specifies zero methods
every type implements as least zero methods

# type assertion
t := i.(T)
i holds concrete type T, assign underlying T value to variable t

```go
var i interface{} = "hello"

// trigger panic
f, ok := i.(float64)  // f=0, ok=false
```
















