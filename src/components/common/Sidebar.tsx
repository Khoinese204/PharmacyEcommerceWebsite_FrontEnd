import React from "react";
import { FaChartBar, FaBox, FaUser, FaTags, FaClipboardList, FaSignOutAlt, FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white min-h-screen shadow-lg fixed left-0 top-0">
      <div className="px-6 py-4 border-b text-2xl font-bold text-blue-600">
        PrimeCare
      </div>
      <nav className="flex flex-col gap-2 p-4 text-gray-700 text-sm">
        <NavItem icon={<FaHome />} label="Tổng quan" />
        <NavItem icon={<FaClipboardList />} label="Đơn hàng" />
        <NavItem icon={<FaBox />} label="Sản phẩm" />
        <NavItem icon={<FaUser />} label="Tài khoản" />
        <NavItem icon={<FaTags />} label="Khuyến mãi" />
        <NavItem icon={<FaChartBar />} label="Thống kê" />
        <div className="mt-auto pt-6">
          <NavItem icon={<FaSignOutAlt />} label="Đăng xuất" danger />
        </div>
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label, danger = false }: { icon: React.ReactNode; label: string; danger?: boolean }) => (
  <div
    className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 cursor-pointer ${
      danger ? "text-red-500" : ""
    }`}
  >
    <span className="text-base">{icon}</span>
    <span>{label}</span>
  </div>
);

export default Sidebar;
