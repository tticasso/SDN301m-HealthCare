import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { UilHeart, UilUser } from "@iconscout/react-unicons";

export default function DoctorDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [user, setUser] = useState(null);
    const [specialties, setSpecialties] = useState([]);
    const [hospital, setHospital] = useState(null);

    useEffect(() => {
        // Fetch doctor data
        axios.get(`http://localhost:9999/doctor/${id}`).then((response) => {
            setDoctor(response.data);

            // Fetch user data
            axios.get(`http://localhost:9999/user/${response.data.docProfile.doctor}`).then((userResponse) => {
                setUser(userResponse.data);
            });

            // Fetch specialty data
            axios.get("http://localhost:9999/specify").then((specialtyResponse) => {
                setSpecialties(specialtyResponse.data);
            });

            // Fetch hospital data
            axios.get(`http://localhost:9999/hospital/${response.data.docProfile.place}`).then((hospitalResponse) => {
                setHospital(hospitalResponse.data);
            });
        });
    }, [id]);

    const getSpecialtyNames = () => {
        return doctor?.docProfile?.specify.map((specId) => {
            const specialty = specialties.find((spec) => spec._id === specId);
            return specialty ? specialty.name : "";
        }).join(", ");
    };

    if (!doctor || !user || !hospital) {
        return <div>Loading...</div>;
    }

    const handleBookingClick = () => {
        navigate(`/booking/${doctor.docProfile.doctor}`);
    };

    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-full h-full flex justify-center bg-[#F1F5F9]">
                <div className="w-2/3 my-[10px]">
                    <p className="font-medium italic text-[20px] py-[20px]">Trang chủ / Bác Sĩ</p>
                    <div className="w-full bg-white rounded-[10px] py-[30px] px-[20px]">
                        <div className="w-full flex justify-between">
                            <div className="flex">
                                <div className="w-[150px] h-[150px] flex justify-center items-center rounded-[150px] bg-[#DBF2F8]">
                                    <img
                                        src={doctor?.doctor.image}
                                        alt="doctor"
                                        className="w-full h-full object-cover rounded-[100px]"
                                    />
                                </div>
                                <div className="h-[150px] pl-[10px]">
                                    <div className="flex">
                                        <p className="text-[24px] font-semibold">{doctor.docProfile.level} -</p>
                                        <p className="ml-[5px] text-[24px] font-semibold">{user.fullname}</p>
                                    </div>
                                    <div className="flex items-center gap-[10px]">
                                        <div className="flex items-center h-[25px]">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.6 22.5L6.7 19.3L3.1 18.5L3.45 14.8L1 12L3.45 9.2L3.1 5.5L6.7 4.7L8.6 1.5L12 2.95L15.4 1.5L17.3 4.7L20.9 5.5L20.55 9.2L23 12L20.55 14.8L20.9 18.5L17.3 19.3L15.4 22.5L12 21.05L8.6 22.5ZM10.95 15.55L16.6 9.9L15.2 8.45L10.95 12.7L8.8 10.6L7.4 12L10.95 15.55Z" fill="#1975DC" />
                                            </svg>
                                            <p className="ml-[5px] text-[20px] font-semibold text-[#1975DC]">Bác sĩ</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <p className="font-light text-[16px]">Chuyên Khoa</p>
                                            <p className="font-light text-[16px]">Nơi công tác</p>
                                        </div>
                                        <div className="pl-[10px]">
                                            <p className="font-semibold text-[#1975DC] text-[16px]">{getSpecialtyNames()}</p>
                                            <p className="font-medium text-[16px]">{hospital.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="flex bg-white border-[1px] border-[#B7B7B7] px-[5px] rounded-[20px]">
                                    <p className="text-[#B7B7B7] font-light text-[12px]">Yêu thích</p>
                                    <UilHeart size={24} color="#B7B7B7" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-[20px] px-[30px]">
                            <p className="text-[20px] font-semibold">Giới thiệu</p>
                            <p className="font-light text-[16px] mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="w-full flex justify-center mt-[30px]">
                            <button onClick={handleBookingClick} className="w-2/3 bg-[#3499AF] text-white rounded-[10px] py-[10px] mt-[20px] text-[24px] font-bold italic">
                                Đặt lịch hẹn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}