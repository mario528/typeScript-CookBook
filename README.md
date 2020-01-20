# TypeScript学习笔记
## 前言
本RP为笔者的 TypeScript 学习笔记，在学习过程中，会将概念或者问题记录在本RP中。因为笔者也是刚刚毕业，所以文章内有任何问题请谅解并感谢 issues 指出🙏
___
## 开始
### 什么是TypeScript ?
TypeScript 是 JavaScript 的超集, TypeScript 主要提供了**类型系统**以及对**ES6**的支持,它增加了代码的可读性和可维护性,避免了一系列因为 JavaScript弱类型特性导致的bug。
### 开发前
对于 TypeScript 来说,最优秀的IDE可能便是 VScode 了。使用 TypeScript 编写的VScode可以我们无缝顺滑的开发TypeScript。本RP基于 TypeScript 3.7.4 版本进行开发,后续版本更新会进行相对修改。

  好了，现在开始我们的TypeScript学习吧 😄
___
## 类型
> ### TypeScript中的数据类型
#### **原始数据类型**
- number 浮点数  
``` TypeScript
let tNumber : number = 10;
```
- string 字符串 
``` TypeScript
let tString: string = 'mario';
```
- boolean 布尔值
``` TypeScript
let tBoolean: boolean = false;
```
- null
- undefined
- symbol  

在平时的开发中，可能对于我来说，symbel的使用机会比较少,但es6引入symbel还是有其原因的:
> 本段源自阮一峰大大的 [ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/symbol "ECMAScript 6入门")
>
>ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。

在 TypeScript 中, symbol 是通过 Symbol 函数创建的。但需要注意的是，Symbol 并不是类方法。生成的 symbol 并不是对象，而是**原始类型**。并且，Symbol 类型也不可以与其他类型进行运算，否则会有错误抛出。
Symbol 类型可以转化为 Boolean 或者 String 类型。但无法转化为数字类型。
在ES2019中，Symbol 返回值具有 description 属性
``` TypeScript
let symA = Symbol('mario');
symA.description // mario
```
又例如下面的一段代码
``` TypeScript
let obj = {}
let paramA = Symbol('firstName')
obj[paramA] = 'ma'
obj.paramB = 'jia'
obj               //  { paramB: 'jia', [Symbol(firstName)]: 'ma' }
Object.keys(obj)  // ['paramB']
```
从上面的代码可以看出，属性名中类型为Symbol的在 Object.keys、JSON.stringify()、for...in、for...of 等遍历中无法获取。但对象中的Symbol类型属性也不是没办法获取，在 Object 下有 getOwnPropertySymbols API 可以获取所有 Symbol 类型属性名。另外，一个新的 API 可以一劳永逸的解决输出所有对象属性名 - Reflect.ownKeys()
``` TypeScript
let a = {};
let paramA = Symbol('firstName')
obj[paramA] = 'ma'
obj.paramB = 'jia'
obj                                //  { paramB: 'jia', [Symbol(firstName)]: 'ma' }
Object.getOwnPropertySymbols(obj)  // [ Symbol(firstName) ]
Reflect.ownKeys(obj)               // [ 'paramB', Symbol(firstName) ]
```
若想使用同一个 Symbol 值 可以使用 Symbol.for 方法。如果调用时，有该 Symbol 值,则直接返回该 symbol 值，若没有，则创建一个新的。

