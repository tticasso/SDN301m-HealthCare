import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingSlot from "../components/BookingSlot";
import Header from "../components/Header";

export default function BookingAppointment() {
    const { id } = useParams(); // Lấy id từ URL params
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [doctorSchedule, setDoctorSchedule] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [patientInfo, setPatientInfo] = useState(null);

    useEffect(() => {
        // Fetch thông tin bác sĩ dựa trên id
        const fetchDoctorInfo = async () => {
            try {
                const response = await fetch(`http://localhost:9999/doctor/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch doctor info');
                }
                const data = await response.json();
                setDoctorInfo(data); // Cập nhật state với thông tin bác sĩ
                console.log("doctorInf: ", doctorInfo);
            } catch (error) {
                console.error('Error fetching doctor info:', error);
            }
        };

        fetchDoctorInfo();
    }, [id]);

    useEffect(() => {
        // Fetch patient's information based on id from localStorage
        const fetchPatientInfo = async () => {
            try {
                const patientId = localStorage.getItem('userId'); 
                if (!patientId) {
                    throw new Error('Patient id not found in localStorage');
                }
                const response = await fetch(`http://localhost:9999/user/${patientId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch patient info');
                }
                const data = await response.json();
                setPatientInfo(data); // Set patientInfo state with fetched data
            } catch (error) {
                console.error('Error fetching patient info:', error);
            }
        };

        fetchPatientInfo();

        // Fetch lịch khám của bác sĩ dựa trên id
        const fetchDoctorSchedule = async () => {
            try {
                const response = await fetch(`http://localhost:9999/doctor/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch doctor schedule');
                }
                const data = await response.json();
                const scheduleIds = data.docProfile.schedule;
                const schedules = await Promise.all(scheduleIds.map(async (scheduleId) => {
                    const scheduleResponse = await fetch(`http://localhost:9999/doctor/schedule/${scheduleId}`);
                    if (!scheduleResponse.ok) {
                        throw new Error(`Failed to fetch schedule ${scheduleId}`);
                    }
                    const scheduleData = await scheduleResponse.json();
                    return scheduleData;
                }));

                setDoctorSchedule(schedules); // Update state with fetched schedules
            } catch (error) {
                console.error('Error fetching doctor schedule:', error);
            }
        };
        
        fetchDoctorSchedule();
    }, [id]);

    const handleSlotSelection = (date, slot) => {
        setSelectedDate(date);
        setSelectedSlot(slot);
        console.log(date, slot);
    };
    console.log(selectedDate, selectedSlot);
    const handleBooking = async () => {
        try {
            if (!selectedDate || !selectedSlot) {
                throw new Error('Vui lòng chọn ngày và giờ');
            }
    
            const patientId = localStorage.getItem('userId');
            if (!patientId) {
                throw new Error('Không tìm thấy mã bệnh nhân trong localStorage');
            }
    
            const note = document.querySelector('textarea').value; // Lấy giá trị của ghi chú từ textarea
    
            const appointmentData = {
                patient_id: patientId,
                doctor_id: id,
                appointment_date: selectedDate,
                appointment_time: selectedSlot,
                note: note // Thêm trường note vào dữ liệu đặt lịch
            };

    
            const response = await fetch('http://localhost:9999/appointment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to book appointment');
            }
    
            alert(`Đặt lịch thành công cho ngày ${selectedDate} vào lúc ${selectedSlot}`);
    
            // Có thể thực hiện các hành động tiếp theo sau khi đặt lịch thành công, ví dụ như làm sạch state hoặc điều hướng đến trang khác.
            window.location.href = "/menu"
        } catch (error) {
            console.error('Lỗi khi đặt lịch:', error);
            alert('Đã xảy ra lỗi khi đặt lịch. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="w-screen h-screen bg-[#F1F5F9]">
            <Header />
            <div className="w-full flex justify-center">
                <div className="w-4/5 flex gap-[30px] mt-[20px]">
                    <div className="w-3/5">
                        <BookingSlot dates={doctorSchedule} onSlotSelect={handleSlotSelection} />
                        <div className="border bg-white rounded-md shadow-md p-4 w-full max-w-4xl mt-[20px]">
                            <p className="text-xl font-bold mb-4">Hồ sơ bệnh nhân</p>
                            <div className="w-full px-[30px] flex justify-between my-[10px]">
                                <p>Mã bệnh nhân</p>
                                <p>{patientInfo?._id}</p>
                            </div>
                            <div className="w-full h-[1px] bg-slate-200 px-[30px]"></div>
                            <div className="w-full px-[30px] flex justify-between my-[10px]">
                                <p>Họ và tên</p>
                                <p>{patientInfo?.fullname}</p>
                            </div>
                            <div className="w-full h-[1px] bg-slate-200 px-[30px]"></div>
                            <div className="w-full px-[30px] flex justify-between my-[10px]">
                                <p>Giới tính</p>
                                <p>{patientInfo?.gender}</p>
                            </div>
                            <div className="w-full h-[1px] bg-slate-200 px-[30px]"></div>
                            <div className="w-full px-[30px] flex justify-between my-[10px]">
                                <p>Ngày sinh</p>
                                <p>{patientInfo?.dob}</p>
                            </div>
                            <div className="w-full h-[1px] bg-slate-200 px-[30px]"></div>
                            <div className="w-full px-[30px] flex justify-between my-[10px]">
                                <p>Số điện thoại</p>
                                <p>{patientInfo?.phone}</p>
                            </div>
                            <div className="w-full px-[30px]">
                                <p className="text-[20px] font-semibold">Ghi chú</p>
                                <textarea className="w-full border rounded-md p-2 mt-1" />
                            </div>
                        </div>
                    </div>
                    <div className="w-2/5">
                        <div className="w-full border rounded-md shadow-md p-4 bg-white">
                            <h2 className="text-xl font-bold mb-4">Thông tin đặt khám</h2>
                            <div className="w-full h-[1px] bg-slate-500"></div>
                            <div className="w-full flex px-[20px] gap-[20px] my-[20px]">
                                <div className="bg-slate-500 w-[50px] h-[50px] rounded-[40px]">
                                    <img src={doctorInfo?.doctor.image} alt="doctor" className="rounded-full" />
                                </div>
                                <div className="">
                                    <p className="italic text-[18px]">{doctorInfo?.doctor.fullname}</p>
                                    <p className="italic font-thin text-[14px]">{doctorInfo?.doctor.address}</p>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-slate-500"></div>
                            <div className="w-full flex my-[20px]">
                                <div className="w-1/2">
                                    <p className="text-[14px] text-slate-500">Ngày khám</p>
                                    <p className="text-[18px]">{selectedDate}</p>
                                </div>
                                <div className="w-1/2">
                                    <p className="text-[14px] text-slate-500">Giờ khám</p>
                                    <p className="text-[18px]">{selectedSlot}</p>
                                </div>
                            </div>
                            <button className="bg-slate-500 text-white py-2 px-4 rounded-md mt-[20px] w-full hover:bg-slate-600" onClick={handleBooking}>Đặt lịch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
