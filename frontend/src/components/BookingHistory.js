import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookingHistory() {
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        // Lấy userId từ localStorage
        const userId = localStorage.getItem('userId');
        console.log(userId);
        if (userId) {
            // Gọi API để lấy thông tin người dùng hiện tại
            axios.get(`http://localhost:9999/user/${userId}`)
                .then(response => {
                    setCurrentUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching current user:', error);
                });
            console.log("currentUser: ", currentUser);
            // Gọi API để lấy danh sách các cuộc hẹn
            axios.get('http://localhost:9999/appointment/list')
                .then(response => {
                    // Lọc ra các cuộc hẹn của người dùng hiện tại dựa trên patient_id
                    console.log(response.data);
                    const userAppointments = response.data.filter(appointment =>
                        !isDoctor
                            ? appointment.patient_id[0][0] == userId
                            : appointment.doctor_id[0][0] == userId
                    );
                    console.log("userAppointments: ", userAppointments);
                    setAppointments(userAppointments);
                })
                .catch(error => {
                    console.error('Error fetching appointments:', error);
                });
            axios.get('http://localhost:9999/specify')
                .then(response => {
                    setSpecialties(response.data);
                })
                .catch(error => {
                    console.error('Error fetching specialties:', error);
                });
        }
    }, []);

    const handleBookingClick = async (booking) => {
        setSelectedBookingId(booking._id);

        try {
            // Fetch doctor specialty asynchronously
            const specialtyName = await fetchDoctorSpecialty(booking.doctor_id[0][0]);

            // Update doctor's specialty name in the booking
            const updatedAppointments = appointments.map(appointment => {
                if (appointment._id === booking._id) {
                    return {
                        ...appointment,
                        doctor: {
                            ...appointment.doctor,
                            specify: [{ name: specialtyName }]
                        }
                    };
                }
                return appointment;
            });
            setAppointments(updatedAppointments);
        } catch (error) {
            console.error('Error fetching doctor specialty:', error);
        }
    };

    const fetchDoctorSpecialty = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:9999/doctor/${doctorId}`);
            const doctorData = response.data.docProfile;

            if (doctorData || doctorData.specify || doctorData.specify.length) {
                const specialtyId = doctorData.specify[0];
                const specialty = specialties.find(spec => spec._id == specialtyId);
                return specialty ? specialty.name : 'Unknown Specialty';
            } else {
                console.error('Doctor specialty data is not available or empty:', doctorData);
                return 'None';
            }
        } catch (error) {
            console.error('Error fetching doctor specialty:', error);
            return 'Có lỗi';
        }
    };

    const filteredBookings = appointments.filter(booking =>
        booking.doctor_id[0][1].toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.appointment_time.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleConfirmClick = async () => {
        if (selectedBookingId) {
            try {
                await axios.put(`http://localhost:9999/appointment/edit/confirm/${selectedBookingId}`);
                console.log('Confirmation sent successfully');
            } catch (error) {
                console.error('Error sending confirmation:', error);
            }
        }
        alert('Xác nhận thành công');
        window.location.reload();
    };

    const selectedBooking = appointments.find(booking => booking._id === selectedBookingId);
    const role = localStorage.getItem("role");
    const isDoctor = role === "DOCTOR";
    const isConfirmed = selectedBooking && selectedBooking.status === 'Success';
    return (
        <div className="w-full h-auto px-[10px] flex gap-[10px]">
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
            <div className="w-[1px] h-auto bg-slate-200"></div>
            <div className="w-3/5">
                {selectedBooking ? (
                    <div className="p-5 border rounded-lg">
                        <div className="flex items-center mb-4">
                            <img src={currentUser ? currentUser.image : ''} alt="User" className="rounded-full mr-4" />
                            <div>
                                <p className="text-lg font-semibold">{selectedBooking.doctor && selectedBooking.doctor.fullname}</p>
                                <p className="text-sm text-gray-500">{selectedBooking.doctor && selectedBooking.doctor.address}</p>
                                <p className="text-sm">{selectedBooking.doctor && selectedBooking.doctor.docProfile && selectedBooking.doctor.docProfile.level}</p>
                            </div>
                            <div className="ml-auto">
                                <p className="text-sm text-green-600 font-bold">{selectedBooking.status === 'Success' ? 'STT: 12' : ''}</p>
                                <p className="text-sm text-red-500">{selectedBooking.status === 'Pending' ? 'Chờ xác nhận' : ''}</p>
                            </div>
                            {isDoctor && !isConfirmed && (
                                <button
                                    onClick={handleConfirmClick}
                                    className="ml-[10px] w-[50px] lg:w-[100px] h-[35px] lg:h-[40px] bg-[#3499AF] rounded-[30px] font-bold text-[12px] lg:text-[20px] text-white mt-2 lg:mt-0"
                                >
                                    Xác nhận
                                </button>
                            )}
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-sm font-bold">Mã phiếu khám</p>
                                <p className="text-sm">{selectedBooking._id}</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Ngày khám</p>
                                <p className="text-sm">{selectedBooking.appointment_date}</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Chuyên khoa</p>
                                <p className="text-sm">{selectedBooking.doctor && selectedBooking.doctor.specify ? selectedBooking.doctor.specify[0].name : ''}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Thông tin bệnh nhân</p>
                            <p className="text-sm">Mã bệnh nhân: {selectedBooking.patient_id[0][0]}</p>
                            <p className="text-sm">Họ và tên: {selectedBooking.patient_id[0][1]}</p>
                            <p className="text-sm">Năm sinh: {currentUser?.dob}</p>
                            <p className="text-sm">Số điện thoại: {currentUser?.phone}</p>
                            <p className="text-sm">Giới tính: {currentUser?.gender}</p>
                            <p className="text-sm">Địa chỉ: {currentUser?.address}</p>
                        </div>
                    </div>
                ) : (
                    <p>Chọn một lịch hẹn để xem chi tiết</p>
                )}
            </div>
        </div>
    );
}