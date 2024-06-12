import { UilArrowRight } from '@iconscout/react-unicons'
export default function DoctorCard({ doctor }) {
    return (
        <div className="h-[260px] border-[3px] rounded-[20px]">
            <div className="flex justify-center items-center w-full mt-[10px]">
                <div className="w-[120px] h-[120px] border-[3px] rounded-[100px]">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1mYZy6YWLfqZBgDVnOikeiMl0kYM4jZsqZw&s" alt="doctor" className="w-full h-full object-fit rounded-[100px]" />
                </div>
            </div>
            <div className="w-full mt-[5px]">
                <p className="text-[15px] font-bold italic text-center">Nguyen Van A</p>
                <p className="text-[13px] font-light italic text-center">Heart</p>
                <p className="text-[13px] font-light italic text-center">Cho Ray Hospital</p>
            </div>
            <div className="w-full h-[1px] bg-[#EEEBEE] mt-[10px]"></div>
            <div className='flex justify-between items-center px-[10px] mt-[10px]'>
                <p className='text-[15] italic font-bold'>Book an appointment</p>
                <UilArrowRight />
            </div>
        </div>
    );
}