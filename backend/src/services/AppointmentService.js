const Appointment = require("../models/AppointmentModels");
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rotatoby23@gmail.com',
        pass: 'gmbluywuqnapjccx'
    }
});
async function sendEmail(appointment) {
    const mailOptions = {
        from: 'rotatoby23@gmail.com',
        to: 'ductrungvu23@gmail.com',
        subject: 'New Appointment Created',
        text: `An appointment has been created with the following details:\n
               Date: ${appointment.appointment_date}\n
               Time: ${appointment.appointment_time}\n
               Status: ${appointment.status}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
async function create({appointment_date, appointment_time, status}) {
    const appointment = new Appointment({
        appointment_date, appointment_time, status
    })
    try {
        const newDoc = await appointment.save()
        await sendEmail(newDoc)
        return newDoc;
    } catch (error) {
        throw error;
    }
}

async function getAppointmentByPatientId(id) {
    
}

const appointmentService = {
    create,
    getAppointmentByPatientId,
}
module.exports = appointmentService