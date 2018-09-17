function Animal(name) {
  this.name = name;
}

Animal.prototype.sleep = function () {
  console.log(this.name + ' Zzzz...')
}

function Dog(name) {
  this.name = name;
}

// Dog.prototype = Object.create(new Animal())
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.makeSound = function () {
  console.log(this.name + ': Woof')
}

class Animal {
  constructor(name) {
    this.name = name
  }
  sleep() {
    console.log(this.name + ' Zzzzz...')
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name)
  }
  makeSound() {
    console.log(this.name + ': Woof')
  }
}


let dog = new Dog('Lassie')
dog.makeSound()
dog.sleep()
console.log(dog.name)
console.log('==========')

let ani = new Animal('Bassy')

// console.log(dog === Dog.prototype)
console.log(dog.__proto__)
console.log(Animal.__proto__.constructor)
console.log(Animal.prototype.__proto__.constructor)
console.log(Dog.prototype.__proto__.constructor)
console.log(dog.__proto__.constructor)
console.log(Dog.prototype.constructor)
console.log(Dog.prototype.__proto__.constructor)

console.log('========')
let bob = new(Dog.prototype.__proto__.constructor)('Bob')
bob.sleep()
try {
  bob.makeSound()
} catch (e) {
  console.log('error happened!')
}
