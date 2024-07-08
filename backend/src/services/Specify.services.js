const Specify = require('../models/Specify.model')



const createSpecify = async (specify) => {
    if (await Specify.findOne({name: specify.name})) {
        throw new Error('Chuyên ngành việc đã tồn tại');
    }
    const newSpecify = new Specify(specify)
    await newSpecify.save();
    return newSpecify;
};


const getSpecify = async (id) => {
    const specify = await Specify.findById(id);
    if (!specify) {
        throw new Error('Chuyên ngành không tồn tại');
    }
    return specify;
};


const updateSpecify = async (id, data) => {
    const specify = await Specify.findByIdAndUpdate(id, data)
    if (!specify) {
        throw new Error('Chuyên ngành không tồn tại');
    }
    return specify;
};


const deleteSpecify = async (id) => {
    const specify = await Specify.findByIdAndDelete(id);
    if (!specify) {
        throw new Error('Chuyêng ngành không tồn tại');
    }
};

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
}

module.exports = docScheduleService;