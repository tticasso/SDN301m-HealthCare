const appointmentService = require("../services/AppointmentService");

async function create(req, res, next) {
    try {
        const { patient_id, doctor_id, appointment_date, appointment_time, status = "Pending"  } = req.body;
        const newDoc = await appointmentService.create({ patient_id, doctor_id, appointment_date, appointment_time, status });
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

async function generateAppointmentTimes(req, res, next) {
    const times = appointmentService.generateAppointmentTimes();
    res.json(times);
}

async function getAvailableTimeSlots(req, res, next) {

    const availableSlots = appointmentService.getAvailableTimeSlots()
    res.json(availableSlots)
}

const appointmentController = {
    create,
    getAppointmentById,
    editAppointment,
    editAppointmentStatusAndSendEmail,
    generateAppointmentTimes,
    getAvailableTimeSlots
}


module.exports = appointmentController;