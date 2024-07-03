const Specify = require('../models/Specify.model')


//tạo 1 schedule
const createSpecify = async (specify) => {
    if (await Specify.findOne({name: specify.name})) {
        throw new Error('Chuyên ngành việc đã tồn tại');
    }
    const newSpecify = new Specify(specify)
    await newSpecify.save();
    return newSpecify;
};

// Lấy 1 profile
const getSpecify = async (id) => {
    const specify = await Specify.findById(id);
    if (!specify) {
        throw new Error('Chuyên ngành không tồn tại');
    }
    return specify;
};

// Cập nhật ca lam (nhan vien)
const updateDocSchedule = async (id, data) => {
    const specify = await Specify.findByIdAndUpdate(id, data)
    if (!specify) {
        throw new Error('Chuyên ngành không tồn tại');
    }
    return specify;
};

// Xoa profile (admin)
const deleteDocSchedule = async (id) => {
    const specify = await Specify.findByIdAndDelete(id);
    if (!specify) {
        throw new Error('Chuyêng ngành không tồn tại');
    }
};



const docScheduleService = {
    createDocSchedule,
    getDocSchedule,
    deleteDocSchedule,
    updateDocSchedule,
}

module.exports = docScheduleService;