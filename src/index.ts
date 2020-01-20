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
// interface UserFunc {
//     (userName: string, age?: number) : void
// }
// let addNewUser: UserFunc;
// addNewUser = function (name: string, age?: number) {
//     console.log(name,age)
// }
// addNewUser('mario', 22)
// interface UserList {
//     [keyIndex: number]: string
// }
// let userList: UserList;
// userList = ["ma", "jia", "ao"];
// let firstUser: string = userList[0];
// console.log(userList, firstUser)


// interface UserDictionary {
//     [userKey: string]: string;
// }
// let userDictionary: UserDictionary;
// userDictionary = {
//     '0': 'ma',
//     '1': 'jia',
//     '2': 'ao'
// }
// console.log(userDictionary)

// interface UserClass {
//     userName: string
//     getUserName(): string
// }
// class User implements UserClass {
//     userName: string;
//     constructor (userName: string) {
//         this.userName = userName
//     }
//     getUserName () {
//         return 'mario'
//     }
// }

// interface ClockConstructor {
//     new (hour: number, minute: number): ClockInterface;
// }
// interface ClockInterface {
//     tick(): void;
// }

// function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
//     return new ctor(hour, minute);
// }

// class DigitalClock implements ClockInterface {
//     constructor(h: number, m: number) { }
//     tick() {
//         console.log("beep beep");
//     }
// }
// class AnalogClock implements ClockInterface {
//     constructor(h: number, m: number) { }
//     tick() {
//         console.log("tick tock");
//     }
// }

// let digital = createClock(DigitalClock, 12, 17);
// let analog = createClock(AnalogClock, 7, 32);

// // 静态类型
// interface StaticFunc {
//     new (name: string, age?: number): any;
// }
// // 实例方法
// interface InstanceFunc {
//     innerFunc(): void
// }
// function createInstance (ins: StaticFunc, name: string, age?: number) {
//     return new ins(name, age)
// }
// class User implements InstanceFunc {
//     constructor (name: string, age?: number) {
//         console.log(name, age)
//     }
//     innerFunc () {
//         console.log('innerFunction start')
//     }
// }
// let ma = createInstance(User, 'mario', 22)
// ma.innerFunc()

// interface User {
//     userName: string
// }
// interface UserExtend extends User {
//     age: number
// }
// let user = <UserExtend>{}
// user.userName = 'mario'
// user.age = 22

class UserOptions {
    public userName: string;
    public password: string;
    getUserName ():any {}
    constructor (userName: string, password: string) {
        this.userName = userName
        this.password = password
    }
}
interface UserAccount extends UserOptions {
    setUserName():void;
}
class User implements UserAccount {
    public userName: string;
    public password: string;
    constructor (userName: string, password: string) {
        this.userName = userName
        this.password = password
    }
    setUserName () {}
    getUserName () {
        console.log(this.userName)
        return this.userName
    }
} 
let user = new User ('mario','528528')
user.getUserName()
