import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "../../components/common/Footer";
import { toast } from "react-toastify";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const breadcrumbItems = [
    { label: "Quay lại trang đăng nhập", path: "/auth" },
  ];

  const handleResetPassword = async () => {
    if (!email || !password || !confirmPassword) {
      toast.warning("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Email không hợp lệ.");
      return;
    }

    if (password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        {
          email,
          newPassword: password,
          confirmPassword,
        }
      );

      toast.success("Đặt lại mật khẩu thành công!");
      setTimeout(() => navigate("/resetpasswordsuccess"), 1500);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <BreadcrumbBack items={breadcrumbItems} />

      <div className="py-10 bg-white flex items-start justify-center pt-20">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
          {/* Title */}
          <h2 className="text-center text-lg font-semibold mb-6">
            Đặt lại mật khẩu
          </h2>
          {/* Form nhập email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-left block text-base font-medium mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label className="text-left block text-sm font-medium mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ít nhất 8 kí tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="text-left block text-sm font-medium mb-1">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleResetPassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold flex items-center justify-center gap-1"
          >
            ĐẶT LẠI MẬT KHẨU →
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
