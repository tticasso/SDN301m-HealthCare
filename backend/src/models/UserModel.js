const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: integer,
        required: []
    },
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
        required: [true]
    },
    dob: {
        type: Date,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;