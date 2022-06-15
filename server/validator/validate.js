
const validator = require("validator");
const ValidRegister = data => {
    let errors = {}
    if(!validator.isLength(data.name, {min: 3, max: 30})){
        errors.name = "Name must be between 2 and 30 characters";
    }
    if(!validator.isNumeric(data.age)){
        errors.age = "Age must be a number";
    }
    if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password must be between 6 and 30 characters";
    }
    if(!validator.isLength(data.acountName, {min: 2, max: 30})){
        errors.acountName = "Acount name must be between 2 and 30 characters";
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

const ValidLogin = data => {
    let errors = {}
    if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password must be between 6 and 30 characters";
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}
module .exports = { ValidLogin, ValidRegister }