# TypeScript学习笔记
## 前言
本仓库为笔者的 TypeScript 学习笔记，在学习过程中，会将概念或者问题记录在本仓库中。因为笔者也是刚刚毕业，所以文章内有任何问题请谅解并感谢 issues 指出🙏。
___
## 开始
### 什么是TypeScript ?
TypeScript 是 JavaScript 的超集, TypeScript 主要提供了**类型系统**以及对**ES6**的支持,它增加了代码的可读性和可维护性,避免了一系列因为 JavaScript弱类型特性导致的bug。
### 开发前
对于 TypeScript 来说,最优秀的IDE可能便是 VScode 了。使用 TypeScript 编写的VScode可以我们无缝顺滑的开发TypeScript。

  好了，现在开始我们的TypeScript学习吧 `:heart_eyes:`
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
obj     //  { paramB: 'jia', [Symbol(firstName)]: 'ma' }
Object.keys(obj)  // ['paramB']
```
从上面的代码可以看出，属性名中类型为Symbol的在 Object.keys、JSON.stringify()、for...in、for...of 等遍历中无法获取。但对象中的Symbol类型属性也不是没办法获取，在 Object 下有 getOwnPropertySymbols API 可以获取所有 Symbol 类型属性名。另外，一个新的 API 可以一劳永逸的解决输出所有对象属性名 - Reflect.ownKeys()
``` TypeScript
let a = {};
let paramA = Symbol('firstName')
obj[paramA] = 'ma'
obj.paramB = 'jia'
obj     //  { paramB: 'jia', [Symbol(firstName)]: 'ma' }
Object.getOwnPropertySymbols(obj)  // [ Symbol(firstName) ]
Reflect.ownKeys(obj) // [ 'paramB', Symbol(firstName) ]
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
console.log(a) // 1,2,3
let textList = ['ma','jia','ao'];
let a = reverse(textList);
console.log(a) // 'ao', 'jia', 'ma'
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
console.log(A) // { a: 10, emailAddress: 'mario528@163.com' }
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
在 TypeScript 中,现在的版本推荐我们使用命名空间。首先，让我们来看看下面的这段代码，本章命名空间相关的学习我们都会围绕着这段代码和它的“升级版来展开
``` TypeScript
interface PhoneNumber {
  phoneNumber: number
}
```