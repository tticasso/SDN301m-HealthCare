// BookingSlot.js
import React, { useState } from 'react';

const BookingSlot = ({ dates }) => {
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);

    const handleDateClick = (index) => {
        setSelectedDateIndex(index);
    };

    return (
        <div className="border bg-white rounded-md shadow-md p-4 w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Đặt khám nhanh</h2>
            <div className="overflow-x-auto pb-4 mb-4 border-b">
                <div className="flex space-x-4" style={{ maxWidth: 'calc(7 * 10rem)' }}>
                    {dates.map((date, index) => (
                        <div
                            key={index}
                            className={`p-2 cursor-pointer ${index === selectedDateIndex ? 'border-b-4 border-blue-500' : ''}`}
                            onClick={() => handleDateClick(index)}
                        >
                            <div className="font-bold">{date.day}</div>
                            <div className="text-sm text-green-600">{date.slots.length} khung giờ</div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="grid grid-cols-3 gap-2">
                    {dates[selectedDateIndex].slots.map((slot, index) => (
                        <button
                            key={index}
                            className="border rounded-md p-2 text-center hover:bg-blue-100"
                        >
                            {slot}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingSlot;
