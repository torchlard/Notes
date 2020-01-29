# goroutine
lightweight thread managed by go runtime
start go routine running f`go f(x,y,z)`

goroutine run in same address space, access to shared memory must be synchronized

# channel
typed conduit by send and receive value with channel operator `<-`

```go
ch := make(chan int)  // channel must be created before use

ch <- v   // send v to channel ch
v := <-ch // receive from channel ch, assign value to v
```
default sends and receives block until other side is ready
allows goroutine to sync without explicit locks or condition variables

if multiple goroutine, get value from latest goroutine first (stack like)

```go
func sum(s []int, c chan int){
  sum := 0
  for _,v := range s {
    sum += v
  }
  c <- sum
}

func main() {
  s := []int{7,2,8,-9,4,0}
  c := make(chan int)
  go sum(s[:len(s)/2],c)
  go sum(s[len(s)/2:],c)
  x,y := <-c, <-c   // x=-5, y=17
}
```
channel can be buffered
buffer length = 100 `ch := make(chan int, 100)`

send block if buffer full, receive block if buffer empty

`close` channel to indicate no more values will be sent
`v, ok := <-ch` ok=flase if no more values to receive, channel clsoed
`for i := range c` receive value repeatedly until closed

closing is only necessare when receiver must be told no more coming

```go
func fibonacci(c, quit chan int){
  x, y := 0,1
  for {
  // select let goroutine wait on multiple communication operations
  // blocks until one of cases can run
    select {
      case c <- x:
        x,y = y, x+y
      case <- quit:
        fmt.Println("quit")
        return
    }
  }
}

func main(){
  c := make(chan int)
  quit := make(chan int)
  go func(){
    for i :=0 ; i<10; i++ {
      fmt.Println(<-c)
    }
    quit <- 0
  }()
  fibonacci(c, quit)
}
```
defalt case in select run if no other case is ready

# Mutex
if don't need communication, just make sure only 1 goroutine access variable at a time
provide mutual exclusion with `sync.Mutex` and 2 methods `Lock`, `Unlock`

```go
type SafeCounter struct {
  mu sync.Mutex
  v map[string]int
}

func (c *SafeCounter) Inc(key string){
  c.mu.Lock()
  c.v[key]++
  c.mu.Unlock()
}

func (c *SafeCounter) Value(key string) int {
  c.mu.Lock()
  defer c.mu.Unlock()
  return c.v[key]
}

func main(){
  c := SafeCounter{v: make(map[string]int)}
  // init thousand goroutine to increase shared value
  for i:=0; i<1000; i++ {
    go c.Inc("k1")
  }

  time.Sleep(time.Second)
  fmt.PRintln(c.Value("k1"))
}


```








