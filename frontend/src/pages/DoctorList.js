import Header from "../components/Header";
import { UilSearchAlt } from '@iconscout/react-unicons'
import React, { useState } from 'react';
import DoctorListCard from "../components/DoctorListCard";

export default function DoctorList() {
    const specialties = [
        "Tất cả",
        "Nhi khoa",
        "Sản phụ khoa",
        "Da liễu",
        "Tiêu hoá",
        "Cơ xương khớp",
        "Dị ứng - miễn dịch",
        "Gây mê hồi sức",
        "Tai - mũi - họng",
        "Ung bướu",
    ];
    const doctors = [
        {
            image: 'https://via.placeholder.com/100', // Thay bằng đường dẫn ảnh thật
            name: 'TS. BS Đào Bùi Quý Quyền',
            specialties: ['Nội thận', 'Ngoại tiết niệu'],
            address: '242 Nguyễn Chí Thanh, Phường 2, Quận 10, Hồ Chí Minh',
        },
        {
            image: 'https://via.placeholder.com/100', // Thay bằng đường dẫn ảnh thật
            name: 'TS. BS Nguyễn Văn A',
            specialties: ['Tim mạch', 'Hô hấp'],
            address: '123 Trần Hưng Đạo, Quận 1, Hồ Chí Minh',
        },
        {
            image: 'https://via.placeholder.com/100', // Thay bằng đường dẫn ảnh thật
            name: 'TS. BS Lê Thị B',
            specialties: ['Nhi khoa'],
            address: '456 Nguyễn Tri Phương, Quận 10, Hồ Chí Minh',
        },
        {
            image: 'https://via.placeholder.com/100', // Thay bằng đường dẫn ảnh thật
            name: 'TS. BS Lê Thị B',
            specialties: ['Nhi khoa'],
            address: '456 Nguyễn Tri Phương, Quận 10, Hồ Chí Minh',
        },
        {
            image: 'https://via.placeholder.com/100', // Thay bằng đường dẫn ảnh thật
            name: 'TS. BS Lê Thị B',
            specialties: ['Nhi khoa'],
            address: '456 Nguyễn Tri Phương, Quận 10, Hồ Chí Minh',
        },
        {
            image: 'https://via.placeholder.com/100', // Thay bằng đường dẫn ảnh thật
            name: 'TS. BS Lê Thị B',
            specialties: ['Nhi khoa'],
            address: '456 Nguyễn Tri Phương, Quận 10, Hồ Chí Minh',
        },
        // Thêm nhiều bác sĩ khác ở đây
    ];
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSpecialties = specialties.filter(specialty =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-full h-[120px] flex justify-center items-center bg-[#3499AF]">
                <div className="w-3/5 flex">
                    <input
                        type="text"
                        placeholder="Search for doctors, clinics, hospitals, etc."
                        className="w-5/6 h-[50px] pl-[20px] text-[20px] rounded-l-[30px] outline-none"
                    />
                    <button className="w-1/6 bg-white rounded-r-[30px] pr-[30px] flex items-center justify-end">
                        <UilSearchAlt size="30" color="#3499AF" />
                    </button>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="w-4/5 flex">
                    <div className="w-1/4">
                        <p className="font-semibold text-[20px]">Chuyên khoa</p>
                        <div className="rounded-md w-full mt-[10px]">
                            <div className="flex items-center mb-4">
                                <UilSearchAlt size="20" className="mr-2" />
                                <input
                                    type="text"
                                    placeholder="Tìm nhanh chuyên khoa"
                                    className="w-full p-2 border rounded-md outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="overflow-y-auto max-h-64">
                                {filteredSpecialties.map((specialty, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            id={`specialty-${index}`}
                                            name="specialty"
                                            className="mr-2"
                                        />
                                        <label htmlFor={`specialty-${index}`} className="cursor-pointer">
                                            {specialty}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4">
                        {doctors.map((doctor, index) => (
                            <DoctorListCard
                                key={index}
                                image={doctor.image}
                                name={doctor.name}
                                specialties={doctor.specialties}
                                address={doctor.address}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}