| Symbol() | Symbol.for() | Symbol.keyFor
|--|--|--
| 无论何时调用，均创建一个新的 Symbol | 当传入一个参数时,首先全局搜索是否有该该 symbol,如果有，则返回该 symbol 值。若没有，则创建一个新的 symbol,在全局登记 | 当传入 symbol 类型的参数在全局登记过，则返回该 Symbol 值的 key ,若传入值在全局未登记，则返回undefined。
``` TypeScript
let paramA = Symbol('paramA');
let paramB = Symbol.for('b');
let paramC = Symbol.for('c');
paramB === paramC      // true
Symbol.keyFor(paramA)  // undefined
Symbol.keyFor(paramB)  // b
```
上面介绍了Symbol在开发中常用的方法，其他的可以在 阮一峰大大的[ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/symbol "ECMAScript 6入门")中继续学习。
#### **对象数据类型**
- array 数组
``` TypeScript
:number[] => [1,2,3] 
:string[] => ['1','2','3']
```
- tuple 元组
``` typeScript
let example: [string, number]  
example = ['ma',22] // success
example = [22,'ma'] // error
example[3] = 'jia'  // success 越界根据类型联合查询判断
```
- enum 枚举
``` typeScript
enum Color {
    first: 1,  // 1
    second,    // 2
    third      // 3
}
```
- any   
关闭类型检查 兼容所有类型 当声明了一个变量的类型为any后，之后对他的任何操作，返回值的内容均为any类型。
``` TypeScript
let something <=> let something:any
```
- void     空值返回
> ### 类型推断
在 TypeScript 中，对于为明确指出类型的代码，TypeScipt 编译器会智能的推断出该变量的类型。
> ### 类型别名
类型注解
``` typeScript
type UserAccount = string | number;
let userAccount: UserAccount;
userAccount = 10;     // true
userAccount = '10';   // true
userAccount = false;  // Error
```
> ### 联合查询
当希望一个变量用户多个类型可能时 即使用类型的联合查询
``` typeScript
let idCount: string | number;
idCount = 10;
idCount = '10'
```
当 TypeScript 不确定一个联合查询的变量到底具体是哪一个类型时，则只能取联合查询的属性中共有的属性或方法,否则抛出异常。
``` TypeScript
let userAccount: string | number
userAccount = 'mario'           // TypeScript将userAccount类型推断为string
console.log(userAccount.length) // success : 5
const getUserAccountLength = (userAccount: string | number):number => userAccount.length  // Error 类型“string | number”上不存在属性“length”。类型“number”上不存在属性“length”。
```
> ### 交叉类型
从两个对象中创建一个新对象，新对象会拥有着两个对象所有的功能 类似于继承的含义
``` typeScript
function fusionFun <T, U> (argA: T, argB: U): (T & U) {
  let fusionObj = <T & U>{};
  for (let item in argA) {
    (<T>fusionObj)[item] = argA[item]
  }
  for (let item in argB) {
    if (!fusionObj[item]) {
      (<U>fusionObj)[item] = argB[item]
    }
  }
  return fusionObj;
}
let user = fusionFun({
  userName: 'majiaao'
}, {
  age: 20
});
console.log(user); // { userName: 'majiaao', age: 20 }
```
> ### 类型断言
TypeScript 允许改变覆盖其的类型推断 并且按照你所赋予的类型来分析他 这种机制
被成为类型断言。

首先 让我们看一下下面的代码:
``` TypeScript
let user = {}
user.name = 'mario';
```
上面的代码,在 JavaScript 中，我们可以轻松的给对象 user 赋予 name 属性。但在 TypeScript 中，会触发'类型“{}”上不存在属性“ name ”。'的错误警告。原因就在于在创建 user 的同时 TypeScript 编译器就将 user 的类型推断为空对象{}。因此无法再在 user 上赋值。此时, 我们便需要使用类型断言来覆盖 TypeScript 的类型推断:
``` TypeScript
interface User {
    name: string,
}
let user = {} as User;
user.name = 'mario'
```
> ### 类型断言的根本
类型断言的根本在于, 他并不会从根本上改变使用者的类型。而是在编译时对编译器提供的一中编译类型指示, 他的影响仅仅存在与编译语法时。
> ### 双重断言
___
## 环境声明文件
我们在 TypeScript 项目中，例如使用 Jquery 这样的第三方库时
___
## 接口
如果你在大学学习或接触过 Java、C# 这类面向对象编程语言的来说, 接口一定不会陌生。但很遗憾, 由于 JavaScript 是一款弱类型的编程语言, 没有类型声明，interface 也就没有了用武之地。在 TypeScript 中总算添加了接口的定义。接下来让我们一起学习 TypeScript 的接口吧。

