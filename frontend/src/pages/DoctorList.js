import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { UilSearchAlt } from '@iconscout/react-unicons';
import DoctorListCard from '../components/DoctorListCard';

export default function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [specializedData, setSpecializedData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [doctorResponse, specializedResponse] = await Promise.all([
                    axios.get('http://localhost:9999/doctor'),
                    axios.get('http://localhost:9999/specialized'),
                ]);

                const doctorsData = doctorResponse.data || [];
                const specializedData = specializedResponse.data.reduce((acc, specialty) => {
                    acc[specialty.id] = specialty.specializedName;
                    return acc;
                }, {});

                setDoctors(doctorsData);
                setSpecializedData(specializedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredDoctors = doctors.filter((doctor) => {
        const fullName = doctor.fullname.toLowerCase();
        const address = doctor.place.toLowerCase();
        const specialties = doctor.specialized.map(id => specializedData[id]).join(' ').toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();

        return fullName.includes(searchTermLower) || address.includes(searchTermLower) || specialties.includes(searchTermLower);
    });

    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-full h-[120px] flex justify-center items-center bg-[#3499AF]">
                <div className="w-3/5 flex">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bác sĩ, bệnh viện, phòng khám..."
                        className="w-5/6 h-[50px] pl-[20px] text-[20px] rounded-l-[30px] outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                            <div className="overflow-y-auto max-h-64">
                                {Object.keys(specializedData).map((id) => (
                                    <div key={id} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            id={`specialty-${id}`}
                                            name="specialty"
                                            className="mr-2"
                                            onChange={() => {
                                                setSearchTerm(specializedData[id]);
                                            }}
                                        />
                                        <label htmlFor={`specialty-${id}`} className="cursor-pointer">
                                            {specializedData[id]}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4">
                        {filteredDoctors.map((doctor) => (
                            <DoctorListCard
                                key={doctor.id}
                                image={doctor.avatar}
                                name={doctor.fullname}
                                specialties={doctor.specialized.map(id => specializedData[id])}
                                address={doctor.address}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}