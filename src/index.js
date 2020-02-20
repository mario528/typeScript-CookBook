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
  function Person () {}
  Person.prototype.name = 'mario'
  Person.prototype.age = 22
  Person.prototype.getUserInfo = function (){
    console.log(`性别:${this.name}-年龄：${this.age}`);
  }

  let person1 = new Person()
  console.log(person1.age)
  person1.getUserInfo()

  let person2 = new Person()
  person2.age = 23
  console.log(person2.age)
  person2.getUserInfo()

  let person3 = new Person()
  console.log(person3.age)
  person3.getUserInfo()