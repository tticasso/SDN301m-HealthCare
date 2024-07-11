import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const SliderTemplate = ({ SlideComponent, slideCount, slidesPerView}) => {
    return (
        <div className='w-full mt-[20px]'>
            <Swiper
                spaceBetween={50}
                slidesPerView={slidesPerView}
                pagination={{ clickable: true }}
                breakpoints={{
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                }}
            >
                {Array.from({ length: slideCount }, (_, index) => (
                    <SwiperSlide key={index}>
                        {SlideComponent(index)}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderTemplate;
