import { storage } from '../firebase'

export const isValidRequiredInput = (...args) => {
    let validator = true
    for (let i = 0; i < args.length; i++) {
        if (args[i] === "") {
            validator = false
        }
        return validator
    }
}