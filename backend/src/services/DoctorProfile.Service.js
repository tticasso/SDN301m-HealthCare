const DocProfile = require('../models/DoctorProfile.Model')


//tạo profile 
const createDocProfile = async (docProfile) => {
    let newProfile = await DocProfile.findOne({user: docProfile.user});
    if (newProfile) {
        throw new Error('Profile không tồn tại');
    }
    newProfile = docProfile;
    await newProfile.save();
    return newProfile;
};

// Lấy 1 profile
const getDocProfile = async (id) => {
    const docProfile = await DocProfile.findById(id);
    if (!docProfile) {
        throw new Error('Profile không tồn tại');
    }
    return docProfile;
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



const docProfileService = {
    createDocProfile,
    getDocProfile,
    updateDocProfile,
    deleteDocProfile
}

module.exports = docProfileService;