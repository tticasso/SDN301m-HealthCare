import { useState } from 'react';

export default function BookingHistory() {
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const bookings = [
        {
            id: 1,
            doctorName: "Lâm Việt Trung",
            address: "53 Phạm Hữu Chí, P.12, Q.5, TP.HCM",
            time: "17:00-18:00 31/05/2024",
            status: "Confirmed",
            bookingCode: "YMA2405272003",
            bookingDate: "03/06/2024",
            department: "Tiêu hoá",
            patientCode: "YMP241814344",
            patientName: "Vũ Đức Trung",
            birthDate: "23/09/2003",
            phone: "0965086899",
            gender: "Nam",
            address: "Chưa cập nhật",
        },
        {
            id: 2,
            doctorName: "Doctor B",
            address: "Address B",
            time: "18:00-19:00 01/06/2024",
            status: "Pending",
            bookingCode: "YMA2405272004",
            bookingDate: "01/06/2024",
            department: "Tim mạch",
            patientCode: "YMP241814345",
            patientName: "Nguyễn Văn A",
            birthDate: "01/01/2000",
            phone: "0912345678",
            gender: "Nam",
            address: "Chưa cập nhật",
        }
    ];

    const handleBookingClick = (booking) => {
        setSelectedBookingId(booking.id);
    };

    const filteredBookings = bookings.filter(booking =>
        booking.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.time.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedBooking = bookings.find(booking => booking.id === selectedBookingId);

    return (
        <div className="w-full h-auto px-[10px] flex gap-[10px]">
            <div className="w-1/5">
                <input
                    type="text"
                    placeholder="Nhập mã đặt lịch"
                    className="w-4/5 h-10 border border-gray-300 rounded-md p-2 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="w-full mt-[10px]">
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className={`border border-[2px] p-[5px] pl-[20px] rounded-[10px] mb-[10px] cursor-pointer ${selectedBookingId === booking.id ? 'bg-blue-100' : ''}`}
                            onClick={() => handleBookingClick(booking)}
                        >
                            <p className="text-[16px] font-bold ">{booking.doctorName}</p>
                            <p className="text-[13px] mt-[5px] ">{booking.time}</p>
                            <p className="bg-[#F0FDF4] mt-[5px] w-[100px] h-[20px] flex items-center justify-center rounded-[10px] text-[#2FCAAB] font-bold text-[12px]">{booking.status}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-[1px] h-auto bg-slate-200"></div>
            <div className="w-3/5">
                {selectedBooking ? (
                    <div className="p-5 border rounded-lg">
                        <div className="flex items-center mb-4">
                            <img src="https://via.placeholder.com/50" alt="Doctor" className="rounded-full mr-4" />
                            <div>
                                <p className="text-lg font-semibold">{selectedBooking.doctorName}</p>
                                <p className="text-sm text-gray-500">{selectedBooking.address}</p>
                            </div>
                            <div className="ml-auto">
                                <p className="text-sm text-green-600 font-bold">STT: 12</p>
                                <p className="text-sm text-red-500">Đã hủy</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-sm font-bold">Mã phiếu khám</p>
                                <p className="text-sm">{selectedBooking.bookingCode}</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Ngày khám</p>
                                <p className="text-sm">{selectedBooking.bookingDate}</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Chuyên khoa</p>
                                <p className="text-sm">{selectedBooking.department}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Thông tin bệnh nhân</p>
                            <p className="text-sm">Mã bệnh nhân: {selectedBooking.patientCode}</p>
                            <p className="text-sm">Họ và tên: {selectedBooking.patientName}</p>
                            <p className="text-sm">Năm sinh: {selectedBooking.birthDate}</p>
                            <p className="text-sm">Số điện thoại: {selectedBooking.phone}</p>
                            <p className="text-sm">Giới tính: {selectedBooking.gender}</p>
                            <p className="text-sm">Địa chỉ: {selectedBooking.address}</p>
                        </div>
                    </div>
                ) : (
                    <p>Chọn một lịch hẹn để xem chi tiết</p>
                )}
            </div>
        </div>
    );
}
