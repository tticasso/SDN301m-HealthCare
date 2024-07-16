import React, { useState } from "react";
import { UilLock, UilEnvelopeAlt, UilUser, UilPhone, UilMapMarker, UilCalendarAlt } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(email)) {
      return "Invalid email address.";
    }
    if (!passwordRegex.test(password)) {
      return "Password must be at least 6 characters long and include both letters and numbers.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    if (!fullname) {
      return "Full name is required.";
    }
    if (!dob) {
      return "Date of birth is required.";
    }
    if (!gender) {
      return "Gender is required.";
    }
    if (!phone) {
      return "Phone number is required.";
    }
    if (!address) {
      return "Address is required.";
    }
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const user = {
      email,
      password,
      fullname,
      dob,
      gender,
      phone,
      address,
      img: "",
      status: "",
      role: "PATIENT"
    };

    try {
      const response = await fetch("http://localhost:9999/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to create user.");
      }

      const responseData = await response.json();
      const userId = responseData.token._id;
      localStorage.setItem("userId", userId);
      localStorage.setItem("status", responseData.token.status);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Failed to create user.");
    }
  };

  return (
    <div className="w-[420px] h-auto bg-white rounded-[30px] flex items-center justify-center py-6">
      <div className="w-[324px]">
        <div className="flex w-full justify-center">
          <p className="font-bold text-[40px]">Health</p>
          <p className="font-bold text-[40px] text-[#3499AF]">Care</p>
        </div>
        <i className="font-extrabold text-[32px] text-center text-[#3499AF]">
          Create your account
        </i>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="w-full mb-[10px]">
          <i className="text-[#3499AF]">Full Name</i>
          <div className="w-full flex justify-center">
            <UilUser size={35} color="#3499AF" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
            />
          </div>
        </div>
        <div className="w-full mb-[10px]">
          <i className="text-[#3499AF]">Date of Birth</i>
          <div className="w-full flex justify-center">
            <UilCalendarAlt size={35} color="#3499AF" />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
            />
          </div>
        </div>
        <div className="w-full mb-[10px]">
          <i className="text-[#3499AF]">Gender</i>
          <div className="w-full flex justify-center">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="w-full mb-[10px]">
          <i className="text-[#3499AF]">Phone</i>
          <div className="w-full flex justify-center">
            <UilPhone size={35} color="#3499AF" />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
            />
          </div>
        </div>
        <div className="w-full mb-[10px]">
          <i className="text-[#3499AF]">Address</i>
          <div className="w-full flex justify-center">
            <UilMapMarker size={35} color="#3499AF" />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
            />
          </div>
        </div>
        <div className="w-full mb-[10px]">
          <i className="text-[#3499AF]">Email</i>
          <div className="w-full flex justify-center">
            <UilEnvelopeAlt size={35} color="#3499AF" />
            <input
              type="text"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
            />
          </div>
        </div>
        <div className="w-full mb-[10px]">
          <i className="text-[#3499AF]">Password</i>
          <div className="w-full flex justify-center">
            <UilLock size={35} color="#3499AF" />
            <input
              type="password"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
            />
          </div>
        </div>
        <div className="w-full mb-[10px]">
          <i className="text-[#3499AF]">Confirm Password</i>
          <div className="w-full flex justify-center">
            <UilLock size={35} color="#3499AF" />
            <input
              type="password"
              placeholder="***********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-[30px]">
          <button
            onClick={handleSubmit}
            className="w-[200px] h-[50px] bg-[#3499AF] font-bold rounded-[30px] text-white"
          >
            Đăng kí
          </button>
        </div>
        <div className="w-full flex justify-center items-center mt-[5px]">
          <i>Bạn đã có tài khoản?</i>
          <a href="/login" className="font-bold italic ml-[2px]">
            Đăng nhập!
          </a>
        </div>
      </div>
    </div>
  );
}
