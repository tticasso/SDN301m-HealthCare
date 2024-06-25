const express = require('express')
const bodyParser = require('body-parser')
const appointmentController = require('../controllers/AppointmentController')
const appointmentRouter = express.Router()

appointmentRouter.use(bodyParser.json())
appointmentRouter.post('/create', appointmentController.create),
appointmentRouter.get('/list', appointmentController.getAppointmentById),
appointmentRouter.put('/edit/:id', appointmentController.editAppointment),
appointmentRouter.put('/edit/confirm/:id', appointmentController.editAppointmentStatusAndSendEmail),
// appointmentRouter.post('/delete/:id', appointmentController),

module.exports = appointmentRouter