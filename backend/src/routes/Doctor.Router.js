const express = require('express');
const doctorRouter = express.Router();
const doctorController = require('../controllers/Doctor.Controller');
const bodyParser = require('body-parser');

doctorRouter.use(bodyParser.json())

//profile
doctorRouter.post('/create', doctorController.createDocProfile);
doctorRouter.get('/:id', doctorController.getDocProfile);
doctorRouter.put('/:id', doctorController.updateDocProfile);
doctorRouter.delete('/:id', doctorController.deleteDocProfile);

// list doctor
doctorRouter.get('/', doctorController.getAllDoctor);

//ca lam
doctorRouter.post('/schedule/create', doctorController.createDocSchedule);
doctorRouter.get('/schedule/:id', doctorController.getDocSchedule);
doctorRouter.put('/schedule/:id', doctorController.updateDocSchedule);
doctorRouter.delete('/schedule/:id', doctorController.deleteDocSchedule);
module.exports = doctorRouter;