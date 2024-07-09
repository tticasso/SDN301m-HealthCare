import React from 'react';

export default function SpecialistCard({ specialty }) {
    return (
        <div className="w-auto h-auto">
            <div className="w-[120px] h-[120px] flex items-center justify-center rounded-[100px] border">
                <img src={specialty.image} alt="specialty-avatar" className="w-full h-full object-cover rounded-[100px]" />
            </div>
            <p className="text-[14px] text-left font-extrabold mt-[5px]">{specialty.name}</p>
        </div>
    );
}