其实在生活中，我们无时无刻都在接触接口。例如充电器和插线板。插线板出厂就规定了它允许哪一类充电器可以与其对接。
在 TypeScript 中也是一样。接口(**interface**)会设定参数的数据类型。并在之后对每一次赋值进行类型检验，如果赋值与接口的规格(数据类型)相符，则赋值成功。否则，会抛出异常。

  首先，让我们观察下面这段代码，它实现了一个最简单的接口并和内联式进行对比:
``` TypeScript
// 未使用接口进行类型规范
function createNewUser (userInfo: { userName: string }): void {
  console.log(userInfo)
}
createNewUser({ userName: 'mario' })  // { userName: 'mario' }
// 使用接口进行类型规范
interface UserInfo {
    userName: string
}
function createNewUser (userInfo: UserInfo): void {
    console.log(userInfo)
}
createNewUser({ userName: 'mario', age: 22})  // Error
createNewUser({ userName: 'mario'})           // success { userName: 'mario' }
```
我们从上面的代码可以看出, createNewUser 方法使用刚刚定义的接口 UserInfo 对传入的参数进行了类型校验,
倘若入参数据类型不符规定或者传入的参数中包括接口未定义的参数或者缺少接口中定义的参数，TypeScript 类型检查器会抛出错误。
通过了上面的学习，我们明白了如何创建一个接口去规范数据类型。
### 接口的只读属性
在接口中，使用 readonly，即可规定该接口参数为只读属性, 使用read-only定义的属性在第一次赋值后，就再也无法改变该值了。
``` TypeScript
interface UserInfo {
  readonly username: string,
  age: number
}
let user: UserInfo = {username: 'mario', age: 0};
user.username = 'mario' // Error Cannot assign to 'username' because it is a read-only property.
user.age = 22           // success
```
### 接口的可选属性
在接口中，定义的属性有可能是可选的，我们可以使用':?'标志该属性是可选属性。
``` TypeScript
interface User {
    readonly userName: string,
    age ?: number
}
let user: User = {
    userName: 'mario',
}
user.age = 22;
user      // { userName: 'mario', age: 22 }
```
### 额外的属性检查
当我们使用了接口的可选属性后，我们很可能会遇到下面这类问题
``` TypeScript
interface UserInfo {
  userName?: string,
  age?: number
}
function addNewUser (userInfo: UserInfo): void {
  // do something
}
addNewUser({ age: 22, name: 'mario' });
```
尽管接口定义了入参的属性和数据类型,并且{ age: 22, name: 'mario' }看似也是合乎类型的。但在 TypeScript 解释器看来，
当赋值对象存在接口不包含的属性时，对象字面量会被特殊对待而且会经过 额外属性检查。随即抛出错。对于这种情况，我们可以使用类型断言、添加字符串索引签名解决又或者将参数赋予参数再传入:
``` TypeScript
// 1. 添加类型断言
interface UserInfo {
  userName?: string,
  age?: number
}
function addNewUser (userInfo: UserInfo): void {
  console.log(userInfo)
}
addNewUser({age: 22, name: 'mario'} as UserInfo)  // success

// 2. 添加字符串索引签名
interface UserInfo {
  userName?: string,
  age?: number,
  [keyName: string]: any
}
function addNewUser (userInfo: UserInfo): void {
  console.log(userInfo)
}
addNewUser({age: 22, name: 'mario'})  // success

// 3. 通过对象方式传入
interface UserInfo {
    userName: string
}
function createNewUser (userInfo: UserInfo): void {
    console.log(userInfo)
}
let user = {
    userName: 'mario',
    age: 22
}
createNewUser(user) //success  { userName: 'mario', age: 22 }
```
这三种方式，添加类型断言方法通过类型断言方式通过额外的类型检查、添加字符串索引签名方法通过添加字符串索引方式兼容多余属性。而
第三种通过对象方式传入方法，则是因为通过对象赋值给另一对象根本就不会触发额外的类型检查。
### 函数类型接口
当我们期望通过接口定义函数类型时，我们便用到了函数类型接口。值得注意的是，因为对象类型接口对于顺序没有要求，所以要求接口内类型名称
与传入类型名称保持一致。但由于函数要求传入参数的类型顺序和定义要保持一致，因此函数类型接口并不要求参数名与接口里定义的名字相匹配。TypeScript 的类型检查器会根据函数的
入参 一个个与接口参数进行类型比较。
``` TypeScript
interface UserFunc {
    (userName: string, age?: number) : void
}
let addNewUser: UserFunc;
addNewUser = function (name: string, age?: number) {
    console.log(name,age)
}
addNewUser('mario', 22)
```
### 可索引类型
当我们想用接口规范数组类型时，需要使用可索引类型接口。可索引类型只支持数字类型签名和字符串类型索引签名:
``` TypeScript
// 数字类型索引签名
interface UserList {
    [keyIndex: number]: string
}
let userList: UserList;
userList = ["ma", "jia", "ao"];
let firstUser: string = userList[0];
console.log(userList, firstUser)

// 字符串类型索引签名

interface UserDictionary {
  [userKey: number]: string;
}
let userDictionary: UserDictionary;
userDictionary = {
  '0': 'ma',
  '1': 'jia',
  '2': 'ao'
}
console.log(userDictionary)
```
> 可索引类型接口待完成
### 类类型接口
TypeScript 可以像 Java、 C#一样， 使用接口去规范类。在 TypeScript 中, 类通过 implements 实现接口:
``` TypeScript
interface UserClass {
    userName: string
    getUserName(): string
}
class User implements UserClass {
    userName: string;
    constructor (userName: string) {
        this.userName = userName
    }
    getUserName () {
        return 'mario'
    }
}
```
类类型接口与我们即将接触到的抽象类有一些相似。实现该接口的类，一并需要实现该该接口定义的参数和方法，并且保持数据类型一致。

