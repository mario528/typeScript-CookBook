# TypeScript CookBook
## 前言
本书主要涉及 TypeScript 开发的完整知识体系架构，并且对一些知识进行额外的扩展补充。如果文章内有任何问题请谅
解并感谢 issues 指出 🙏 未经作者允许，不可私自转发

码字不易，如果您本书对您有所帮助，有经济实力的朋友可以请作者一杯咖啡(谢绝学生赞赏)


[![赞赏码](https://s2.ax1x.com/2020/01/30/1lpZ6A.md.jpg)](https://imgchr.com/i/1lpZ6A)

没有的同学可以捧个场帮忙点个star，让我们一起学习，一起进步。
## 目录
* [开始](#开始)
* [类型](#类型)
* [高级类型](#高级类型)
* [接口](#接口)
* [函数](#函数)
* [类](#类)
* [泛型](#泛型)
* [装饰器](#装饰器)
* [声明空间](#声明空间)
* [模块](#模块)
* [命名空间](#命名空间)
* [三斜杠指令](#三斜杠指令)
* [环境声明文件](#环境声明文件)
* [拓展](#拓展知识点)
# 开始
## 什么是 TypeScript ?
TypeScript 是 JavaScript 的超集, TypeScript 主要提供了 **类型系统** 以及 **ES6** 
的支持，它增加了代码的可读性和可维护性，避免了因 JavaScript 弱类型特性导致的一系列 
bug。
## 为什么要使用 TyeScript
TypeScript 是由 Microsoft 主导开发的开源的编程语言。近些年来，微软一直极力推崇在大型
项目中使用 TypeScript 替代 JavaScript 进行开发。我们都知道，大厂主导的开发语言往往会引
领未来软件的开发趋势。因此 TypeScript 必然会是未来几年开发的热门之一。NPM 上各种流行的包
现已使用 TypeScript 编写，同时，Vue、React、Angular 三大框架也都高度支 TypeScript。因此作为一个开发
者，学习 TypeScript 已经成为一个必然之举。
## 开发前
本书所有代码均基于 ES6 语法，建议您在阅读本书前，需熟悉掌握 JavaScript 开发以及 ES6 语
法。若您对 JavaScript 不是很了解，为了保证学习效率，建议您首先系统学习 JavaScript 的相
关课程。
### 开发环境
#### IDE
对于 TypeScript 开发者来说，最优秀的 IDE 便是 VScode 了。本身便使用 TypeScript 
开发的 VScode 可以为我们提供无缝、顺滑的开发体验。所以 TypeScript 官方也是推荐我们使用 
VScode 来进行开发的。
#### 版本
本书基于 TypeScript 当前最新版本(3.7.4)进行开发，后续版本若有破坏性更新或变动会进行相应
补充修改。

好了，现在让我们开始TypeScript学习吧 😊 
# 类型
每当我们接触到一个全新的编程语言时，首先都会去学习它的数据类型。正如 TypeScript 名字所直
观表现的，数据类型和数据类型校验是 TypeScript 这门语言的灵魂所在。接下来，就让我们从数
据类型开始这段 TypeScript 的学习课程吧。
> ### TypeScript中的数据类型
TypeScript 支持几乎 JavaScript 所有的语言类型，并且增加了一些新的类型，例如枚举和元
组。
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

#### 反向映射
在数字类型枚举中，存在着反向映射:
``` TypeScript
enum reverse {
    first = 10
    second = 10
}
reverse[10]      // second
```
因此，通过数字类型枚举的反向映射我们可以的得知，我们可以通过属性名获取到其对应的值，同样，
我们也可以通过值获取对应的属性名。并且值得注意的是，上面的例子可以看出，当一个枚举中，多个
属性有同样的值，那么当我们使用反向映射想要得到属性名时，获取到的是最后一个匹配的属性名。
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
在 TypeScript 中，对于在代码编写时未明确指出类型的变量，TypeScipt 编译器会智能的推断出
该变量的类型。
``` TypeScript
let a = 123;
a = '123'     // Error 不能将类型"123"分配给number类型。
```
虽然我们在声明变量a时，并没有声明它的变量类型，但 TypeScript 会通过我们给变量 a 的赋值，
进行类型推论，自动推断出最符合的类型。在上面的例子中，TypeScript 推断出 变量 a 的类型应
为 number，所以我们之后再次给 a 赋值为字符串类型时便会报错。
> ### 类型别名
类型别名类似于我们之后会学习到的接口。类型别名会给 TypeScript 的类型起一个新的名字，但
是，这一操作并不会创建一个新的类型。
``` typeScript
type UserAccount = string | number;
let userAccount: UserAccount;
userAccount = 10;     // true
userAccount = '10';   // true
userAccount = false;  // Error
```
在下面的学习中，我们会接触到泛型这一知识。类型别名可以使用泛型来表示:
``` TypeScript
let ma: User<string> = {
    userName: 'mario'
}
```
类型别名甚至可以引用自己:
``` TypeScript
type User<T> = {
    userName: T,
    relationship: User<T>
}
```
## 小结
学习到这里，我们完整的学习了 TypeScript 所有的基本类型，通过本章的学习，我们分别了解到了
: Boolean、String、Number、Undefined、Null、Symbol、Never、Array、Tuple、Enum一
系列的使用方法。接着我们了解了 TypeScript 编译器类型推论的规则，以及如何在项目开发中通过
设置类型别名来简化开发。
# 高级类型
我们在上一章节学习了 TypeScript 的数据类型，接下来我们将继续学习 TypeScript 中的高级类
型。
> ### 联合类型
可能在学习第一章后，当我们寄希望于一个变量能够拥有多个数据类型的可能性时，首先想到的是使用 
any 类型:
``` TypeScript
type User = any;
let user: User = 'mario'
user = 22
```
然而使用 any 类型来进行类型赋值明显不是我们使用 TypeScript 的初衷，这时我们便可以使用 
TypeScript 高级类型中的联合类型。联合类型能够更高效的替代 any 类型。
``` typeScript
let idCount: string | number;
idCount = 10;     // suceess
idCount = '10';   // success
```
当 TypeScript 无法确定一个联合查询的变量到底具体是哪一种类型时，则只能取联合查询的属性中
共有的属性或方法，否则抛出异常。
``` TypeScript
let userAccount: string | number
userAccount = 'mario'           // TypeScript将userAccount类型推断为string
userAccount.length              // success : 5
const getUserAccountLength = (userAccount: string | number):number => 
userAccount.length              // Error 类型“string | number”上不存在属性“length”。类型“number”上不存在属性“length”。
```
> ### 交叉类型
交叉类型，顾名思义就是将多个类型交叉合并为一个类型。从多个对象中创建一个新的对象，这个新的
对象会拥有着创造他的多个对象所有的特性。例如：
``` TypeScript
interface Person {
    name: string
}
interface Man {
    sex: string
}
interface Woman {
    age: number
}
let author: Person & Man & Woman;
author = {
    name: 'mario',
    sex: 'man',
    age: 22
}
```
新的 author 对象拥有 Person & Man & Woman 的所有特性。这样看类似于我们之后会学习到的
继承。

我们一般在混入需求中使用交叉类型，在下面的代码中，我们需要实现一个融合两个对象并返回的结果
的方法,此时我们便可以使用设置方法的返回值为传入两个对象类型的交叉类型。
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
user        // { userName: 'mario', age: 20 }
```
> ### 类型断言
TypeScript 允许改变覆盖其的类型推断 并且按照你所赋予的类型来分析他 这种机制被成为类型断
言。用通俗的语言讲，类型断言更像是开发者主动的类型选择，而不是类型转换。

首先 让我们看一下下面的代码:
``` TypeScript
let user = {}
user.name = 'mario';
```
上面的代码,在 JavaScript 中，我们可以轻松的给对象 user 赋予 name 属性。但在 
TypeScript 中，会触发'类型“{}”上不存在属性“ name ”。'的错误警告。原因就在于在创建 
user 的同时 TypeScript 编译器就将 user 的类型推断为空对象{}。因此无法再在 user 上赋
值。此时, 我们便需要使用类型断言来覆盖 TypeScript 的类型推断。

使用类型断言有两种方式，分别是<类型>值以及as 类型。在 jsx 中，只支持 as 的断言方式。因此
在这里，推荐使用：as 类型来表示类型断言。
``` TypeScript
interface User {
    name: string,
}
let user = {} as User;
user.name = 'mario'
```
#### 类型断言在联合类型中的应用
在本章的前段已经学习到，联合类型可以拥有多个数据类型的可能性。我们可以通过类型断言确切的了
解联合类型到底为何种类型。在平日使用 JavaScript 语言来进行开发的过程中，通常会使用检查成
员是否存在来区分不同的类型：
``` JavaScript
function returnParamsType (params) {
    if (params.length) return 'string'
    else return 'number'
  }
returnParamsType('mario')    // string
returnParamsType(22)         // number  
```
而在 TypeScript 中，我们可以通过类型断言推断出联合类型的变量具体为何种类型
``` TypeScript
interface Man {
    age: number
}
interface Woman {
    name: string
}
function returnParamsType(params: Man | Woman) {
    if ((params as Man).age) return 'Man'
    else if ((params as Woman).name) return 'Woman'
}
let userMan: Man = {
    age: 22
}
let userWoman: Woman = {
    name: 'mario'
}
returnParamsType(userMan)        // Man
returnParamsType(userWoman)      // Woman
```
#### 类型保护
在上面有关类型判断的例子中，如果方法体足够复杂，我们则需要多次使用类型断言进行判断。
TypeScript 中的类型保护机制则可以帮助我们省去一系列的类型判断。
##### 用户自定义的类型保护
要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词。我们还是利用上面
的例子继续学习:
``` TypeScript
interface Man {
    age: number
}
interface Woman {
    name: string
}
function isMan(params:Man | Woman): params is Man{
    return (params as Man).age != undefined
}
```
我们定义了一个简单的方法 isMan，params is Man 就是类型谓词，类型谓词格式为：
``` TypeScript
paramsName is type
```
paramsName 为方法入参之一，type 为需要类型保护的类型。每当我们调用一次类型保护的方法
(isMan)时，只要这个类型与变量的原始类型是兼容的，TypeScript 就会将变量缩减为那个具体的
类型。

让我们用类型保护的方式重新编写上一节的代码吧:
``` TypeScript
interface Man {
    age: number
}
interface Woman {
    name: string
}
let userMan: Man = {
    age: 22
}
let userWoman: Woman = {
    name: 'mario'
}
function isMan(params:Man | Woman): params is Man{
    return (params as Man).age != undefined
}
function returnParamsType(params: Man | Woman) {
    if (isMan(params)) return 'Man'
    else if (!isMan(params)) return 'Woman'
}
returnParamsType(userMan)        // Man
returnParamsType(userWoman)      // Woman
```
##### typeof 类型保护
在上面的例子中，我们通过自定义的方式实现类型保护，然而，当联合类型的参数可能性过多时，我们
分别要为每一个可能类型实现一个方法，对于开发者来说，这实在是太痛苦了。好在，TypeScript 可
以将 typeof 识别为一个类型保护，我们可以直接在代码里检查类型了。
``` TypeScript
function returnParamsType(params: string | number) {
    if (typeof params === 'string') return 'string'
    else if (typeof params === 'number')  return 'number'
}
returnParamsType('mario')        // string
returnParamsType(22)             // number
```
typeof 类型保护只支持我们对“string”、“number”、“boolean” 和 “symbol”类型进行有效判
断。
##### instanceof 类型保护 
如果您对 JavaScript 的 instanceof 熟悉的话 
#### 类型断言的根本
类型断言的根本在于, 他并不会从根本上改变使用者的类型。而是在编译时对编译器提供的一中编译类
型指示, 他的影响仅仅存在与编译语法时。
# 接口
如果您在大学的学习中接触过 Java、C# 这类面向对象的编程语言, 接口一定不会陌生。但很遗
憾,由于 JavaScript 是一款弱类型的编程语言, 并没有类型声明，所以 interface 也就没有了用
武之地。作为 JavaScript 的超集，TypeScript 添加了接口的定义。接下来让我们学习接口的相
关知识吧，相信在学习了接口之后，你便会发现，TypeScript 真香！

其实在生活中，我们无时无刻都在接触接口。例如充电器和插线板。插线板出厂就规定了它是哪一种
类、又那些种类的充电器可以允许与其对接。

在 TypeScript 中也是一样。接口(**interface**)会设定参数的数据类型。并在之后对每一次赋
值进行类型检验，如果赋值与接口的规格(数据类型)相符，则赋值成功。否则，便会抛出异常。

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
行了类型校验,倘若入参数据类型不符规定或者传入的参数中包括接口未定义的参数或者缺少接口中定义
的参数，TypeScript 类型检查器会抛出错误。

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
    userName: 'mario'
}
user.age = 22;
user      // success { userName: 'mario', age: 22 }
```
### 接口额外的属性检查
当我们使用了接口的可选属性后，我们很可能会遇到下面这类问题
``` TypeScript
interface UserInfo {
  userName?: string,
  age?: number
}
function addNewUser (userInfo: UserInfo): void {
  // do something
}
addNewUser({ age: 22, name: 'mario' }); // 对象文字可以只指定已知属性，并且“name”不在类型“UserInfo”中。
```
尽管接口定义了入参的属性和数据类型,并且 { age: 22, name: 'mario' } 看似也是合乎类型
的。但在 TypeScript 解释器看来，当赋值对象存在接口不包含的属性时，对象字面量会被特殊对待
而且会经过额外属性检查。随即抛出错。对于这种情况，我们可以使用类型断言、添加字符串索引签名
解决又或者将参数赋予参数再传入:
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
这三种方式，添加类型断言方法通过类型断言方式直接绕过 TypeScript 额外的类型检查、添加字符
串索引签名方法通过添加字符串索引方式兼容多余属性。而第三种通过对象方式传入方法，则是因为通
过对象赋值给另一对象根本就不会触发额外的类型检查。对开发者而言，需要根据不同的业务场景实现
不同的接口额外的属性检查。
### 函数类型接口
我们使用函数类型接口来实现接口定义函数类型。值得注意的是，因为对象类型接口对于顺序没有要
求，所以要求接口内类型名称与传入类型名称保持一致。但由于函数要求传入参数的类型顺序和定义需
要保持一致，因此函数类型接口并不要求参数名与接口里定义的名字相匹配。TypeScript 的类型检查
器会根据函数的入参，一个个与接口参数进行类型比较。
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
在上面，我们定义了一个名为 UserFunc 的函数类型接口，并在接口中定义一个调用签名，其中包括
入参、返回值等，但不包括方法的具体实现。通过函数实现函数类型接口，从而达到规范函数的目的。
### 可索引类型
我们经常会接触到例如 userList[2]、userInfo['userName']的这一类可枚举的数据类型。同样
的，接口提供了一种可索引类型使我们可以轻松的描述他们。可索引类型接口现只支持字符串类型索引
以及数字类型索引。让我们看看下面的这个例子:
``` TypeScript
// 数字类型索引签名
interface UserList {
    [keyIndex: number]: string
}
let userList: UserList;
userList = ["ma", "jia", "ao"];
let firstUser: string = userList[0];
console.log(userList, firstUser)  // [ 'ma', 'jia', 'ao' ] 'ma'
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
console.log(userDictionary)       // { '0': 'ma', '1': 'jia', '2': 'ao' }
```
同时，当我们希望实现可索引类型接口的对象，不可以再次修改时，我们可以在接口一开始定义时，使
用 readonnly 修饰符，这样，当我们再次修改或添加实现过可索引类型接口的对象时，
TypeScript 编译器便会抛出错误。
``` TypeScript
// 数组类型
interface UserList {
    readonly [keyIndex: number]: string
}
let userList: UserList;
userList = ['ma','jia','ao']
userList[1] = 'ao'            // 类型“UserList”中的索引签名仅允许读取
// 对象类型
interface UserList {
    readonly [keyIndex: number]: string
}
let userList: UserList;
userList = ['ma','jia','ao']
userList[1] = 'ao'            // 类型“UserInfo”中的索引签名仅允许读取
```
由此可知，使用 readonly 修饰符，我们就可以使得索引签名是只读的，不可修改的。
### 类类型接口
TypeScript 可以像 Java、 C# 一样， 使用接口去强制规范类。在 TypeScript 中, 类通过 
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
从上面的例子中我们可以看出，类类型接口与我们即将接触到的抽象类有一些相似。实现该接口的类，
一并需要实现该该接口定义的参数和方法，并且保持数据类型一致。

在类中，有两种类型，分别是静态部分的类型以及实例部分的类型。静态类型指的是这个类本身，而实
例部分则指的是类实例化出来的对象。
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
接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。
构造函数(constructor)就存在于类的静态部分，所以不在检查的范围内。
### 接口的继承
和之后学习到的类的相互继承一样，接口也是可以通过 extends 实现相互继承的, 甚至一个接口可以
继承其他的多个接口,生成合成接口:
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
在上面的学习中，我们学习到类可以实现接口。同样，接口也可以继承类。就像接口声明类中的成员和
方法，但不提供实现一样，接口可以继承类的成员但不包括其具体实现。
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
值得注意的是，接口同样会继承类的 privite 成员和 protect 成员。这意味着当你创建了一个接
口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现:
``` TypeScript
class SuperUser {
    private password: string;
    constructor (password: string) {
        this.password = password
    }
}
interface UserInterface extends SuperUser {
    addUser (): boolean
}
// Success
class Programmer extends SuperUser implements UserInterface {
    constructor (password: string) {
        super(password)
    }
    addUser () {
        // do something
        return true
    }
}
// Error
class User implements UserInterface {
    addUser () {
        // do something
        return true
    }
}
```
在上面的例子中，我们定义了一个类 SuperUser， 接着我们定义了 UserInterface 接口并继承
了 SuperUser 类。此时，接口 UserInterface 已经包含了 SuperUser 类的包括私有成员 
password 的所有成员。我们提前学习一个概念：在类中，private 类型的成员，只得在父类或者其
子类中拥有。我们新定义了一个 Programmer 类。这个类继承了 SuperUser 类并且正确实现 
addUser 方法，因此这个类正确实现了接口。而另一个新的 User 类，仅仅只实现了 addUser 方
法，但其并没有 SuperUser 的 password 私有成员，因此实现接口失败。
# 函数
函数是任何编程语言的基础，函数将一个代码块独立出来。TypeScript 是 JavaScript 的超类，因此 TypeScript 
有关函数的知识点我们浅尝辄止，本章我们主要介绍在 TypeScript 中的特性和模式。
### 函数类型
在 JavaScript 中， 有具名函数和匿名函数两种，您可以根据具体开发情形进行选择。
``` JavaScript
// 匿名函数
let getSystemInfo = function (params) {
    // do something ...
    return true
}
// 具名函数
function getSystemInfo (params) {
    // do something ...
    return true
}
```
因为 TypeScript 增加了类型系统，所以我们需要对上面的函数进行改造。相对来说，具名函数在使用上更加便利。
``` TypeScript
// 具名函数
function getSystemInfo (params: number): Boolean {
    // do something ...
    return true
}
// 匿名函数
let getSystemInfo: (params: number) => Boolean = (params: number) : Boolean => {
    // do something ...
    return true
}
```
在 TypeScript 中类型分为参数类型和返回类型两种。值得注意的是，在匿名函数中函数和返回值类型之前使用( => )
符号。
### 类型推断
因为类型推断的存在，我们可以简化你匿名函数的定义方式:
``` TypeScript
// 匿名函数
let getSystemInfo = (params: number) : Boolean => {
    // do something ...
    return true
}
```
TypeScript 解释器会自动根据语法推断当前类型。
### 可选参数和默认参数
#### 可选参数
在 TypeScript 中，传递给一个函数的参数个数必须与函数期望的参数个数一致。当我们想使一个参数视情况传入时，可
以使用可选参数。
``` TypeScript
function getSystemInfo (userName: string, age: number, job ?: string): string {
    if (job) {
        return `姓名:${userName},年龄: ${age},工作:${job}`
    } else {
        return `姓名:${userName},年龄: ${age}`
    }
}
getSystemInfo('mario', 22, '研发工程师')   // 姓名:mario,年龄: 22,职位:研发工程师
getSystemInfo('mario', 22)               // 姓名:mario,年龄: 22
```
同时值得注意的是，我们需要将可选参数放在函数期望参数的最后。
#### 默认参数
当我们期望一个已经定义的参数当其未传入数据时，可以有一个默认值而不是 undefined 时，我们可以使用默认参数。默
认参数其实已经在 JavaScript es6 版本中被广泛使用。
``` TypeScript
function getSystemInfo (userName: string, age: number, job = '后端开发工程师'): string {
    if (job) {
        return `姓名:${userName},年龄: ${age},工作:${job}`
    } else {
        return `姓名:${userName},年龄: ${age}`
    }
}
getSystemInfo('mario', 22, '研发工程师')   // 姓名:mario,年龄: 22,职位:研发工程师
getSystemInfo('mario', 22)               // 姓名:mario,年龄: 22,职位:后端开发工程师
```
### 剩余参数
在上面的例子中，我们对函数的参数都是表示一个参数的，然而当实际开发中，我们可能会遇到多个入参，我们可以使用扩
展运算符进行统一录入。
``` TypeScript
function getSystemInfo (userName: string, age: number, ...job: string[]): string {
    return `姓名:${userName},年龄: ${age},工作:${job.join(',')}`
}
getSystemInfo('mario', 22, "研发工程师", "前端工程师", "后端工程师")  // 姓名:mario,年龄: 22,工作:研发工程师,前端工程师,后端工程师
```
### 函数重载
当我们需要一个函数根据不同的参数进行不同的操作时，我们需要使用函数重载。在 JavaScript 中，我们可以根据入参
的不同类型返回不同的值。
``` JavaScript
function getUserInfo (params) {
    if (typeof params == 'number') {
        return params + 1
    }else if (typeof params == 'string') {
        return 'super' + params
    }
}
getUserInfo(22)           // 23
getUserInfo('mario')      // supermario
```
在 TypeScript 中，我们为一个函数提供多个函数类型定义来进行函数重载，而 TypeScript 解释器会自动根据这个函
数列表去调用相符合的函数。
``` TypeScript
function getUserInfo(params:number) :number;
function getUserInfo(params:string) :string;
function getUserInfo(params: any) {
    if (typeof params == 'number') {
        return params + 1
    }else if (typeof params == 'string') {
        return 'super' + params
    }
}
getUserInfo('mario')      // supermario
getUserInfo(22)           // 23
```
# 类
在 C#、Java是基于类的继承并且由类构建出对象, 而在 JavaScript 中则是通过函数和原型链实现
继承的。在 ES6 中，使用了 Class 语法糖，使得 JavaScript 与其他面向对象的编程语言更为接
近了。在下面的学习中。默认您已掌握 JavaScript 原型链继承以及 ES6 Class 语法糖的使用，
如果对上面的相关知识不太了解，为保证学习质量，建议您系统学习相关知识。在本书的[拓展章节](#拓展)中，有着对于 
JavaScript 继承的完整学习教程。

### 基础
首先，让我们学习一下 TypeScript 中最基本的类，下面的代码我们首先会定义一个 用户类:
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
SonClass 作为子类，通过 extends 继承超类 SuperClass 的属性和方法。在子类的构造方法中, **必须**调
用 super() 方法执行超类中的构造函数，注意，这是 TypeScript 强制要求的。让我们继续讲解上面这段代码，当
子类继承超类后，也就拥有了超类的公共成员变量和方法, 同样，子类也可以重新定义超类中的方法, 比
如 sonClass 类，便重写了父类的 coverFunc 方法。
### 类的成员变量
类具有多种成员变量，分别是 public、private、protected、readonly 以及 static。在上面的
例子中, 子类可以随意的访问超类中的实例方法, 便是因为当未为对成员变量类型进行声明时，会默认将
其设置为 public 类型。说到这里，让我们首先来看一看 public 类型:
#### public类型的成员变量
public类型的成员变量很简单 在子类中可以任意访问父类中的成员变量。
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

类中也可以拥有 protected 类型的构造方法, 值得注意的是，由于protected 类型的限制，该构造方法不允许被实例化，但是可以被继承:
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
#### 参数属性
每当我们定义一个类时，反复的定义类以及在其构造函数中赋值就显得很冗杂了，此时我们可以使用参数属性，从而一次性
的完成参数的定义和初始化。
``` TypeScript
class Person {
    constructor (protected psw: string) {}
}
class Programmer extends Person {
    constructor (protected password: string) {
        super(password)
    }
    getUserPsw () :string {
        return this.psw
    }
}
let programmer = new Programmer('123')
console.log(programmer.getUserPsw())         // 123
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
可以被删除 2.属性的特性在第一次设置之后可否被重新定义特性 | 存取器 取值的时候的方法 | 存取器 修改值的时候的方法
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
let man = new User(22);     // mario
let woman = new User(23);   // mario
```
### 抽象类
抽象类做为其它派生类的基类使用。 抽象类不能直接被实例化。但与接口对于类实现的约束类似，子类也必须实现抽象类中
的抽象方法。但不同于接口的是，抽象类可以包含成员的实现细节。 abstract 关键字是用于定义抽象类和在抽象类内部
定义抽象方法。子类必须实现其抽象类中的抽象方法。
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
    setUserName (newValue: string): Boolean {
        this._userName = newValue
        console.log(this._userName)
        return true
    }
}
let user = new sonClass('mario');
user.getUserName()
user.setUserName('majiaao')
```
在上面的代码中，首先我们定义了一个抽象类 User。接着，sonClass类 作为子类继承了User 抽象类。继承了抽象类中
实现的 getUserName 方法。而在抽象类中定义的抽象方法 setUserName 则必须的子类中定义实现。并且，在子类可以
覆盖实现抽象类中实现的方法。
### 构造函数
当我们声明一个类时，其实也就声明了类的实例的类型。
``` TypeScript
class Person {
    constructor (public userName: string) {}
    getUserName ():string {
        return this.userName
    }
}
let user: Person
user = new Person('mario')
user.getUserName()           // mario
```
在上面的例子中，let user: Person 表示 Person类的实例的类型是 Person。 当我们使用 class 定义一个类的时
候，转化为js原生代码是下面的内容:
``` JavaScript
var Person = /** @class */ (function () {
    function Person(userName) {
        this.userName = userName;
    }
    Person.prototype.getUserName = function () {
        return this.userName;
    };
    return Person;
}());
```
我们根据原生的代码可以看出 Person 的返回值，是一个名为 Person 的构造函数。类具有实例部分和静态部分。
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
# 泛型
在 TypeScript 中，我们对数据类型有着期望和规定。比如我们希望实现一个这样的方法：函数返回
传入值,这个要求看上去很简单，我们只需要事先根据传入值的类型，设置好函数的返回值类型即可。下
面的例子中我们想实现一个传入 string 类型的变量 并返回其值的方法:
``` TypeScript
function Ttest(param: string):string {
    return param
}
console.log(Ttest('mario'))           // mario
```
看到这个需求，你兴高采烈的写下了上面这段代码，以为万事大吉了。然而，这时候产品走了过来
并带来了新的需求，她希望这个需求也可以获取到各种类型的数据，很显然，当前的方法只适用于 
string 类型，对于 number、boolean...其他类型 “无能为力”。这是你可能会灵机一动，想到可
以使用 any 的返回类型。但这样显然违背了 TypeScript 对于数据类型检验的初衷。为每一个类型
都重复写一个这样逻辑高度一致的方法也太过于“奢侈”。因此，这时候 我们便需要使用 TypeScript 
一个新的模式:泛型。
``` TypeScript
function Ttest<T>(param: T): T {
    return param
}
console.log(Ttest<string>('mario'))   // mario
console.log(Ttest(22))                // 22
```
在上面的代码中，我们给 Ttest 方法添加了类型变量T。类型 T 会根据我们传入值的类型，定义 T 的
类型，这一过程，我们甚至可以用动态模版语言的方式去理解。这样，我们即保证了对传入值返回值类型
的判断，又省去了大量重复逻辑的代码。在定义了泛型方法后，我们可以通过明确插入泛型类型的方式通
知泛型方法该使用何种方式，或者直接传入参数，编译器会自动根据传入的参数的类型帮助我们确定 泛型
方法的类型。在一些复杂的情况下,编译器可能无法自动分析出传入值的类型，所以一些情况下，需要我
们用第一种方式去定义泛型方法的类型。
### 使用泛型变量
在上面，我们创建了一个 Ttest 的泛型方法后，在 Ttest 方法中，TypeScript 编译器便要求我
们，在该方法体中，把入参当作所有类型参数使用。还是使用上面的例子:
``` TypeScript
function Ttest<T>(param: T): T {
    console.log(param.length)         // Error 类型“T”上不存在属性“length”。
    return param
}
console.log(Ttest<string>('mario'))   // mario
console.log(Ttest(22))                // 22
```
在这个时候当我们想要获取到输入参数的长度时，即使我们的本意是获取到类型是数组或字
符串类型的入参，但 TypeScript 编译器会用最坏的情况，或者说所有类型的语法标准去
检测我们的代码。因此，在上面的代码中，倘若传入的参数是没有 length 方法的 
number 类型，则会出现问题。对此我们可以在声明方法
时，将入参设置为**元素类型是 T 的数组**。这样.length 方法便可以在方法中是用
来，这可以让我们把泛型变量 T 当做类型的一部分使用，而不是整个类型，增加了灵活性。之后我们还会介
绍另一种方式解决这类问题。
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
在上面的例子中我们接触到，在一个泛型方法中，我们无法直接访问一个泛型变量的 .length 值。但想要实
现希望泛型类型拥有 .length 属性，则需要使用**泛型约束**：
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
在上面，我们首先定义了一个接口来制定约束条件，在这个接口中，我们明确的规定了泛型所需要拥有的属性 
length，在泛型函数中，使用 extedns 实现该接口对泛型进行约束。
### 在泛型中使用类类型
在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。比如：
``` TypeScript
function create<T>(c: {new(): T }): T {
    return new c();
}
```
这里在 TypeScript 学习中，是一个难点，难度在于需要我们明确的了解下面这段代码的含义。
create 方法的参数是一个类类型，他的返回值是这个类类型的实例。这样解释，就好理解多了，
``` TypeScript
c: {new(): T; }
```
在这里等价于 c:new() => T。这样我们就可以看出，类类型其实就是在规范类型必须为其类的实例。
``` TypeScript
class User {
    constructor (public userName: string) {
    }
    getUserInfo (): string {
        return this.userName
    }
}
function createInstance <T>(sub: new () => T):T {
    return new sub()
}
```
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
解为对原有代码的非侵入性扩展或修改。其实装饰器已经广泛运用在日常开发中，使用 TypeScript 进行 Vue
开发的同学应该接触过 vue-class-component vue-property-decorator 这两个装饰器，他们的作用便是
强化增强 Vue 组件。
### 底层原理
装饰器的底层实现是通过函数柯里化，对于函数柯里化不了解的同学，可以在[拓展](#拓展知识点)一章中进行系统的学
习。
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
let man: Human
// 变量声明空间
class User {
    constructor () {
        console.log('User')
    }
}
let Human = User;
let man = new Human(); // User
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
习我们都会围绕着这段代码和它的“升级版”来展开:
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
### 多个命名空间
# 三斜杠指令
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
### JavaScript 原型链继承以及 ES6 Class 语法糖
面向对象语言(OO)具有一个标志就是其存在类的概念，我们通过操作类可以创建任意多个具有相同属性
和方法的对象。而我们都知道，在 JavaScript 中并没有类的概念，因此我们只能另辟蹊径，使用
JavaScript 的原型链实现继承。
#### 构造函数模式
JavaScript 中的构造函数可用来创建特定类型的对象。在原生类型中，例如 Object、Array便是
原生构造函数:
``` JavaScript
let person = new Object()
```
我们也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法:
``` JavaScript
function Person(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
  this.getInfo = function () {
    return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age}`
  }
}
let programer = new Person('mario', 22, '男')
programer.getInfo()         // 姓名:mario,性别: 男,年龄: 22
```
在上面的例子中，自定义的构造函数并没有在内部显式的创建对象，直接将属性和方法赋予给了 this 
对象。

当我们使用 new 运算符调用构造函数时，会经历下面的过程:

1. 创建一个新的对象
2. 将构造函数的作用域赋予给了这个新的对象
3. 执行构造函数中的代码逻辑
4. 返回这个新的对象
``` JavaScript
let programer = new Object();
programer.__proto__ = Person.prototype;
Person.call(programer);
//执行函数代码
return programer;
```
##### constructor 属性
在本书正文的 Class 中，有一个 constructor 方法，接下来让我们试着学习它。在上面的例子
中，我们通过自定义的构造函数 Person，定义了一个 programer 方法，我们试着输出 
programer 的 constructor 属性:
``` JavaScript
programer.constructor       // [Function: Person]
```
通过输出我们可以明显看出: ***实例的constructor指向他的构造函数***。
##### 原型模式
***我们创建的每一个函数都有一个 prototype(prototype) 属性。***

prototype属性是一个指针，它指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享
的属性和方法，这样，我们就不必在构造函数中定义对象实例的信息，而是直接将信息添加到原型对象
上去：
``` JavaScript
function Person () {}
Person.prototype.name = 'mario'
Person.prototype.age = 22
Person.prototype.sex = 'man'
Person.prototype.getInfo = function () {
    return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age}`
}

let programer = new Person()
programer.getInfo()         // 姓名:mario,性别: 男,年龄: 22
```
在上面的例子中,我们将所有属性和方法挂载到了 Person 的 prototype 属性中，它的实例也会拥
有相同的属性和方法。所有实例对于这些属性和方法是共享使用的，也就是说，所有的实例访问的都是
同一个属性或者同一个方法。
##### 原型对象
在上面，我们学习到了，只要我们创建一个新的函数，就会自动为这个函数创建一个 prototype 属
性。***prototype 属性指向的就是它的原型对象***。紧接着，这个原型对象也会拥有一个 
constroctor属性，***constructor属性指向的是该原型对象所在的构造函数***。当我们通过构
造函数创建一个实例时，这个实例也会包含一个内部指针[[Prototype]]。
***[[Prototype]]指向构造函数的原型对象***。由此我们可以一张关系图来直观的了解他们之间的
联系。请原谅笔者的绘图技术：(
![30h9iQ.png](https://s2.ax1x.com/2020/02/27/30h9iQ.png)
我们可以将上面的关系抽象成公式:
``` JavaScript
Person.prototype == programer.__proto__     // true
Person.prototype.constructor == Person      // true
programer.__proto__.constructor == Person   // true
```
在此处我们扩展一个 API: Object.getPrototypeOf()。这个API可以获取到传入参数的原型对
象。
``` JavaScript
Object.getPrototypeOf(programer) == Person.prototype  // true
```
让我们接着扩展上面的例子，如果我们希望修改实例上的属性内容，又会对整个体系有什么样的影响
呢？
``` JavaScript
function Person () {}
Person.prototype.name = 'mario'
Person.prototype.age = 22
Person.prototype.sex = 'man'
Person.prototype.getInfo = function () {
    return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age}`
}
let programer = new Person()
let productManager = new Person()
productManager.getInfo()              // 姓名:mario,性别: 男,年龄: 22
programer.getInfo()                   // 姓名:mario,性别: 男,年龄: 22
programer.job = 'front-end-programer'
programer.age = 23
programer.getInfo()                   // 姓名:mario,性别: 男,年龄: 23
programer.job = 'front-end-programer' 
productManager.getInfo()              // 姓名:mario,性别: 男,年龄: 22
productManager.job                    // undefined
```
由此可见，我们在实例上修改或者添加属性，并不会对原型对象上的属性进行添加或者修改，仅仅是组
织我们继续向上进行属性的搜索。我们可以通过 hasOwnProperty 判断出获取到的属性值是存在
于原型还是来自于实例中,结果为 true 则属性存在于实例中，反之，属性则存在于原型上。
``` JavaScript 
programer.hasOwnProperty('job')        // true
programer.hasOwnProperty('name')       // false
```
##### 精简的原型语法
在前面的例子中，我们在给原型对象添加属性和方法时，需要一遍遍的输入 Person.prototype。为
了避免这一系列不必要的输入，我们可以通过重写原型对象的方式简化操作。
``` JavaScript
let Person = {}
Person.prototype = {
    name: 'mario',
    age: 22,
    sex: 'man',
    getInfo: function() {
        return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age}`
    }
}
```
在上面的例子中，我们为了精简原型语法，将 Person 的原型对象设置成为了一个以对象形式创建的
全新对象。因此这个新的对象的 constructor 不再指向 Person,而是指向了 Object。下面我们
通过例子验证一下:
``` JavaScript
function Person () {}
Person.prototype = {
    name: 'mario',
    age: 22,
    sex: 'man',
    getInfo: function() {
        return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age}`
    }
}
let program = new Person()
program.constructor        // [Function: Object]
```
因此，当我们将原型对象覆盖后，就需要重置 constructor 属性的指向。
``` JavaScript
function Person () {}
Person.prototype = {
    constructor: Person,
    name: 'mario',
    age: 22,
    sex: 'man',
    getInfo: function() {
        return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age}`
    }
}
let program = new Person()
program.constructor        // [Function: Person]
```
##### 原型的动态性
我们都知道，原型对象和实例之间通过指针连接，而并非一个副本。所以当我们实例访问属性或者方法
时，会首先在实例中搜索，如果在实例中并未找到，则继续向上在原型对象中寻找。然而，当我们像
上一个例子中，对原型对象进行了重写，这样就会断开原型和实例之间的联系：
``` JavaScript
function Person () {}
let programer = new Person()
Person.prototype = {
    constructor: Person,
    name: 'mario',
    age: 22,
    sex: 'man',
    getInfo: function() {
        return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age}`
    }
}
programer.constructor         // [Function: Person]
programer.name                // undefined
```
接让我们分析一下为什么实例 programer 无法获取 name 属性值：
首先，我们定义了构造函数 Person，在创建 Person 的同时也创建了它的原型对象，Person 通过
prototype 指向原型对象。接着，我们实例化 Person，得到 programer 实例。注意，此时 
programer 的 [[prototype]]指向原始的原型对象。紧接着，就像上一节我们学习到的，我们将原
型对象覆盖，虽然之后重置了 constructor 属性，但 programer 的 [[prototype]] 指针指向
并未改变，依旧是指向最开始的原型对象的。因此，当我们希望获取 name 属性时，在实例和原始原型
对象上，都没有该属性，结果返回 undefined。

如果看完上面的这段话您已经觉得头晕目眩得了的话，可以对照着下面的关系图，将上面的内容好好琢
磨一下，要知道，只要我们理解了原型链的精髓，才可以更透彻的学习继承的相关知识。

重写原型前
![重写原型前](https://s2.ax1x.com/2020/02/29/3yQbcR.md.png)

重写原型后
![重写原型后](https://s2.ax1x.com/2020/02/29/3ytVQe.md.png)
#### 原型对象的缺陷
其实从上面我们可以看出，所有的实例都是共享原型对象上的属性的。如果一个实例修改了原型对象上
的引用类型属性后，其他所有实例访问该属性，返回的均会是修改后的结果。并且原型对象模式也并不
支持传递参数。因此为了解决原型对象的局限性，我们提出了几类组合方案。
#### 构造函数原型模式组合方案
既然实例修改原型上的引用类型属性会导致影响所有实例，那么，我们可以组合使用构造函数原型模
式，构造函数模式用于定义实例的属性，原型模式来定义方法和需要所有实例共享的属性。这样的设计
方案使得每个实例都会有一个自己的属性副本，同时共享着同样的方法引用，这样做大大节省了内存的
消耗:
``` JavaScript
function Person (name, age, sex) {
    this.name = name
    this.age = age
    this.sex = sex
    this.skillList = []
}
Person.prototype = {
    constructor: Person,
    getInfo: function() {
        return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age},技能:${this.skillList}`
    }
}
let programer = new Person('mario',22,'man');
let manager = new Person('li',22,'woman');
programer.skillList.push('TypeScript')
manager.skillList.push('pr')
programer.getInfo()   // 姓名:mario,性别: man,年龄: 22,技能:TypeScript
manager.getInfo()     // 姓名:li,性别: woman,年龄: 22,技能:pr
```
#### 动态原型模式
动态原型模式通过检查某个应该存在的方法是否有效，来决定是否初始化原型:
``` JavaScript
function Person (name, age, sex) {
    this.name = name
    this.age = age
    this.sex = sex
    this.skillList = []
    if (typeof this.getInfo != 'function') {
        Person.prototype.getInfo = function () {
            return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age},技能:${this.skillList}`
        }
    }
}
```
#### 寄生构造模式
寄生构造模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回这个新创建的对象:
``` JavaScript
function Person (name, age, sex) {
    let obj = new Object()
    obj.name = name
    obj.age = age
    obj.sex = sex
    obj.getInfo = function () {
        return `姓名:${this.name},性别: ${this.sex},年龄: ${this.age},技能:${this.skillList}`
    }
    return obj
}
```
寄生构造模式在本质上其实和工厂模式一摸一样，区别就在于寄生构造模式在函数题最后添加来return语句，这样我们可以
重写调用构造函数时返回的值。
#### 稳妥构造函数模式
稳妥构造函数模式顾名思义，其用于一些安全环境中。为了内部数据不被改变，该方法不使用 this 或 new。内部可以定
义 private、protected 类型的私有变量或方法。
``` JavaScript
function Person (name, age, sex) {
    let obj = new Object()
    // 内部可以定义私有变量或方法
    obj.getInfo = function () {
        return `姓名:${name},性别: ${sex},年龄: ${age}`
    }
    return obj
}
let programer = Person('mario',22,'man');
programer.getInfo()           // 姓名:mario,性别: man,年龄: 22
programer.name                // undefined
```
### 继承
在学习了原型链和设计模式后，接下来，我们开始正式学习继承，有了前几节的学习铺垫，相信您在学习本章会轻松很多。
#### 原型链继承
我们之前学习了构造函数，原型对象，实例之间的关系。那么让我们试着想一下，如果我们让一个子类的原型对象作为父类
的实例，那么此时，原型对象便包含一个指向继承方法的原型对象的指针，被继承原型函数又有一个指向构造方法的指针，
这样层层递进，完成了原型链继承。我们用代码描述一下上面的步骤：
``` JavaScript
function SuperType (username) {
    this.username = username
}
function SubType (age) {
    this.age = age
}
// SubType 继承 SuperType
SubType.prototype = new SuperType('mario')
SuperType.prototype.getUserName = function () {
    return this.username
}
let user = new SubType(22)
user.getUserName()      // mario
user.age                // 22
```
在上面，我们两个类：作为父类的 SuperType 以及作为子类的 SubType。子类 SubType 为了实现继承 
SuperType，将父类的原型赋予给自己的原型对象，此时，子类的原型中的有了[[prototype]]这样一个指向父类的原型
对象的指针。这样，基于原型搜索机制，子类SubType 便拥有了父类 SuperType 的所有属性和方法。

![3gILnO.md.png](https://s2.ax1x.com/2020/03/01/3gILnO.md.png)

在 JavaScript 中，万物皆对象。所有引用类型都默认通过原型链继承了 Object，所有的函数默认都是 Object 的实
例。所以所有对象的原型内部都有一个指向 Object 原型对象的指针。
![32VI54.md.png](https://s2.ax1x.com/2020/03/01/32VI54.md.png)
#### 添加或覆盖方法
当子类需要覆盖父类的某个方法，或者添加父类中不存在的某个方法时，需要将给原型添加方法的代码放到替换原型的语句
之后。
``` JavaScript
function SuperType ( userName ) {
    this.userName = userName
}
SuperType.prototype.getUserName = function () {
    console.log(this.userName, "父类方法")
}
function SubType (age) {
    this.age = age
}
// SubType 继承 SuperType
SubType.prototype = new SuperType('mario')
// 添加新的方法
SubType.prototype.getUserAge = function () {
    console.log(this.age)
}
SubType.prototype.getUserName = function () {
    console.log(this.userName, "覆盖父类方法")
}
let user = new SubType(22);
user.getUserName()           // mario 覆盖父类方法
user.getUserAge()            // 22
```
看到这里，请您先在脑海里思考一下，为何需要将给原型添加方法的代码放到替换原型的语句之后。读者可以自己思考一下
再继续向下学习: 我们本意是扩展新的方法和覆盖父类的方法，然而当代码执行到 SubType.prototype = new 
SuperType('mario')时 子类的原型对象被重置，这导致之前的一系列操作做了无用功。所以接下来操作添加修改的方
法，返回的均是 undefined了。
到这里，如果上面的解释和你脑海中是一致的，那么恭喜你，你已经透彻的了解到原型链继承的精髓了。
#### 原型链的问题
关于原型链，我们知道，当原型中存在引用类型的值时，会出现所有实例共享同一数据的问题。当我们通过原型来实现继承时，原型
实际上会变成另一个类型的实例，于是，原先的实例属性也就顺理成章的成为了现在的原型属性了。
``` JavaScript
function SuperType () {
    this.skillList = ['javaScript', 'TypeScript', 'Python', 'Java']
}
function SubType () {}
SubType.prototype = new SuperType()
let programer = new SubType()
programer.skillList.push('GO')
programer.skillList            // [ 'javaScript', 'TypeScript', 'Python', 'Java', 'GO' ]
let manager = new SubType()
manager.skillList              // [ 'javaScript', 'TypeScript', 'Python', 'Java', 'GO' ]
```
在上面的这个例子中，我们在父类的构造函数 SuperType 中定义了一个引用类型数组属性 skillList。 此时所有 
SuperType 的实例都会拥有自己的 skillList 属性。当 SubType 继承了 SuperType 后，由于原型链继承的规则，
SubType 的原型对象作为 SuperType 的实例，因此 SubType 的原型对象也拥有了 skillList 这个属性
(SubType.prototype.skillList)。所以所有 SubType 的实例都会沿着原型链共享该属性。因此当一个实例修改该
属性的时候，会影响到其他实例。因此我们在日常实践中很少单独使用原型链继承。
#### 借用构造函数继承
为了解决原型链的问题，我们使用借用构造函数的模式实现继承。这种模式的主要思想是子类的构造函数中调用父类的构造
函数。其本质是在未来要创建的实例环境中，调用父类的构造函数，这样一来，便会继续调用执行父类构造函数中所有的初
始化代码，这样一来，所有的实例就会有自己的属性副本了。
``` JavaScript
function SuperType () {
    this.skillList = ['javaScript', 'TypeScript', 'Python', 'Java']
}
function SubType () {
    SuperType.call(this)
}
let programer = new SuperType()
programer.skillList = [1]
let manager = new SuperType()
programer.skillList            // [ 1 ]
manager.skillList              // [ 'javaScript', 'TypeScript', 'Python', 'Java' ]
```
##### 借用构造函数继承-传递参数
借用构造函数继承可以在子类的构造函数中，向父类的构造函数传递参数：
``` JavaScript
function SuperType (userName, age) {
    this.userName = userName
    this.age = age
    this.skillList = ['javaScript', 'TypeScript', 'Python', 'Java']
}
function SubType () {
    SuperType.call(this,'mario',22)
}
let programer = new SubType()
programer.skillList = [1]
let manager = new SubType()
programer.skillList                         // [ 1 ]
manager.skillList                           // [ 'javaScript', 'TypeScript', 'Python', 'Java' ]
console.log(manager.userName, manager.age)  // mario 22
```
##### 缺点
仅仅使用构造函数使得我们所有的方法都需要在构造方法中定义，这样的话函数的复用性就无从谈起了。并且父类原型对象
中的方法在这种模式下子类是无法调用的。
#### 组合继承模式
组合继承，是将原型链继承与借用构造函数继承技术相结合的继承模式。该继承模式的本质是通过原型链继承父类原型中的
属性和方法，通过借用构造函数继承模式实现对构造函数中，也就是实例属性的继承。通过组合继承模式实现函数复用的实
例属性区分。
``` JavaScript
function SuperType (userName) {
    this.userName = userName
    this.skillList = ['computer']
}
SuperType.prototype.getUserInfo = function() {
    console.log(this.userName,this.skillList)
}
function SubType (name,age) {
    this.age = age
    // 继承父类属性
    SuperType.call(this, name)
}
// 继承父类原型中的方法
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.getUserAge = function () {
    console.log(this.age)
}
let programer = new SubType('mario', 22)
let manager = new SubType('li', 23)
programer.skillList.push('TypeScript')
manager.skillList.push('PR')
programer.getUserInfo()      // mario [ 'computer', 'TypeScript' ]
programer.getUserAge()       // 22
manager.getUserInfo()        // li [ 'computer', 'PR' ]
manager.getUserAge()         // 23
```
在上面的例子中，在父类中，我们定义了两个属性 userName、skillList，并在其原型对象上挂载了 
getUserInfo 方法。子类 SubType 首先在其构造函数中，定义了 age 属性，并且调用 父类 
SuperType 构造函数并传入参数，执行其代码。紧接着通过原型链继承，将父类的实例赋予给子类原型
对象。子类对象中拥有[[prototype]]指针指向父类原型对象。因为我们将子类的原型对象重置，所以我
们最好将其原型对象的 constructor 重新指向子类。经过这些操作，子类便完全继承了父类的属性和方
法
了。组合继承是 JavaScript 中最常用的继承模式。
#### 原生式继承模式
原生式继承模式并没有严格意义的构造函数，通过原型便可以创建新的对象：
``` JavaScript
function copy (obj) {
    let innerFunc = function () {}   //  模拟构造函数
    innerFunc.prototype = obj
    return new innerFunc()
}
let obj = {
    name: 'mario',
    age: 22,
    getUserName() {
        console.log(this.name)
    }
}
let user = copy(obj)
user.getUserName()                  // mario
```
在上面的例子中，我们首先定义一个函数，向这个函数中传入参数。在函数体内部，定义了一个模拟的构
造函数，将传入的对象作为这个模拟的构造函数的原型对象。并返回这个模拟的构造函数的一个实例，此
时，返回的实例基于原型链继承，可以拥有所有父类的属性，整个过程其实相当于一次浅拷贝。

使用组合继承模式的基础是我们需要一个对象进行模版。ES6 使用 Object.create 规范了原型式继承
模式，直接浅拷贝实现即可。
``` JavaScript
let obj = {
    name: 'mario',
    age: 22,
    getUserName() {
        console.log(this.name)
    }
}
let user = Object.create(obj)
user.getUserName()                  // mario
```
#### 寄生式继承
寄生式继承与寄生构造函数模式和工厂模式相似，即创建一个仅用于封装继承过程的函数，这个函数的功
能仅仅是在内部通过操作增强对象并返回这个对象:
``` JavaScript
function createOtherObj (obj) {
    let tempObj = Object.create(obj)
    tempObj.getUserInfo = function () {
        console.log(tempObj.name)
    }
    return tempObj
}
let obj = {
    name: 'mario',
    age: 22,
    skillList: [],
    getUserName() {
        console.log(this.name)
    }
}
let copyObj = createOtherObj(obj)
copyObj.getUserInfo()               // mario
```
#### 寄生组合式继承
在前面，我们学习到了组合继承模式是 JavaScript 中最常用的继承模式，但这种设计模式会导致一个
问题，该继承模式会调用两次父类的构造函数。这导致每次调用子类的构造函数都会重写属性。
``` JavaScript
 function SuperType (userName, age) {
    this.userName = userName
    this.age = age
    this.skillList = ['computer']
}
SuperType.prototype.getUserInfo = function () {
    console.log(this.getUserInfo)
}
function SubType (sex) {
    SuperType.call(this)            // 第2次 调用父类 SuperType
    this.sex = sex
}
SubType.prototype = new SuperType() // 第1次 调用父类 SuperType
SubType.prototype.constructor = SubType;
SubType.prototype.getUserSex = function () {
    console.log(this.sex)
}
```
在上面的例子中，第一次调用父类构造函数时，在 SubType 的原型对象上挂载了 userName、age 以
及 skillList。第二次在SubType 构造函数中调用 SuperType 构造函数，使得 SubType 的实例中
同样增加了 userName、age 以及 skillList。在原型对象上和实例上都挂载相同的属性这明显浪费了
内存，因为实例上的属性会屏蔽其原型对象的同名属性。

为了解决这种问题，我们使用寄生组合式继承模式。所谓寄生组合模式继承，即通过借用构造函数来继承
属性，通过原型链的混成形
式来继承方法。我们不再需要在子类的构造函数中调用父类构造函数，因为我们仅仅只是需要父类的原型
对象副本而已，
``` JavaScript
function SuperType (userName, age) {
    this.userName = userName
    this.age = age
    this.skillList = ['computer']
}
SuperType.prototype.getUserInfo = function () {
    console.log(this.getUserInfo)
}
function SubType (sex) {
    SuperType.call(this)            // 调用父类 SuperType
    this.sex = sex
}
function initCopyPrototype (superType, subType) {
    let tempObj = Object.create(superType.prototype)     // 创建父类原型对象副本
    tempObj.constructor = subType                        // 增强对象
    subType.prototype = tempObj                          // 将父类原型对象赋予子类
}
initCopyPrototype(SuperType, SubType)
SubType.prototype.getUserSex = function () {
    console.log(this.sex)
}
```
这样的继承模式使得我们只会调用一次父类的构造函数，避免了子类的原型对象上添加更多没必要的参
数。
### 闭包
### 函数柯里化 Currying
函数柯里化高阶函数的一个特殊用法,就是将方法接受的多参数转换为接受单一参数的一种模式: 多入
参 => 单一入参 => 返回一个接受余下参数且返回结果的新函数。这解决了参数无法同时存在时的情况。
让我们来举一个例子了解一下函数柯里化，我们用常规模式和函数柯里化模式实现一个最简单经典的求和方法
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
#### 通用方式
``` JavaScript

```

上面是一个最简单的函数柯里化例子，通过这个例子，我们初步认识到了何为函数柯里化，但这样看上去有些多此一举，不要着急，接下来，我们继续深入了解函数柯里化。

可能有的同学在面试中，面试官会提出如何实现连续求和的面试题，这里就可以使用函数柯里化。
``` TypeScript
问: 如何实现getSumByCurrying(1)(2)(3)(4)(5).....(n) 连续求和
```