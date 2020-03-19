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

// class UserOptions {
//     public userName: string;
//     public password: string;
//     getUserName ():any {}
//     constructor (userName: string, password: string) {
//         this.userName = userName
//         this.password = password
//     }
// }
// interface UserAccount extends UserOptions {
//     setUserName():void;
// }
// class User implements UserAccount {
//     public userName: string;
//     public password: string;
//     constructor (userName: string, password: string) {
//         this.userName = userName
//         this.password = password
//     }
//     setUserName () {}
//     getUserName () {
//         console.log(this.userName)
//         return this.userName
//     }
// } 
// let user = new User ('mario','528528')
// user.getUserName()

// class User {
//     // 类的成员变量
//     public userName: string
//     // 类的构造函数
//     constructor (userName: string) {
//         this.userName = userName
//     }
//     // 类的方法
//     getUserName(): string {
//         return this.userName
//     } 
// }
// let user = new User('mario')
// user.getUserName() 

// class SuperClass {
//     private userName: string;
//     constructor (userName: string) {
//         this.userName = userName
//     }
//     init (): void {
//         console.log(this.userName)
//         console.log(`${this.userName} Init from SuperClass`)
//     }
// }
// class sonClass extends SuperClass {
//     constructor(userName: string) {
//         super(userName)
//     }
//     sonFun():void {
//         console.log(`${this.userName} log from SonClass`)
//     }
// }
// let son = new sonClass('mario')
// son.sonFun()

// class SuperClass {
//     protected userName: string;
//     constructor(userName: string) {
//         this.userName = userName
//     }
// }
// class SonClass extends SuperClass {
//     private age: number;
//     constructor (userName: string, age: number) {
//         super(userName)
//         this.age = age
//     }
//     getUserInfo (): void {
//         console.log(this.userName, this.age)
//     }
// }
// const user = new SonClass('mario', 22)
// user.getUserInfo()    // mario 22
// class User {
//     protected userName: string;
//     protected constructor (userName: string) {
//         this.userName = userName
//     }
// }
// let user = new User()
// class sonClass extends User {
//     constructor (userName: string) {
//         super(userName)
//     }
// }
// let son = new sonClass('mario')
// class User {
//     readonly userName: string;   // 设置为只读属性 此时未赋值 则只能在构造函数中赋值
//     readonly age: number = 22    // 设置为只读属性 此时已赋值
//     constructor (userName: string) {
//         this.userName = userName
//         this.age = 20
//     }
//     setUserAge (age: number) {
//         this.age = age
//     }
// }
// let user = new User('mario')
// console.log(user)
// user.userName = 'majiaao'

// let channelCode = '528528'
// class User {
//     private _userName: string;
//     constructor (userName: string) {
//         this._userName = userName
//     }
//     get userName():string {
//         console.log('get')
//         return this._userName
//     }
//     set userName(newString: string){
//         if (channelCode == '528528') {
//             console.log('set')
//             this._userName = newString
//         }else {
//             console.log('channel code error')
//         }
//     }
// }
// let user = new User('mario')
// console.log(user)
// console.log(user.userName)
// user.userName = 'ma'
// console.log(user.userName)
// class User {
//     static _userName: string = 'mario'
//     constructor (public age: number) {
//         console.log(User._userName)
//     }
// }
// let men = new User(22);     // mario
// let women = new User(23);   // mario

// abstract class User {
//     abstract setUserName (newValue: string): boolean;
//     getUserName () {
//         console.log(this._userName)
//     }
//     constructor(public _userName: string) {}
// }
// class sonClass extends User {
//     constructor(userName: string) {
//         super(userName)
//     }
//     setUserName (newValue: string) {
//         this._userName = newValue
//         console.log(this._userName)
//         return true
//     }
// }
// let user = new sonClass('mario');
// user.getUserName()
// user.setUserName('majiaao')
// function Ttest(param: string):string {
//     return param
// }
// console.log(Ttest('mario'))
// function Ttest<T>(param: T):T {
//     return param
// }
// console.log(Ttest('mario'))
// console.log(Ttest(22))
// function Ttest<T>(param: T): T {
//     console.log(param.length)
//     return param
// }
// console.log(Ttest<string>('mario'))   // mario
// console.log(Ttest(22))        // 22
// function Ttest<T>(param: T[]): T[] {
//     console.log(param.length)
//     return param
// }
// console.log(Ttest<string>(['mario']))   // mario
// console.log(Ttest(22))        // 22
// function identity<T>(arg: T): T {
//     return arg;
// }