接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

在类中，有两种类型，分别是静态部分的类型以及实例部分的类型:
``` TypeScript
// 静态类型
interface StaticFunc {
    new (name: string, age?: number): any;
}
// 实例方法
interface InstanceFunc {
    innerFunc(): void
}
function createInstance (ins: StaticFunc, name: string, age?: number) {
    return new ins(name, age)
}
class User implements InstanceFunc {
    constructor (name: string, age?: number) {
        console.log(name, age)
    }
    innerFunc () {
        console.log('innerFunction start')
    }
}
let ma = createInstance(User, 'mario', 22)
ma.innerFunc()
```
### 接口的继承
和之后学习到的类一样，接口也是可以通过 extends 相互继承的, 甚至一个接口可以继承其他的多个接口,生成合成接口:
``` TypeScript
// 单接口继承
interface User {
    userName: string
}
interface UserExtend extends User {
    age: number
}
let user = <UserExtend>{}
user.userName = 'mario'
user.age = 22
// 继承多个接口
interface Account {
    accountNumber: number
}
interface Password {
    password: string
}
interface LoginParams extends Account,Password {
    loginAccount: string
}
let loginObj = <LoginParams>{}
loginObj.accountNumber = 1024
loginObj.password = '528528'
loginObj.loginAccount = '528528'

```
### 接口继承类
在上面，类可以实现接口。同样，接口也可以继承类。接口可以继承类的成员但不包括实现,就像我们在接口中声明了类需要拥有的成员和方法。值得注意的是，接口同样会继承类的privite成员和protect成员。这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现:
``` TypeScript
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
user.getUserName()   // success mario
```
___
## 类
___
## 泛型
``` TypeScript
function reverse<T> (list: T[]): T[] {
    let arr:T[] = [];
    for(let i = list.length - 1; i >= 0; i--) {
        arr.push(list[i])
    }
    return arr;
}
let textList = [3,2,1];
let a = reverse(textList);
a    // 1,2,3
let textList = ['ma','jia','ao'];
let a = reverse(textList);
a    // 'ao', 'jia', 'ma'
```
___
## 声明空间
 - 类型声明空间
 - 变量声明空间

