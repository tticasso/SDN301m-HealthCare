const express = require('express')
const bodyParser = require('body-parser')
const MedicalRecordController = require('../controllers/MedicalRecordController')
const medicalRecordRouter = express.Router()

medicalRecordRouter.use(bodyParser.json())
medicalRecordRouter.post('/create', MedicalRecordController.create)
medicalRecordRouter.get('/list', MedicalRecordController.getAllRecord)
medicalRecordRouter.put('/edit/:id', MedicalRecordController.editRecord)

module.exports = medicalRecordRouter