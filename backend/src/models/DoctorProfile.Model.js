const mongoose = require('mongoose')
const {Schema} = mongoose;

const docProfileSchema = new mongoose.Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // bằng cấp
    level:{
        type: String,
        required: [true, "Level is required"]
    },
    // nơi công tác
    place:{
        type: String,
        // required: [true, "Place is required"]
    },
    schedule: [{
        type:Schema.Types.ObjectId,
        ref:"DocSchedule"
    }],
    
})

const DocProfile = mongoose.model('DocProfile', docProfileSchema);

module.exports = DocProfile;