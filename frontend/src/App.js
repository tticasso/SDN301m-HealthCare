import DoctorDetail from "./pages/DoctorDetail";
import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProfileMenu from "./pages/UserProfileMenu";
import Signup from "./components/Signup";
import Homepage from "./pages/Homepage";
import DoctorList from "./pages/DoctorList";
import BookingAppointment from "./pages/BookingAppointment";

const App = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/menu" element={<UserProfileMenu />} />
        <Route path="/booking/:id" element={<BookingAppointment />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/doctor-list" element={<DoctorList />} />
      </Routes>
    </div>
  );
};

export default App;
