import React from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalCard = ({ hospital }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/hospital/${hospital._id}`);
    };

    return (
        <div className="h-[250px] rounded-lg overflow-hidden shadow-lg border-[2px] cursor-pointer" onClick={handleClick}>
            <div className="bg-blue-400 text-white text-center h-[132px]">
                <img src={hospital.image} alt="hospital-avatar" className="w-full h-full object-fit" />
            </div>
            <div className="bg-white pt-[5px] pb-4 px-5 text-left">
                <p className="text-[14px] font-extrabold">{hospital.name}</p>
                <p className="text-gray-600 text-[12px] mt-[10px]">{hospital.address}</p>
                <p className="text-gray-600 text-[12px] mt-[5px]">
                    {hospital.startTime}<br />
                    {hospital.endTime}
                </p>
            </div>
        </div>
    );
};

export default HospitalCard;
