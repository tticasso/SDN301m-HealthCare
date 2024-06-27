import DoctorDetail from "./pages/DoctorDetail";
import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProfileMenu from "./pages/UserProfileMenu";
import Signup from "./components/Signup";
import Homepage from "./pages/Homepage";
import DoctorList from "./pages/DoctorList";
import Login from "./components/Login";
import BookingAppointment from "./pages/BookingAppointment";
import Profile from "./pages/UserProfileMenu";
import UsersPage from "./components/UsersPage";
import LayoutPage from "./pages/LayoutPage";


const App = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<UserProfileMenu />} />
        <Route path="/booking" element={<BookingAppointment />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/doctor-list" element={<DoctorList />} />
        <Route path="/admin" element={<LayoutPage />}>
          <Route path="home" element={<h1>Home</h1>} />
          <Route path="users" element={<UsersPage />} />
        </Route>  
      </Routes>
    </div>
  );
};

export default App;
