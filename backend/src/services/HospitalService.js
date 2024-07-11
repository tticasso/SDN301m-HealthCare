const Hospital = require('../models/HospitalModels')



const createHospital = async (hospital) => {
    if (await Hospital.findOne({name: hospital.name})) {
        throw new Error('Bệnh viện đã tồn tại');
    }
    const newHospital = new Hospital(hospital)
    await newHospital.save();
    return newHospital;
};

const updateHospital = async (id, data) => {
    const hospital = await Hospital.findByIdAndUpdate(id, data)
    if (!hospital) {
        throw new Error('Bệnh viện không tồn tại');
    }
    return hospital;
};

const deleteHospital = async (id) => {
    const hospital = await Hospital.findByIdAndDelete(id)
    if (!hospital) {
        throw new Error('Bệnh viện không tồn tại');
    }
};

const getHospital = async (id) => {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
        throw new Error('Bệnh viện không tồn tại');
    }
    return hospital;
};

const getAllHospital = async() => {
    const hospitals = await Hospital.find();
    if (!hospitals) {
        throw new Error('Không có bệnh viện nào');
    }
    return hospitals;
}

const hospitalService = {
    createHospital,
    updateHospital,
    deleteHospital,
    getHospital,
    getAllHospital,

}

module.exports = hospitalService;