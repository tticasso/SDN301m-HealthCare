import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { UilHeart, UilGlobe, UilLocationPinAlt, UilPhone } from '@iconscout/react-unicons';
import axios from 'axios';

export default function HospitalDetail() {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:9999/hospital/${id}`)
            .then(response => {
                setHospital(response.data);
            })
            .catch(error => {
                console.error('Error fetching hospital:', error);
            });

        axios.get('http://localhost:9999/doctor')
            .then(response => {
                const filteredDoctors = response.data.filter(doctor => doctor.docProfile.place === id);
                setDoctors(filteredDoctors);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
            });

        axios.get('http://localhost:9999/specify')
            .then(response => {
                const specialtyMap = {};
                response.data.forEach(specialty => {
                    specialtyMap[specialty._id] = specialty.name;
                });
                setSpecialties(specialtyMap);
            })
            .catch(error => {
                console.error('Error fetching specialties:', error);
            });
    }, [id]);

    if (!hospital) {
        return null; // or loading indicator
    }

    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-full h-full flex justify-center bg-[#F1F5F9]">
                <div className="w-2/3 my-[10px]">
                    <p className="font-medium italic text-[20px] py-[20px]">Trang chủ / Bệnh viện</p>
                    <div className="w-full bg-white rounded-[10px] py-[30px] px-[20px]">
                        <div className="w-full flex justify-between">
                            <div className=" flex">
                                <img className="w-[150px] h-[150px] rounded-[150px]" src={hospital.image} alt="hospital-logo" />
                                <div className="h-[150px] pl-[10px]">
                                    <p className="text-[24px] font-semibold">{hospital.name}</p>
                                    <p className="text-[16px] font-light">{hospital.slogan}</p>
                                    <div className="flex gap-5 mt-[10px]">
                                        <div className="flex p-[5px] gap-[5px] border rounded-full">
                                            <UilGlobe size={24} color="#000000" />
                                            <p>{hospital.website}</p>
                                        </div>
                                        <div className="flex p-[5px] gap-[5px] border rounded-full">
                                            <UilLocationPinAlt size={24} color="#000000" />
                                            <p>{hospital.address}</p>
                                        </div>
                                        <div className="flex p-[5px] gap-[5px] border rounded-full">
                                            <UilPhone size={24} color="#000000" />
                                            <p>{hospital.phone}</p>
                                        </div>
                                    </div>
                                    <p className="text-[16px] font-semibold">Giờ làm việc:</p>
                                    <p>{hospital.startTime} - {hospital.endTime}</p>
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
                            <p className="font-light text-[16] mt-[10px]">{hospital.info}</p>
                        </div>
                        <div className="mt-[20px] px-[30px]">
                            <p className="text-[20px] font-semibold">Danh sách bác sĩ</p>
                            <div className="mt-[10px] grid grid-cols-3 gap-4">
                                {doctors.map((doctor) => (
                                    <div key={doctor.docProfile._id} className="border rounded-lg p-4">
                                        <img 
                                            src={doctor.doctor.img} 
                                            alt={doctor.doctor.fullname} 
                                            className="w-24 h-24 rounded-full mx-auto mb-2"
                                        />
                                        <p className="text-center font-semibold">Bác sĩ: {doctor.doctor.fullname}</p>
                                        <p className="text-center text-sm">Bằng cấp: {doctor.docProfile.level}</p>
                                        <p className="text-center text-sm mt-2">Chuyên khoa:</p>
                                        <ul className="text-center text-sm">
                                            {doctor.docProfile.specify.map((specifyId) => (
                                                <li key={specifyId}>{specialties[specifyId]}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
