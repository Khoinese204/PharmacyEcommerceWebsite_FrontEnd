import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="py-10 bg-white flex flex-col items-center justify-center pt-20">
      {/* Khung thành công */}
      <div className="max-w-2xl text-center p-8 bg-gray-100 rounded-lg shadow">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-4 text-[#00b14f] uppercase tracking-wide">
          Khôi phục mật khẩu thành công!
        </h2>
      </div>

      {/* Nút nằm ngoài khung xám */}
      <button
        onClick={() => navigate("/auth")}
        className="mt-6 bg-cyan-400 hover:bg-cyan-500 text-white py-2 px-6 rounded-lg text-sm font-semibold"
      >
        QUAY LẠI ĐĂNG NHẬP
      </button>
    </div>
  );
}
