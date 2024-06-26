const Hospital = require("../models/HospitalModels");


async function create({name, doctor_id, phone, address, slogan, info, image, startTime, endTime}) {
    const hospital = new Hospital({
        name, doctor_id, phone, address, slogan, info, image, startTime, endTime
    })
    try {
        const newDoc = await hospital.save();
        return newDoc;
    } catch (error) {
        throw error;
    }
}

async function getHospitalById(id){
    try {
        return await Hospital.findById(id)
    } catch (error) {
        throw error
    }
}

async function getAllHospital(){
    try {
        return await Hospital.find();
    } catch (error) {
        throw error;
    }
}

async function deleteHospital(id){
    try {
        await Hospital.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

async function editHospital(id, updateData){
    try {
        await Hospital.findByIdAndUpdate(id, updateData);
        return await Hospital.findById(id);
    } catch (error) {
        throw error;
    }
}
const hospitalService = {
    create,
    getAllHospital,
    deleteHospital,
    editHospital,
    getHospitalById
}
module.exports = hospitalService