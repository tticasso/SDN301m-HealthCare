const Prescription = require('../models/PrescriptionModel')


//tạo đơn thuốc (only role doctor)
const createPrescription = async (prescription) => {
    let newPrescription = await Prescription.findOne({appointment: prescription.appointment});
    if (newPrescription) {
        throw new Error('Đơn thuốc không tồn tại');
    }
    newPrescription = prescription;
    await newPrescription.save();
    return newPrescription;
};

// Lấy 1 đơn thuốc bệnh nhân 
const getPrescription = async (id) => {
    const prescription = await Prescription.findById(id);
    if (!prescription) {
        throw new Error('Đơn thuốc không tồn tại');
    }
    return prescription;
};

// Cập nhật thông đơn thuốc (only role doctor)
const updatePrescription = async (id, data) => {
    const prescription = await Prescription.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!prescription) {
        throw new Error('Đơn thuốc không tồn tại');
    }
    return prescription;
};

// Xóa đơn thuốc (only role doctor)
const deletePrescription = async (id) => {
    const prescription = await Prescription.findByIdAndDelete(id);
    if (!prescription) {
        throw new Error('Đơn thuốc không tồn tại');
    }
};

// láy toàn bộ đơn thuốc của 1 bệnh nhan
const getAllPrescription = async (patient_id) => {
    const prescriptions = await Prescription.find({patient: patient_id})
    return prescriptions;
};

const getAllPrescriptionByDoctor = async(doctor_id) => {
    const prescriptions = await Prescription.find({doctor: doctor_id})
    return prescriptions;
}

const userService = {
    createPrescription,
    getPrescription,
    deletePrescription,
    updatePrescription,
    getAllPrescription,
    getAllPrescriptionByDoctor
}

module.exports = userService;