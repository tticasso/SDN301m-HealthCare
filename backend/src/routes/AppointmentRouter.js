const express = require('express')
const bodyParser = require('body-parser')
const appointmentController = require('../controllers/AppointmentController')
const appointmentService = require('../services/AppointmentService')
const appointmentRouter = express.Router()

appointmentRouter.use(bodyParser.json())
appointmentRouter.post('/create', appointmentController.create),
appointmentRouter.get('/list', appointmentController.getAppointmentById),
appointmentRouter.get('/time-slots', appointmentController.generateAppointmentTimes),
appointmentRouter.get('/available-time-slots', appointmentController.getAvailableTimeSlots);
appointmentRouter.put('/edit/:id', appointmentController.editAppointment),
appointmentRouter.put('/edit/confirm/:id', appointmentController.editAppointmentStatusAndSendEmail),
// appointmentRouter.post('/delete/:id', appointmentController),

module.exports = appointmentRouter