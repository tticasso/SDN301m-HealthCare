const express = require('express')
const bodyParser = require('body-parser')
const hospitalController = require('../controllers/HospitalController')
const hospitalRouter = express.Router()

hospitalRouter.use(bodyParser.json())

hospitalRouter.post('/create', hospitalController.createHospital),
hospitalRouter.put('/:id', hospitalController.updateHospital),
hospitalRouter.delete('/:id', hospitalController.deleteHospital),
hospitalRouter.get('/', hospitalController.getAllHospital),
hospitalRouter.get('/:id', hospitalController.getHospital),
hospitalRouter.get('/:hospitalName/:specifyName/doctors', hospitalController.getAllDoctorByHospital)

module.exports = hospitalRouter