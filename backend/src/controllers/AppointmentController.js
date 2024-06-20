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

const appointmentController = {
    create
}


module.exports = appointmentController;