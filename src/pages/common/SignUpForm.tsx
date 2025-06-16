import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agree) {
      setError("Bạn phải đồng ý với điều khoản.");
      return;
    }

    if (form.password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        email: form.email,
        fullName: form.fullName,
        password: form.password,
      });

      // ➤ Chuyển sang trang thông báo đăng ký thành công
      navigate("/auth/signupsuccess");
    } catch (err: any) {
      console.error("Đăng ký lỗi:", err.response?.data || err.message);
      setError("Email đã tồn tại hoặc lỗi hệ thống.");
    }
  };

  return (
    <div className="w-full max-w-xs bg-white p-6 rounded-md shadow-xl mx-auto mt-10">
      <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
        {/* Họ tên */}
        <div>
          <label className="block text-gray-700 mb-1">Họ tên</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Họ tên"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Email"
            required
          />
        </div>

        {/* Mật khẩu */}
        <div>
          <label className="block text-gray-700 mb-1">Mật khẩu</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Ít nhất 8 kí tự"
              className="text-black w-full border border-gray-300 rounded px-3 py-2 pr-10"
              required
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
          <label className="block text-gray-700 mb-1">Xác nhận mật khẩu</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="text-black w-full border border-gray-300 rounded px-3 py-2 pr-10"
              required
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

        {/* Hiển thị lỗi */}
        {error && (
          <p className="text-red-600 text-sm font-medium text-center">
            {error}
          </p>
        )}

        {/* Nút đăng ký */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
        >
          ĐĂNG KÍ →
        </button>
      </form>
    </div>
  );
}
