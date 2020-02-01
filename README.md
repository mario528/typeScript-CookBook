# TypeScript CookBook
## 前言
本书主要内容涉及到 TypeScript 开发的完整知识体系架构，并对一些知识进行额外的扩展。 因为
作者也是刚刚毕业，所以文章内有任何问题请谅解并感谢 issues 指出 🙏

码字不易，如果您本书对您有所帮助，有经济实力的朋友可以请作者一杯咖啡(谢绝学生赞赏)
<p align="center">
    <img src="https://s2.ax1x.com/2020/01/30/1lpZ6A.md.jpg" width="300"/>
</p>

没有的如果有帮助可以点个star，让我们一起学习，一起进步。
## 目录
* [开始](#开始)
* [类型](#类型)
* [接口](#接口)
* [类](#类)
* [装饰器](#装饰器)
* [泛型](#泛型)
* [声明空间](#声明空间)
* [模块](#模块)
* [命名空间](#命名空间)
* [环境声明文件](#环境声明文件)
* [拓展知识点](#拓展知识点)
# 开始
### 什么是TypeScript ?
TypeScript 是 JavaScript 的超集, TypeScript 主要提供了 **类型系统** 以及 **ES6** 
的支持，它增加了代码的可读性和可维护性，避免了因为 JavaScript 弱类型特性导致的一系列 
bug。
### 开发前
本书所有代码均基于 ES6 语法，建议您在阅读本书前，需熟悉掌握 JavaScript 开发以及 ES6 语
法。若您对 JavaScript 不是很了解，为了保证您的学习效率，建议首先系统学习 JavaScript 的相关课程。
### 开发环境
#### IDE
对于 TypeScript 开发者来说，最优秀的 IDE 可能便是 VScode 了。本身便使用 TypeScript 
开发的 VScode 可以为我们提供无缝、顺滑的开发体验。所以 TypeScript 官方也是推荐我们使用 
VScode 来进行开发的。
#### 版本
本书基于 TypeScript 3.7.4 版本进行开发,后续版本若有破坏性更新或变动会进行相应补充修改。

好了，现在开始我们的TypeScript学习吧 😊
# 类型
每当我们接触到一个全新的编程语言时，首先都会去学习它的数据类型。正如名字所直观表现的，数据类型和数据类型校验是 TypeScript 这门语言的灵魂所在。所以接下来，让我们从数据类型开始这一
段 TypeScript 学习课程吧。
> ### TypeScript中的数据类型
TypeScript 支持几乎所有的 JavaScript 语言类型，并且增加了一些新的类型：枚举和元组。
#### **原始数据类型**
- number 浮点数类型  
``` TypeScript
let tNumber: number = 10;
```
- string 字符串类型 
``` TypeScript
let tString: string = 'mario';
```
- boolean 布尔值类型
``` TypeScript
let tBoolean: boolean = false;
```
- null
- undefined
##### 扩展 null 和 undefined 的区别
有 JavaScript 开发经验的开发者应该了解，null 和 undefined 是一对看似亲密无间，其实
有着很大不同的属性。当我们通过 == 运算符比较两者时，会发现返回值为 true。使用全等运算符
时，结果返回false。所以可知，null 和 undefined 的类型本质上其实是不一样的：

首先，当一个对象的值为 undefined 时，实际表示该对象已经创建，但还未赋值。当我们获取一个值
返回值为 null 时，表示空对象指针，现在没有该对象。

接着，当我们使用 typeof 获取两者的类型时，发现 undefined 返回值为 undefined，转换为浮
点数类型后为NaN。而 null typeof 返回值为 object，转换为浮点数类型后为0。
- symbol  

在平时的开发中，可能对于一些开发者来说，symbol的使用机会比较少，但 es6 引入 symbol 还是
有其原因的:
> 本段摘自阮一峰大大的 [ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/symbol "ECMAScript 6入门"):
>
>ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但
又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一
种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。

在 TypeScript 中, symbol 是通过 Symbol 函数创建的。但需要注意的是，Symbol 并不是类方
法。生成的 symbol 也并非是对象，而是**原始类型**。并且，Symbol 类型也不可以与其他类型进
行运算，否则会有错误抛出。
Symbol 类型可以转化为 Boolean 或者 String 类型。但无法转化为数字类型。
在ES2019中，Symbol 返回值具有 description 属性
``` TypeScript
let symA = Symbol('mario');
symA.description  // mario
```
又例如下面的一段代码
``` TypeScript
let obj = {}
let paramA = Symbol('firstName')
obj[paramA] = 'ma'
obj.paramB = 'jia'
obj               // { paramB: 'jia', [Symbol(firstName)]: 'ma' }
Object.keys(obj)  // ['paramB']
```
从上面的代码可以看出，属性名中键名为 Symbol 类型的在 Object.keys、JSON.stringify()、
for...in、for...of 等遍历中无法获取。但对象中的 Symbol 类型属性也不是没办法获取，在 
Object 下有 getOwnPropertySymbols API 可以获取所有 Symbol 类型属性名。另外，一个新
的 API 可以一劳永逸的解决输出所有对象属性名 - Reflect.ownKeys()。对 Reflect 类 API 
不熟悉的同学可以到最后一章扩展知识中学习，里面有对 [Reflect](#拓展知识点) 详细的补充。
``` TypeScript
let obj = {};
let paramA = Symbol('firstName')
obj[paramA] = 'ma'
obj.paramB = 'jia'
obj                                // { paramB: 'jia', [Symbol(firstName)]: 'ma' }
Object.getOwnPropertySymbols(obj)  // [ Symbol(firstName) ]
Reflect.ownKeys(obj)               // [ 'paramB', Symbol(firstName) ]
```
若想使用同一个 Symbol 值 可以使用 Symbol.for 方法。如果调用时，有该 
Symbol 值,则直接返回该 symbol 值，若没有，则创建一个新的。
| Symbol() | Symbol.for() | Symbol.keyFor
|--|--|--
| 无论何时调用，均创建一个新的 Symbol | 当传入一个参数时,首先全局搜索是否有该该 symbol,如果有，则返回该 symbol 值。若没有，则创建一个新的 symbol,在全局登记 | 当传入 symbol 类型的参数在全局登记过，则返回该 Symbol 值的 key ,若传入值在全局未登记，则返回undefined。
``` TypeScript
let paramA = Symbol('paramA');
let paramB = Symbol.for('b');
let paramC = Symbol.for('b');
paramB === paramC      // true
Symbol.keyFor(paramA)  // undefined
Symbol.keyFor(paramB)  // b
```
上面介绍了Symbol在开发中常用的方法，其他的可以在 阮一峰大大的[ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/symbol "ECMAScript 6入门")中继续学习。
#### **对象数据类型**
- array 数组

TypeScript 有两种方式定义数组类型: 一种是在元素类型后面接上[],另一种是使用
我们接下来会学习到的泛型表示: Array<元素类型>。在平时的开发中，我们主要使用到的是第一种表
示方式。
``` TypeScript
// 元素类型后面接上[]
:number[] => [1,2,3] 
:string[] => ['1','2','3']
// 泛型方式表示
:Array<number> => [1,2,3]
:Array<string> => ['1','2','3']
```
- tuple 元组

元组是用来表示一个已知元素数量和元素类型的数组，其中各个元素的类型不必相同。
值得注意的是，如果我们在给越界的元素赋值时，TypeScript 解释器会使用联合查询
对可赋值类型进行推断。
``` typeScript
let example: [string, number]  
example = ['ma',22] // success
example = [22,'ma'] // error
example[3] = 'jia'  // success 越界元素类型根据类型联合查询(string | number)判断
```
- enum 枚举

枚举类型是 TypeScript 对 JavaScript 的一个补充类型。TypeScript 支持基于字符串类型和
基于数字型类型的枚举。
#### 数字型枚举
首先，我们看一下数字类型枚举，我们给 first 的初始化值为1，之后的属性虽然没有初始值，但
TypeScript 会自动从1开始增长。
``` typeScript
enum Code {
    first = 1,  // 1
    second,     // 2
    third       // 3
}
```
同样，我们也可以无需给数字类型枚举初始值，这样，TypeScript 解释器会默认给枚举的第一个元素
设置初始值为0，后面的元素从0开始增长。
``` typeScript
enum Code {
    first,      // 0
    second,     // 1
    third       // 2
}
```
我们可以通过枚举的属性来访问枚举成员，和枚举的名字来访问枚举类型。
``` TypeScript
enum Response {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: Response): void {
    // ...
}

respond("Princess Caroline", Response.Yes)
```
#### 字符串类型枚举
在字符串类型枚举中，所有的成员都必须使用字符串类型。
``` typeScript
enum Code {
    first = 'first',    
    second = 'second',   
    third = 'third'   
}
```
与数字类型枚举相比，字符串枚举没有自增长的行为，因此字符串枚举可以很好的序列化。字符串枚举
允许我们提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。
#### 异类枚举
异类类型枚举支持混合包含字符串类型和数字类型成员:
``` TypeScript
enum Code {
    first = 0,    
    second = 'second',   
}
```
但这种类型枚举对我们的开发并没有什么帮助，在日常开发中很少用到。
#### 常量枚举表达式
枚举成员使用 常量枚举表达式初始化。 常数枚举表达式是TypeScript表达式的子集，它可以在编译
阶段求值。 当一个表达式满足下面条件之一时，它就是一个常量枚举表达式：
    
    1.一个枚举表达式字面量（主要是字符串字面量或数字字面量）
    2.一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
    3.带括号的常量枚举表达式
    4.一元运算符 +, -, ~其中之一应用在了常量枚举表达式
    5.常量枚举表达式做为二元运算符 +, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象。 若常数枚举表达式求值后为 NaN或 Infinity，则会在编译阶段报错。
- any   
当我们给一个变量的类型设置为 any 后，TypeScript 的类型检查器不会对该对象的值进行类型检查
，直接让其通过编译阶段的检查。因此 any 类型兼容所有类型 当声明了一个变量的类型为any后，之
后对他的任何操作，返回值的内容均为any类型
``` TypeScript
let something <=> let something:any
```
- void
void 类型与 any 类型恰恰相反，它表示没有任何类型，相当于空值返回。常见于我们的一些函数
上:
``` TypeScript
function funcVoid(): void {
    //   do something
}
```
- Never
never 类型表示的是那些永不存在的值的类型或者根本不会有返回值的类型，never类型是任何类型的
子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了
never本身之外）。 即使 any也不可以赋值给never。下面是几个使用到 Never 类型的例子
``` TypeScript
// 永远不会有返回值的类型
function neverFun(): never {
    while (true) {
        // do something ....
    }
}
// 推断的返回值类型为never
function neverFun(): never {
    return error('return error')
}
// 返回never的函数必须存在无法达到的终点
function neverFun(): never {
    throw new Error('something error');
}
```
> ### 类型推论
在 TypeScript 中，对于为明确指出类型的代码，TypeScipt 编译器会智能的推断出该变量的类型。
``` TypeScript
let a = 123;
a = '123'     // Error 不能将类型"123"分配给number类型。
```
虽然我们在声明变量a时，并没有声明它的变量类型，但 TypeScript 会通过我们给变量 a 的赋值，
进行类型推论，自动推断出最符合的类型。在上面，TypeScript 推断出 变量 a 的类型应为 
number，所以我们之后再次给 a 赋值为字符串类型时便会报错。
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
当 TypeScript 不确定一个联合查询的变量到底具体是哪一个类型时，则只能取联合查询的属性中共
有的属性或方法,否则抛出异常。
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
  userName: 'mario'
}, {
  age: 20
});
console.log(user); // { userName: 'mario', age: 20 }
```
> ### 类型断言
TypeScript 允许改变覆盖其的类型推断 并且按照你所赋予的类型来分析他 这种机制
被成为类型断言。

首先 让我们看一下下面的代码:
``` TypeScript
let user = {}
user.name = 'mario';
```
上面的代码,在 JavaScript 中，我们可以轻松的给对象 user 赋予 name 属性。但在 
TypeScript 中，会触发'类型“{}”上不存在属性“ name ”。'的错误警告。原因就在于在创建 
user 的同时 TypeScript 编译器就将 user 的类型推断为空对象{}。因此无法再在 user 上赋
值。此时, 我们便需要使用类型断言来覆盖 TypeScript 的类型推断:
``` TypeScript
interface User {
    name: string,
}
let user = {} as User;
user.name = 'mario'
```
> ### 类型断言的根本
类型断言的根本在于, 他并不会从根本上改变使用者的类型。而是在编译时对编译器提供的一中编译类
型指示, 他的影响仅仅存在与编译语法时。
> ### 双重断言
___
# 接口
如果你在大学学习或接触过 Java、C# 这类面向对象编程语言的来说, 接口一定不会陌生。但很遗憾,
由于 JavaScript 是一款弱类型的编程语言, 没有类型声明，interface 也就没有了用武之地。
在 TypeScript 中总算添加了接口的定义。接下来让我们一起学习 TypeScript 的接口吧。

其实在生活中，我们无时无刻都在接触接口。例如充电器和插线板。插线板出厂就规定了它允许哪一类
充电器可以与其对接。
在 TypeScript 中也是一样。接口(**interface**)会设定参数的数据类型。并在之后对每一次赋
值进行类型检验，如果赋值与接口的规格(数据类型)相符，则赋值成功。否则，会抛出异常。

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
我们从上面的代码可以看出, createNewUser 方法使用刚刚定义的接口 UserInfo 对传入的参数进
行了类型校验,
倘若入参数据类型不符规定或者传入的参数中包括接口未定义的参数或者缺少接口中定义的参数，
TypeScript 类型检查器会抛出错误。
通过了上面的学习，我们明白了如何创建一个接口去规范数据类型。
### 接口的只读属性
在接口中，使用 readonly，即可规定该接口参数为只读属性, 使用read-only定义的属性在第一次
赋值后，就再也无法改变该值了。
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
尽管接口定义了入参的属性和数据类型,并且{ age: 22, name: 'mario' }看似也是合乎类型的。
但在 TypeScript 解释器看来，
当赋值对象存在接口不包含的属性时，对象字面量会被特殊对待而且会经过 额外属性检查。随即抛出
错。对于这种情况，我们可以使用类型断言、添加字符串索引签名解决又或者将参数赋予参数再传入:
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
这三种方式，添加类型断言方法通过类型断言方式通过额外的类型检查、添加字符串索引签名方法通过
添加字符串索引方式兼容多余属性。而
第三种通过对象方式传入方法，则是因为通过对象赋值给另一对象根本就不会触发额外的类型检查。
### 函数类型接口
当我们期望通过接口定义函数类型时，我们便用到了函数类型接口。值得注意的是，因为对象类型接口
对于顺序没有要求，所以要求接口内类型名称
与传入类型名称保持一致。但由于函数要求传入参数的类型顺序和定义要保持一致，因此函数类型接口
并不要求参数名与接口里定义的名字相匹配。TypeScript 的类型检查器会根据函数的
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
当我们想用接口规范数组类型时，需要使用可索引类型接口。可索引类型只支持数字类型签名和字符串
类型索引签名:
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
TypeScript 可以像 Java、 C#一样， 使用接口去规范类。在 TypeScript 中, 类通过 
implements 实现接口:
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
类类型接口与我们即将接触到的抽象类有一些相似。实现该接口的类，一并需要实现该该接口定义的参
数和方法，并且保持数据类型一致。

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
和之后学习到的类一样，接口也是可以通过 extends 相互继承的, 甚至一个接口可以继承其他的多个
接口,生成合成接口:
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
在上面，类可以实现接口。同样，接口也可以继承类。接口可以继承类的成员但不包括实现,就像我们在
接口中声明了类需要拥有的成员和方法。值得注意的是，接口同样会继承类的privite成员和protect
成员。这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被
这个类或其子类所实现:
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
# 类
在 C#、Java是基于类的继承并且由类构建出对象, 而在 JavaScript 中则是通过函数和原型链实现
继承的。在ES6中，使用了 Class 语法糖，使得 JavaScript 与其他面向对象的编程语言更为接近
了一些。

### 基础
首先让我们学习一下 TypeScript 中最基本的类 下面的代码会定义一个 User (用户)类:
``` TypeScript
class User {
    // 类的成员变量
    public userName: string
    // 类的构造函数
    constructor (userName: string) {
        this.userName = userName
    }
    // 类的方法
    getUserName(): string {
        return this.userName
    } 
}
let user = new User('mario')
user.getUserName()    // mario
```
在上面，我们定义了一个 User类， 在类中，包括三种成员，分别是：1. 类的成员变量 2. 类的构
造函数 3. 类的方法。
在类的构造函数和类的方法中， 可以使用 this 访问类的成员变量。 之后我们通过 new 实例化了 
User 类。
### 类的继承
在 TypeScript 中，可以用继承来扩展现有的类。涉及到继承，类则分为以下几类: 基类(超类) 派
生类(子类) 抽象类。 让我们来看一看下面的代码:
``` TypeScript
class SuperClass {
    userName: string;
    constructor (userName: string) {
        this.userName = userName
    }
    init (): void {
        console.log(this.userName)
        console.log(`${this.userName} Init from SuperClass`)
    }
    coverFunc (): void {
        console.log("I'm from SuperClass")
    }
}
class sonClass extends SuperClass {
    constructor(userName: string) {
        super(userName)
    }
    sonFun():void {
        console.log(`${this.userName} log from SonClass`)
    }
    coverFunc (): void {
        console.log("I'm from sonClass")
    }
}
let son = new sonClass('mario')
son.init();
son.sonFun()
son.coverFunc()
```
SonClass 作为子类，继承了超类 SuperClass 的属性和方法。在子类的构造方法中, **必须**调
用super() 执行超类中的构造函数，注意，这是 TypeScript 强制要求的。继续上面这段代码，当
子类继承超类后，也就拥有了超类的成员变量和方法, 同样，子类也可以重新定义超类中的方法, 比
如 sonClass 类，便重写了父类的该方法。
### 类的成员变量
类有三种成员变量，分别是 public、private、protected、readonly 以及 static。在上面的
例子中, 子类可以随意的访问超类中的实例方法, 是因为当未为对成员变量类型进行声明时，会默认将
其设置为 public 类型。说到这里，让我们首先来看一看 public 类型:
#### public类型的成员变量
public类型的成员变量很简单 在子类中可以任意访问
#### private类型的成员变量
当成员变量被标记为private时，该成员变量便不可以在声明其的类以外访问。为了方便理解，我们还
是套用上一个例子的代码:
``` TypeScript
class SuperClass {
    private userName: string;
    constructor (userName: string) {
        this.userName = userName
    }
    init (): void {
        console.log(this.userName)
        console.log(`${this.userName} Init from SuperClass`)
    }
}
class sonClass extends SuperClass {
    constructor(userName: string) {
        super(userName)
    }
    sonFun():void {
        console.log(`${this.userName} log from SonClass`)  // Error 属性“userName”为私有属性，只能在类“SuperClass”中访问。
    }
}
let son = new sonClass('mario')
son.sonFun()
```
#### protected 类型的成员变量
protected 类型和 private 类型类似，但不同的是，protected类型还可以在派生类中访问。我
们还是用一个例子来理解 protected 类型:
``` TypeScript
// 超类
class SuperClass {
    protected userName: string;
    constructor(userName: string) {
        this.userName = userName
    }
}
// 子类
class SonClass extends SuperClass {
    private age: number;
    constructor (userName: string, age: number) {
        super(userName)
        this.age = age
    }
    getUserInfo (): void {
        console.log(this.userName, this.age)
    }
}
const user = new SonClass('mario', 22)
user.getUserInfo()    // mario 22
```
从上面的代码可以看出，SuperClass 定义的 protected 类型的成员变量，并不同于 private 类
型的成员变量， 在它的子类 SonClass 中，也可以使用。

类中也可以拥有 protected 类型的构造方法, protected 类型的构造方法不能在包含它的类外被
实例化，但是可以被继承:
``` TypeScript
class User {
    protected userName: string;
    protected constructor (userName: string) {
        this.userName = userName
    }
}
let user = new User()   // Error 类“User”的构造函数是受保护的，仅可在类声明中访问。
// 继承 User类
class sonClass extends User {
    constructor (userName: string) {
        super(userName)
    }
}
let son = new sonClass('mario')
```
#### readonly 修饰符
和接口中的 readonly 只读属性一样，类中的成员变量也可以设置为只读属性。该成员变量的值只可
以在声明或构造函数时赋值，其他情况下赋值会抛出异常:
``` TypeScript
class User {
    readonly userName: string;   // 设置为只读属性 此时未赋值 则只能在构造函数中赋值
    readonly age: number = 22    // 设置为只读属性 此时已赋值
    constructor (userName: string) {
        this.userName = userName
        this.age = 20
    }
    setUserAge (age: number) {
        this.age = age           // Error Cannot assign to 'age' because it is a read-only property.
    }
}
let user = new User('mario')
console.log(user)
user.userName = 'majiaao'      // Error Cannot assign to 'userName' because it is a read-only property.
```
#### 存取器
TypeScript支持通过 getters/setters 来截取对对象成员的访问。 它能帮助你有效的控制对对
象成员的访问。提起 getters/setters 方法，很多人肯定会想起 在 Vue 老版本中使用到的 
Object.defineProperty。通过这个方法，我们实现了 Model层与View层的双向绑定。
Object.defineProperty 需要三个参数 object、 propName、 descriptor。object 负责绑
定劫持的对象，propName 表示需要添加的变量名，descriptor 为一个对象，其中包括所有操作的
属性:

| value | enumerable | writable | configurable | get | set
|--|--|--|--|--|--|
| 属性值 | 是否可枚举 默认 false | 是否可以被重新赋值 默认false => 只读 | 1.属性是否
可以被删除 2.属性的特性在第一次设置之后可否被重新定义特性 | 存取器 取值的时候的方法 | 存
取器 修改值的时候的方法
接下来，我们来学习一下 TypeScript 中 存取器:
``` TypeScript
let channelCode = '528528'
class User {
    private _userName: string;
    constructor (userName: string) {
        this._userName = userName
    }
    get userName():string {
        console.log('get')
        return this._userName
    }
    set userName(newString: string){
        if (channelCode == '528528') {
            console.log('set')
            this._userName = newString
        }else {
            console.log('channel code error')
        }
    }
}
let user = new User('mario')
user                    // User { _userName: 'mario' }
user.userName           // get mario
user.userName = 'ma'    // set
user.userName           // get ma
```
### 静态类型
不同于前面的类型存在于类的实例上，静态类型存在于类本身上。最后通过 类名称获取静态类型:
``` TypeScript
class User {
    static _userName: string = 'mario'
    constructor (public age: number) {
        console.log(User._userName)
    }
}
let men = new User(22);     // mario
let women = new User(23);   // mario
```
### 抽象类
抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员
的实现细节。 abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法。
``` TypeScript
abstract class User {
    abstract setUserName (newValue: string): boolean;
    getUserName () {
        console.log(this._userName)
    }
    constructor(public _userName: string) {}
}
class sonClass extends User {
    constructor(userName: string) {
        super(userName)
    }
    setUserName (newValue: string) {
        this._userName = newValue
        console.log(this._userName)
        return true
    }
}
let user = new sonClass('mario');
user.getUserName()
user.setUserName('majiaao')
```
在上面的代码中，首先我们定义了一个抽象类 User。接着，sonClass作为子类继承了User 抽象、
类。在抽象类中实现了 getUserName 方法，可以供子类使用。而在抽象类中定义的 setUserName 
则必须的子类中定义实现。并且，在子类可以覆盖实现抽象类中实现的方法。
### 将类当作接口使用
类也可以像接口一样使用 接口继承类，从而形成新的接口规范。
``` TypeScript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```
___
# 装饰器
随着 TypeScript 和 ES6 里引入了类的，在一些场景下我们需要额外的特性来支持标注或修改类及
其成员。 装饰器（Decorators）为我们在类的声明及成员上通过元编程语法添加标注提供了一种方
式，用通俗的语言来解释就是在执行原有代码前，添加代码进行预先的处理逻辑。

***因为装饰器目前还属于实验性语法,所以要在 TypeScript 中使用装饰器，需要在 tsconfig.json 文件中启用 experimentalDecorators 编译器选项***

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 装饰器使
用 @expression 这种形式，expression 求值后***必须为一个函数***，它会在运行时被调用，
被装饰的声明信息做为参数传入。

常见的装饰器有类装饰器、属性装饰器、方法装饰器、参数装饰器
### 我们为什么要使用装饰器?
正如上面我们所讲到的，装饰器是用于执行原有代码前，添加额外的预处理逻辑的。所以，当开发中，
涉及到节流、防抖、类型判断等，都可以使用装饰器实现而不用对原有代码逻辑进行修改。我们可以理
解为对原有代码的非侵入性扩展或修改。
### 补充 函数柯里化 Currying
函数柯里化高阶函数的一个特殊用法,就是将方法接受的多参数转换为接受单一参数的一种模式: 多入参 => 单一入参 => 返回一个接受余下参数且返回结果的新函数。

让我们来举一个例子了解一下函数柯里化，我们用常规模式和函数柯里化模式实现一个最简单求和方法
``` TypeScript
// 常规模式
function getSum(paramA:number, paramB: number):number {
    return paramA + paramB
}
getSum(1, 2)              // 3

// 函数柯里化模式
function getSumByCurrying(paramA: number):any {
    return function (paramB:number):number {
        return paramA + paramB
    }
}
getSumByCurrying(1)(1)    // 3
```
上面是一个最简单的函数柯里化例子，通过这个例子，我们初步认识到了何为函数柯里化，接下来，我
们继续深入了解函数柯里化。

可能有的同学在面试中，面试官会提出如何实现连续求和的面试题，这就使用到了函数柯里化。
``` TypeScript
问: 如何实现getSumByCurrying(1)(2)(3)(4)(5).....(n) 连续求和
```
### 装饰器执行的时机
### 装饰器工厂
如果我们要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数。装饰器工厂是一个
简单的方法，它会在方法调用时返回一个装饰器，这其实就是使用了上面我们所学习到的函数柯里化。
``` TypeScript
// 装饰器工厂函数
function decorationFactory(params:any):any {
    // 返回一个装饰器
    console.log(params)   // [Function: Test]
    return function () {
        console.log('return a new decoration function')
        // do something with "target" and "param"...
    }
}
// 使用装饰器
@decorationFactory
class Test {

}
let test = new Test()     // return a new decoration function
```
### 装饰器组合
就像类可以实现多个方法一样，多个装饰器可以一起应用到一个声明之上。
``` TypeScript
@f @g x      // 书写在同一行
@f
@g
x            // 书写在多行
```
### 装饰器执行顺序
当多个装饰器同时存在时，执行顺序影响着代码最后返回结果，让我们看一下下面的例子，了解装饰器
的执行顺序
``` TypeScript
function decorationFunA () {
    console.log("decorationFunA start")
    return function (target:any, propertyKey: string):any {
        console.log("decoration A called")
    }
}
function decorationFunB () {
    console.log("decorationFunB start")
    return function (target:any, propertyKey: string):any {
        console.log("decoration B called")
    }
}
class A {
    @decorationFunA()
    @decorationFunB()
    test () {}
}
// decorationFunA start
// decorationFunB start
// decoration B called
// decoration A called
```
由控制台输出结果，我们可以得知，在 TypeScript 中， 多个装饰器应用在一个声明时:

编译器会由上至下依次对装饰器进行求值

求值的结果会被当作装饰器由下至上依次调用。
### 类装饰器
类装饰器在类声明前被声明，类装饰器应用于类的构造函数，可以用来监控、增加、替换类的定义。

类装饰器表达式会当作函数被调用，类的构造函数会作为其唯一的参数。如果类装饰器返回一个值，它
会使用提供的构造函数来替换类的说明。
``` TypeScript
function decorationFun (params: string):Function {
    console.log(params)            // mario
    return function (target: any) {
        console.log(target)        // [Function: User]
    }
}

@decorationFun('mario')
class User {
    constructor(public userName: string) {
    }
    getUserName (): string {
        return this.userName
    }
}
let user = new User('mario')
```
在上面,我们学习到了类装饰器监控、增加类的定义，接下来，我们继续学习类装饰器如何实现对类的构
造方法的重载：
``` TypeScript
function decorationFun (target: any):any {
    return class extends target {
        userName = 'Reload class'
        getUserName () {
            this.userName += ' after Reload'
            return this.userName
        }
    }
}

@decorationFun
class User {
    constructor( public userName: string ) {
    }
    getUserName (): string {
        return this.userName
    }
}
let user = new User('mario')
user.userName                // Reload class
user.getUserName()           // Reload class after Reload 
```
从上面的例子我们可以看出,我们通过类装饰器实现了对类构造方法的重载。
### 属性装饰器
和类装饰器一样, 属性装饰器同样声明在一个属性声明之前（紧靠着属性声明）。同样类似于类装饰
器，属性装饰器返回的方法也需要接收2个参数:

    1: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    2: 成员(属性)的名字。
``` TypeScript
function decorationPrototype(param: string) {
    return function (target: any, name: string) {
        target[name] = param
    }
}
class User {
    @decorationPrototype('typeScript')
    public userName: string | undefined
    public age?: number
    constructor() {
    }
    getUserName (): string | undefined {
        return this.userName
    }
}
let user = new User()
user.getUserName()           // typeScript
```
### 方法装饰器
方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。它会被应用到方法的 属性描述符上，可以
用来监视，修改或者替换方法定义。方法装饰器表达式会在运行时当作函数被调用，会接受三个参数:

    1: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    2: 成员的名字。
    3: 成员的属性描述符。
我们继续使用一个例子学习方法装饰器:
``` TypeScript
function decorationMethods(params:boolean) {
    return function(target: any, keyName: string, descriptor: PropertyDescriptor) {
        console.log(target, keyName, descriptor)
        descriptor.enumerable = params;
    }
}
function decorationFun(params:string): Function {
    return function (target: any, keyName: string, descriptor: PropertyDescriptor) {
        let tempFun = descriptor.value
        descriptor.value = function () {
            console.log('change methods')
        }
    }
}
class User {
    public userName: string | undefined
    public age?: number
    constructor() {
    }
    @decorationMethods(false)
    getUserName (): string | undefined {
        return this.userName
    }
    @decorationFun('1')
    run () {}
}
let user = new User()
user.run()            // change methods
```
我们在类成员类型中存取器章节时，学习到了成员的属性描述符。在上面的例子中，我们通过 
decorationMethods 方法装饰器 将方法的可枚举属性改变为true。这样我们可以使用 
Object.keys() 得到该方法。接着我们又使用 decorationFun 修改了 User 类中的 run 方
法。
### 参数装饰器
参数装饰器声明在一个参数声明之前（紧靠着参数声明）。 参数装饰器应用于类构造函数或方法声明。
参数装饰器表达式会在运行时当作函数被调用，会接受三个参数：

    1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    2. 成员的名字。
    3. 参数在函数参数列表中的索引。
参数装饰器在平时应用的比较少，因此我们不做过深的研究。
``` TypeScript
function decorationParams(params:string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        console.log(target, propertyKey, parameterIndex)
    }
}
class User {
    public age?: number
    constructor() {}
    getUserName (@decorationParams('userName') userName: string): string{
        return userName
    }
}
```
### 所有种类装饰器执行顺序
当我们同时使用多种装饰器时，装饰器的执行顺序是怎么样的呢？我们通过一段代码就可以了解:
``` TypeScript
function decorationClass(params:string) {
    return function (target: any) {
        console.log(params)
    }
}
function decorationMethod(params:string): Function {
    return function (keyName: string, descriptor: PropertyDescriptor) {
        console.log(params)
    }
}
function decorationPrototype(params:string): Function {
    return function (target: any, name: string) {
        console.log(params)
    }
}
function decorationParam(params:string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        console.log(params)
    }
}
@decorationClass('class decoration')
class User {
    @decorationPrototype('prototype decoration')
    public age?: number
    constructor() {
    }
    @decorationMethod('method decoration')
    getUserName (@decorationParam('param decoration') userName: string): string{
        return userName
    }
}

// prototype decoration
// param decoration
// method decoration
// class decoration
```
在上面我们同时使用了类装饰器、方法装饰器、参数装饰器和方法装饰器。通过代码执行的输出，我们
可以分析出:

    1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
    2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
    3. 参数装饰器应用到构造函数。
    4. 类装饰器应用到类。


# 泛型
在 TypeScript 中，我们对数据类型有着期望和规定。比如我们希望实现一个这样的方法：函数返回
传入值,这个要求看上去很简单，我们只需要事先根据传入值的类型，设置好函数的返回值类型即可。下
面例如我们想实现一个传入string类型的变量 并返回的方法:
``` TypeScript
function Ttest(param: string):string {
    return param
}
console.log(Ttest('mario'))
```
看到这个需求，你兴高采烈的写下了上面这段代码，以为万事大吉了。然而，这时候产品经理走了过来
并带来了新的需求，她希望这个需求也可以获取到各种类型的数据，很显然，当前的方法只适用于 
string 类型，对于 number、boolean “无能为力”。使用 any 的返回类型也显然违背了 
TypeScript 对于数据类型检验的初衷。为每一个类型都重复写一个这样逻辑高度一致的方法也太过于
“奢侈”。因此，这时候 我们便需要使用 TypeScript 一个新的模式:泛型。
``` TypeScript
function Ttest<T>(param: T): T {
    return param
}
console.log(Ttest<string>('mario'))   // mario
console.log(Ttest(22))        // 22
```
在上面的代码中，我们给 Ttest 方法添加了类型变量T。类型 T 会根据我们传入值的类型，定义T的
类
型，这一过程，我们甚至可以用动态模版语言的方式去理解。这样，我们即保证了对传入值返回值类型
的
判断，又省去了大量重复逻辑的代码。在定义了泛型方法后，我们可以通过明确插入泛型类型的方式通
知
泛型方法该使用何种方式，或者直接传入参数，编译器会自动根据传入的参数的类型帮助我们确定 泛型
方法的类型。在一些复杂的情况下,编译器可能无法自动分析出传入值的类型，所以一些情况下，需要我
们用第一种方式去定义泛型方法的类型。
### 使用泛型变量
在上面，我们创建了一个 Ttest 的泛型方法后，在 Ttest 方法中，TypeScript 编译器便要求我
们，在该方法体中，把入参当作所有类型参数使用。还是上面的代码:
``` TypeScript
function Ttest<T>(param: T): T {
    console.log(param.length)         // Error 类型“T”上不存在属性“length”。
    return param
}
console.log(Ttest<string>('mario'))   // mario
console.log(Ttest(22))                // 22
```
在这个时候当我们想要获取到输入参数的长度时，就算我们的本意是获取到类型是数组或者字符串类型
的入参，但 TypeScript 编译器会用所有类型的语法标准去检测我们的代码。因此，在上面的代码
中，倘若传入的参数是没有 length方法的 number 类型，则会出现问题。因此我们可以在声明方法
时，将入参设置为**元素类型是 T 的数组**。这样.length 方法便可以在方法中是用来，这可以让
我们把泛型变量 T 当做类型的一部分使用，而不是整个类型，增加了灵活性。
``` TypeScript
function Ttest<T>(param: T[]): T[] {
    console.log(param.length)
    return param
}
console.log(Ttest<string>(['mario']))   // mario
```
### 泛型类型
泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：
``` TypeScript
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
```
接下来，我们来实现一个泛型接口:
``` TypeScript
interface UserOptions {
    <T>(arg: T): T
}
function User<T>(params: T): T {
    return params
}
let myIdentity: UserOptions = User;
```
接下来，我们还可以将泛型参数当作整个接口的一个参数，这样，就可以直接通过接口名来了解到具体
是哪一个泛型类型了：
``` TypeScript
interface UserOptions<T> {
    <T>(arg: T):void
}
function User<T>(param: T) {
    // do something...    
}
let user: UserOptions<string> = User
```
### 泛型类
泛型类和泛型接口使用类似，都是在接口名或类名后使用 <>,内添加泛型类型:
``` TypeScript
class User<T> {
    constructor(public age: T) {}
    setAge (newAgeData: T) {
        this.age = newAgeData;
    }
}
let user = new User<number>(22)
user.age = 23
user.setAge(24)
```
泛型类只可以限制实例部分的属性。
### 泛型约束
在上面的例子中，在一个泛型方法中，我们无法直接访问一个泛型变量的 .length 值。但想要实现希
望泛型类型拥有 .length 属性，则需要使用**泛型约束**：
``` TypeScript
interface Constraint {
    length: number,
}
function User<T extends Constraint> (userList: T): void{
    console.log(userList.length)
}
User(22)             // Error
User('22')           // Success
User(['22'])         // Success
User({length: 22})   // Success
```
### 在泛型里使用类类型
在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。比如：
``` TypeScript
function create<T>(c: {new(): T; }): T {
    return new c();
}
```
___
# 声明空间
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
# 模块
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
如果了解Node的模块解析策略的话,会很容易理解 TypeScript 的文件模块动态查找策略。如果不了
解也没有关系,下面我们再次回顾一下:    
当我们在模块中引入: import express from 'express'时
* './node_modules/express'
    * '../node_modules/express'
        * ../../node_modules/express
          * ......
            * 直到查找到项目的rootpath 
___
# 命名空间
在 TypeScript 中,现在的版本推荐我们使用命名空间。实质上,命名空间是位于全局命名空间下的一
个普通的带有名字的 JavaScrpt 对象。首先，让我们来看看下面的这段代码，本章命名空间相关的学
习我们都会围绕着这段代码和它的“升级版来展开:
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
上面这段代码很简单，我们在 checkIn.ts 中粗略的实现了用户的手机号、密码校验。但随着需求中
越来越多的校验器需求，可能 checkIn.ts 文件会越来越庞大。因此我们需要对代码进行模块化分
割。接下来,我们将有关用户信息验证的代码放进名为 Check 的命名空间中:
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
在 TypeScript 中, namespace 拥有和匿名函数一样的独立的作用域。在命名空间内部使用的变
量、方法、类，就无需对外暴露了。而在上面的代码中，checkPasswordAvailable 和 
checkPhoneAvailbale 需要在外部实例化。因此需要对外export暴露。
___
# 环境声明文件
当你已经看到本章时，相比已经对 TypeScript 的基础知识有了了解。接下来这一章。
# 拓展知识点
### Reflect
在本书的数据类型章节中，因为对象中键值为 Symbol 类型的属性无法遍历得到，所以我们使用了一
个新的 API: Reflect。通过Reflect的ownKeys方法获取所有属性。 
#### 什么是 Reflect
Reflect 是 ES6 中为操作对象提供的新的 API。
#### 为什么要使用 Reflect
我们已经了解到，Reflect 是一个新的操作对象的 API，但我们也清楚，在 TypeScript 中，有 
Object 对对象进行操作，那么我们为什么还需要引进一个新的 API 呢?
    
    1. 将用 Object方法 报错的情况，改为返回false
    2. 将Object对象的属于语言内部的方法放到Reflect对象上，即从Reflect对象上拿Object
       对象内部方法。
下面是 Reflact 的相关 API:
- Reflect.apply()

    对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 
    Function.prototype.apply() 功能类似。
- Reflect.construct()

    对构造函数进行 new 操作，相当于执行 new target(...args)。
- Reflect.defineProperty()

    和 Object.defineProperty() 类似。
- Reflect.deleteProperty()

    作为函数的delete操作符，相当于执行 delete target[name]。
- Reflect.get()

    获取对象身上某个属性的值，类似于 target[name]。
- Reflect.getOwnPropertyDescriptor()

    类似于 Object.getOwnPropertyDescriptor()。
- Reflect.getPrototypeOf()

    类似于 Object.getPrototypeOf()。
- Reflect.has()

    判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
- Reflect.isExtensible()

    类似于 Object.isExtensible().
- Reflect.ownKeys()

    返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受
    enumerable影响).
- Reflect.preventExtensions()

    类似于 Object.preventExtensions()。返回一个Boolean。
- Reflect.set()

    将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。
- Reflect.setPrototypeOf()

    类似于 Object.setPrototypeOf()。

下面，我们选取 Reflect 中常用的 API 进行演示:

首先我们定义一个对象 requestOptions ，之后我们所有的操作都会围绕这个对象进行。
``` TypeScript
let httpOptions = {
    requestUrl:  'http://typeScript/learn',
    method: 'post',
    params: {
        page: 0
    }
}
```
首先，在我们平日的开发中，可能会需要校验 httpOptions 是否含有某个属性
``` JavaScript
let httpOptions = {
    requestUrl:  'http://typeScript/learn',
    method: 'post',
    params: {
        page: 0
    }
}
'params1' in httpOptions                      // true
httpOptions.hasOwnProperty('params')          // true
Reflect.has(httpOptions, 'params')            // true
Reflect.get(httpOptions,'params')             // { page: 0 }
Reflect.set(httpOptions,'params', {page: 1})  // true
Reflect.get(httpOptions,'params')             // { page: 1 }

```
从上面看，我们通过 Reflect.has 方法可以实现 in 方法的效果，通过
Reflect.get 实现了获取对象参数值的效果、通过 Reflect.set 实现对对象参数数据的修改。这
就体现了我们使用 Reflect 的原因之一： 将代码外部操作转化为函数类型操作。

接下来，让我们看一下选择 Reflect 的第二个原因：
``` JavaScript
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

Reflect.defineProperty(httpOptions, 'params', {})   // true
```
我们使用 Object.defineProperty 时，如果遇到错误，编译器会直接抛出错误，所以我们那必须
用 try...catch 包裹住住代码。但如果我们使用了 Reflect.defineProperty。则会返回一个
Boolean 值反应操作的结果。
