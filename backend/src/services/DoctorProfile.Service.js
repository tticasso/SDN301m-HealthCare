const DocProfile = require('../models/DoctorProfile.Model')
const User = require('../models/UserModel')
const Specify = require('../models/Specify.model')
const Hospital = require('../models/HospitalModels')


//tạo profile 
const createDocProfile = async (docProfile) => {
    let newProfile = await DocProfile.findOne({user: docProfile.user});
    if (newProfile) {
        throw new Error('Profile không tồn tại');
    }
    newProfile = new DocProfile(docProfile);
    await newProfile.save();
    return newProfile;
};

// Lấy 1 profile
const getDocProfile = async (id) => {
    const doctor = await User.findById(id)
    const docProfile = await DocProfile.findOne({doctor: id});
    if (!docProfile) {
        throw new Error('Profile không tồn tại');
    }
    return {docProfile, doctor};
};

// Cập nhật profile (nhan vien)
const updateDocProfile = async (id, data) => {
    const docProfile = await DocProfile.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!docProfile) {
        throw new Error('Profile không tồn tại');
    }
    return docProfile;
};

// Xoa profile (admin)
const deleteDocProfile = async (id) => {
    const docProfile = await DocProfile.findByIdAndDelete(id);
    if (!docProfile) {
        throw new Error('Profile không tồn tại');
    }
};

const getAllDoctorBySpecify = async(specifyName) => {
    const specifyDoc = Specify.findOne({name: specifyName})
    const docProfiles = await DocProfile.find({specify: specifyDoc._id})
    const doctors = [];
    docProfiles.map( async (element) => {
        const user = await User.findById(element.doctor)
        const doctor = {
            _id: user._id,
            fullname : user.fullname,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            image: user.img,
            level: element.level,
            place: element.place,
            specify: element.specify,
            schedule: element.schedule
        }
        doctors.push(doctor);
    })

    return doctors
}

const getAllDoctorBySpecifyAndHospital = async(specifyName, hospitalName) => {
    const specifyDoc = Specify.findOne({name: specifyName})
    const hospital = Hospital.findOne({name: hospitalName})
    const docProfiles = await DocProfile.find({specify: specifyDoc._id, place: hospital._id})
    const doctors = [];
    docProfiles.map( async (element) => {
        const user = await User.findById(element.doctor)
        const doctor = {
            _id: user._id,
            fullname : user.fullname,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            image: user.img,
            level: element.level,
            place: element.place,
            specify: element.specify,
            schedule: element.schedule
        }
        doctors.push(doctor);
    })

    return doctors
}

const docProfileService = {
    createDocProfile,
    getDocProfile,
    updateDocProfile,
    deleteDocProfile,
    getAllDoctorBySpecify,
    getAllDoctorBySpecifyAndHospital
}

module.exports = docProfileService;