const MedicalRecordService = require("../services/MedicalRecordService");

async function create(req, res, next) {
    try {
        const { visit_date, diagnosis, notes } = req.body;
        const newDoc = await MedicalRecordService.create({ visit_date, diagnosis, notes });
        res.status(201).json(newDoc);
    } catch (error) {
        next(error);
    }
}

async function getAllRecord(req, res, next) {
    try {
        const records = await MedicalRecordService.getAllRecord()
        res.json(records);
    } catch (error) {
        next(error);
    }
}

async function editRecord(req, res, next) {
    try {
        if (req.params.id) {
            const updatedRecord= await MedicalRecordService.editRecord(req.params.id, req.body);
            res.status(200).json(updatedRecord);
        }
    } catch (error) {
        next(error);
    }
}
const MedicalRecordController = {
    create,
    getAllRecord,
    editRecord
}

module.exports = MedicalRecordController;