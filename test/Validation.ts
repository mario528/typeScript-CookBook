namespace Check {
    export interface PhoneNumber {
        phoneNumber: string
    }
    export interface Password {
        password: string | number
    }
    export interface UserFunc {
        isAvailable(): boolean
    }
}