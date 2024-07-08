const Specify = require('../models/Specify.model')


<<<<<<< HEAD

=======
//tạo 1 schedule
>>>>>>> b8d1927eddd35b33b6a4c0348d27f0d0c99fdc24
const createSpecify = async (specify) => {
    if (await Specify.findOne({name: specify.name})) {
        throw new Error('Chuyên ngành việc đã tồn tại');
    }
    const newSpecify = new Specify(specify)
    await newSpecify.save();
    return newSpecify;
};

<<<<<<< HEAD

=======
// Lấy 1 profile
>>>>>>> b8d1927eddd35b33b6a4c0348d27f0d0c99fdc24
const getSpecify = async (id) => {
    const specify = await Specify.findById(id);
    if (!specify) {
        throw new Error('Chuyên ngành không tồn tại');
    }
    return specify;
};

<<<<<<< HEAD

const updateSpecify = async (id, data) => {
=======
// Cập nhật ca lam (nhan vien)
const updateDocSchedule = async (id, data) => {
>>>>>>> b8d1927eddd35b33b6a4c0348d27f0d0c99fdc24
    const specify = await Specify.findByIdAndUpdate(id, data)
    if (!specify) {
        throw new Error('Chuyên ngành không tồn tại');
    }
    return specify;
};

<<<<<<< HEAD

const deleteSpecify = async (id) => {
=======
// Xoa profile (admin)
const deleteDocSchedule = async (id) => {
>>>>>>> b8d1927eddd35b33b6a4c0348d27f0d0c99fdc24
    const specify = await Specify.findByIdAndDelete(id);
    if (!specify) {
        throw new Error('Chuyêng ngành không tồn tại');
    }
};

<<<<<<< HEAD
const getAllSpecify = async () => {
    const specifies = await Specify.find();
    if(!specifies) {
        throw new Error('Không có chuyên ngành');
    }
}


const docScheduleService = {
    getSpecify,
    getAllSpecify,
    createSpecify,
    deleteSpecify,
    updateSpecify
=======


const docScheduleService = {
    createDocSchedule,
    getDocSchedule,
    deleteDocSchedule,
    updateDocSchedule,
>>>>>>> b8d1927eddd35b33b6a4c0348d27f0d0c99fdc24
}

module.exports = docScheduleService;