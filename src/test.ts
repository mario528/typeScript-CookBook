// let userAccount: string | number
// userAccount = 'mario'
// console.log(userAccount.length) // 5
// const getUserAccountLength = (userAccount: string | number):number => userAccount.length


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