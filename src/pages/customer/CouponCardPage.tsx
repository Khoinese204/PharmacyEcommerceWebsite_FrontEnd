import BreadcrumbTo from "../../components/common/BreadcrumbTo";
import UserSidebar from "../../components/common/UserSidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePickerWithIcon from "../../components/common/DatePickerWithIcon";
import { Link } from "react-router-dom";

const breadcrumbItems = [
  { label: "Cá nhân", path: "/account/profile" },
  { label: "Mã giảm giá", path: "/account/couponcard" },
];

export default function CouponCardPage() {
  return (
    <div className="bg-gray-50 min-h-screen text-sm">
      {/* Breadcrumb */}
      <BreadcrumbTo items={breadcrumbItems}></BreadcrumbTo>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Sidebar */}
        <UserSidebar activePath="/account/profile" />
        {/* Main content */}
        <div className="md:col-span-3">
          <h2 className="text-left text-base font-semibold text-cyan-700 mb-4">
            Mã giảm giá
          </h2>

          <div className="text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white border rounded shadow-sm p-4 flex flex-col h-full"
              >
                {/* Logo + Title */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-800 rounded flex items-center justify-center text-white font-bold text-xs">
                    {/* Giả lập logo hoặc ảnh */}
                    <img
                      src="/logo-placeholder.png"
                      alt="logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-sm font-semibold text-black leading-snug">
                    SIEUDEAL Giảm 10% tối đa 70k đơn Online 299K
                  </div>
                </div>

                {/* Trạng thái + hạn sử dụng */}
                <div className="mt-2 text-gray-600 text-xs">
                  Trạng thái: <span className="font-medium">Đang áp dụng</span>
                  <br />
                  HSD: 31/05/2025
                </div>

                {/* Link xem chi tiết */}
                <div className="mt-auto pt-2 text-right">
                  <a
                    href="#"
                    className="text-xs text-cyan-600 font-medium hover:underline"
                  >
                    Xem chi tiết
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
