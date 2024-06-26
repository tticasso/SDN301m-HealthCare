import Header from "../components/Header";
import { UilHeart, UilUser, UilGlobe, UilLocationPinAlt, UilPhone } from '@iconscout/react-unicons'
export default function HospitalDetail() {
    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-full h-full flex justify-center bg-[#F1F5F9]">
                <div className="w-2/3 my-[10px]">
                    <p className="font-medium italic text-[20px] py-[20px]">Trang chủ / Bệnh viện</p>
                    <div className="w-full bg-white rounded-[10px] py-[30px] px-[20px]">
                        <div className="w-full flex justify-between ">
                            <div className=" flex">
                                <img className="w-[150px] h-[150px] rounded-[150px]" src="https://cdn.thuvienphapluat.vn/uploads/Hoidapphapluat/2023/DKV/thang8/benh-vien.jpg" alt="logo" />
                                <div className="h-[150px] pl-[10px]">
                                    <p className="text-[24px] font-semibold">Bệnh viện Bạch Mai</p>
                                    <p className="text-[16px] font-light">Hãy nói theo cách của bạn</p>
                                    <div className="flex gap-5 mt-[10px]">
                                        <div className="flex p-[5px] gap-[5px] border rounded-full">
                                            <UilGlobe size={24} color="#000000" />
                                            <p>abcd.com.vn</p>
                                        </div>
                                        <div className="flex p-[5px] gap-[5px] border rounded-full">
                                            <UilLocationPinAlt size={24} color="#000000" />
                                            <p>Ha Noi, Viet Nam</p>
                                        </div>
                                        <div className="flex p-[5px] gap-[5px] border rounded-full">
                                            <UilPhone size={24} color="#000000" />
                                            <p>0966768150</p>
                                        </div>
                                    </div>
                                    <p className="text-[16px] font-semibold">Giờ làm việc:</p>
                                    <p>6:00 - 17:00</p>
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
                    </div>
                </div>
            </div>
        </div>
    );
}