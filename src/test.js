"use strict";
// let userAccount: string | number
// userAccount = 'mario'
// console.log(userAccount.length) // 5
// const getUserAccountLength = (userAccount: string | number):number => userAccount.length
// const globalPassword = '528528'
// let globalPhoneREG = /^1[34578]\d{9}$/
// interface PhoneNumber {
//     phoneNumber: string
// }
// interface Password {
//     password: string | number
// }
// interface UserFunc {
//     isAvailable (): boolean
// }
// class checkPhoneAvailbale implements PhoneNumber,UserFunc {
//     phoneNumber: string
//     constructor (phoneNumber: string) {
//         this.phoneNumber = phoneNumber
//     }
//     isAvailable () {
//         return globalPhoneREG.test(this.phoneNumber)
//     }
// }
// class checkPasswordAvailable implements Password,UserFunc {
//     password: number | string;
//     constructor (password: string | number) {
//         this.password = password;
//     }
//     isAvailable () {
//         return this.password == globalPassword
//     }
// }
// let passTemp = new checkPasswordAvailable('528528')
// console.log(passTemp.isAvailable())
var Check;
(function (Check) {
    var globalPassword = '528528';
    var globalPhoneREG = /^1[34578]\d{9}$/;
    var checkPhoneAvailbale = /** @class */ (function () {
        function checkPhoneAvailbale(phoneNumber) {
            this.phoneNumber = phoneNumber;
        }
        checkPhoneAvailbale.prototype.isAvailable = function () {
            return globalPhoneREG.test(this.phoneNumber);
        };
        return checkPhoneAvailbale;
    }());
    Check.checkPhoneAvailbale = checkPhoneAvailbale;
    var checkPasswordAvailable = /** @class */ (function () {
        function checkPasswordAvailable(password) {
            this.password = password;
        }
        checkPasswordAvailable.prototype.isAvailable = function () {
            return this.password == globalPassword;
        };
        return checkPasswordAvailable;
    }());
    Check.checkPasswordAvailable = checkPasswordAvailable;
})(Check || (Check = {}));
console.log(Check);
var passTemp = new Check.checkPasswordAvailable('528528');
console.log(passTemp.isAvailable());
