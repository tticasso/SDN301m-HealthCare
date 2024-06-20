const express = require('express')
const bodyParser = require('body-parser')
const appointmentController = require('../controllers/AppointmentController')
const appointmentRouter = express.Router()

appointmentRouter.use(bodyParser.json())
appointmentRouter.post('/create', appointmentController.create),
// appointmentRouter.get('/appointment/:id', appointmentController),
// appointmentRouter.post('/edit/:id', appointmentController),
// appointmentRouter.post('/delete/:id', appointmentController),

module.exports = appointmentRouter