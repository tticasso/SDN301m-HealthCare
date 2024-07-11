const doctorService = require('../services/Doctor.Service')
const docScheduleService = require('../services/DoctorSchedule.Service')

//tạo đơn thuốc (only role doctor)
async function createDocProfile (req, res) {
    try {
        const docProfile = await doctorService.createDocProfile(req.body);
        res.status(201).json(docProfile);
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
};

// Lấy 1 đơn thuốc bệnh nhân 
async function getDocProfile (req, res) {
    try {
        const docProfile = await doctorService.getDocProfile(req.params.id);
        res.status(200).json(docProfile);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

async function updateDocProfile (req, res) {
    try {
        const docProfile = await doctorService.updateDocProfile(req.params.id, req.body);
        res.status(200).json(docProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật thông đơn thuốc (only role doctor)
async function deleteDocProfile (req, res) {
    try {
        await doctorService.deleteDocProfile(req.params.id);
        res.status(200).json({ message: 'Đơn thuốc đã được xóa' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// lay list bac si
async function getAllDoctor (req ,res) {
    try {
        const doctors = await doctorService.getAllDoctor();
        const list = [];
        for (const doctor of doctors) {
            const profile = await doctorService.getDocProfile(doctor.id);
            list.push(profile);
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// doctor schedule 
async function createDocSchedule (req, res) {
    try {
        const docSchedule = await docScheduleService.createDocSchedule(req.body);
        res.status(201).json(docSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function getDocSchedule (req, res) {
    try {
        const docSchedule = await docScheduleService.getDocSchedule(req.params.id);
        res.status(200).json(docSchedule);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


async function updateDocSchedule (req, res) {
    try {
        const docSchedule = await docScheduleService.updateDocSchedule(req.params.id, req.body);
        res.status(200).json(docSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function deleteDocSchedule (req, res) {
    try {
        await docScheduleService.deleteDocSchedule(req.params.id);
        res.status(200).json({ message: 'Đơn thuốc đã được xóa' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const doctorController = {
    createDocProfile,
    updateDocProfile,
    getDocProfile,
    deleteDocProfile,
    getAllDoctor,
    createDocSchedule,
    updateDocSchedule,
    getDocSchedule,
    deleteDocSchedule,
}

module.exports = doctorController;