// let myIdentity: <T>(arg: T[]) => T[] = identity;
// console.log(myIdentity(['mario']))
// interface UserOptions {
//     <T>(arg: T): T
// }
// function User<T>(params: T): T {
//     return params
// }
// let myIdentity: UserOptions = User;
// interface UserOptions<T> {
//     <T>(arg: T):void
// }
// function User<T>(param: T) {
//     // do something...    
// }
// let user: UserOptions<string> = User

// class User<T> {
//     constructor(public age: T) {}
//     setAge (newAgeData: T) {
//         this.age = newAgeData;
//     }
// }
// let user = new User<number>(22)
// user.age = 23
// user.setAge(24)
 
// interface Constraint {
//     length: number,
// }
// function User<T extends Constraint> (userList: T): void{
//     console.log(userList.length)
// }
// User(22)             // Error
// User('22')           // Success
// User(['22'])         // Success
// User({length: 22})   // Success
// 装饰器工厂
// function decoration(param: string) {
//     // 返回一个装饰器
//     return function (target: any) {
//         // do something with "target" and "param"...
//     }
// }
// let chunk: string = 'mario';
// @A @B chunk
// function getSum(paramA:number, paramB: number):number {
//     return paramA + paramB
// }
// getSum(1, 2) // 3
// function getSumByCurrying(paramA: number):any {
//     return function (paramB:number):number {
//         return paramA + paramB
//     }
// }
// getSumByCurrying(1)(1)
// function decorationFactory(params:any):any {
//     console.log(params)
//     return function () {
//         console.log('return a new decoration function')
//     }
// }
// @decorationFactory
// class Test {

// }
// let test = new Test()
// 柯里化函数实现
// 第一种 递归
// function getSumByCurrying(fn: any, ...params: number[]) :any {
//     console.log(params.length)
//     let paramsLen = params.length
//     let args = fn.length
//     return function _fn() {

//     }
// }
// getSumByCurrying((paramA: number, paramB: number)=> {
//     return paramA + paramB
// }, 1,2,3,4,5)
// function decorationFunA () {
//     console.log("decorationFunA start")
//     return function (target:any, propertyKey: string):any {
//         console.log("decoration A called")
//     }
// }
// function decorationFunB () {
//     console.log("decorationFunB start")
//     return function (target:any, propertyKey: string):any {
//         console.log("decoration B called")
//     }
// }
// class A {
//     @decorationFunA()
//     @decorationFunB()
//     test () {}
// }
// function decorationFun (target: any):any {
//     return class extends target {
//         userName = 'Reload class'
//     }
// }

// @decorationFun
// class User {
//     constructor( public userName: string ) {
//     }
//     getUserName (): string {
//         return this.userName
//     }
// }
// let user = new User('mario')
// console.log(user.getUserName())

// function decorationPrototype(param: string) {
//     return function (target: any, name: string) {
//         target[name] = param
//     }
// }
// class User {
//     @decorationPrototype('typeScript')
//     public userName: string | undefined
//     public age?: number
//     constructor() {
//     }
//     getUserName (): string | undefined {
//         return this.userName
//     }
// }
// let user = new User()
// console.log(user.getUserName())
// function decorationMethods(params:boolean) {
//     return function(target: any, keyName: string, descriptor: PropertyDescriptor) {
//         console.log(target, keyName, descriptor)
//         descriptor.enumerable = params;
//     }
// }
// function decorationFun(params:string): Function {
//     return function (target: any, keyName: string, descriptor: PropertyDescriptor) {
//         let tempFun = descriptor.value
//         descriptor.value = function () {
//             console.log('change methods')
//         }
//     }
// }
// class User {
//     public userName: string | undefined
//     public age?: number
//     constructor() {
//     }
//     @decorationMethods(false)
//     getUserName (): string | undefined {
//         return this.userName
//     }
//     @decorationFun('1')
//     run () {}
// }
// let user = new User()
// user.run()

