# TypeScript学习笔记
#### TypeScript是JavaScript的超集
## 类型
> ### TypeScript的基本类型
- number  浮点数 
- string  字符串 
- object  对象类型
- boolean 布尔值
- array   数组
``` TypeScript
:number[] => [1,2,3] :string[] => ['1','2','3']
```
- tuple   元组
``` typeScript
let example: [string, number]  
example = ['ma',22] // success
example = [22,'ma'] // error
example[3] = 'jia'  // success 越界根据类型联合查询判断
```
- enum     枚举
``` typeScript
enum Color {
    first: 1,  // 1
    second,    // 2
    third      // 3
}
```
- null
- undefined
- symbel
- any      关闭类型检查
- void     空值返回
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
>### 类型断言
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
### 类型断言的根本
类型断言的根本在于, 他并不会从根本上改变使用者的类型。而是在编译时对编译器提供的一中编译类型指示, 他的影响仅仅存在与编译语法时。
### 双重断言
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

在typeScript中，存在两种声明空间
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
### keyof在TypeScript中
``` typeScript
interface Person {
    userName: string,
    age: Number,
    sex: string
}
type men = keyof Person
```