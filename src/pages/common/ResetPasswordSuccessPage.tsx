import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.newPassword.length < 8) {
      setError("Mật khẩu mới phải có ít nhất 8 ký tự.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8080/api/auth/forgot-password", {
        email: form.email,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      navigate("/auth/resetpasswordsuccess");
    } catch (err: any) {
      console.error("Lỗi:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Khôi phục mật khẩu thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-md shadow-md mt-10">
      <h2 className="text-xl font-bold text-center mb-6 text-blue-600">
        Khôi phục mật khẩu
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập email đăng ký"
            value={form.email}
            onChange={handleChange}
            required
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Ít nhất 8 ký tự"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Xác nhận mật khẩu</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm font-medium text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          {loading ? "Đang xử lý..." : "ĐỔI MẬT KHẨU"}
        </button>
      </form>
    </div>
  );
}
