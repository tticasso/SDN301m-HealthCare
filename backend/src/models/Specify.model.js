const mongoose = require('mongoose')
const {Schema} = mongoose;

const specifyProfileSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, "Specify name is required"]
    },
    description:{
        type: String,
    },
    image:{
        type: String,
    },
    
})

const Specify = mongoose.model('Specify', specifyProfileSchema);

module.exports = Specify;