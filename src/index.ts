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

// interface UserInfo {
//     userName: string
// }
// function createNewUser (userInfo: UserInfo): void {
//     console.log(userInfo)
// }
// let user: UserInfo;
// user = {
//     userName: 'mario'
// }
// createNewUser(user)
// interface UserInfo {
//     readonly username: string,
//     age: number
// }
// let user: UserInfo = {username: 'mario', age: 1};
// user.username = 'mario' // Error Cannot assign to 'username' because it is a read-only property.
// user.age = 22
// interface User {
//     readonly userName: string,
//     age ?: number
// }
// let user: User = {
//     userName: 'mario',
// }
// user.age = 22;
// console.log(user)

// interface UserInfo {
//     userName?: string,
//     age?: number
//   }
//   function addNewUser (userInfo: UserInfo): void {
//     // do something
//     console.log(userInfo)
//   }
//   let user = {
//       age: 22,
//       name: 'mario'
//   }
//   addNewUser(user);

// interface UserInfo {
//     userName?: string,
//     age?: number,
//     [keyName: string]: any
//   }
//   function addNewUser (userInfo: UserInfo): void {
//     console.log(userInfo)
//   }
//   addNewUser({age: 22, name: 'mario'})  // success
interface UserFunc {
    ({userName: string, age?: number}): void
  }
  let addNewUser: UserFunc;
  addNewUser = function ({ userName: 'mario', age: 22 }) {

  }