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
   
    place:{
        type: Schema.Types.ObjectId,
        ref: "Hospital"
    },
    specify:[{
        type: Schema.Types.ObjectId,
        ref:"Specify"
    }],
    schedule: [{
        type:Schema.Types.ObjectId,
        ref:"DocSchedule"
    }],
    
})

const DocProfile = mongoose.model('DocProfile', docProfileSchema);

module.exports = DocProfile;