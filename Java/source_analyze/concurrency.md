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




# ForJoinPool
- execute(Runnable) 
  > ForkJoinTask.RunnableExecuteAction extends ForkJoinTask
  > externalSubmit(ForkJoinTask)
    - WorkQueue.push(task)

## field
INITIAL|MAXIMUM_QUEUE_CAPACITY
scanState, nsteals, config, top, array, parker, currentJoin
WorkQueue(ForkJoinPool pool, ForkJoinWorkerThread owner)

## worker thread
<states>
NORMAL: normally completed
CANCELLED, EXCEPTIONAL
SIGNAL: other tasks depend on this task, inform other tasks to join before current task completes
0: initial state (running), no need wait for subtask

after task completed as NORMAL, notifyAll other tasks

## doJoin()
return completed status (NORMAL, CANCELLED, EXCEPTIONAL)
exec(): abstract method to run sth

### exception handling
setExceptionalCompletion: use weakReference to store exceptional ForkJoinTask
1. according to exceptionTableRefQueue, delete outdated ForkJoinTask weakRef in exceptionTable 
2. wrap task by ExceptionNode. add to hash exceptionTable
3. setCompletion: state -> EXCEPTIONAL

### invoke()
wait for task to complete, return result or throw exception

# CountedCompleter
constructor(completer,initialPendingCount)
[get|set|addTo]PendingCount

ForkJoinTask with completion action performed when triggered, no remaining pending action
- more rebust in subtask stalls and blockage than other form of ForkJoinTaks
- ~ other completion based components (eg. CompletionHandler)
- multiple pending completions need trigger completion action `onCompletion`
  
pending count start at 0
change count by `setPendingCount`,`addToPendingCount`

## usage
must define method compute(), in most cases invoke tryComplete() once before returning
override getRawResult to provide result form join(),invoke()

CountedCompleter that not have completer, used as regular ForkJoinTask with added functionality
most often not bear results, declared as `CountedCompleter<Void>`, return null

status changes only upon explicit invocation of complete, ForkJoinTask.cancel, completeExceptionally

searcher
```java
class Searcher<E> extends CountedCompleter<E> {
    final E[] array;
    final AtomicReference<E> result;
    final int lo, hi;
    Searcher(CountedCompleter<?> p, E[] array, AtomicReference<E> result, int lo, int hi){
        super(p);
        this...
    }
    public E getRawResult() { return result.get(); }
    public void compute(){
        int l = lo, h = hi;
        while(result.get() == null && h >= l){
            if(h - l >= 2){
                int mid = (l+h) >>> 1;
                addToPendingCount(1);
                new Searcher(this, array, result, mid, h).fork();
                h = mid;
            } else {
                E x = array[l];
                if(matches(x) && result.compareAndSet(null,x))
                    quietlyCompleteRoot();
                break;
            }
        }
        tryComplete();
    }
    boolean matches(E e) {...}
    public static <E> E search(E[] array){
        return new Searcher<E>(null, array, new AtomicReference<E>(), 0, array.length).invoke();
    }
}
```

# ForkJoinWorkerThread (extends Thread)
- managed by ForkJoinPools, perform ForkJoinTask


ThreadGroup
- represents a set of threads, can include other thread group
- form tree that every thread group has a parent
- can access info own thread group, not other group

WorkQueue
- queue supporting work-stealing and external task submission


## ForkJoinTask
thread-like entity, much lighter weight than normal thread
huge number of tasks and subtasks can hosted by small num of actual threads

begin execution when submitted to ForkJoinPool
many programs use only methods fork() and join() / invokeAll()

lightweight form of Future
main use on pure functions, operating on purely isolated objects
should avoid synchronized methods or blocks other than joining other tasks

can define ForkJoinTasks that may block IF
1. completion of few if tasks dependent on blocking task on external sync / IO
2. minimize resource impact
3. unless blocked tasks < ForkJoinPool.getParallelism(), pool cannot guarantee enough thread available

### case
fork-join pair act like call(fork) and return(join) from parallel recursive function
joins should perform innermost-first
`a.fork(); b.fork(); b.join(); a.join();`

join() appropriate only when acyclic dependency (DAG)
- otherwise deadlock
ForkJoinTask may atomically tagged with short value using setForkJoinTaskTag/compareAndSetForkJoinTaskTag

should minimally implement protected methods exec(), setRawResult(V), getRawResult()
- large task split into smaller subtasks

### principle
compute() itself is also Worker thread
when 2 subtask call fork(), this worker thread will dispatch task to other 2 workers, itself stop working
```
Result solve(problem) 
    if (problem is small)
        directly solve problem
    else
        split into independent parts
        fork new subtask to solve each part
        join all subtasks
        compose result from subresult
```


### RecursiveAction
most computations that don't return results

### RecursiveTask
return results

### CountedCompleter
completed actions trigger other actions

### ForkJoinWorkerThread
#### work-stealing algorithm
```
                            task queue 
                                        <- add tasks
other threads steal job -> [---task---] <- current thread get job
```
no lock required if #task > 1



# Interface
## CompletionStage
stage of a possibly async computation, perform action / compute value when another CompletionStage compeltes

```java
stage.thenApply(x -> square(x))
     .thenAccept(x -> System.out.print(x))
     .thenRun(() -> System.out.println());
```

## CompletableFuture
acceptEither(Async) : CompletionStage, (Consumer, Executor)
allOf, anyOf
applyToEither(Async)

cancel: if not completed, end with CancellationException
complete: if not completed, set value returned by get()

handle: handle exception
join: return result if completed, throw exception if err

runAfter[Both/Either][Async]
thenAccept[Both][Async] : CompletableFuture<Void>
thenApply[Async] : CompletableFuture<V>
thenCombine(CompletionStage,BiFunction) : CompletableFuture<V>
thenCompose(Function<?,CompletionStage>) : CompletableFuture<V>
thenRun : CompletableFuture<Void>

whenComplete















