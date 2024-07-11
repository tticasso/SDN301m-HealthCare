const doctorService = require('../services/Doctor.Service')
const specifyService = require('../services/Specify.services')


async function createSpecify (req, res) {
    try {
        const specify = await specifyService.createSpecify(req.body);
        res.status(201).json(specify);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function updateSpecify (req, res) {
    try {
        const specify = await specifyService.updateSpecify(req.params.id, req.body);
        res.status(200).json(specify);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function deleteSpecify (req, res) {
    try {
        await specifyService.deleteSpecify(req.params.id);
        res.status(200).json({ message: 'Chuyêng ngành đã được xóa' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy 
async function getAllSpecify (req, res) {
    try {
        const specifies = await specifyService.getAllSpecify();
        res.status(200).json(specifies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// lay list bac si
async function getAllDoctorBySpecify (req ,res) {
    try {
        const doctors = await doctorService.getAllDoctorBySpecify(req.params.specifyid);
        res.status(200).json(doctors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const specifyController = {
    createSpecify,
    updateSpecify,
    deleteSpecify,
    getAllSpecify,
    getAllDoctorBySpecify
}

module.exports = specifyController;