const appointmentService = require("../services/AppointmentService");

async function create(req, res, next) {
    try {
        const { appointment_date, appointment_time, status } = req.body;
        const newDoc = await appointmentService.create({ appointment_date, appointment_time, status });
        res.status(201).json(newDoc);
    } catch (error) {
        next(error);
    }
}

async function getAppointmentById(req, res, next) {
    try {
        const appointment = await appointmentService.getAppointmentById()
        res.json(appointment)
    } catch (error) {
        next(error)
    }
}

async function editAppointment(req, res, next) {
    try {
        if (req.params.id) {
            const updatedAppointment = await appointmentService.editAppointment(req.params.id, req.body);
            res.status(200).json(updatedAppointment);
        }
    } catch (error) {
        next(error);
    }
}

async function editAppointmentStatusAndSendEmail(req, res, next) {
    try {
        if (req.params.id) {
            const updatedAppointment = await appointmentService.editAppointmentStatusAndSendEmail(req.params.id);
            res.status(200).json("Confirm appointment successful. An email will send");
        }
    } catch (error) {
        next(error);
    }
}


const appointmentController = {
    create,
    getAppointmentById,
    editAppointment,
    editAppointmentStatusAndSendEmail
}


module.exports = appointmentController;