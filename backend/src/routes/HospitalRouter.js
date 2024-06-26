const express = require('express')
const bodyParser = require('body-parser')
const hospitalController = require('../controllers/HospitalController')
const hospitalRouter = express.Router()

hospitalRouter.use(bodyParser.json())
hospitalRouter.post('/create', hospitalController.create),
hospitalRouter.get('/hospital-list', hospitalController.getAllHospital),
hospitalRouter.get('/:id', hospitalController.getHospitalById),
hospitalRouter.put('/edit/:id', hospitalController.editHospital),
hospitalRouter.delete('/delete/:id', hospitalController.deleteHospital),

module.exports = hospitalRouter