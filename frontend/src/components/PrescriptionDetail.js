import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PrescriptionDetail() {
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [patientInfo, setPatientInfo] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
    const userRole = localStorage.getItem("role");

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            // Fetch current user information
            axios.get(`http://localhost:9999/user/${userId}`)
                .then(response => {
                    setCurrentUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching current user:', error);
                });
    
            // Fetch appointments for the current user
            axios.get('http://localhost:9999/appointment/list')
                .then(response => {
                    setAppointments(response.data);
                })
                .catch(error => {
                    console.error('Error fetching appointments:', error);
                });
    
            // Fetch specialties
            axios.get('http://localhost:9999/specify')
                .then(response => {
                    setSpecialties(response.data);
                })
                .catch(error => {
                    console.error('Error fetching specialties:', error);
                });
    
            // Determine user role and fetch prescriptions accordingly
            if (userRole === "DOCTOR") {
                // Fetch prescriptions for the doctor
                axios.get(`http://localhost:9999/prescription/doctor/${userId}`)
                    .then(response => {
                        setPrescriptions(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching doctor prescriptions:', error);
                    });
            } else {
                // Fetch prescriptions for the current user (assuming patient)
                axios.get(`http://localhost:9999/prescription/patient/${userId}`)
                    .then(response => {
                        setPrescriptions(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching prescriptions:', error);
                    });
            }
        }
    }, [userRole]);

    const handleBookingClick = async (booking) => {
        setSelectedBookingId(booking._id);

        try {
            // Fetch doctor's specialties asynchronously
            const specialtiesList = await fetchDoctorSpecialties(booking.doctor_id[0][0]);

            // Update doctor's specialties in the booking
            const updatedAppointments = appointments.map(appointment => {
                if (appointment._id === booking._id) {
                    return {
                        ...appointment,
                        doctor: {
                            ...appointment.doctor,
                            specify: specialtiesList.map(name => ({ name }))
                        }
                    };
                }
                return appointment;
            });
            setAppointments(updatedAppointments);

            // Filter and update prescriptions based on the selected appointment
            const filteredPrescriptions = prescriptions.filter(prescription =>
                prescription.appointment === booking._id
            );
            setFilteredPrescriptions(filteredPrescriptions);
            console.log("filteredPrescriptions:", filteredPrescriptions);

            // Fetch patient information for the selected booking
            const patientId = booking.patient_id[0][0];
            const patientResponse = await axios.get(`http://localhost:9999/user/${patientId}`);
            setPatientInfo(patientResponse.data);
        } catch (error) {
            console.error('Error handling booking click:', error);
        }
    };

    const fetchDoctorSpecialties = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:9999/doctor/${doctorId}`);
            const doctorData = response.data.docProfile;

            if (doctorData && doctorData.specify && doctorData.specify.length) {
                const specialtiesList = doctorData.specify.map(specId => {
                    const specialty = specialties.find(spec => spec._id === specId);
                    return specialty ? specialty.name : 'Unknown Specialty';
                });
                return specialtiesList;
            } else {
                console.error('Doctor specialty data is not available or empty:', doctorData);
                return ['None'];
            }
        } catch (error) {
            console.error('Error fetching doctor specialties:', error);
            return ['Có lỗi'];
        }
    };

    const filteredBookings = appointments.filter(booking =>
        booking.doctor_id[0][1].toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.appointment_time.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedBooking = appointments.find(booking => booking._id === selectedBookingId);
    const isDoctor = userRole === "DOCTOR";

    return (
        <div className="w-full h-auto px-[10px] flex gap-[10px]">
            {/* Left panel for displaying bookings */}
            <div className="w-1/5">
                <input
                    type="text"
                    placeholder="Nhập tên bác sĩ"
                    className="w-4/5 h-10 border border-gray-300 rounded-md p-2 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="w-full mt-[10px]">
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking._id}
                            className={`border border-[2px] p-[5px] pl-[20px] rounded-[10px] mb-[10px] cursor-pointer ${selectedBookingId === booking._id ? 'bg-blue-100' : ''}`}
                            onClick={() => handleBookingClick(booking)}
                        >
                            {!isDoctor && (
                                <p className="text-[16px] font-bold ">{booking.doctor_id[0][1]}</p>
                            )}
                            {isDoctor && (
                                <p className="text-[16px] font-bold ">{booking.patient_id[0][1]}</p>
                            )}
                            <p className="text-[13px] mt-[5px] ">{booking.appointment_time}</p>
                            <p className={`mt-[5px] w-[100px] h-[20px] flex items-center justify-center rounded-[10px] font-bold text-[12px] ${booking.status === 'Pending' ? 'bg-gray-400 text-gray-900' : 'bg-[#F0FDF4] text-[#2FCAAB]'
                                }`}>
                                {booking.status}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Divider */}
            <div className="w-[1px] h-auto bg-slate-200"></div>
            {/* Right panel for displaying selected booking details */}
            <div className="w-3/5">
                {selectedBooking ? (
                    <div className="p-5 border rounded-lg">
                        {/* Display current user's information */}
                        <div className="flex items-center mb-4">
                            <div>
                                <p className="text-lg font-semibold">{currentUser ? currentUser.fullname : ''}</p>
                                <p className="text-sm text-gray-500">{currentUser ? currentUser.address : ''}</p>
                            </div>
                        </div>
                        {/* Display selected booking details */}
                        <div className="flex items-center mb-4">
                            <div>
                                <p className="text-lg font-semibold">Bác sĩ: {selectedBooking.doctor_id[0][1]}</p>
                                {/* <p className="text-sm text-gray-500">địa chỉ{selectedBooking && selectedBooking.doctor && selectedBooking.doctor.address}</p> */}
                            </div>
                        </div>
                        {/* Additional details */}
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-sm font-bold">Mã phiếu khám</p>
                                <p className="text-sm">{selectedBooking._id.toUpperCase()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Ngày khám</p>
                                <p className="text-sm">{selectedBooking.appointment_date}</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Chuyên khoa</p>
                                {selectedBooking && selectedBooking.doctor && selectedBooking.doctor.specify ? (
                                    selectedBooking.doctor.specify.map((spec, index) => (
                                        <p key={index} className="text-sm">{spec.name}</p>
                                    ))
                                ) : (
                                    <p className="text-sm">Không tìm thấy chuyên ngành</p>
                                )}
                            </div>
                        </div>
                        {/* Patient information */}
                        {isDoctor && patientInfo && (
                            <div>
                                <p className="text-sm font-bold">Thông tin bệnh nhân</p>
                                <p className="text-sm">Mã bệnh nhân: {patientInfo._id.toUpperCase()}</p>
                                <p className="text-sm">Họ và tên: {patientInfo.fullname}</p>
                                {/* Display additional patient details if available */}
                                <p className="text-sm">Địa chỉ: {patientInfo.address}</p>
                                <p className="text-sm">Số điện thoại: {patientInfo.phone}</p>
                                <p className="text-sm">Giới tính: {patientInfo.gender}</p>
                                <p className="text-sm">Địa chỉ: {patientInfo.address}</p>
                                {/* Add more patient details here */}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-500">Chọn một cuộc hẹn để xem chi tiết.</p>
                )}
                {/* Right panel for displaying filtered prescriptions */}
                <div className="w-3/5">
                    {filteredPrescriptions.length > 0 ? (
                        filteredPrescriptions.map((prescription) => (
                            <div key={prescription._id} className="p-5 border rounded-lg mb-4">
                                <p className='text-lg font-bold'>Thông tin đơn thuốc</p>
                                <p className="text-lg">Loại thuốc: {prescription.medication_details}</p>
                                <p className="text-lg">Liều lượng: {prescription.dosage}</p>
                                <p className="text-lg">Ghi chú: {prescription.duration}</p>
                                <p className="text-lg">Ngày kê đơn: {prescription.issue_date}</p>
                                {/* Display additional prescription details if available */}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Không có đơn thuốc nào cho cuộc hẹn này.</p>
                    )}
                </div>
            </div>

        </div>

    );
}
