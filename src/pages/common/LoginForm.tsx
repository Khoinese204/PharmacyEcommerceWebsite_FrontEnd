import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      // Lưu token và thông tin người dùng vào localStorage (hoặc context)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Chuyển hướng đến trang chính hoặc dashboard

      window.location.href = "/";
    } catch (error: any) {
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu.");
      console.error("Login error", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full max-w-xs bg-white p-6 rounded-md shadow-xl mx-auto mt-10">
      <form className="space-y-4 text-sm" onSubmit={handleLogin}>
        <div>
          <label className="text-left block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div>
          <label className="flex justify-between text-gray-700 mb-1">
            <span>Mật khẩu</span>
            <span
              onClick={() => navigate("/auth/forgotpassword")}
              className="text-xs text-blue-500 hover:underline cursor-pointer"
            >
              Quên mật khẩu
            </span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
        >
          ĐĂNG NHẬP →
        </button>
      </form>
    </div>
  );
}
