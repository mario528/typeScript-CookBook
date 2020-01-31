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
  // [ Symbol(firstName) ]
  let paramA = Symbol('paramA');
  let paramB = Symbol.for('b');
  let paramC = Symbol.for('b');
       // true
    // undefined
    // b
  console.log(paramB === paramC )
  console.log(Symbol.keyFor(paramA))
  console.log(Symbol.keyFor(paramB))