const mongoose = require('mongoose')
const {Schema} = mongoose

const hospitalSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Hospital name is require!']
    },
    doctor: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    phone: String,
    address: String,
    slogan: String,
    info: String,
    image: String,
    startTime: String,
    endTime: String,
    specify: [{
        type: Schema.Types.ObjectId,
        ref: 'Specify'
    }]
},{
    timestamps: true
})

const Hospital = mongoose.model('Hospital', hospitalSchema)
module.exports = Hospital