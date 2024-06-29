import DoctorDetail from "./pages/DoctorDetail";
import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProfileMenu from "./pages/UserProfileMenu";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Homepage from "./pages/Homepage";
import DoctorList from "./pages/DoctorList";
import Login from "./components/Login";
import BookingAppointment from "./pages/BookingAppointment";
import Profile from "./pages/UserProfileMenu";

import HospitalDetail from "./pages/HospitalDetail";

const App = () => {
  return (
    <div className="w-screen h-auto flex justify-center items-center">
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/menu" element={<UserProfileMenu />} />
        <Route path="/booking/:id" element={<BookingAppointment />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/doctor-list" element={<DoctorList />} />
        <Route path="/hospital" element={<HospitalDetail />} />

      </Routes>
    </div>
  );
};

export default App;