// function decorationClass(params:string) {
//     return function (target: any) {
//         console.log(params)
//     }
// }
// function decorationMethod(params:string): Function {
//     return function (keyName: string, descriptor: PropertyDescriptor) {
//         console.log(params)
//     }
// }
// function decorationPrototype(params:string): Function {
//     return function (target: any, name: string) {
//         console.log(params)
//     }
// }
// function decorationParam(params:string) {
//     return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
//         console.log(params)
//     }
// }
// @decorationClass('class decoration')
// class User {
//     @decorationPrototype('prototype decoration')
//     public age?: number
//     constructor() {
//     }
//     @decorationMethod('method decoration')
//     getUserName (@decorationParam('param decoration') userName: string): string{
//         return userName
//     }
// }
// let httpOptions = {
//     requestUrl:  'http://typeScript/learn',
//     methon: 'post',
//     params: {
//         page: 0
//     }
// }
// console.log('params' in httpOptions)
// console.log(httpOptions.hasOwnProperty('params'))
// Reflect.has(httpOptions, 'params')
// enum Code {
//     Error = 1,  // 1
//     second,     // 2
//     third       // 3
// }
// enum Code {
//     first = 'first',    
//     second = 'second',   
//     third = 'third'   
// }
// enum FileAccess {
//     // constant members
//     None,
//     Read    = 1 << 1,
//     Write   = 1 << 2,
//     ReadWrite  = Read | Write,
//     // computed member
//     G = "123".length
// }
// console.log(FileAccess.None)
// function funcVoid(): void {
//     //   do something
// }
// function neverFun(): never {
//     while (true) {
//         // do something ....
//     }
// }
// let a = 123;
// a = '123'
// enum reverse {
//     first= 10,
//     second = 10
// }
// console.log(reverse[10])
// type User<T> = {
//     userName: T,
//     relationship: User<T>
// }
// let ma: User<string> = {
//     userName: 'mario',
//     relationship: {
//         userName: 'zhang',
//         relationship: ''
//     }
// }
// type User = any;
// let men: User = 'mario'
// men = 22
// let someValue: string | number;
// someValue = '10'
// let strLength: number = someValue.length;
// console.log(strLength)
// interface Person {
//     name: string
// }
// interface Men {
//     sex: string
// }
// interface Women {
//     age: number
// }
// let author: Person & Men & Women;
// author = {
//     name: 'mario',
//     sex: 'men',
//     age: 22
// }
// interface Men {
//     age: number
// }
// interface Women {
//     name: string
// }
// function returnParamsType(params: Men | Women): params is Men {
//     return (params as Men).age != undefined
// }
// interface Men {
//     age: number
// }
// interface Women {
//     name: string
// }
// let userMen: Men = {
//     age: 22
// }
// let userWomen: Women = {
//     name: 'mario'
// }
// function isMen(params:Men | Women): params is Men{
//     return (params as Men).age != undefined
// }
// function returnParamsType(params: Men | Women) {
//     if (isMen(params)) return 'Men'
//     else if (!isMen(params)) return 'Women'
// }
// console.log(returnParamsType(userMen))
// console.log(returnParamsType(userWomen))
// interface Men {
//     age: number
// }
// interface Women {
//     name: string
// }

// function returnParamsType(params: string | number) {
//     if (typeof params === 'string') return 'string'
//     else if (typeof params === 'number')  return 'number'
// }
// returnParamsType('mario')        // string
// returnParamsType(22)             // number
// interface UserList {
//     readonly [keyIndex: number]: string
// }
// let userList: UserList;
// userList = ['ma','jia','ao']
// userList[1] = 'ao'
// interface UserInfo {
//     readonly [keyIndex: string]: string
// }
// let userInfo: UserInfo;
// userInfo = {
//     "userName": "mario"
// }
// userInfo.userName = 'ao'            // 类型“UserList”中的索引签名仅允许读取

