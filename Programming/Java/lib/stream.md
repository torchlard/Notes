# stream 
## question
1. how to record user operation?
2. how to compose operations?
3. how to execute composed ops?
4. how to get result?

## operation
statful: element processing affect by previous elem
stateless: element processing not affected by previous element

shortcut: end when get certain matching element 
non-shortcut: end after process all element

## theory
use Stage form double linked list, memorize previous & next stage & callback
use Sink as protocol to coordinate callback execution
[begin, end, cancellationRequested, accept]

principle: override these 4 interface method in Sink

## how to execute?
how to find next Sink?
Sink AbstractPipeline.opWrapSink(int flags, Sink downstream)
- combine current operation with nex Sink as new Sink

-> wrapSink -> copyInto
all operations from start to end wrap into 1 Sink

```java
// tell Sink data coming
wrappedSink.begin(spliterator.getExactSizeIfKnown());
// spliterator as iterator, iterate across elements
spliterator.forEachRemaining(wrappedSink);
// notify iteration ends
wrappedSink.end();
```



## class diagram
1. factory class 
Ops: slice, distinct, sorted, find, reduce, forEach, match
tripwire, StreamSpliterators
Collectors, Nodes, streams

2. lazy eval implementation
Base Stream <- LongStream, IntStream, Stream ...
PipelineHelper <- AbstractPipeline <- ...
StreamSupport

3. parallel stream implementation
4. store intermediate result in parallel stream
5. terminal operation implementation

## operation record
xx.stream().filter(xx).map(xx)

data source ---> stage0 ---> stage1 ---> stage2
          stream()    filter()      map()





# parallel computing logic
estimateSize => >threshold?
- yes: create subtask -> fork join -> add to task queue
- no: doLeaf -> tryComplete => pending==0?
  - no: waiting other leaf nodes
  - yes: onCompletion of leaf?
    - yes: destroy intermediate data => end
    - no: combine nodes result => parent task?
      - yes: recursive parent onCompletion
      - no: end



# AbstractPipeline
abstract base class for pipleline class
core implementations of Stream interface and its primitive specializations
- manage construct and eval of stream pipelines
- represeent intial portion of stream pipeline, encapsulate intermediate operations
- terminal ops -> consumer

Sequential stream, parallel stream without stateful intermediate operation
=> eval in single pass, compose all operations together

parallel stream with stateful operatiosn
=> execution divide into segments, each segment eval separately
=> result as input to next segment

## properties
sourceOrOpFlags: operation flag for intermediate operations
depth: num of intermediate ops 
  (stateless) between pipeline obj and stream source 
  (stateful) between previous stateful
sourceStage
previousStage
nextStage

boolean: linkedOrConsumed, parallel, sourceAnyStateful(any stateful ops in source stage)

## method
opWrapSink: accept sink which receive result of operation, return Sink accept elem of input type ofoperation, pass result to provided




# Sink
extends Consumer, conduct values through stages of stream pipeline, with additional methods to manage size infom control flow
- call begin() before accept(): inform data coming
- accept: proccess element, wrapped operation in this method
- after data sent, call end()

Stage: initial | active
3 stage: filtering, mapping, reducing
- represent each stage of pipeline, send some elem downStream
- then call correct method in downStream
- each stage must implement correct accept() corresponding to data type accepts

specialized subtype (eg. Sink.OfInt) override accept(Object)
chaining subtype (eg. ChainedInt) implement Sink.OfInt
- maintain field represent downstream
- implement begin(), end(), cancellationRequested()

most intermediate operations use chaining wrappers

## pipeline
Sink1 -> Sink2 -> Sink3 -> ReducingSink

eg. stream().count()

ReferencePipeline.count
LongPipeline.sum
LongPipeline.reduce
AbstractPipeline.evaluate
REduceOp.evaluateSequential
AbstractPipeline.wrapAndCopyInto
AbstractPipeline.copyInto
ArrayListSpliterator.forEachRemaining
ReferencePipeline.accept


# TerminalOp





















