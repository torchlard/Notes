# goal
govern exchange of stream data across aysnc boundary
- passing elemetns onto another thread / thread pool 
- ensuring receiving side not forced to buffer arbitrary amount of data

=> backpressure is integral part of model to allow queues
  - which mediate between threads to be bounded
  - if backpressure signal sync => benefit of async processing negated

need to mandate fully non-blocking and async behavior of all aspects

only concerned with mediating stream of data between different API components

## API Component
specifies type to implement Reactive Streams, achieve interoperability between different implementations

1. Publisher
2. Subscriber
3. Subscription
4. Processor

## Glossary
Signal
Demand: elements requested by subscriber yet to be delivered by publisher
Synchronous: execute on calling thread
return normally: return value of declared type to caller; can only use `onError` to signal failure
responsivity
non-obstructing: execute method as quick as possible
terminal state
NOP: execution that has no detectable effect on calling thread, can safely call any times
Serial: non-overlapping signal
Thread-safe


# publisher
```java
public interface Publisher<T> {
  public void subscribe(Subscriber<? super T> s);
}
```

publisher must submit element ≤ requested by subscriber
publisehr not guarantee produce enough requested elements
must be serial: onSubscribe, onNext, onError, oncomplete

fail -> onError; success -> onComplete

if subscription cancelled, its subscriber must eventually stop being signaled
if Subscriber is null, must throw null pointer excception to caller
- for all other cases must use onError

Publisher.subscribe can call many times, must be with different Subscriber each time

# Subscriber
```java
public interface Subscriber<T> {
  public void onSubscribe(Subscription s);
  public void onNext(T t);
  public void onError(Throwable t);
  public void onComplete();
}
```

signal demand via `Subscription.request(long n)` to receive onNext signals
if Subscriber signal processing affect publisher's rsponsivity -> aysnc dispatch signal

`Subscriber.onSubscribe` must be called at most once for a given Subscriber
calls on signal method happen-before processing of respective signal
must call subscription.cancel() on given `Subscription` after `onSubscribe` signal if already has active `Subscription`

only way for Sbuscriber to signal failure = calcel its Subscription
- if rule violated, any associated Subscription to Subscriber considered cancelled

# Subscription
```java
public interface Subscription {
  public void request(long n);
  public void cancel();
}
```
`request`, `cancel` must only be called inside Subscriber context
allow call request() synchronously within onNext/onSubscribe

request() place upper bound on possible sync recursion between Publisher and Subscriber
Subscription must support unbounded num of calls, support 2^63-1 demand

A subscription shared by exactly 1 Publisher and 1 Subscriber
- for mediating data exchange between pair


# Processor
```java
public interface Processor<T,R> extends Subscriber<T>, Publisher<R> {}
```
represent processing stage, which both Subscriber and Publisher must obey contract

Processor can recover onError signal / propagate signal to Subscriber


























