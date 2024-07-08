const express = require('express');
const specifyRouter = express.Router();
const specifyController = require('../controllers/Specify.controller')
const bodyParser = require('body-parser');

specifyRouter.use(bodyParser.json())

//profile
specifyRouter.post('/create', specifyController.createSpecify);
specifyRouter.put('/:id', specifyController.updateSpecify);
specifyRouter.delete('/:id', specifyController.deleteSpecify);

// list doctor
specifyRouter.get('/', specifyController.getAllSpecify);
specifyRouter.get('/:specifyName/doctors', specifyController.getAllDoctorBySpecify);

module.exports = specifyRouter;