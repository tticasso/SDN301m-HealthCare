import React from 'react';

const HospitalCard = ({hospital}) => {
    return (
        <div className="h-[300px] rounded-lg overflow-hidden shadow-lg border-[2px]">
            <div className="relative bg-blue-400 text-white text-center h-[132px]">
                <img src="https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/Benh_vien_da_khoa_khu_vuc_hoc_mon_1_e9d6e8ef65.jpg" alt="doctor" className="w-full h-full object-fit" />
                <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 translate-y-1/2 w-[100px] h-[100px] bg-white rounded-full">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1mYZy6YWLfqZBgDVnOikeiMl0kYM4jZsqZw&s" alt="doctor" className="w-full h-full object-fit rounded-[100px]" />
                </div>
            </div>
            <div className="bg-white pt-8 pb-4 px-5 text-left mt-[20px]">
                <p className="text-[14px] font-extrabold italic">Bệnh viện Ung Bướu TP HCM</p>
                <p className="text-gray-600 text-[12px] italic mt-[10px]">
                    47 Nguyễn Huy Lượng, P. 14,<br />
                    Q. Bình Thạnh, TP. HCM
                </p>
                <p className="text-gray-600 text-[12px] italic mt-[5px]">
                    Thứ 2 - thứ 6: 7h30 - 16h30<br />
                    Thứ 7 - CN: 7h30 - 11h30
                </p>
            </div>
        </div>
    );
};

export default HospitalCard;
