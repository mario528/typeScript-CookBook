let httpOptions = {
    requestUrl:  'http://typeScript/learn',
    method: 'post',
    params: {
        page: 0
    }
}
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
console.log(Reflect.defineProperty(httpOptions, 'params', {}))
console.log(httpOptions)