const mongoose = require('mongoose')
const {Schema} = mongoose

const doctorProfileSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    level: {type: String},
    place: {type: String},
    shift: {type: Date}
})

const DoctorProfile = mongoose.model('DoctorProfile', doctorProfileSchema)
module.exports = DoctorProfile