const mongoose = require('mongoose');
var validate = require('mongoose-validator');


const Schema = mongoose.Schema;
// var passwordValidator = [
//     validate({
//         validator: 'matches',
//         arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
//         message: 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'
//     }),
//     validate({
//         validator: 'isLength',
//         arguments: [8, 35],
//         message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
//     })
// ];

var emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
        message: 'Email must be at least 3 characters, max 40, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

var mobileValidator = [
    validate({
        validator: 'matches',
        arguments: /^((\+)?(\d{2}[-]))?(\d{10}){1}?$/,
        message: 'Mobile number must be 10 digits.'
    }),
    validate({
        validator: 'isLength',
        arguments: [10, 15],
        message: 'Mobile number should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
const userSchema = new Schema({

    name: { type: String, minlength: 3, require: true },
    username: { type: String, minlength: 3, require: true , unique: true,},
    email: { type: String, validate: emailValidator, require: true },
    mobile: { type: String, validate: mobileValidator, require: true },
    password: { type: String, require: true },
    create_at: { type: Number, default: Date.now().valueOf() },
    updated_at: { type: Number, default: Date.now().valueOf() }
})

module.exports = mongoose.model('User', userSchema)