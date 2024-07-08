import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import ListTemplate from "../components/ListTemplate";
// import DoctorCard from "../components/DoctorCard";
import HospitalCard from "../components/HospitalCard";
// import HowItWork from "../components/HowItWork";
// import SpecialistCard from "../components/SpecialistCard";
import Footer from "../components/Footer";

export default function Homepage() {
  // const [doctors, setDoctors] = useState([]);
  // const [specialized, setSpecialized] = useState({});
  const [hospitals, setHospitals] = useState([]);
  // const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [/*doctorResponse, specializedResponse,*/ hospitalsResponse/*, specialtiesResponse*/] = await Promise.all([
          // axios.get("http://localhost:9999/doctor"),
          // axios.get("http://localhost:9999/specialized"),
          axios.get("http://localhost:9999/hospital/list"),
          // axios.get("http://localhost:9999/specialties"),
        ]);

        // setDoctors(doctorResponse.data || []);

        // const specializedData = specializedResponse.data.reduce((acc, specialty) => {
        //   acc[specialty.id] = specialty.specializedName;
        //   return acc;
        // }, {});
        // setSpecialized(specializedData || {});

        setHospitals(hospitalsResponse.data || []);
        // setSpecialties(specialtiesResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const renderDoctorCard = (index) => {
  //   const doctor = doctors[index];
  //   if (!doctor) return null;

  //   const specialtiesForDoctor = doctor.specialized.map(id => specialized[id]);

  //   return (
  //     <DoctorCard key={doctor.id} doctor={doctor} specialties={specialtiesForDoctor} />
  //   );
  // };

  // const renderSpecialistCard = (index) => {
  //   const specialty = specialties[index];
  //   if (!specialty) return null;
  //   return <SpecialistCard key={specialty.id} specialty={specialty} />;
  // };

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
            placeholder="Tìm kiếm bác sĩ, bệnh viện, phòng khám..."
            className="w-3/4 h-[50px] pl-[20px] text-[20px] border-2 border-[#3499AF] rounded-l-[30px] box-border"
          />
          <button
            className="w-1/4 h-[50px] bg-[#3499AF] rounded-r-[30px] text-white border-2 border-[#3499AF] box-border font-bold text-[20px] flex items-center justify-center"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      {/* <div className="w-full mt-[20px]">
        <HowItWork />
      </div> */}
      {/* <p className="font-bold text-[40px] text-center mt-[20px]">Đặt lịch khám trực tuyến</p>
      <p className="font-thin text-[24px] text-center">Tìm bác sĩ - Đặt lịch khám dễ dàng</p> */}
      {/* <div className="w-full flex justify-center items-center mt-[20px]">
        <div className="w-4/5">
          <ListTemplate
            Title="Đặt lịch khám với bác sĩ"
            Subtitle="Lịch khám của bạn với mã khám bệnh và thời gian đã được xác nhận."
            SlideComponent={renderDoctorCard}
            slideCount={doctors.length}
            slidesPerView={3}
            viewAllUrl="/doctor-list"
          />
        </div>
      </div> */}
      <div className="w-full flex justify-center items-center mt-[20px]">
        <div className="w-4/5">
          <ListTemplate
            Title="Đặt lịch khám với bệnh viện"
            Subtitle="Lịch khám của bạn với mã khám bệnh và thời gian đã được xác nhận."
            SlideComponent={(index) => (
              <HospitalCard key={index} hospital={hospitals[index]} />
            )}
            slideCount={hospitals.length}
            slidesPerView={3}
            viewAllUrl="/hospital-list"
          />
        </div>
      </div>
      {/* <div className="w-full flex justify-center items-center mt-[20px]">
        <div className="w-4/5">
          <ListTemplate
            Title="Đặt lịch khám theo chuyên khoa"
            Subtitle="Lịch khám của bạn với mã khám bệnh và thời gian đã được xác nhận."
            SlideComponent={renderSpecialistCard}
            slideCount={specialties.length}
            slidesPerView={5}
            viewAllUrl="/speciality-list"
          />
        </div>
      </div> */}
      <Footer />
    </div>
  );
}
