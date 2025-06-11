
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";

export default function SignUpForm() {
  const breadcrumbItems = [{ label: "Quay lại trang chủ", path: "/" }];
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [activeTab, setActiveTab] = useState("login");

  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* <BreadcrumbBack items={breadcrumbItems}></BreadcrumbBack> */}
      <div className="w-full max-w-xs bg-white p-6 rounded-md shadow-xl mx-auto mt-10">
        {/* Tabs */}
        {/* <div className="flex justify-between items-center border-b border-gray-200 mb-4">
          <button className="text-sm text-gray-500 hover:text-black px-2 py-1">
            Đăng nhập
          </button>
          <button className="text-sm font-semibold border-b-2 border-orange-500 px-2 py-1 text-black">
            Đăng kí
          </button>
        </div> */}

        <form className="space-y-4 text-sm">
          {/* Họ tên */}
          <div>
            <label className="text-left block text-gray-700 mb-1">Họ tên</label>
            <input
              type="text"
              className="text-black w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Họ tên"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-left block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="text-black w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Email"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="text-left block text-gray-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ít nhất 8 kí tự"
                className="text-black w-full border border-gray-300 rounded px-3 py-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label className="text-left block text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="text-black w-full border border-gray-300 rounded px-3 py-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Checkbox điều khoản */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="accent-orange-500 mt-1"
            />
            <p className="text-xs text-gray-700">
              Tôi đồng ý với{" "}
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Chính sách bảo mật
              </a>{" "}
              của PrimeCare.
            </p>
          </div>

          {/* Nút đăng ký */}
          <button
            onClick={() => navigate("/signupsuccess")}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
          >
            ĐĂNG KÍ →
          </button>
        </form>
      </div>
    </>
  );
}
