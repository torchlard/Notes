# theory
typescript is not strong type, but static type with type checking

## void
can only assign undefined / null to it
if --strictNullChecks flag, null & undefined only to void, not all types

## const
variable use const, properties use readonly

## interface
support both string & number for index signatures
index with 100 === index with "100"

duck typing / structural subtyping

```ts
/** Object interface */
function printLabel(labelledObj: {label: string}){
  console.log(labelledObj.label)
}
let myObj = {size: 10, label: "Size 10 obj"}
printLabel(myObj)

/** string index signature */
// use propName deal with extra field
interface LabelledValue {
  label: string,
  [propName: string]: any
}
function printLabel(labelledObj: LabelledValue){
  console.log(labelledObj.label)
  console.log(labelledObj['size'])
}
printLabel({size: 10, label: 'size 19 obj'})

/** index interface */
interface CloudDictionary {
  [index: number]: string
  [index: string]: number | string
}
let clouds: CloudDictionary = {}
clouds[0] = 'aws'
clouds[1] = 'azure'
clouds[2] = 'gcp'
clouds['aws'] = 0
clouds['azure'] = 1

console.log(clouds[0])  // aws
console.log(clouds['aws'])  // aws

/** class interface */
// interface can only declare public parts in class
interface ClockInterface {
  currentTime: Date
  setTime(d: Date)
}
class Clock implements ClockInterface {
  currentTime: Date
  setTime(d: Date){
    this.currentTime = d
  }
  constructor(h: number, m: number){}
}


/** constructor interface */
// cannot directly implements constructor interface, must with constructor function / factory method
interface ClockInterface {
  tick()
}
interface ClockConstructor {
  // instantiate new obj
  new (hour: number, minute: number): ClockInterface
}

class Clock implements ClockInterface {
  constructor(h: number, m: number){}
  tick(){
    console.log("beep beep")
  }
}
function createClock(ctor: ClockConstructor, hour:number, minute:number): ClockInterface {
  return new ctor(hour, minute)
}

let clock = createClock(Clock, 12, 17)
clock.tick()

/** function interface */
// in OOP, class interface: describe public property method
// in FP, specify what signature in function
interface ILogistics {
  (weight: number): number
}
class ShippingService {
  // restrict the signature of logistics by interface: input num, output num
  calcFee(weight: number, logistics: ILogistics): number {
    return logistics(weight)
  }
}

const shippingService = new ShippingService()
const fee = shippingService.calcFee(10, weight => 100*weight + 10) // 1010

/** Hybrid Interface */
// contain both function and object features
// mainly used to compatible with ES5, third party, not recommend to use in new project
interface Counter {
  (start: number): string,
  interval: number,
  reset(): void
}
function getCounter(): Counter {
  let counter = <Counter>function (start: number){}
  counter.interval = 123
  counter.reset = () => {}
  return counter
}

let c = getCounter()
c(10); c.reset(); c.interval=5.0

```

property, method 
  class level: static (static side)
  object level: non-static (instance side)

object level's property and method need to `new` before use,
so `new` must belong to class level


### interface extend class
implementation in original class abandoned, only retain signature
inherit original class's private and protected part


## Type Compatibility
based on structural subtyping, not same as nominal typing
based on design of JS

```js
interface Named {
  name: string
}
class Person {
  name: string
}

let p: Named
// would be error in C#/Java, but ok for TS
p = new Person()

let x = (a: number) => 0
let y = (b: number, s: string) => 0

y = x //ok, because JS will igonore extra non-common parameter
x = y // error

```





























