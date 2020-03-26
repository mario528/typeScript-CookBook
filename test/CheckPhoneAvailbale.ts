/// <reference path="Validation.ts" />
namespace CheckPhone {
    const globalPassword = '528528'
    let globalPhoneREG = /^1[34578]\d{9}$/
    export class checkPhoneAvailbale implements PhoneNumber,UserFunc {
        phoneNumber: string
        constructor (phoneNumber: string) {
            this.phoneNumber = phoneNumber
        }
        isAvailable () {
            return globalPhoneREG.test(this.phoneNumber)
        }
    }
}