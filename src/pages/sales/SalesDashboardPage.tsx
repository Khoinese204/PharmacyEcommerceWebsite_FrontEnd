import { useState } from "react";
import OrderChart from "../../components/admin/OrderChart";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const menu = [
  { label: "Bảng điều khiển", path: "/sales/dashboard" },
  { label: "Đơn hàng", path: "/sales/orders" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md px-4 py-6 space-y-4">
        <div className="font-bold text-lg text-blue-600 mb-6">PrimeCare</div>
        {menu.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`block w-full text-left px-3 py-2 rounded transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </aside>
      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          {/* Icon nằm sát phải */}
          <div className="ml-auto flex items-center gap-4 text-black text-lg">
            <Link to="/sales/account">
              <FaUser />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 py-4">
          {/* Title + Filters */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-2xl font-semibold text-gray-800">
              Bảng điều khiển
            </h2>
            <div className="flex items-center gap-2 text-xs">
              <select className="border rounded px-2 py-1 z-10 relative">
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1}>{`Tháng ${i + 1}`}</option>
                ))}
              </select>
              <select className="border rounded px-2 py-1 z-10 relative">
                {[2024, 2025].map((year) => (
                  <option key={year}>{`Năm ${year}`}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { title: "Đơn hàng đang chờ xác nhận", value: "15" },
              { title: "Đơn hàng đang xử lý", value: "24" },
              { title: "Đơn hàng đã vận chuyển", value: "10" },
              { title: "Đơn hàng đã giao", value: "82" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow hover:shadow-md transition"
              >
                <p className="text-gray-500">{item.title}</p>
                <p className="text-xl font-bold text-black">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <div className="min-w-[1000px]">
              <h2 className="text-lg font-semibold mb-4">Đơn hàng</h2>
              <OrderChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
