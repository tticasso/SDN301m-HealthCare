import BookingSlot from "../components/BookingSlot";
import Header from "../components/Header";

export default function BookingAppointment() {
    const dates = [
        {
            day: 'Th 6, 31-05',
            slots: ['17:30-17:45', '17:45-18:00', '18:00-18:15', '18:15-18:30', '18:30-18:45', '18:45-19:00']
        },
        {
            day: 'Th 2, 03-06',
            slots: ['08:00-08:15', '08:15-08:30', '08:30-08:45', '08:45-09:00', '09:00-09:15', '09:15-09:30']
        },
        {
            day: 'Th 4, 05-06',
            slots: ['10:00-10:15', '10:15-10:30', '10:30-10:45', '10:45-11:00', '11:00-11:15', '11:15-11:30']
        },
        {
            day: 'Th 6, 07-06',
            slots: ['14:00-14:15', '14:15-14:30', '14:30-14:45', '14:45-15:00', '15:00-15:15', '15:15-15:30']
        },
        {
            day: 'Th 2, 10-06',
            slots: ['16:00-16:15', '16:15-16:30', '16:30-16:45', '16:45-17:00', '17:00-17:15', '17:15-17:30']
        },
        {
            day: 'Th 4, 12-06',
            slots: ['18:00-18:15', '18:15-18:30', '18:30-18:45', '18:45-19:00', '19:00-19:15', '19:15-19:30']
        },

    ];
    return (
        <div className="w-screen h-screen bg-[#F1F5F9]">
            <Header />
            <div className="w-full flex justify-center">
                <div className="w-4/5 flex gap-[30px] mt-[20px]">
                    <div className="w-3/5">
                        <BookingSlot dates={dates} />
                        <div className="border bg-white rounded-md shadow-md p-4 w-full max-w-4xl mt-[20px]">
                            <p className="text-xl font-bold mb-4">Hồ sơ bệnh nhân</p>
                            <div className="w-full px-[30px] flex justify-between my-[10px]">
                                <p>Mã bệnh nhân</p>
                                <p>BN123456</p>
                            </div>
                            <div className="w-full h-[1px] bg-slate-200 px-[30px]"></div>
                            <div className="w-full px-[30px] flex justify-between my-[10px]">
                                <p>Họ và tên</p>
                                <p>Nguyễn Văn B</p>
                            </div>
                            <div className="w-full h-[1px] bg-slate-200 px-[30px]"></div>
                            <div className="w-full px-[30px] flex justify-between my-[10px]">
                                <p>Giới tính</p>
                                <p>Nam</p>
                            </div>
                            <div className="w-full h-[1px] bg-slate-200 px-[30px]"></div>
                            <div className="w-full px-[30px] flex justify-between my-[10px]">
                                <p>Ngày sinh</p>
                                <p>31/07/2003</p>
                            </div>
                            <div className="w-full h-[1px] bg-slate-200 px-[30px]"></div>
                            <div className="w-full px-[30px] flex justify-between my-[10px]">
                                <p>Số điện thoại</p>
                                <p>0966768150</p>
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
                                    <img src="https://via.placeholder.com/150" alt="doctor" className="rounded-full" />
                                </div>
                                <div className="">
                                    <p className="italic text-[18px]">Nguyễn Văn A</p>
                                    <p className="italic font-thin text-[14px]">53 Phạm Hữu Chí, Ba Đình, Hà Nội</p>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-slate-500"></div>
                            <div className="w-full flex my-[20px]">
                                <div className="w-1/2">
                                    <p className="text-[14px] text-slate-500">Ngày khám</p>
                                    <p className="text-[18px]">Th 6, 31-05</p>
                                </div>
                                <div className="w-1/2">
                                    <p className="text-[14px] text-slate-500">Giờ khám</p>
                                    <p className="text-[18px]">17:30-17:45</p>
                                </div>
                                <div className="w-1/2">
                                    <p className="text-[14px] text-slate-500">Bệnh nhân</p>
                                    <p className="text-[18px]">Nguyễn Văn B</p>
                                </div>
                            </div>
                            <button className="w-full bg-[#3499AF] text-white rounded-md py-2">Đặt lịch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}