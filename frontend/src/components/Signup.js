import React, { useState } from "react";
import { UilLock, UilEnvelopeAlt } from "@iconscout/react-unicons";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    const gmailRegex = /^[^\s@]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(email) || !gmailRegex.test(email)) {
      return "Invalid email address. Please use a valid Gmail address.";
    }
    if (!passwordRegex.test(password)) {
      return "Password must be at least 6 characters long and include both letters and numbers.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
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
      fullname: "",
      dob: "",
      gender: "",
      phone: "",
      address: "",
      img: "",
      status: "",
      role: "PAITENT"
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
        throw new Error("Failed to create user1.");
      }

      // Xử lý khi đăng ký thành công
      const responseData = await response.json();
      const userId = responseData.token._id;
      localStorage.setItem("userId", userId);
      localStorage.setItem("status", responseData.token.status)
      // Hiển thị thông báo thành công hoặc chuyển hướng đến trang khác
      console.log("User registered successfully:", responseData);
      navigate("/menu", { state: { selectedTab: "taiKhoan" } });
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Failed to create user.");
    }


  };

  return (
    <div className="w-[420px] h-[600px] bg-white rounded-[30px] flex items-center justify-center">
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
          <i className="text-[#3499AF]">Email</i>
          <div className="w-full flex justify-center">
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
        </div>
        <div className="w-full mb-[10px]">
          <i className="text-[#3499AF]">Mật khẩu</i>
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
          <i className="text-[#3499AF]">Nhập lại mật khẩu</i>
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
