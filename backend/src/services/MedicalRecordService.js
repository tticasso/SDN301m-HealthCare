const MedicalRecord = require("../models/MedicalRecordModels");

async function create({patient_id, doctor_id, visit_date, diagnosis, notes}) {
    const record = new MedicalRecord({
        patient_id,
        doctor_id,
        visit_date,
        diagnosis,
        notes
    })
    try {
        const newDoc = await record.save();
        return newDoc;
    } catch (error) {
        throw error;
    }
}

async function getAllRecord(){
    try {
        return await MedicalRecord.find();
    } catch (error) {
        throw error;
    }
}

async function editRecord(id, updateData) {
    try {
        await MedicalRecord.findByIdAndUpdate(id, updateData);
        return await MedicalRecord.findById(id);
    } catch (error) {
        throw error;
    }
}
const MedicalRecordService = {
    create,
    getAllRecord,
    editRecord
}

module.exports = MedicalRecordService