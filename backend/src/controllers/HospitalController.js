const hospitalService = require('../services/HospitalService')
const doctorService = require('../services/Doctor.Service')


async function createHospital (req, res) {
    try {
        const hospital = await hospitalService.createHospital(req.body);
        res.status(201).json(hospital);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function updateHospital (req, res) {
    try {
        const hospital = await hospitalService.updateHospital(req.params.id, req.body);
        res.status(200).json(hospital);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function deleteHospital (req, res) {
    try {
        await hospitalService.deleteHospital(req.params.id);
        res.status(200).json({ message: 'Bệnh viện đã được xóa' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy 
async function getAllHospital (req, res) {
    try {
        const hospitals = await hospitalService.getAllHospital();
        res.status(200).json(hospitals);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

async function getHospital (req, res) {
    try {
        const hospital = await hospitalService.getHospital(req.params.id);
        res.status(200).json(hospital);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// lay list bac si
async function getAllDoctorByHospital (req ,res) {
    try {
        const doctors = await doctorService.getAllDoctorBySpecifyAndHospital(req.params.specifyName, req.params.hospitalName);
        res.status(200).json(doctors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const hospitalController = {
    createHospital,
    updateHospital,
    deleteHospital,
    getAllHospital,
    getHospital,
    getAllDoctorByHospital,
}

module.exports = hospitalController;