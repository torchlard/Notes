# Future
## motivation
cannot get result from Thread/Runnable
can get result from Callable, Future

invoke -> wait -> get
    VS
Future: invoke -> do sth else -> get

## class
future is interface
do cancel(), isCancelled(), isDone(), get(timeout) on Runnable/Callable


# FutureTask
implement RunnableFuture
can execute as Runnable/Future return as Callable

# CompletableFuture<T>
implements Future<T>
can explicitly completed (setting value and status), use as CompletionStage
support dependent functional and action that trigger upon its completion
when >= 2 threads want to complete/completeExceptionally/cancel CompletableFuture, only 1 succeed

- actions supplied for dependent completions of non-async methods
- all async method default Executor: ForkJoinPool.commonPool()










