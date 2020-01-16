# TypeScript学习笔记
#### TypeScript是JavaScript的超集
## TypeScript的基本类型
- number  浮点数 
- string  字符串 
- object 
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
      first: 1,
      second,
      third
  }
```
- null
- undefined
- symbel
- any      关闭类型检查
- void     空值返回
## 联合查询
当希望一个变量用户多个类型可能时 即使用类型的联合查询
``` typeScript
let idCount: string | number;
idCount = 10;
idCount = '10'
```
## 交叉类型
从两个对象中创建一个新对象，新对象会拥有着两个对象所有的功能 类似于继承的含义
``` typeScript
function TypeExtend <T, U> (userName: T, userCount: N): T & N {

}
```
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
## 模块 - typeScript中的模块
    在typeScript中，推荐使用ES模块语法
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