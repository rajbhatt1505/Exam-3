const mongoose = require('mongoose');
const Schema = mongoose.Schema


const userprofileSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true }
})

module.exports = mongoose.model('userprofile', userprofileSchema)