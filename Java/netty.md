# Future
Future need to manually check if process completed, troublesome

## ChannelFuture
```java
Channel channel = ...;
ChannelFuture future = channel.connect(
  new InetSocketAddress("192.168.0.1", 25));
future.addListener(new ChannelFutureListener(){
  @Override
  public void operationComplete(ChannelFuture future){
    if(future.isSuccess()){
      ByteBuf buffer = Unpooled.copiedBuffer(
        "Hello", Charset.defaultCharset());
      ChannelFuture wf = future.channel().writeAndFlush(buffer);
    } else {
      Throwable cause = future.cause();
      cause.printStackTrace();
    }
  }
})
```
since all IO async, may not immediately return
every outbound IO will return ChannelFuture

## ChannelPromise
ChannelPromise is special ChannelFuture


# Event, Handler
use event to inform change in states / operational states
- logging, data transform, streaming, application logic

ChannelHandler is abstraction of programs
~ each processor instance = callback, handle event response

event flow:
... -> event -> handler -> event -> handler -> ...

predefined program to manage all kinds of protocol (eg. HTTP, SSL/TLS)

# Channel
netty implemented many kinds of channels: eg. AbstractChannel, AbstractNioByteChannel, NioSocketChannel ...

## channel liefcycle
channelUnregistered: channel not reg to EventLoop
channelRegistered: channel reg to EventLoop
channelActive: channel connected to remote, can send and receive data 
channelInactive: not connected to remote

registered -> active -> inactive -> unregistered

# Channel handler
support many protocol, provide container for data management
most common: ChannelInboundHandler

- inbound: data from server to client
- outbound: data from client to server
the order program add to ChannelPipeline decide order of data management

- ChannelHandler can belong to multiple ChannelPipeline, bind to multiple ChannelHandlerContext; 
- must use @Sharable
- must be thread save, safely use multiple channel

## channel handler lifecycle
handlerAdded: when handler added to ChannelPipeline
handlerRemoved: remove handler from pipeline
exceptionCaught

# Channel pipeline
container for ChannelHandler chain, each channel has its own ChannelPipeline
initChannel()
manage event flow

- addFirst, addBefore, addAfter, addLast
- remove
- replace

## ChannelInboundHandler lifecycle
channelReadComplete
channelRead: when data read from channel
channelWritabilityChanged: ensure writes not done too fast (risk of OutOfMemoryError)


### Channel(In|Out)boundHandlerAdapter
in chain, event can pass to next handler via ChannelHandlerContext
- provide abstract base class adapter

2 ways to send msg
1. send msg to Channel (start from end of ChannelPipeline)
2. write to ChannelHandlerContext (start from next processor in ChannelPipeline)

### SimpleChannelHandler
IO must not be blocked, prohibit any blocking operation on ChannelHandler
- assign an EventExecutorGroup for adding ChannelHandler to ChannelPipeline

## ChannelHandlerContext
manage interactions among ChannelHandler in same ChannelPipeline
- if call methods in Channel/ChannelPipeline, propagate in pipeline
- if call in ChannelHandlerContext, only propogate start from current ChannelHandler




## event loop
for manage channel's IO
single event loop manage multiple channel event
1 EventLoopGroup include multiple EventLoop

think of eventLoop as a thread working for Channel

# Bootstrap
the way to package ChannelPipeline, ChannelHandler ... together 

Bootstrap: bind to remote host and port, 1 event loop group
ServerBootstrap: bind to local port, 2 event loop group
- singleton ServerChannel (bind local socket)
- all created Channel (to handle all client connections)

server: parent pipe accept connection, create child pipes
client: only need single child pipe

## AbstractBootstrap
Cloneable => for creating multiple pipes with similar config
shallow copyof EventLoopGroup (share all cloned pipes)

## compatibility
NioEventLoopGroup must use with NioServerSocketChannel

## transfer client among channel
transfer shared EventLoop to Bootstrap's group() method
- allow client to work on same EventLoop, avoid thread context switching
  

# Resource Management
when using ChannelInboundHandler.channelRead(...) / ChannelInboundHandler.write(...)
- ensure no resource leakage
use ResourceLeakDetector check 1% ByteBuf



# sample
echo server
1. server handler: business logic, how to init connection, handle msg
2. Bootstrapping: startup server, bind port, listen to conn



# Transport
- NIO: based on java.nio.channels
- OIO: based on java.net
- local: vm local communication
- embedded: test ChannelHandler without true network

## selection operation
accept: notify when new connetion
connect: notify after complete connection
read: when ready to read data
write: when writing more data to channel

## NIO
1. new channel register with selector
2. choose to handle state changed
3. Selector.select() blocked until new state change
4. check if state change
5. manage all state change
6. go to new tasks

## OIO
1. thread allocate to socket
2. socket connect to remote
3. read operation (blocking)
4. read complete
5. handle readable bytes
6. execute other tasks
7. read again

## local
SocketAddress not bind to physicall addr, but to certain registry
cannot work with other transport

