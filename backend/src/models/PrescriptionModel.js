const mongoose = require('mongoose')
const {Schema} = mongoose;

const prescriptionSchema = new mongoose.Schema({
    appointment: {
        _id: {type: Schema.Types.ObjectId, ref: 'Appointment'}
    },
    doctor: {
        _id: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    patient: {
        _id: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    medication_details:{
        type: String
    },
    dosage:{
        type: String,
        required: [true, "Password is required"]
    },
    duration:{
        type: String,
    },
    issue_date: {
        type: Date,
    }
})

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;