在 TypeScript 中，存在两种声明空间:
``` typeScript
// 类型声明空间
interface User {
    name: string,
    age: number
}
type Human = {}
let user: User;
let men: Human
// 变量声明空间
class User {
    constructor () {
        console.log('User')
    }
}
let Human = User;
let men = new Human(); // User
```
___
## 模块
typeScript 中的模块 在 TypeScript 中，推荐使用ES模块语法
``` typeScript
// a.ts 导出
export let a = 10;
// or 
let a:number = 10;
let b:string = 'mario528@163.com'
export { a, b as emailAddress }
// or 整体导出
let a: number
export default a = 100;
// b.ts 引入
impost { a, emailAddress } from './a'
console.log(a , emailAddress)  // 10 mario528@163.com 
// 整体引入
import * as A from './a';
console.log(A)                 // { a: 10, emailAddress: 'mario528@163.com' }
```
### 文件模块的动态查找
如果了解Node的模块解析策略的话,会很容易理解 TypeScript 的文件模块动态查找策略。如果不了解也没有关系,下面我们再次回顾一下:    
当我们在模块中引入: import express from 'express'时
* './node_modules/express'
    * '../node_modules/express'
        * ../../node_modules/express
          * ......
            * 直到查找到项目的rootpath 
___
## 命名空间
在 TypeScript 中,现在的版本推荐我们使用命名空间。实质上,命名空间是位于全局命名空间下的一个普通的带有名字的 JavaScrpt 对象。首先，让我们来看看下面的这段代码，本章命名空间相关的学习我们都会围绕着这段代码和它的“升级版来展开:
``` TypeScript
// checkIn.ts
const globalPassword = '528528'
let globalPhoneREG = /^1[34578]\d{9}$/
interface PhoneNumber {
    phoneNumber: string
}
interface Password {
    password: string | number
}
interface UserFunc {
    isAvailable (): boolean
}

class checkPhoneAvailbale implements PhoneNumber,UserFunc {
    phoneNumber: string
    constructor (phoneNumber: string) {
        this.phoneNumber = phoneNumber
    }
    isAvailable () {
        return globalPhoneREG.test(this.phoneNumber)
    }
}

class checkPasswordAvailable implements Password,UserFunc {
    password: number | string;
    constructor (password: string | number) {
        this.password = password;
    }
    isAvailable () {
        return this.password == globalPassword
    }
}
let passTemp = new checkPasswordAvailable('528528')
console.log(passTemp.isAvailable())
```
上面这段代码很简单，我们在 checkIn.ts 中粗略的实现了用户的手机号、密码校验。但随着需求中越来越多的校验器需求，可能 checkIn.ts 文件会越来越庞大。因此我们需要对代码进行模块化分割。接下来,我们将有关用户信息验证的代码放进名为 Check 的命名空间中:
``` TypeScript
namespace Check {
    // 内部执行的代码无需对外暴露
    const globalPassword = '528528'
    let globalPhoneREG = /^1[34578]\d{9}$/
    // 需要外部引用的接口 类方法 需要对命名空间外暴露出。
    interface PhoneNumber {
        phoneNumber: string
    }   
    interface Password {
        password: string | number
    }
    interface UserFunc {
        isAvailable (): boolean
    }
    export class checkPhoneAvailbale implements PhoneNumber,UserFunc {
        phoneNumber: string
        constructor (phoneNumber: string) {
            this.phoneNumber = phoneNumber
        }
        isAvailable () {
            return globalPhoneREG.test(this.phoneNumber)
        }
    }
    export class checkPasswordAvailable implements Password,UserFunc {
        password: number | string;
        constructor (password: string | number) {
            this.password = password;
        }
        isAvailable () {
            return this.password == globalPassword
        }
    }
}
let passTemp = new Check.checkPasswordAvailable('528528')
passTemp.isAvailable() // true
```
在 TypeScript 中, namespace 拥有和匿名函数一样的独立的作用域。在命名空间内部使用的变量、方法、类，就无需对外暴露了。而在上面的代码中，checkPasswordAvailable 和 checkPhoneAvailbale 需要在外部实例化。因此需要对外export暴露。
___
## 拓展知识点
