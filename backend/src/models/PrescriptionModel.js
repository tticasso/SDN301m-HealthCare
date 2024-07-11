const mongoose = require('mongoose')
const { Schema } = mongoose;

const prescriptionSchema = new mongoose.Schema({
    appointment: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    medication_details: {
        type: String,
        required: [true, "Medication details is required"]
    },
    dosage: {
        type: String,
        required: [true, "Dosage is required"]
    },
    duration: {
        type: String,
        required: [true, "Duration is required"]
    },
    issue_date: {
        type: Date,
    }
})

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;