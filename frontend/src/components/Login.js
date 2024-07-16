import React, { useState } from "react";
import { UilLock, UilEnvelopeAlt } from "@iconscout/react-unicons";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(email) ) {
      return "Please enter a valid email address.";
    }
    if (!passwordRegex.test(password)) {
      return "Incorrect password or username";
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
    };

    try {
      const userResponse = await fetch("http://localhost:9999/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        const errorMessage = errorData.message || "Login failed. Please try again.";
        setError(errorMessage);
        return;
      }

      const responseData = await userResponse.json();
      console.log("responseData: ", responseData);
      const token = responseData.token.token;
      const userId = responseData.token.login.id;
      const role = responseData.token.login.role;
      const email = responseData.token.login.email;
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      if (role === "ADMIN") {
        window.location.href = "/admin"
      } else {
        window.location.href = "/";
      }

    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
  };


  return (
    <div className="w-[420px] h-[600px] bg-white rounded-[30px] flex items-center justify-center">
      <div className="w-[324px]">
        <div className="flex w-full justify-center mb-[40px]">
          <p className="font-bold text-[40px]">Health</p>
          <p className="font-bold text-[40px] text-[#3499AF]">Care</p>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
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
        <a href="/#" className="font-bold italic text-[16px]">
          Quên mật khẩu?
        </a>
        <div className="w-full flex justify-center items-center mt-[40px]">
          <button
            onClick={handleSubmit}
            className="w-[200px] h-[50px] bg-[#3499AF] font-bold rounded-[30px] text-white"
          >
            Đăng nhập
          </button>
        </div>
        <div className="w-full flex justify-center items-center mt-[5px]">
          <i>Bạn chưa có tài khoản?</i>
          <a href="/signup" className="font-bold italic ml-[2px]">
            Đăng kí!
          </a>
        </div>
      </div>
    </div>
  );
}
