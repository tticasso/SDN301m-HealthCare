import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DoctorListCard({ image, name, specialties, address, doctorId }) {
    const navigate = useNavigate();

    const handleBooking = () => {
        navigate(`/booking/${doctorId}`); // Verify doctorId is correctly accessed
    };

    return (
        <div className="flex items-center p-4 border w-full max-w-4xl">
            <img
                src={image}
                alt="Doctor"
                className="w-20 h-20 rounded-full mr-4"
            />
            <div className="flex-grow">
                <h2 className="text-lg font-bold">
                    {name}
                </h2>
                <div className="flex flex-wrap gap-2 my-2">
                    {specialties.map((specialty, index) => (
                        <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md">
                            {specialty}
                        </span>
                    ))}
                </div>
                <p className="text-gray-600">
                    Địa chỉ: {address}
                </p>
            </div>
            <button
                onClick={handleBooking}
                className="bg-[#3499AF] text-white px-4 py-2 rounded-md"
            >
                Đặt khám
            </button>
        </div>
    );
}
