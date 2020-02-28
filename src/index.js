// let httpOptions = {
//     requestUrl:  'http://typeScript/learn',
//     method: 'post',
//     params: {
//         page: 0
//     }
// }
// console.log('params' in httpOptions)
// console.log(httpOptions.hasOwnProperty('params'))
// Reflect.has(httpOptions, 'params')
// console.log(Reflect.get(httpOptions,'params'))
// console.log(Reflect.set(httpOptions,'params', {page: 1}))
// console.log(Reflect.get(httpOptions,'params'))
// try {
//     Object.defineProperty(httpOptions, param, {});
//     // success
// } catch (e) {
//     // failure
//     console.log(e)
// }
// console.log(Reflect.defineProperty(httpOptions, 'params', {}))
// console.log(httpOptions)
// let obj = {};
// let paramA = Symbol('firstName')
// obj[paramA] = 'ma'
// obj.paramB = 'jia'
// console.log(obj)        
// console.log(Object.getOwnPropertySymbols(obj))
// console.log(Reflect.ownKeys(obj)   )                     // { paramB: 'jia', [Symbol(firstName)]: 'ma' }
// // [ Symbol(firstName) ]
// let paramA = Symbol('paramA');
// let paramB = Symbol.for('b');
// let paramC = Symbol.for('b');
//      // true
//   // undefined
//   // b
// console.log(paramB === paramC )
// console.log(Symbol.keyFor(paramA))
// console.log(Symbol.keyFor(paramB))
// function returnParamsType (params) {
//   if (params.length) return 'string'
//   else return 'number'
// }
// returnParamsType('mario')
// returnParamsType(22)
// console.log(returnParamsType('mario'))
// console.log(returnParamsType(22))

// 构造函数
// function Person () {}
// Person.prototype.name = 'mario'
// Person.prototype.age = 22
// Person.prototype.getUserInfo = function (){
//   console.log(`性别:${this.name}-年龄：${this.age}`);
// }

// let person1 = new Person()
// console.log(person1.age)
// person1.getUserInfo()

// let person2 = new Person()
// person2.age = 23
// console.log(person2.age)
// person2.getUserInfo()

// let person3 = new Person()
// console.log(person3.age)
// person3.getUserInfo()

// function Person(name, age, sex) {
//   this.name = name
//   this.age = age
//   this.sex = sex
//   this.getInfo = function () {
//     return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age}`
//   }
// }
// let programer = new Person('mario', 22, '男')
// Person.prototype == programer.__proto__
// Person.prototype.constructor == Person
// programer.__proto__.constructor == Person
// console.log(programer.__proto__.constructor == Person)
// console.log(Object.getPrototypeOf(programer) == Person.prototype)

// function Person () {
// }
// Person.prototype.name = 'mario'
// Person.prototype.age = 22
// Person.prototype.sex = 'men'
// Person.prototype.getInfo = function () {
//     return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age}`
// }
// let programer = new Person()
// let productManager = new Person()
// console.log(productManager.getInfo())               // 姓名:mario,性别: 男,年龄: 22
// console.log(programer.getInfo())                    // 姓名:mario,性别: 男,年龄: 22
// programer.job = 'front-end-programer'
// programer.age = 23
// console.log(programer.getInfo())                    // 姓名:mario,性别: 男,年龄: 23
// programer.job = 'front-end-programer' 
// console.log(productManager.getInfo())               // 姓名:mario,性别: 男,年龄: 22
// console.log(productManager.job)                     // 
// console.log(programer.hasOwnProperty('job'))
function Person () {}
Person.prototype = {
    constructor: Person,
    name: 'mario',
    age: 22,
    sex: 'men',
    getInfo: function() {
        return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age}`
    }
}
let program = new Person()
console.log(program.constructor)