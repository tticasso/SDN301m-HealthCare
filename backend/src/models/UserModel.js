const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    fullname:{
        type: String
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    img: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    role: {
        type: String,
        enum: ["ADMIN", "MANAGER", "DOCTOR", "PATIENT"],
        required: [true, "Role is required"]
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;