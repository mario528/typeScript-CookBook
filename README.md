# TypeScript学习笔记
#### TypeScript是JavaScript的超集
## TypeScript的基本类型
- number  浮点数 
- string  字符串 
- object 
- boolean 布尔值 true/false
- array   数组 :number[] => [1,2,3] :string[] => ['1','2','3']
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
- any
- void
### keyof在TypeScript中
``` typeScript
    interface Person {
        userName: string,
        age: Number,
        sex: string
    }
    type men = keyof Person
```