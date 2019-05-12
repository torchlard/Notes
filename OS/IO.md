## cache IO
standard IO, default behavior
- data first copy to cache in kernel, then copy to user space memory address

## process states
1. waiting for data to be ready
2. copy data from kernel to process

## blocking IO
process init `recvfrom`
process blocked by socket IO
wait from start to end

## non-blocking IO
when process call `recvfrom`, when kernel data not ready 
=> return error immediately
process continuously init `recvfrom` until copy data from kernel to user finish
=> return OK

## IO multiplexing
select,pool,epoll are mechanism of IO multiplexing
- one process montior multiple file descriptor(fd),
- when fd ready, call process to do read/write

select ---system call---> no datagram ready
                                  |
                                  |
    <--return readable---  datagram ready
recvfrom ---system call--> copy datagram
                                  |
                                  |
process  <--return OK---- copy complete
datagram 

when user process use select, process will be blocked
kernel monitor all socket managed by select

adv: can manaage multiple connection
disadv: even worse than blocking IO, not much difference from blocking

- process blocked by `select`

### select
```c
int select(int n, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, 
  struct timeval *timeout);
```
monitor writefd, readfd, exceptfd, or timeout
- when return, iterate all fdset to find ready fds
max monitor 1024 fds

### poll
```c
int poll(struct pollfd *fds, unsigned int nfds, int timeout);
struct pollfd {
  int fd;   //file descriptor
  short events;   // events to monitor
  short revents;  // returned events witnessed
}
```
no max num limit
iterate pollfd to get ready fds
- since only fraction of client ready, efficiency low with increasing client

### epoll
```c
// create epoll handler
// size: how many fd to listen
int epoll_create(int size);
// op operation on fd
// epoll_event: tell kernel listen to what
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);
struct epoll_event {
  __uint32_t events;   // epoll events
  epoll_data_t data;   // user data variable
}
// wait for io events on epfd, mex return maxevents
// *events: collection of events from kernel
// timeout: 0=return immediately
int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);
```

#### modes
level trigger: when poll_wait detect events and signal app, app can choose not respond immediately
- next time call `epoll_wait`, will signal app again
edge trigger: app must respond immediately
- next time will not singal again
- high speed working mode
- use non-blocking interface
- => reduce num of times epoll event triggered

### epoll VS select/poll
without select/poll:
- loop in anytime
- loop through all stream => if most of stream no data, waste of CPU

select/poll: 
- kernel scan all monitoring fd only when process calls
- loop only when there's >= 1 IO event

epoll: 
- tell us which stream has what IO eevent
- all our processing to streams are meaningful
- use epoll_ctl register fd; when fd ready, use ~callback activate fd
- when app call `epoll_wait` notify app


## asynchronous IO
aio_read --------> not ready
                       |
                     ready
                  copy datagram
                       |
    <--signal-- copy finish

## definition
sync IO: cause requesting process to be blocked until IO completes
=> blocking IO, non-blocking IO, IO multiplexing == sync IO
=> async IO == async





