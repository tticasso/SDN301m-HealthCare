const express = require('express');
const docProfileRouter = express.Router();
const docProfileController = require('../controllers/DoctorProfile.Controller');
const bodyParser = require('body-parser');

docProfileRouter.use(bodyParser.json())

docProfileRouter.post('/create', docProfileController.createDocProfile);
docProfileRouter.get('/:id', docProfileController.getDocProfile);
docProfileRouter.put('/:id', docProfileController.updateDocProfile);
docProfileRouter.delete('/:id', docProfileController.deleteDocProfile);
docProfileRouter.get('/', docProfileController.getAllDoctor);

module.exports = docProfileRouter;