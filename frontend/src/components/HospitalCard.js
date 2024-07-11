import React from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalCard = ({ hospital }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/hospital/${hospital._id}`);
    };

    return (
        <div className="h-[300px] rounded-lg overflow-hidden shadow-lg border-[2px] cursor-pointer" onClick={handleClick}>
            <div className="relative bg-blue-400 text-white text-center h-[132px]">
                <img src={hospital.image} alt="hospital-avatar" className="w-full h-full object-fit" />
                {/* <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 translate-y-1/2 w-[100px] h-[100px] bg-white rounded-full">
                    <img src={hospital.doctorAvatar} alt="doctor-avatar" className="w-full h-full object-fit rounded-[100px]" />
                </div> */}
            </div>
            <div className="bg-white pt-8 pb-4 px-5 text-left mt-[20px]">
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
