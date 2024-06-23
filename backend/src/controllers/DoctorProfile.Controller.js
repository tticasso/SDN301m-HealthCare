const docProfileService = require('../services/DoctorProfile.Service')
const userService = require('../services/UserService')

//tạo đơn thuốc (only role doctor)
async function createDocProfile (req, res) {
    try {
        const docProfile = await docProfileService.createDocProfile(req.body);
        res.status(201).json(docProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy 1 đơn thuốc bệnh nhân 
async function getDocProfile (req, res) {
    try {
        const docProfile = await docProfileService.getDocProfile(req.params.id);
        res.status(200).json(docProfile);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Cập nhật thông tin đơn thuốc (only role doctor)
async function updateDocProfile (req, res) {
    try {
        const docProfile = await docProfileService.updateDocProfile(req.params.id, req.body);
        res.status(200).json(docProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật thông đơn thuốc (only role doctor)
async function deleteDocProfile (req, res) {
    try {
        await docProfileService.deleteDocProfile(req.params.id);
        res.status(200).json({ message: 'Đơn thuốc đã được xóa' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function getAllDoctor (req ,res) {
    try {
        const doctors = await userService.getAllDoctor();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



const docProfileController = {
    createDocProfile,
    updateDocProfile,
    getDocProfile,
    deleteDocProfile,
    getAllDoctor,
}

module.exports = docProfileController;