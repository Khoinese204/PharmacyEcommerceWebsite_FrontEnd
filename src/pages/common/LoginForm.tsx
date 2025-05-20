// src/pages/customer/OrderSuccessPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";

export default function LoginForm() {
  const navigate = useNavigate();
  const breadcrumbItems = [{ label: "Quay lại trang chủ", path: "/" }];
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      {/* <BreadcrumbBack items={breadcrumbItems}></BreadcrumbBack> */}
      <div className="w-full max-w-xs bg-white p-6 rounded-md shadow-xl mx-auto mt-10">
        {/* Tabs */}
        {/* <div className="flex justify-between items-center border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab("login")}
            className={`text-sm px-2 py-1 font-semibold ${
              activeTab === "login"
                ? "text-blue-700 border-b-2 border-orange-500"
                : "text-blue-400"
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`text-sm px-2 py-1 font-semibold ${
              activeTab === "register"
                ? "text-blue-700 border-b-2 border-orange-500"
                : "text-blue-400"
            }`}
          >
            Đăng kí
          </button>
        </div> */}

        {/* Form */}
        <form className="space-y-4 text-sm">
          {/* Email */}
          <div>
            <label className="text-left block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="flex justify-between text-gray-700 mb-1">
              <span>Mật khẩu</span>
              <span
                onClick={() => navigate("/forgotpassword")}
                className="text-xs text-blue-500 hover:underline cursor-pointer"
              >
                Quên mật khẩu
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                className="text-black w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
          >
            ĐĂNG NHẬP →
          </button>
        </form>
      </div>
    </>
  );
}
