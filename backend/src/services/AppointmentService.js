const Appointment = require("../models/AppointmentModels");
const nodemailer = require('nodemailer');
const User = require("../models/UserModel");
const dayjs = require('dayjs')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'healthcaresystem31@gmail.com',
        pass: 'wmcd pufy wvlu xqkh'
        
    }
});
async function sendEmailBookingNew(appointment) {
    try {
        const patient = await User.findById(appointment.patient_id);
        const doctor = await User.findById(appointment.doctor_id);

        if (!patient) {
            throw new Error('Patient not found');
        }

        const mailOptions = {
            from: 'healthcaresystem31@gmail.com',
            to: patient.email,
            subject: 'Lịch khám mới đã được tạo',
            html: `<h3>Cảm ơn bạn đã đặt lịch khám tại hệ thống Health Care</h3>
                   <h4>Thông tin đặt khám:</h4>
                   <div>Tên bệnh nhân và email: ${patient.fullname} (${patient.email})</div>
                   <div>Tên bác sĩ và email: ${doctor.fullname} (${doctor.email})</div>
                   <div>Thời gian: ${appointment.appointment_time}</div>
                   <div>Ngày khám: ${appointment.appointment_date}</div>
                   <div>Trạng thái: <b>Chờ xác nhận</b></div>
                   <h4>Health Care sẽ tự động gửi thông báo qua email khi cuộc hẹn được xác nhận hoàn tất. Cảm ơn!</h4>`
        };
        const mailOptions2 = {
            from: 'healthcaresystem31@gmail.com',
            to: doctor.email,
            subject: 'Lịch khám mới đã được tạo',
            html: `<h3>Bạn có lịch khám mới tại Health Care</h3>
                   <h4>Thông tin đặt khám:</h4>
                   <div>Tên bệnh nhân và email:: ${patient.fullname} (${patient.email})</div>
                   <div>Tên bác sĩ và email: ${doctor.fullname} (${doctor.email})</div>
                   <div>Thời gian: ${appointment.appointment_time}</div>
                   <div>Ngày khám: ${appointment.appointment_date}</div>
                   <div>Trạng thái: <b>Chờ xác nhận</b></div>
                   <h4>Kiểm tra lịch khám của bạn để xác nhận. Cảm ơn!</h4>`
        };

        await transporter.sendMail(mailOptions);
        await transporter.sendMail(mailOptions2);

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
async function create({ patient_id, doctor_id, appointment_date, appointment_time, status = 'Pending' }) {
    const appointment = new Appointment({
        patient_id, doctor_id, appointment_date, appointment_time, status
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
        const appointment = await Appointment.find({}).populate('patient_id').populate('doctor_id')
        const newAppointment = appointment?.map(a => {
            return {
                _id: a.id,
                patient_id: a.patient_id?.map(p => [p._id, p.fullname, p.email]),
                doctor_id: a.doctor_id?.map(d => [d._id, d.fullname, d.email]),
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
    try {
        const patient = await User.findById(appointment.patient_id);
        const doctor = await User.findById(appointment.doctor_id);
        if (!patient) {
            throw new Error('Patient not found');
        }

        const mailOptions = {
            from: 'healthcaresystem31@gmail.com',
            to: patient.email,
            subject: 'Thông báo về trạng thái đặt khám tại HealthCare',
            html: `<h3>Bác sĩ đã xác nhận phiếu khám của bạn! Cảm ơn bạn đã đặt khám tại hệ thống HealthCare</h3>
                   <h4>Thông tin đặt khám:</h4>
                   <div>Tên bệnh nhân và email: ${patient.fullname} (${patient.email})</div>
                   <div>Tên bác sĩ và email: ${doctor.fullname} (${doctor.email})</div>
                   <div>Thời gian: ${appointment.appointment_time}</div>
                   <div>Ngày khám: ${appointment.appointment_date}</div>
                   <div>Trạng thái: <b>Đã xác nhận</b></div>
                   <h4>Xin chân thành cảm ơn!</h4>`
        };
        const mailOptions2 = {
            from: 'healthcaresystem31@gmail.com',
            to: doctor.email,
            subject: 'Thông báo về trạng thái đặt khám tại HealthCare',
            html: `<h3>Phiếu khám đã được xác nhận:</h3>
                   <h4>Thông tin đặt khám:</h4>
                   <div>Tên bệnh nhân và email: ${patient.fullname} (${patient.email})</div>
                   <div>Tên bác sĩ và email: ${doctor.fullname} (${doctor.email})</div>
                   <div>Time: ${appointment.appointment_time}</div>
                   <div>Date: ${appointment.appointment_date}</div>
                   <div>Trạng thái: <b>Đã xác nhận</b></div>
                   <h4>Thank you very much!</h4>`
        };

        await transporter.sendMail(mailOptions);
        await transporter.sendMail(mailOptions2);

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


function generateAppointmentTimes() {
    const times = [];
    const startHour = 7;
    const endHour = 16;
    const startMinute = 30; // Start at 30 minutes past the hour
    const intervalMinutes = 30;

    for (let hour = startHour; hour <= endHour; hour++) {
        let startMinutes = (hour === startHour) ? startMinute : 0;

        for (let minutes = startMinutes; minutes < 60; minutes += intervalMinutes) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            times.push({
                time: timeString,
                available: true // Assume all times are initially available
            });
        }
    }
    return times;
}

function getAvailableTimeSlots() {
    const appointmentTimes = generateAppointmentTimes();
    const availableSlots = appointmentTimes.filter(slot => slot.available);
    return availableSlots.map(slot => slot.time);
}

const appointmentService = {
    create,
    getAppointmentById,
    editAppointment,
    editAppointmentStatusAndSendEmail,
    generateAppointmentTimes,
    getAvailableTimeSlots
}
module.exports = appointmentService