function typeExtend <T, U> (user: T, userAccount: U): T & U {
    let obj = <T & U>{};
    for (let id in user) {
        (<T>obj)[id] = user[id];
      }
      for (let id in userAccount) {
        if (!userAccount.hasOwnProperty(id)) {
          (<U>userAccount)[id] = userAccount[id];
        }
      }
}

let paramA = {
    name: 'mario'
};
let paramB = {
    account: 528528
}
let a = typeExtend(paramA, paramB);