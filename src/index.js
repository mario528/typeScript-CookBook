let paramA = Symbol('paramA');
let paramB = Symbol.for('b');
let paramC = Symbol.for('c');
console.log(paramB === paramC)
console.log(Symbol.keyFor(paramA))
console.log(Symbol.keyFor(paramB))