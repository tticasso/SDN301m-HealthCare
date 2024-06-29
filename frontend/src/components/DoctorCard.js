import React from "react";
import { UilArrowRight } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

export default function DoctorCard({ doctor, specialties }) {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate(`/booking/${doctor.id}`);
  };

  return (
    <div className="h-[260px] border-[3px] rounded-[20px]">
      <div className="flex justify-center items-center w-full mt-[10px]">
        <div className="w-[120px] h-[120px] border-[3px] rounded-[100px]">
          <img
            src={doctor.avatar}
            alt="doctor"
            className="w-full h-full object-fit rounded-[100px]"
          />
        </div>
      </div>
      <div className="w-full mt-[5px]">
        <p className="text-[15px] font-bold text-center">
          {doctor.fullname}
        </p>
        <div className="flex flex-wrap justify-center">
          {specialties.map((specialty, index) => (
            <p
              key={index}
              className="text-[13px] font-light text-center mr-2"
            >
              {specialty}.
            </p>
          ))}
        </div>
        <p className="text-[13px] font-light text-center">
          {doctor.place}
        </p>
      </div>
      <div className="w-full h-[1px] bg-[#EEEBEE] mt-[10px]"></div>
      <div className='flex justify-between items-center px-[10px] mt-[10px]'  >
        <div className="w-full flex justify-between items-center cursor-pointer" onClick={handleBookingClick}>
        <p className='text-[15px] font-bold pl-[20px]'>Đặt lịch khám</p>
        <UilArrowRight/>
        </div>
        
      </div>
    </div>
  );
}
