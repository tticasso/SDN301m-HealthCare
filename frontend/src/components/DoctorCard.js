import React from "react";
import { UilArrowRight } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

export default function DoctorCard({ doctor, user, specialties, hospital }) {
  const navigate = useNavigate();

  const handleBookingClick = (e) => {
    e.stopPropagation();
    navigate(`/booking/${doctor.docProfile.doctor}`);
  };

  const handleCardClick = () => {
    navigate(`/doctor-detail/${doctor.docProfile.doctor}`);
  };

  const getSpecialtyNames = () => {
    return doctor.docProfile?.specify.map((specId) => {
      const specialty = specialties.find((spec) => spec._id === specId);
      return specialty ? specialty.name : "";
    }).join(", ");
  };

  return (
    <div className="h-[260px] border-[3px] rounded-[20px] cursor-pointer" onClick={handleCardClick}>
      <div className="flex justify-center items-center w-full mt-[10px]">
        <div className="w-[120px] h-[120px] border-[3px] rounded-[100px]">
          <img
            src={user?.image}
            alt="doctor"
            className="w-full h-full object-cover rounded-[100px]"
          />
        </div>
      </div>
      <div className="w-full mt-[5px]">
        <p className="text-[15px] font-bold text-center">
          {user?.fullname}
        </p>
        <div className="flex flex-wrap justify-center">
          <p className="text-[13px] font-light text-center mr-2 truncate px-4">
            {getSpecialtyNames()}
          </p>
        </div>
        <p className="text-[13px] font-light text-center">
          {hospital?.name}
        </p>
      </div>
      <div className="w-full h-[1px] bg-[#EEEBEE] mt-[10px]"></div>
      <div className='flex justify-between items-center px-[10px] mt-[10px]'>
        <div className="w-full flex justify-between items-center cursor-pointer" onClick={handleBookingClick}>
          <p className='text-[15px] font-bold pl-[20px]'>Đặt lịch khám</p>
          <UilArrowRight />
        </div>
      </div>
    </div>
  );
}
