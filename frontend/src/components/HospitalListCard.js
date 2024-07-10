import React from 'react';

export default function HospitalListCard({ image, name, address, startTime, endTime, onClickDetail }) {
    return (
        <div className="w-full flex p-4 border-b border-gray-300">
            <div className="w-1/4">
                <img src={image} alt={name} className="w-full h-auto rounded-lg" />
            </div>
            <div className="w-3/4 pl-4">
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-gray-600">{address}</p>
                <p className="text-gray-600">Giờ mở cửa: {startTime}</p>
                <p className="text-gray-600">Giờ đóng cửa: {endTime}</p>
                <button
                    onClick={onClickDetail} // Call onClickDetail function when button is clicked
                    className="bg-[#3499AF] text-white px-4 py-2 rounded-md mt-2"
                >
                    Chi tiết
                </button>
            </div>
        </div>
    );
}