// interface constructorInterface {
//     new (userName: string, age: number):  exampleInerface
// }
// interface exampleInerface {
//     getUserInfo(): string
// }
// function createConstructor(constru:constructorInterface,userName: string, age: number ):exampleInerface {
//     return new constru(userName,age)
// }
// class User implements exampleInerface {
//     public userName: string
//     public age: number
//     constructor(userName: string, age: number) {
//         this.userName = userName
//         this.age = age
//     }
//     getUserInfo (): string {
//         return `用户${this.userName}，年龄：${this.age}`
//     }
// }
// let user = createConstructor(User, 'mario', 22)
// console.log(user.getUserInfo())
// class UserOptions {
//     public userName: string;
//     private password: string;
//     getUserName ():any {}
//     constructor (userName: string, password: string) {
//         this.userName = userName
//         this.password = password
//     }
// }
// interface UserAccount extends UserOptions {
//     setUserName():void;
// }
// class User extends UserOptions implements UserAccount {
//     constructor (userName: string, password: string) {
//         super(userName, password);
//     }
//     setUserName () {}
//     getUserName () {
//         console.log(this.userName)
//         return this.userName
//     }
// } 
// let user = new User ('mario','528528')
// user.getUserName()   // success mario
// class SuperUser {
//     public password: string;
//     constructor (password: string) {
//         this.password = password
//     }
// }
// interface UserInterface extends SuperUser {
//     addUser (): boolean
// }
// class Programmer extends SuperUser implements UserInterface {
//     constructor (password: string) {
//         super(password)
//     }
//     addUser () {
//         // do something
//         return true
//     }
// }
// class User implements UserInterface {
//     addUser () {
//         // do something
//         return true
//     }
// }
// class User {
//     protected userName: string;
//     constructor (userName: string) {
//         this.userName = userName
//     }
//     getUserName () {
//         console.log(this.userName)
//     }
// }
// class Programmer extends User {
//     constructor (name: string) {
//         super(name)
//     }
// }
// let user = new Programmer('ma')
// user.userName
// class Person {
//     constructor (protected psw: string) {}
// }
// class Programmer extends Person {
//     constructor (protected password: string) {
//         super(password)
//     }
//     getPsw () :string {
//         return this.psw
//     }
// }
// let programmer = new Programmer('123')
// console.log(programmer.getPsw())
// class User {
//     static _userName: string = 'mario'
//     constructor (public age: number) {
//         console.log(User._userName)
//     }
// }
// let man = new User(22);     // mario
// let woman = new User(23);   // mario
// abstract class Person {
//     abstract getUserPsw (userName: string): string;
//     constructor() {}
// }
// class Programmer extends Person {
//     getUserPsw(userName: string): string {
//         throw new Error("Method not implemented.");
//     }
//     constructor() {
//         super()
//     }
// }
// let person = new Programmer()
// class Person {
//     constructor (public userName: string) {}
//     getUserName ():string {
//         return this.userName
//     }
// }
// class Greeter {
//     static standardGreeting = "Hello, there";
//     greeting!: string;
//     greet() {
//         if (this.greeting) {
//             return "Hello, " + this.greeting;
//         }
//         else {
//             return Greeter.standardGreeting;
//         }
//     }
// }

// function getSystemInfo (params: number): Boolean {
//     // do something ...
//     return true
// }
// function getSystemInfo (userName: string, age: number, ...job: string[]): string {
//     return `姓名:${userName},年龄: ${age},工作:${job.join(',')}`
// }
// getSystemInfo('mario', 22, "研发工程师", "前端工程师", "后端工程师")
// function getUserInfo (params) {
//     if (typeof params == 'number') {
//         return params + 1
//     }else if (typeof params == 'string') {
//         return 'super' + params
//     }
// }
// console.log(getUserInfo(22))
// console.log(getUserInfo('mario'))
function getUserInfo(params:number) :number;
function getUserInfo(params:string) :string;
function getUserInfo(params: any) {
    if (typeof params == 'number') {
        return params + 1
    }else if (typeof params == 'string') {
        return 'super' + params
    }
}
console.log(getUserInfo('mario'))
console.log(getUserInfo(22))