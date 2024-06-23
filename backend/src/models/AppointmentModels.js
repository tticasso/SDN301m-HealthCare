const mongoose = require('mongoose')
const {Schema} = mongoose

const appointmentSchema = new Schema({
    patient_id: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    doctor_id: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    appointment_date: {
        type: Date,
    },
    appointment_time: {
        type: String,
    },
    status: String
})

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment