# Base class VS base type
| Type              | Class       | Interface         | Consumer            |
| ----------------- | ----------- | ----------------- | ------------------- |
| 0..N backpressure | flowable    | Publisher         | Subscriber          |
| 0..N unbounded    | Observable  | ObservableSource  | Observer            |
| 1 elem / err      | Single      | SingleSource      | SingleObserver      |
| 0..1 elem / err   | Maybe       | MaybeSource       | MaybeObserver       |
| 0 elem / err      | Completable | CompletableSource | CompletableObserver |


# Observable operator
## create
create, defer, empty/never/throw, from
interval, just, range, repeat, start, timer

## transform
buffer, flatMap, groupBy, map, scan, window

## filtering 
debounce, distinct, elementAt, filter, first, ignoreElements
last, sample, skip, skipLast, take, takeLast

## combine
and/then/when, combineLatest, join, merge, startWith
switch, zip

## error handling
catch, retry

## utility operators
delay, do, materialize/dematerialize, obsereOn
serialize, subscribe, subscribeOn, timeInterval
timeout, timestamp, using

## conditional and boolean
all, amb, contains, defaultIfEmpty, sequenceEqual, skipUntil
skipWhile, takeUntil, takeWhile

## aggreagate
average, concat, count, max, min, reduce, sum

## converting
to

## connectable observable operator
connect, publish, refCount, replay

# Observable get result
blockingFirst, blockingLast
blockingForEach, blockingIterable


# onEvent
onNext, onCompleted, onError


# Schedulers
abstract away Threads, ExecutorServices
- computation: fixed #dedicated threads in background
- io: IO like / blocking operation on dynamic set of threads
- single: single thread in sequential, FIFO
- trampoline: sequential work and FIFO manner, for testing

other scheduler:
- AndroidSchedulers.mainThread()
- SwingScheduler.instance()
- JavaFXSchedulers.gui()


# Processing
## dependent
```java
service.apiCall()
  .flatMap(value -> 
    service.anotehrApiCall(value)
      .flatMap(next -> service.finalCall(next))
  );
```

## non-dependent
result of first source irrelevant, one would like to continue with another source
```java
Observable continued = sourceObservable.flatMapSingle(ignored -> someSingleSource)
continued.map(v -> v.toString())
  .subscribe(System.out::println, Throwable::printStackTrace);
```

# overloads with desired type
due to type erasure, java not consider following signatures
eg. `operator(Functioin<T, Single<R>>)`, `operator(Function<T, Maybe<R>>)`



















