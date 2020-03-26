// let userAccount: string | number
// userAccount = 'mario'
// console.log(userAccount.length) // 5
// const getUserAccountLength = (userAccount: string | number):number => userAccount.length


// const globalPassword = '528528'
// let globalPhoneREG = /^1[34578]\d{9}$/
// interface PhoneNumber {
//     phoneNumber: string
// }
// interface Password {
//     password: string | number
// }
// interface UserFunc {
//     isAvailable (): boolean
// }

// class checkPhoneAvailbale implements PhoneNumber,UserFunc {
//     phoneNumber: string
//     constructor (phoneNumber: string) {
//         this.phoneNumber = phoneNumber
//     }
//     isAvailable () {
//         return globalPhoneREG.test(this.phoneNumber)
//     }
// }

// class checkPasswordAvailable implements Password,UserFunc {
//     password: number | string;
//     constructor (password: string | number) {
//         this.password = password;
//     }
//     isAvailable () {
//         return this.password == globalPassword
//     }
// }
// let passTemp = new checkPasswordAvailable('528528')
// console.log(passTemp.isAvailable())


// namespace Check {
//     const globalPassword = '528528'
//     let globalPhoneREG = /^1[34578]\d{9}$/
//     interface PhoneNumber {
//         phoneNumber: string
//     }   
//     interface Password {
//         password: string | number
//     }
//     interface UserFunc {
//         isAvailable (): boolean
//     }
//     export class checkPhoneAvailbale implements PhoneNumber,UserFunc {
//         phoneNumber: string
//         constructor (phoneNumber: string) {
//             this.phoneNumber = phoneNumber
//         }
//         isAvailable () {
//             return globalPhoneREG.test(this.phoneNumber)
//         }
//     }
//     export class checkPasswordAvailable implements Password,UserFunc {
//         password: number | string;
//         constructor (password: string | number) {
//             this.password = password;
//         }
//         isAvailable () {
//             return this.password == globalPassword
//         }
//     }
// }
// console.log(Check)
// let passTemp = new Check.checkPasswordAvailable('528528')
// console.log(passTemp.isAvailable())
// function decoratorsFactory(params: string) {
//     console.log(params)
//     return function (target: any) {
//         console.log(target)
//     }
// }
// @decoratorsFactory('1')
// class UserType {

// }

// function decorationFactory(params:any):any {
//     // 返回一个装饰器
//     console.log(params, "=====")   // [Function: Test]
//     return function (target: any) {
//         console.log(target)   // [Function: Test]
//         console.log('return a new decoration function')
//         // do something with "target" and "param"...
//     }
// }
// // 使用装饰器
// @decorationFactory(`1`)
// class Test {

// }
// let test = new Test()   
// function logPrototype (params:any) {
//     return function (target: any, name: any, desc: any) {
//         console.log(target)
//         console.log(name)
//         console.log(desc)
//         desc.value = function () {
//             console.log('fuck all')
//         }
//     }
// }
// class Http {
//     @logPrototype('1')
//     get () {

//     }
// }
// let http = new Http()
// http.get()
// function configurableFunc(value: any) {
//     return function (target: any, key: string, desc: any) {
//         console.log(target, key, desc)
//         desc.get = function (params: any) {
//             return value
//         }
//     }
// }
// class UserType {
//     public _userInfoName: string
//     constructor(userInfoName: string) {
//         this._userInfoName = userInfoName
//     }
//     @configurableFunc('superMario')
//     get userInfoName () {
//         return this._userInfoName
//     }
// }
// let ma = new UserType('mario')
// console.log(ma.userInfoName)
// function paramsFormat(params: any) {
//     return function (target: any, attr: any) {
//         console.log(target, attr, params)
//         target[attr] = params
//     }
// }
// class UserInfo {
//     @paramsFormat('superMario')
//     public userName: string | undefined
//     constructor (userName: string) {
//         this.userName = userName 
//     }
//     getUserName() {
//         console.log(this.userName)
//     }
// }
// namespace Check {
//     export interface PhoneNumber {
//         phoneNumber: string
//     }
//     export interface Password {
//         password: string | number
//     }
//     export interface UserFunc {
//         isAvailable (): boolean
//     }
// }