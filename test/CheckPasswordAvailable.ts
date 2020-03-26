/// <reference path="Validation.ts" />
namespace checkPasswordAvailable {
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