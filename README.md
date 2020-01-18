# TypeScript学习笔记
## 前言
本仓库为笔者的ypeScript学习笔记，在学习过程中，会将概念或者问题记录在本仓库中。因为笔者也是刚刚毕业，所以文章内有任何问题请谅解并感谢issues指出🙏。
## 开始
### 什么是TypeScript ?
TypeScript是JavaScript的超集, TypeScript主要提供了**类型系统**以及对**ES6**的支持,它增加了代码的可读性和可维护性,避免了一系列因为JavaScript弱类型特性导致的bug。
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

在TypeScript中, symbol是通过Symbol函数创建的。但需要注意的是，Symbol并不是类方法。生成的symbol并不是对象，而是***原始类型***。并且，Symbol类型也不可以与其他类型进行运算，否则会有错误抛出。
Symbol类型可以转化为Boolean或者String类型。但无法转化为数字类型。
在ES2019中，Symbol返回值具有description属性
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
obj     //  { paramB: 'jia', [Symbol(firstName)]: 'ma' }
Object.keys(obj)  // ['paramB']
```
从上面的代码可以看出，属性名中类型为Symbol的在Object.keys、JSON.stringify()、for...in、for...of 等遍历中无法获取。但对象中的Symbol类型属性也不是没办法获取，在Object下有getOwnPropertySymbols API可以获取所有Symbol类型属性名。另外，一个新的API可以一劳永逸的解决输出所有对象属性名 - Reflect.ownKeys()
``` TypeScript
let a = {};
let paramA = Symbol('firstName')
obj[paramA] = 'ma'
obj.paramB = 'jia'
obj     //  { paramB: 'jia', [Symbol(firstName)]: 'ma' }
Object.getOwnPropertySymbols(obj)  // [ Symbol(firstName) ]
Reflect.ownKeys(obj) // [ 'paramB', Symbol(firstName) ]
```
若想使用同一个Symbol值 可以使用Symbol.for方法。如果调用时，有该Symbol值,则直接返回该symbol值，若没有，则创建一个新的。

| Symbol() | Symbol.for() | Symbol.keyFor
|--|--|--
| 无论何时调用，均创建一个新的Symbol | 当传入一个参数时,首先全局搜索是否有该该symbol,如果有，则返回该symbol值。若没有，则创建一个新的symbol,在全局登记 | 当传入symbol类型的参数在全局登记过，则返回该Symbol值的key,若传入值在全局未登记，则返回undefined。
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
- any      关闭类型检查 兼容所有类型
- void     空值返回
> ### 类型推断
在TypeScript中，对于为明确指出类型的代码，TypeScipt编译器会智能的推断出该变量的类型。
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
typeScript 允许改变覆盖其的类型推断 并且按照你所赋予的类型来分析他 这种机制
被成为类型断言。

首先 让我们看一下下面的代码:
``` TypeScript
let user = {}
user.name = 'mario';
```
上面的代码,在JavaScript中，我们可以轻松的给对象user赋予name属性。但在TypeScript中，会触发'类型“{}”上不存在属性“name”。'的错误警告。原因就在于在创建user的同时 TypeScript编译器就将user的类型推断为空对象{}。因此无法再在user上赋值。此时, 我们便需要使用类型断言来覆盖TypeScript的类型推断:
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
## 环境声明文件
我们在TypeScript项目中，例如使用Jquery这样的第三方库时
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
console.log(a) // 1,2,3
let textList = ['ma','jia','ao'];
let a = reverse(textList);
console.log(a) // 'ao', 'jia', 'ma'
```
## 声明空间
 - 类型声明空间
 - 变量声明空间

在typeScript中，存在两种声明空间:
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
## 模块
typeScript中的模块 在typeScript中，推荐使用ES模块语法
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
console.log(A) // { a: 10, emailAddress: 'mario528@163.com' }
```
## 命名空间