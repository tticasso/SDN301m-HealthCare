const prescriptionService = require('../services/PrescriptionService')

//tạo đơn thuốc (only role doctor)
async function createPrescription (req, res) {
    try {
        const prescription = await prescriptionService.createPrescription(req.body);
        res.status(201).json(prescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy 1 đơn thuốc bệnh nhân 
async function getPrescription (req, res) {
    try {
        const prescription = await prescriptionService.getPrescription(req.params.id);
        res.status(200).json(prescription);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Cập nhật thông tin đơn thuốc (only role doctor)
async function updatePrescription (req, res) {
    try {
        const prescription = await prescriptionService.updatePrescription(req.params.id, req.body);
        res.status(200).json(prescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật thông đơn thuốc (only role doctor)
async function deletePrescription (req, res) {
    try {
        await prescriptionService.deletePrescription(req.params.id);
        res.status(200).json({ message: 'Đơn thuốc đã được xóa' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// láy toàn bộ đơn thuốc của 1 bệnh nhan
async function getAllPrescription (req, res) {
    try {
        const prescriptions = await prescriptionService.getAllPrescription(req.params.patientId);
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function getAllPrescriptionByDoctor (req, res) {
    try {
        const prescriptions = await prescriptionService.getAllPrescriptionByDoctor(req.params.doctorId);
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const prescriptionController = {
    createPrescription,
    updatePrescription,
    deletePrescription,
    getPrescription,
    getAllPrescription,
    getAllPrescriptionByDoctor,
}

module.exports = prescriptionController;