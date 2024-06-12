import { UilArrowRight } from '@iconscout/react-unicons'
import DoctorCard from './DoctorCard';
import SliderTemplate from './SliderTemplate';
export default function ListTemplate({Title, Subtitle, SlideComponent, slideCount, slidesPerView}) {
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <div>
                    <p className="text-[20px] italic font-bold">{Title}</p>
                    <p className="text-[14px] italic font-thin">{Subtitle}</p>
                </div>
                <button className="bg-[#3499AF] text-white flex justify-center items-center font-bold text-[16px] w-1/6 h-[40px] rounded-[30px]">View all <UilArrowRight /></button>
            </div>
            <div className='w-full mt-[20px]'>
                <SliderTemplate SlideComponent={SlideComponent} slideCount={slideCount} slidesPerView={slidesPerView}/>
            </div>
        </div>
    );
}