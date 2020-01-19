// interface User {
//     name: string,
//     age: number
// }
// let user = {} as User;
// user.name = '马加奥'

// let stringObj = '10';
// let numberObj = 50;
// stringObj = <any>numberObj
// console.log(stringObj)

// interface Foo {
//     bar: number;
//     name: string;
// }
  
// const foo: Foo = {
//     name: 'mario'
// } as Foo;
// console.log(foo)

// function createNewUser (userInfo: { userName: string }): void {
//     console.log(userInfo)
// }
// createNewUser({ userName: 'mario' })

interface UserInfo {
    userName: string
}
function createNewUser (userInfo: UserInfo): void {
    console.log(userInfo)
}
createNewUser({ userName: 'mario'})
let user = {
    userName: 'mario',
    age: 22
}
createNewUser(user)