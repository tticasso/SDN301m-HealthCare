const mongoose = require('mongoose')
const {Schema} = mongoose

const medicalRecordSchema = new Schema({
    patient_id: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    doctor_id: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    visit_date: Date,
    diagnosis: String,
    notes: String
})

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema)
module.exports = MedicalRecord