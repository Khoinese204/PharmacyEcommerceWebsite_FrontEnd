import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BreadcrumbTo from "../../components/common/BreadcrumbTo";

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const breadcrumbItems = [
    { label: "Cá nhân", path: "/account/profile" },
    { label: "Thông tin hồ sơ", path: "/account/profile" },
    { label: "Cập nhật mật khẩu", path: "/account/change-password" },
  ];

  return (
    <>
      <BreadcrumbTo items={breadcrumbItems}></BreadcrumbTo>
      <div className="text-left bg-white p-6 rounded-md shadow-sm max-w-xl mx-auto mt-6">
        <h2 className="text-sm font-semibold text-black mb-4">
          CẬP NHẬT MẬT KHẨU
        </h2>

        <div className="space-y-4 text-sm">
          {/* Mật khẩu hiện tại */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Mật khẩu hiện tại
            </label>
            <input
              type={showCurrent ? "text" : "password"}
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10  text-black"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-[38px] text-gray-500"
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Mật khẩu mới */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Mật khẩu mới
            </label>
            <input
              type={showNew ? "text" : "password"}
              placeholder="Ít nhất có 8 kí tự"
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10  text-black"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-[38px] text-gray-500"
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Nhập lại mật khẩu
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10  text-black"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-[38px] text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Nút hoàn thành */}
          <div className="pt-4">
            <button className="bg-cyan-400 text-white px-6 py-2 rounded-md font-semibold">
              Hoàn thành
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
