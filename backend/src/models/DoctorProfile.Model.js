const mongoose = require('mongoose')
const {Schema} = mongoose;

const docProfileSchema = new mongoose.Schema({
    user: {
        _id: {type: Schema.Types.ObjectId, ref: 'User'}
    },
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
    // ????
    shift:{
        type: Date
    }
})

const DocProfile = mongoose.model('DocProfile', docProfileSchema);

module.exports = DocProfile;