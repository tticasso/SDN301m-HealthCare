const mongoose = require('mongoose')
const {Schema} = mongoose;

const docProfileSchema = new mongoose.Schema({
    // bằng cấp
    level:{
        type: String,
        required: [true, "Level is required"]
    },
    // nơi công tác
    place:{
        type: String,
        required: [true, "Place is required"]
    },
    
})

const DocProfile = mongoose.model('DocProfile', docProfileSchema);

module.exports = DocProfile;