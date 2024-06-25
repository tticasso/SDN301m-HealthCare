import Header from "../components/Header";
import { UilHeart, UilUser } from '@iconscout/react-unicons'
export default function DoctorDetail() {
    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-full h-full flex justify-center bg-[#F1F5F9]">
                <div className="w-2/3 my-[10px]">
                    <p className="font-medium italic text-[20px] py-[20px]">Trang chủ / Bác Sĩ</p>
                    <div className="w-full bg-white rounded-[10px] py-[30px] px-[20px]">
                        <div className="w-full flex justify-between ">
                            <div className=" flex">
                                <div className="w-[150px] h-[150px] flex justify-center items-center rounded-[150px] bg-[#DBF2F8]">
                                    <UilUser size={100} color="#000000" />
                                </div>
                                <div className="h-[150px] pl-[10px]">
                                    <div className="flex">
                                        <p className="text-[24px] font-semibold">Tiến sĩ Bác sĩ</p>
                                        <p className="ml-[5px] text-[24px] font-semibold">Nguyễn Văn A</p>
                                    </div>
                                    <div className="flex items-center gap-[10px]">
                                        <div className="flex items-center h-[25px]">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.6 22.5L6.7 19.3L3.1 18.5L3.45 14.8L1 12L3.45 9.2L3.1 5.5L6.7 4.7L8.6 1.5L12 2.95L15.4 1.5L17.3 4.7L20.9 5.5L20.55 9.2L23 12L20.55 14.8L20.9 18.5L17.3 19.3L15.4 22.5L12 21.05L8.6 22.5ZM10.95 15.55L16.6 9.9L15.2 8.45L10.95 12.7L8.8 10.6L7.4 12L10.95 15.55Z" fill="#1975DC" />
                                            </svg>
                                            <p className="ml-[5px] text-[20px] font-semibold text-[#1975DC]">Bác sĩ</p>
                                        </div>
                                        <div className="flex items-baseline gap-[5px]">
                                            <p className="text-[20px] font-semibold">24</p>
                                            <p className="text-[20px] font-extralight">năm kinh nghiệm</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <p className="font-light text-[16]">Chuyên Khoa</p>
                                            <p className="font-light text-[16]">Chức vụ</p>
                                            <p className="font-light text-[16]">Nơi công tác</p>
                                        </div>
                                        <div className="pl-[10px]">
                                            <p className="font-semibold text-[#1975DC] text-[16]">Nội tiết</p>
                                            <p className="font-medium text-[16]">Trưởng khoa Nội tiết bệnh viện ABC</p>
                                            <p className="font-medium text-[16]">Bệnh viện ABC</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <button className="flex bg-white border-[1px] border-[#B7B7B7] px-[5px] rounded-[20px]">
                                    <p className="text-[#B7B7B7] font-light text-[12]">Yêu thích </p>
                                    <UilHeart size={24} color="#B7B7B7" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-[20px] px-[30px]">
                            <p className="text-[20px] font-semibold">Giới thiệu</p>
                            <p className="font-light text-[16] mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mi velit, fringilla sit amet nibh quis, pellentesque feugiat urna. Donec ut dolor nunc. Sed posuere orci velit, quis accumsan tellus ultrices ut. Sed sodales blandit mi in pellentesque. Curabitur nec nulla neque. Morbi a fermentum enim. Donec tincidunt, sem sollicitudin bibendum consequat, neque arcu hendrerit sem, et rhoncus ex justo in sapien.</p>
                            <p className="font-light text-[16] mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mi velit, fringilla sit amet nibh quis, pellentesque feugiat urna. Donec ut dolor nunc. Sed posuere orci velit, quis accumsan tellus ultrices ut. Sed sodales blandit mi in pellentesque. Curabitur nec nulla neque. Morbi a fermentum enim. Donec tincidunt, sem sollicitudin bibendum consequat, neque arcu hendrerit sem, et rhoncus ex justo in sapien.</p>
                            <p className="font-light text-[16] mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mi velit, fringilla sit amet nibh quis, pellentesque feugiat urna. Donec ut dolor nunc. Sed posuere orci velit, quis accumsan tellus ultrices ut. Sed sodales blandit mi in pellentesque. Curabitur nec nulla neque. Morbi a fermentum enim. Donec tincidunt, sem sollicitudin bibendum consequat, neque arcu hendrerit sem, et rhoncus ex justo in sapien.</p>
                        </div>
                        <div className="w-full flex justify-center mt-[30px]">
                            <a href="/booking" className="w-full flex justify-center">
                                <button className="w-2/3 bg-[#3499AF] text-white rounded-[10px] py-[10px] mt-[20px] text-[24px] font-bold italic">Đặt lịch hẹn</button>
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}