import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import ListTemplate from "../components/ListTemplate";
import DoctorCard from "../components/DoctorCard";
import HospitalCard from "../components/HospitalCard";
import SpecialistCard from "../components/SpecialistCard";
import HowItWork from "../components/HowItWork";
import Footer from "../components/Footer";

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState({});
  const [specialties, setSpecialties] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // Fetch all doctors
    axios.get("http://localhost:9999/doctor").then((response) => {
      const doctorData = response.data;
      setDoctors(doctorData);

      // Fetch user data for each doctor
      const userPromises = doctorData.map((doc) =>
        axios.get(`http://localhost:9999/user/${doc.docProfile.doctor}`)
      );

      Promise.all(userPromises).then((userResponses) => {
        const usersData = userResponses.reduce((acc, userRes) => {
          acc[userRes.data._id] = userRes.data;
          return acc;
        }, {});
        setUsers(usersData);
      });

      // Fetch specialties data
      axios.get("http://localhost:9999/specify").then((specialtyResponse) => {
        setSpecialties(specialtyResponse.data);
      });

      // Fetch hospital data for each doctor
      const hospitalPromises = doctorData.map((doc) =>
        axios.get(`http://localhost:9999/hospital/${doc.docProfile.place}`)
      );

      Promise.all(hospitalPromises).then((hospitalResponses) => {
        const hospitalsData = hospitalResponses.reduce((acc, hospitalRes) => {
          acc[hospitalRes.data._id] = hospitalRes.data;
          return acc;
        }, {});
        setHospitals(prevHospitals => [...prevHospitals, ...Object.values(hospitalsData)]);
      });
    });

    // Fetch all hospitals
    axios.get("http://localhost:9999/hospital")
      .then((response) => {
        setHospitals(prevHospitals => [...prevHospitals, ...response.data]);
        console.log("response.data: ", response.data);
        console.log("hospitals", hospitals);
      });

      // Fetch all specialties
    axios.get("http://localhost:9999/specify").then((response) => {
      setSpecialties(response.data);
    });
  }, []);

  

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="w-full h-[400px]">
        <img src="https://mimanihospital.com/wp-content/uploads/2017/03/abt-banner.jpg" alt="banner" className="w-full h-full object-fit" />
      </div>
      <div className="w-full mt-[20px]">
        <HowItWork />
      </div>
      <p className="font-bold text-[40px] text-center mt-[20px]">Đặt lịch khám trực tuyến</p>
      <p className="font-thin text-[24px] text-center">Tìm bác sĩ - Đặt lịch khám dễ dàng</p>
      <div className="w-full flex justify-center items-center mt-[20px]">
        <div className="w-4/5">
          <ListTemplate
            Title="Các bác sĩ hàng đầu"
            Subtitle="Danh sách các bác sĩ hàng đầu của chúng tôi"
            SlideComponent={(index) => (
              <DoctorCard
                key={index}
                doctor={doctors[index]}
                user={users[doctors[index].docProfile.doctor]}
                specialties={specialties}
                hospital={hospitals.find(hospital => hospital._id === doctors[index].docProfile.place)}
              />
            )}
            slideCount={doctors.length}
            slidesPerView={3}
            viewAllUrl="/doctor-list"
          />
        </div>
      </div>
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
      <div className="w-full flex justify-center items-center mt-[20px]">
        <div className="w-4/5">
        <ListTemplate
            Title="Chuyên ngành"
            Subtitle="Danh sách các chuyên ngành của chúng tôi"
            SlideComponent={(index) => (
              <SpecialistCard key={index} specialty={specialties[index]} />
            )}
            slideCount={specialties.length}
            slidesPerView={5}
            viewAllUrl="/specialties"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
