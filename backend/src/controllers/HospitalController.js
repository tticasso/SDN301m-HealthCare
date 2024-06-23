const Hospital = require("../models/HospitalModels");
const hospitalService = require("../services/HospitalService");

async function create(req, res, next) {
    try {
        const { name, doctor_id, phone, address, slogan, info, image, startTime, endTime } = req.body;
        const newDoc = await hospitalService.create({ name, doctor_id, phone, address, slogan, info, image, startTime, endTime });
        res.status(201).json(newDoc);
    } catch (error) {
        next(error);
    }
}
async function getAllHospital(req, res, next){
    try {
        const records = await hospitalService.getAllHospital()
        res.json(records);
    } catch (error) {
        next(error);
    }
}

async function deleteHospital(req, res, next){

}

async function editHospital(req, res, next){
    try {
        if (req.params.id) {
            const updatedRecord= await hospitalService.editHospital(req.params.id, req.body);
            res.status(200).json(updatedRecord);
        }
    } catch (error) {
        next(error);
    }
}
const hospitalController = {
    create,
    getAllHospital,
    deleteHospital,
    editHospital
}


module.exports = hospitalController;