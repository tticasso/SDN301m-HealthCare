const Appointment = require("../models/AppointmentModels");
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rotatoby23@gmail.com',
        pass: 'gmbluywuqnapjccx'
    }
});
async function sendEmailBookingNew(appointment) {
    const mailOptions = {
        from: 'rotatoby23@gmail.com',
        to: 'ductrungvu23@gmail.com',
        subject: 'New Appointment Created',
        html: `<h3>Thank you for booking an appointment at Health Care's system</h3>
               <h4>Information for booked appointment:</h4>
               <div>Patient's name and email: ${appointment.patient_id}</div>
               <div>Time: ${appointment.appointment_time}</div>
               <div>Date: ${appointment.appointment_date}</div>
               <div>Status: <b>${appointment.status}</b></div>
               <h4>Health Care system will automatically send email notification when confirmed appointment is complete. Thank you!</h4>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
async function create({patientId, doctorId, appointment_date, appointment_time, status}) {
    const appointment = new Appointment({
        patientId, doctorId, appointment_date, appointment_time, status
    })
    try {
        const newDoc = await appointment.save()
        await sendEmailBookingNew(newDoc)
        return newDoc;
    } catch (error) {
        throw error;
    }
}

async function getAppointmentById() {
    try {
        const appointment = await Appointment.find({}).populate('patient_id')
        const newAppointment = appointment?.map(a => {
            return {
                _id: a.id,
                patient_id: a.patient_id?.map(p => [p.fullname, p.email]),
                appointment_date: a.appointment_date,
                appointment_time: a.appointment_time,
                status: a.status
            }
        })
        return newAppointment
    } catch (error) {
        throw error
    }
}

async function editAppointment(id, updateData) {
    try {
        await Appointment.findByIdAndUpdate(id, updateData);
        const appointment = await Appointment.findById(id);
        // if (updateData.status === "Success") {
        //     // Send email notification
        //     await sendSuccessEmail(appointment);
        //   }
        return appointment  
    } catch (error) {
        throw error;
    }
}

// Hàm để cập nhật status thành Success và gửi email
async function editAppointmentStatusAndSendEmail(id) {
    try {
      const updateData = { status: "Success" };
  
      await Appointment.findByIdAndUpdate(id, updateData);
      const appointment = await Appointment.findById(id);
  
      if (appointment.status === "Success") {
        await sendSuccessEmail(appointment);
      }
  
      return appointment;
    } catch (error) {
      throw error;
    }
  }
  
async function sendSuccessEmail(appointment) {
    const mailOptions = {
        from: 'rotatoby23@gmail.com',
        to: 'ductrungvu23@gmail.com',
        subject: 'Email notification of booking progress at Doctors Care',
        html: `<h3>Thank you for booking an appointment at Health Care's system</h3>
               <h4>Information for booked appointment:</h4>
               <div>Patient's name and email: ${appointment.patient_id}</div>
               <div>Time: ${appointment.appointment_time}</div>
               <div>Date: ${appointment.appointment_date}</div>
               <div>Status: <b>${appointment.status}</b></div>
               <h4>Thank you very much !</h4>`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

const appointmentService = {
    create,
    getAppointmentById,
    editAppointment,
    editAppointmentStatusAndSendEmail
}
module.exports = appointmentService