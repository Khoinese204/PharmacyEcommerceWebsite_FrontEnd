import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface UserSidebarProps {
  activePath: string; // e.g. "/orders"
}

const menuItems = [
  { label: "Thông tin cá nhân", path: "/account/profile" },
  { label: "Lịch sử đơn hàng", path: "/account/orderhistory" },
  { label: "Mã giảm giá", path: "/account/couponcard" },
  { label: "Đăng xuất", path: "/account/logout" },
];

export default function UserSidebar({ activePath }: UserSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-white border shadow-sm rounded-md w-full max-w-[220px] text-sm min-h-[300px]">
      <div className="border-b p-4 font-bold uppercase text-center text-black">
        Nguyễn Văn A
      </div>

      <ul className="py-4 px-6 space-y-3">
        {menuItems.map((item, index) => {
          const isActive = currentPath === item.path;

          return (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer text-center hover:text-blue-500 ${
                isActive ? "text-blue-600 font-semibold" : "text-black"
              }`}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
