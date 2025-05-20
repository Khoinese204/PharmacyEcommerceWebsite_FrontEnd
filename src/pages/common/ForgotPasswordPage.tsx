import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const breadcrumbItems = [{ label: "Quay lại trang chủ", path: "/" }];

  return (
    <>
      <BreadcrumbBack items={breadcrumbItems} />
      <div className="py-10 bg-white flex items-start justify-center pt-20">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
          {/* Tiêu đề */}
          <h2 className="text-center text-xl font-bold mb-1">Quên mật khẩu</h2>
          <p className="text-center text-base text-gray-500 mb-6">
            Nhập email để khôi phục mật khẩu
          </p>

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

          {/* Nút tiếp tục */}
          <button
            onClick={() => navigate("/resetpassword")} // <-- điều hướng tới trang reset
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold flex items-center justify-center gap-1"
          >
            TIẾP TỤC →
          </button>

          {/* Link chuyển trang */}
          <div className="text-left mt-4 text-sm">
            <p>
              Đã có tài khoản?{" "}
              <span
                onClick={() => navigate("/auth")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Đăng nhập
              </span>
            </p>
            <p>
              Chưa có tài khoản?{" "}
              <span
                onClick={() => navigate("/auth")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Đăng ký
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
