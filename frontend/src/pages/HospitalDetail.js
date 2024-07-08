import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { UilHeart, UilGlobe, UilLocationPinAlt, UilPhone } from '@iconscout/react-unicons';

export default function HospitalDetail() {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/hospital/list/${id}`);
                setHospital(response.data);
            } catch (error) {
                console.error('Error fetching hospital details:', error);
            }
        };

        fetchHospital();
    }, [id]);

    if (!hospital) {
        return <p>Loading...</p>;
    }

    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-full h-full flex justify-center bg-[#F1F5F9]">
                <div className="w-2/3 my-[10px]">
                    <p className="font-medium italic text-[20px] py-[20px]">Trang chủ / Bệnh viện</p>
                    <div className="w-full bg-white rounded-[10px] py-[30px] px-[20px]">
                        <div className="w-full flex justify-between ">
                            <div className=" flex">
                                <img className="w-[150px] h-[150px] rounded-[150px]" src={hospital.image} alt="logo" />
                                <div className="h-[150px] pl-[10px]">
                                    <p className="text-[24px] font-semibold">{hospital.name}</p>
                                    <p className="text-[16px] font-light">{hospital.tagline}</p>
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
                                    <p className="text-[#B7B7B7] font-light text-[12px]">Yêu thích </p>
                                    <UilHeart size={24} color="#B7B7B7" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-[20px] px-[30px]">
                            <p className="text-[20px] font-semibold">Giới thiệu</p>
                            <p className="font-light text-[16px] mt-[10px]">{hospital.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
