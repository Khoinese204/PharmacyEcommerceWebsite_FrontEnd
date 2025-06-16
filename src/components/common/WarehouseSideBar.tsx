import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface UserSidebarProps {
  activePath: string; // e.g. "/orders"
}

const menuItems = [
  { label: "Thông tin cá nhân", path: "/warehouse/account" },
  { label: "Đăng xuất", path: "/account/logout" }, // special case
];

export default function WarehouseSidebar({ activePath }: UserSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const storedUser = localStorage.getItem("user");
  const fullName = storedUser ? JSON.parse(storedUser).fullName : "";

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Dù lỗi vẫn xử lý logout phía client
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth"; // ✅ reload lại app hoàn toàn
    }
  };

  const handleClick = (path: string) => {
    if (path === "/account/logout") {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  return (
    <div className="bg-white border shadow-sm rounded-md w-full max-w-[220px] text-sm min-h-[300px]">
      <div className="border-b p-4 font-bold uppercase text-center text-black">
        {fullName}
      </div>

      <ul className="py-4 px-6 space-y-3">
        {menuItems.map((item, index) => {
          const isActive = currentPath === item.path;

          return (
            <li
              key={index}
              onClick={() => handleClick(item.path)}
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
