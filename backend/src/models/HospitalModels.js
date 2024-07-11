const mongoose = require('mongoose')
const {Schema} = mongoose

const hospitalSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Hospital name is required!']
    },
    doctor: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    phone: {
        type:String 
    },
    address: {
        type: String,
    },
    slogan: {
        type: String
    },
    info: {
        type: String,
    },
    image:  {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },

    specify: [{
        type: Schema.Types.ObjectId,
        ref: 'Specify'
    }]
},{
    timestamps: true
})

const Hospital = mongoose.model('Hospital', hospitalSchema)
module.exports = Hospital