import React, { useEffect, useState } from "react";
import { UilEdit } from "@iconscout/react-unicons";

export default function UserProfile() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    phone: "",
    fetch: "",
    update: "",
    fullname: "",
    address: "",
    dob: "",
    gender: "",
  });

  const [success, setSuccess] = useState("");
  const [passwordInputEnabled, setPasswordInputEnabled] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("userId: ", userId);
    fetch(`http://localhost:9999/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch(() =>
        setError((prev) => ({ ...prev, fetch: "Failed to fetch user data" }))
      );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateGmail = (email) => {
    const gmailRegex = /^[^\s@]+@gmail.com$/;
    return gmailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async () => {
    const { email, password, phone, fullname, address, dob, gender } = user;
    let valid = true;

    if (!fullname) {
      setError((prev) => ({
        ...prev,
        fullname: "Full name is required",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, fullname: "" }));
    }

    if (!validateEmail(email)) {
      setError((prev) => ({
        ...prev,
        email: "Invalid email format. Use @gmail.com or @email.com",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }

    if (!validateGmail(email)) {
      setError((prev) => ({
        ...prev,
        email: "Invalid email format. Use @gmail.com or @email.com",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }

    if (!phone || !validatePhoneNumber(phone)) {
      setError((prev) => ({
        ...prev,
        phone: "Phone number must be 10 digits and start with 0",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, phone: "" }));
    }

    if (!address) {
      setError((prev) => ({
        ...prev,
        address: "Address is required",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, address: "" }));
    }

    if (!dob) {
      setError((prev) => ({
        ...prev,
        dob: "Date of birth is required",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, dob: "" }));
    }

    if (passwordInputEnabled && !validatePassword(password)) {
      setError((prev) => ({
        ...prev,
        password: "At least 6 characters including letters and numbers.",
      }));
      valid = false;
    } else if (passwordInputEnabled) {
      setError((prev) => ({ ...prev, password: "" }));
    }

    if (!gender) {
      setError((prev) => ({
        ...prev,
        gender: "Gender is required",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, gender: "" }));
    }

    if (!valid) {
      return;
    }

    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(`http://localhost:9999/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      setSuccess("User updated successfully!");
      window.location.href = "/login";
    } catch (error) {
      setError((prev) => ({ ...prev, update: "Failed to update user." }));
    }
  };

  const handlePasswordChange = () => {
    setPasswordInputEnabled(true);
  };
  const userId = localStorage.getItem("userId");
  return (
    <div className="w-full">
      <div className="flex border-solid border-l-2 border-b-2 rounded-[8px]">
        <div className="w-1/5 flex-col italic">
          <p className="bg-[#3499AF] font-bold text-white py-2 pl-2 rounded-tl-[8px] not-italic">
            Ảnh đại diện
          </p>
          <div className="flex justify-center mt-[50px]">
            <div className="relative w-[100px] h-[100px] rounded-[100px] bg-[#D9D9D9] ">
              <div className="w-full flex justify-center items-center h-full rounded-[100px] bg-[#D9D9D9]">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.00372 39.2311C2.00372 39.6557 2.35807 39.9999 2.79521 39.9999L39.2023 40C39.6394 40 39.9938 39.6558 39.9938 39.2313V38.3131C40.012 38.0364 40.049 36.6555 39.1388 35.1289C38.5648 34.1663 37.7318 33.3347 36.6628 32.6573C35.3696 31.8378 33.7245 31.244 31.7347 30.8865C31.72 30.8846 30.2446 30.689 28.7331 30.303C26.101 29.6307 25.8709 29.0357 25.8694 29.0299C25.8539 28.9711 25.8315 28.9146 25.8028 28.8615C25.7813 28.7505 25.7281 28.3328 25.8298 27.2136C26.088 24.371 27.6128 22.691 28.838 21.3412C29.2244 20.9155 29.5893 20.5134 29.8704 20.1191C31.0827 18.4181 31.1952 16.4839 31.2003 16.364C31.2003 16.1211 31.1724 15.9214 31.1127 15.7363C30.9937 15.3659 30.7698 15.1351 30.6063 14.9666L30.6052 14.9654C30.564 14.923 30.5251 14.8828 30.4933 14.8459C30.4812 14.8318 30.449 14.7945 30.4783 14.603C30.5859 13.8981 30.6505 13.3079 30.6815 12.7456C30.7367 11.7438 30.7798 10.2456 30.5214 8.7875C30.4895 8.5385 30.4347 8.2755 30.3494 7.9622C30.0764 6.95814 29.6378 6.09971 29.0284 5.39124C28.9236 5.27722 26.3756 2.5928 18.9788 2.04201C17.956 1.96586 16.9449 2.00688 15.9496 2.05775C15.7097 2.06961 15.3812 2.08589 15.0738 2.16554C14.3101 2.36337 14.1063 2.84743 14.0528 3.11834C13.9641 3.56708 14.12 3.91615 14.2231 4.14718C14.2381 4.18067 14.2566 4.22213 14.2243 4.32997C14.0526 4.59588 13.7825 4.83561 13.5071 5.06273C13.4275 5.13038 11.5727 6.72968 11.4707 8.8189C11.1957 10.4078 11.2165 12.8834 11.5417 14.5944C11.5606 14.6889 11.5885 14.8288 11.5432 14.9233C11.1935 15.2367 10.7971 15.5919 10.7981 16.4024C10.8023 16.4839 10.9148 18.4181 12.1272 20.1191C12.408 20.5131 12.7726 20.9149 13.1587 21.3403L13.1596 21.3412C14.3848 22.691 15.9095 24.371 16.1678 27.2135C16.2694 28.3327 16.2162 28.7505 16.1947 28.8614C16.166 28.9145 16.1436 28.971 16.1282 29.0298C16.1266 29.0356 15.8974 29.6287 13.2772 30.2996C11.7656 30.6867 10.2775 30.8845 10.2331 30.8909C8.2994 31.2173 6.66438 31.7963 5.37351 32.6115C4.30813 33.2844 3.47354 34.1175 2.89289 35.0877C1.96517 36.6379 1.99025 38.0497 2.00372 38.3074V39.2311Z"
                    fill="#2F88FF"
                    stroke="black"
                    stroke-width="4"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0">
                <UilEdit size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1px] h-full bg-[#3499AF] z-10"></div>
        <div className="w-4/5">
          <p className="bg-[#3499AF] font-bold text-white italic py-2 rounded-tr-[8px] pl-[10px] not-italic">
            Thông tin cá nhân
          </p>
          {error.fetch && (
            <p className="text-red-500 text-center">{error.fetch}</p>
          )}
          <div className="flex">
            <div className="w-4/5 mb-[10px]">
              <i className="text-[#3499AF] text-black font-bold not-italic">Họ và tên</i>
              <p className="w-4/5 flex justify-center">
                <input
                  type="text"
                  name="fullname"
                  value={user.fullname}
                  onChange={handleChange}
                  className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
                  required
                />
              </p>
              {error.fullname && (
                <p className="text-red-500">{error.fullname}</p>
              )}
            </div>
            <p className="w-3/5 mb-[10px]">
              <i className="text-[#3499AF] text-black font-bold not-italic">Email:</i>
              <div className="w-4/5 flex justify-center">
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
                  required
                />
              </div>
              {error.email && <p className="text-red-500">{error.email}</p>}
            </p>
          </div>
          <div className="flex">
            <div className="w-4/5 mb-[10px]">
              <i className="text-[#3499AF] text-black font-bold not-italic">Địa chỉ:</i>
              <p className="w-4/5 flex justify-center">
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
                  required
                />
              </p>
              {error.address && (
                <p className="text-red-500">{error.address}</p>
              )}
            </div>
            <p className="w-3/5 mb-[10px]">
              <i className="text-[#3499AF] text-black font-bold not-italic">Mật khẩu:</i>
              <div className="w-full flex justify-center">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
                  disabled={!passwordInputEnabled}
                  required={passwordInputEnabled}
                />
                <div className="w-full h-full">
                  <button
                    onClick={handlePasswordChange}
                    className="text-white bg-[#3499AF] rounded-[100px] w-[120px] h-[35px] ml-[20px] font-bold"
                  >
                    Đổi mật khẩu
                  </button>
                </div>
              </div>
              {error.password && (
                <p className="text-red-500">{error.password}</p>
              )}
            </p>
          </div>
          <div className="flex">
            <div className="w-2/6 mb-[10px]">
              <i className="text-[#3499AF] text-black font-bold not-italic">Ngày sinh:</i>
              <p className="w-4/5 flex justify-center">
                <input
                  type="date"
                  name="dob"
                  value={user.dob}
                  onChange={handleChange}
                  className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
                  required
                />
              </p>
              {error.dob && <p className="text-red-500">{error.dob}</p>}
            </div>
            <div className="w-1/2 mb-[10px]">
              <i className="text-[#3499AF] text-black font-bold not-italic">
                Số điện thoại:
              </i>
              <div className="w-4/5 flex justify-center">
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full h-[36px] ml-[5px] pl-[10px] border-2 border-[#3499AF] rounded-md"
                  required
                />
              </div>
              {error.phone && <p className="text-red-500">{error.phone}</p>}
            </div>
            <div className="w-2/6 mb-[10px] pr-[20px]">
              <i className="text-[#3499AF] text-black font-bold not-italic">Giới tính:</i>
              <div className="w-4/5 flex justify-center">
                <select
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  className="w-full h-[36px] pl-[10px] border-2 border-[#3499AF] rounded-md"
                  required
                >
                  <option >Lựa chọn giới tính</option>
                  <option value="Male" >Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              {error.gender && <p className="text-red-500">{error.gender}</p>}
            </div>
          </div>
          <div className="w-full flex justify-center pb-[10px]">
            <button
              onClick={handleSubmit}
              className="text-white font-bold italic text-[15px] rounded-[30px] bg-[#3499AF] w-[150px] h-[50px]"
            >
              Update
            </button>
          </div>
          {success && <p className="text-green-500 text-center pb-  [10px]">{success}</p>}
          {error.update && (
            <p className="text-red-500 text-center">{error.update}</p>
          )}
        </div>
      </div>
    </div>
  );
}
