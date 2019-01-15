# Observable
stream of data

# Reactive
developer only need to concern how input converted to output, not timing details

## proactive VS reactive
```js
let obj ={
  a: 0,
  b: 1
}
obj.a = 3
obj.b = obj.a+1   // proactive
console.log(obj.b) // b=4
```
let function b = a+1,
each time change a, need to change b also

```js
Object.observe(obj, changes => {
  obj.b = changes[0].object.a + 1
}) // reactive
obj.a = 5
console.log(obj.b) // 6
```
this is Observer Pattern

## observer pattern VS reactive
Observer pattern: way to implement reactive method
Reactive: adjective

Observer pattern: (based on object)
1. when obj change state, inform
2. being observed obj don't know observer

Reactive:
1. based on data flow, how data A -> B


Functional:
not require you to do in reactive way

FRP:
Enumerator Pattern + Observer Pattern

# Subject
since direct subscription to observer will start from beginning every tiem
if want to restart from last status, need middleman to save state
=> Subject
- is both Observable and Observer
- multicast to internal observers list
  

## Subject
normal observable

## BehaviorSubject
set state when initialized
for any subscription, send current state, not first state

## ReplaySubject
resend last few elements

## AsyncSubject
send last value after subject complete











