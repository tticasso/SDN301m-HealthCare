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
        type: String,
        required: [true, "Fullname is required"]
    },
    dob: {
        type: Date,
    },
    role: {
        type: String,
        enum: ["ADMIN", "MANAGER", "DOCTOR", "PAITENT"],
        required: [true, "Role is required"]
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;