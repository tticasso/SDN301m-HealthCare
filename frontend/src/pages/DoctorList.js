import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { UilSearchAlt } from '@iconscout/react-unicons';
import DoctorListCard from '../components/DoctorListCard';

export default function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [users, setUsers] = useState({});
    const [specialties, setSpecialties] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorResponse = await axios.get('http://localhost:9999/doctor');
                const doctorData = doctorResponse.data || [];

                const userPromises = doctorData.map((doc) =>
                    axios.get(`http://localhost:9999/user/${doc.docProfile.doctor}`)
                );
                const userResponses = await Promise.all(userPromises);
                const usersData = userResponses.reduce((acc, userRes) => {
                    acc[userRes.data._id] = userRes.data;
                    return acc;
                }, {});
                setUsers(usersData);

                const specialtyResponse = await axios.get('http://localhost:9999/specify');
                const specialtiesData = specialtyResponse.data || [];
                setSpecialties(specialtiesData);

                const hospitalPromises = doctorData.map((doc) =>
                    axios.get(`http://localhost:9999/hospital/${doc.docProfile.place}`)
                );
                const hospitalResponses = await Promise.all(hospitalPromises);
                const hospitalsData = hospitalResponses.reduce((acc, hospitalRes) => {
                    acc[hospitalRes.data._id] = hospitalRes.data;
                    return acc;
                }, {});
                setHospitals(Object.values(hospitalsData));

                setDoctors(doctorData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredDoctors = doctors.filter((doctor) => {
        const fullName = (users[doctor.docProfile.doctor] && users[doctor.docProfile.doctor].fullname) ? users[doctor.docProfile.doctor].fullname.toLowerCase() : '';
        const address = (hospitals.find(hospital => hospital._id === doctor.docProfile.place) && hospitals.find(hospital => hospital._id === doctor.docProfile.place).address) ? hospitals.find(hospital => hospital._id === doctor.docProfile.place).address.toLowerCase() : '';
        const specialtiesList = doctor.docProfile.specify.map(id => specialties.find(specialty => specialty._id === id)?.name).join(' ').toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        const selectedSpecialtyLower = selectedSpecialty.toLowerCase();

        return (selectedSpecialtyLower === '' || specialtiesList.includes(selectedSpecialtyLower)) &&
               (fullName.includes(searchTermLower) || address.includes(searchTermLower));
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
                                <div className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        id="specialty-all"
                                        name="specialty"
                                        className="mr-2"
                                        checked={selectedSpecialty === ''}
                                        onChange={() => setSelectedSpecialty('')}
                                    />
                                    <label htmlFor="specialty-all" className="cursor-pointer">
                                        Tất cả
                                    </label>
                                </div>
                                {specialties.map((specialty) => (
                                    <div key={specialty._id} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            id={`specialty-${specialty._id}`}
                                            name="specialty"
                                            className="mr-2"
                                            checked={selectedSpecialty === specialty.name}
                                            onChange={() => setSelectedSpecialty(specialty.name)}
                                        />
                                        <label htmlFor={`specialty-${specialty._id}`} className="cursor-pointer">
                                            {specialty.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4">
                        {filteredDoctors.map((doctor) => (
                            <DoctorListCard
                                key={doctor._id}
                                img={users[doctor.docProfile.doctor]?.img}
                                name={users[doctor.docProfile.doctor]?.fullname}
                                specialties={doctor.docProfile.specify.map(id => specialties.find(specialty => specialty._id === id)?.name)}
                                address={hospitals.find(hospital => hospital._id === doctor.docProfile.place)?.address}
                                doctorId={doctor.docProfile.doctor}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
