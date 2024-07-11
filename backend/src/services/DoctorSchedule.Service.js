const DocSchedule = require('../models/DoctorSchedule.model')


//tạo 1 schedule
const createDocSchedule = async (docSchedule) => {
    let schedule = await DocSchedule.findOne({doctor: docSchedule.doctor, time: docSchedule.time});
    if (schedule) {
        throw new Error('Ca làm việc đã tồn tại');
    }
    const newProfile = new DocSchedule(docSchedule)
    await newProfile.save();
    return newProfile;
};

// Lấy 1 profile
const getDocSchedule = async (id) => {
    const docSchedule = await DocSchedule.findById(id);
    if (!docSchedule) {
        throw new Error('Ca làm không tồn tại');
    }
    return docSchedule;
};

// Cập nhật ca lam (nhan vien)
const updateDocSchedule = async (id, data) => {
    const docSchedule = await DocSchedule.findByIdAndUpdate(id, data)
    if (!docSchedule) {
        throw new Error('Ca làm không tồn tại');
    }
    return docSchedule;
};

// Xoa profile (admin)
const deleteDocSchedule = async (id) => {
    const docProfile = await DocSchedule.findByIdAndDelete(id);
    if (!docProfile) {
        throw new Error('Profile không tồn tại');
    }
};



const docScheduleService = {
    createDocSchedule,
    getDocSchedule,
    deleteDocSchedule,
    updateDocSchedule,
}

module.exports = docScheduleService;