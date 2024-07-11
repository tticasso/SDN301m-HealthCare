import React from 'react';
import { UilArrowRight } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import SliderTemplate from './SliderTemplate';

export default function ListTemplate({ Title, Subtitle, SlideComponent, slideCount, slidesPerView, viewAllUrl }) {
    const navigate = useNavigate();

    const handleViewAll = () => {
        navigate(viewAllUrl);
    };

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <div>
                    <p className="text-[20px] font-bold">{Title}</p>
                    <p className="text-[14px] font-thin">{Subtitle}</p>
                </div>
                <button 
                    className="bg-[#3499AF] text-white flex justify-center items-center font-bold text-[16px] w-1/6 h-[40px] rounded-[30px]" 
                    onClick={handleViewAll}
                >
                    Xem tất cả <UilArrowRight />
                </button>
            </div>
            <div className='w-full mt-[20px]'>
                <SliderTemplate
                    SlideComponent={(swiperIndex) => SlideComponent(swiperIndex)}
                    slideCount={slideCount}
                    slidesPerView={slidesPerView}
                />
            </div>
        </div>
    );
}