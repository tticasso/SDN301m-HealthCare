import DoctorDetail from "./pages/DoctorDetail";
import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProfileMenu from "./pages/UserProfileMenu";
import Signup from "./components/Signup";





const App = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/menu" element={<UserProfileMenu />} />
      </Routes>
      <DoctorDetail />
    </div>
  );
};

export default App;
