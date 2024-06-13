import DoctorList from "../components/ListTemplate";
import Header from "../components/Header";
import { UilSearchAlt } from '@iconscout/react-unicons'
import ListTemplate from "../components/ListTemplate";
import DoctorCard from "../components/DoctorCard";
import HospitalCard from "../components/HospitalCard";
import HowItWork from "../components/HowItWork";
import SpecialistCard from "../components/SpecialistCard";
import Footer from "../components/Footer";
export default function Homepage() {
    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-full h-[400px]">
                <img src="https://mimanihospital.com/wp-content/uploads/2017/03/abt-banner.jpg" alt="banner" className="w-full h-full object-fit" />
            </div>
            <div className="w-full flex justify-center mt-[20px]">
                <div className="w-[600px] flex">
                    <input
                        type="text"
                        placeholder="Search for doctors, clinics, hospitals, etc."
                        className="w-3/4 h-[50px] pl-[20px] text-[20px] border-2 border-[#3499AF] rounded-l-[30px] box-border"
                    />
                    <button
                        className="w-1/4 h-[50px] bg-[#3499AF] rounded-r-[30px] text-white border-2 border-[#3499AF] box-border font-bold text-[20px] flex items-center justify-center"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="w-full mt-[20px]">
                <HowItWork />
            </div>
            <p className="italic font-bold text-[40px] text-center mt-[20px]">Schedule an online appointment</p>
            <p className="italic font-thin text-[24px] text-center">Find the exact Doctor - Make an appointment easily</p>
            <div className="w-full flex justify-center items-center mt-[20px]">
                <div className="w-4/5">
                    <ListTemplate
                        Title="Book a doctor's appointment"
                        Subtitle="Your examination form with your order number and time is confirmed."
                        SlideComponent={DoctorCard}
                        slideCount={5}
                        slidesPerView={3}
                    />
                </div>
            </div>
            <div className="w-full flex justify-center items-center mt-[20px]">
                <div className="w-4/5">
                    <ListTemplate
                        Title="Book a hospital's appointment"
                        Subtitle="Your examination form with your order number and time is confirmed."
                        SlideComponent={HospitalCard}
                        slideCount={5}
                        slidesPerView={3}
                    />
                </div>
            </div>
            <div className="w-full flex justify-center items-center mt-[20px]">
                <div className="w-4/5">
                    <ListTemplate
                        Title="Schedule an appointment by Specialty"
                        Subtitle="Your examination form with your order number and time is confirmed."
                        SlideComponent={SpecialistCard}
                        slideCount={10}
                        slidesPerView={5}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}