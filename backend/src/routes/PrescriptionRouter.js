const express = require('express');
const prescriptionRouter = express.Router();
const prescriptionController = require('../controllers/PrescriptionController');
const bodyParser = require('body-parser');

prescriptionRouter.use(bodyParser.json())

prescriptionRouter.post('/create', prescriptionController.createPrescription);
prescriptionRouter.get('/:id', prescriptionController.getPrescription);
prescriptionRouter.put('/:id', prescriptionController.updatePrescription);
prescriptionRouter.delete('/:id', prescriptionController.deletePrescription);
prescriptionRouter.get('/patient/:patientId', prescriptionController.getAllPrescription);
prescriptionRouter.get('/doctor/:doctorId', prescriptionController.getAllPrescriptionByDoctor);

module.exports = prescriptionRouter;