## usage
OIO: few connections, low latency, blocking
NIO: many connections
local: same JVM
embedded: testing


# ByteBuf
optimized buffer container
2 index: 1 for read, 1 for write
- can read data sequentially / adjust position / direct access position

## 
when write into ByteBuf, writerIndex increase written byte num
when read byte, rederIndex increase read byte num
- until RW index point to same location
=> ByteBuf not readable, throw IndexOutOfBoundsException

[0 <= readerIndex <= writerIndex <= capacity]

only "read","write" increase index, "set","get" won't move index
can set max size to ByteBuf, default Integer.MAX_VALUE

## heap buffer
save data in JVM's heap
```java
ByteBuf heapBuf = ...;
// check if support array
if (heapBuf.hasArray()){
  byte[] array = heapBuf.array();
  int offset = heapBuf.arrayOffset() + heapBuf.readerIndex();
  int length = heapBuf.readableBytes();
  handleArray(array, offset, length);
}
```

## direct buffer
use local method to allocate memory, not in heap
```java
ByteBuf directBuf = ...;
// if not support array, must be direct buffer
if (!directBuf.hasArray()){
  int length = directBuf.readableBytes();
  byte[] array = new byte[length];
  // copy bytes to array
  directBuf.getBytes(directBuf.readerIndex(), array);
  handleArray(array, 0, length);
}
```

## composite buffer
can create different ByteBuf, and provide composite view
like list, dynamically add/delete ByteBuf in composite buffer

eg. msg composed of header and body
maybe body the same, only header different
using composite buffer don't need to reallocate new buffer each time
```java
CompositeByteBuf msgBuf = ...;
ByteBuf headerBuf = ...;
ByteBuf bodyBuf = ...;
msgBuf.addComponents(headerBuf, bodyBuf);
msgBuf.removeComponent(0);
for (int i=0; i < msgBuf.numComponents(); i++){
  System.out.println(msgBuf.component(i).toString());
}
// similar to direct buffer, not allow access directly
int length = msgBuf.readableBytes();
byte[] array = new byte[length];
msgBuf.getBytes(msgBuf.readerIndex(), array);
handleArray(array, 0, length);
```

## derived buffer
duplicate(), slice(), slice(int,int)
readOnly(), order(ByteOrder)

```java
Charset utf8 = Charset.forName("UTF-8");
ByteBuf buf = Unpooled.copiedBuffer("netty in action!", utf8);

ByteBuf sliced = buf.slice(0,14);
System.out.println(sliced.toString(utf8));

buf.setByte(0, (byte)'J');
assert buf.getByte(0) == sliced.getByte(0);
```
avoid copying memory

## RW operation
get()/set(): start from certain index, keep unchanged
read()/write(): start from certain index, +current R/W index

## ByteBufHolder
we need to store other metadata, eg. state code, cookies
buffer pool

## ByteBufAllocator
allocate any ByteBuf 
2 implementations
1. PooledByteBufAllocator: use ByteBuf instance [default]
2. Unpooled: each time return new instance

## ReferenceCoujnted
count number of ref in object
when ref=0, release


# Codec
## Decoder
### ByteToMessageDecoder
decode, decodeLast
```java
public class ToIntegerDecoder extends ByteToMessageDecoder {
  @Override
  public void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out)
    throws Exception {
      if (in.readableBytes() >= 4)
        out.add(in.readInt());
  }
}
```
if msg encoded or decoded -> call ReferenceCountUtil.release(message)
force keep ref: ReferenceCountUtil.retain(message)

### ReplayingDecoder
special ByteToMessageDecoder
```java
public class ToIntDecoder extends ReplayingDecoder<Void> {
  @Override
  public void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out)
    throws Exception {
      out.add(in.readInt());
    }
}
```

### MessageToMessageDecoder
```java
public class IntegerToStringDecoer extends MessageToMessageDecoder<Integer>{
  xxx {
    out.add(String.valueOf(msg));
  }
}
```
if data too much, throw TooLongFrameException, user decide how to handle it

## Encoder
the same as decoder

MessageToByteEncoder
- encode
MessageToMessageEncoder

## Abstract codec
### ByteToMessageCodec
eg. byte -> POJO -> byte

## length based protocols
FixedLengthFrameDecoder
LengthFieldBasedFrameDecoder


# manage huge data
use "zero-copy" function of NIO
use interface FileRegion


# theory
task --> In eventLoop? ---yes--> execute
      |                 ---no--> queue
Channel.eventLoop()
  .execute(Task1)

Don't block IO thread
if you need blocking calls, use EventExecutor

## scheduled job
1. call job execution after certain delay
2. task added to EventLoop's Schedule-Task-Queue
3. if immediate execute, EventLoop check each instance
4. if need execute, run immediately
5. wait for next call

- all eventLoop distributed by EventLoopGroup
- eventLoop distribute pipeline events assigned to it, bind to 1 thread
- pipeline bind to EventLoop

may affect usage of ThreadLocal

## aim
serve Channel's IO and events with least number of EventLoop (thread)
- shared among channels, no need each Channel new Thread


















