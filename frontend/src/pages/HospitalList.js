import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { UilSearchAlt } from '@iconscout/react-unicons';
import HospitalListCard from '../components/HospitalListCard';

export default function HospitalList() {
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const hospitalResponse = await axios.get('http://localhost:9999/hospitals');
                const hospitalsData = hospitalResponse.data;
                console.log(hospitalsData);
                setHospitals(hospitalsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredHospitals = hospitals.filter((hospital) => {
        const name = hospital.name.toLowerCase();
        const address = hospital.address.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();

        return name.includes(searchTermLower) || address.includes(searchTermLower);
    });

    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-full h-[120px] flex justify-center items-center bg-[#3499AF]">
                <div className="w-3/5 flex">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bệnh viện..."
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
                <div className="w-4/5 flex justify-center">
                    <div className="w-3/4">
                        {filteredHospitals.map((hospital) => (
                            <HospitalListCard
                                key={hospital.id}
                                image={hospital.hospitalAvatar}
                                name={hospital.name}
                                address={hospital.address}
                                startTime={hospital.startTime}
                                endTime={hospital.endTime}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
