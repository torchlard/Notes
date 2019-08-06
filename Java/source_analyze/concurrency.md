Executor [execute]
> ExecutorService
  - submit, shutdown, awaitTermination, invoke(all/any)
> AbstractExecutorService 
  - implement submit, invoke(all/any), 




FutureTask
- cancellable async computation
- base implementation of Future to start and cancel computation
+ NEW, COMPLETINGM, NORMAL, EXCEPTIONAL, CANCELLED, INTERRUPTING, INTERRUPTED
+ FutureTask(callable / runnable,result)
+ run, awaitDone, get, set


ForJoinPool
- execute(Runnable) 
  > ForkJoinTask.RunnableExecuteAction extends ForkJoinTask
  > externalSubmit(ForkJoinTask)
    - WorkQueue.push(task)


ForkJoinWorkerThread (extends Thread)
- managed by ForkJoinPools, perform ForkJoinTask


ThreadGroup
- represents a set of threads, can include other thread group
- form tree that every thread group has a parent
- can access info own thread group, not other group

WorkQueue
- queue supporting work-stealing and external task submission



# Interface
## CompletionStage
stage of a possibly async computation, perform action / compute value when another CompletionStage compeltes

```java
stage.thenApply(x -> square(x))
     .thenAccept(x -> System.out.print(x))
     .thenRun(() -> System.out.println());
```




















