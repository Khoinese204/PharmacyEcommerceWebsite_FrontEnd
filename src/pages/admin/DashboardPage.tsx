import { useState } from "react";
import Chart from "../../components/admin/RevenueChart";
import { useNavigate } from "react-router-dom";
import OrdersChart from "../../components/admin/OrderChart";
import CustomerChart from "../../components/admin/CustomerChart";
import LowStockChart from "../../components/admin/LowStockChart";

const menu = [
  { label: "Bảng điều khiển", path: "/admin/dashboard" },
  { label: "Người dùng", path: "/admin/users" },
  { label: "Thuốc", path: "/admin/medicines" },
  { label: "Danh mục thuốc", path: "/admin/categories" },
  { label: "Mã giảm giá", path: "/admin/coupons" },
  { label: "Kho", path: "/admin/warehouse" },
  { label: "Doanh thu", path: "/admin/revenue" },
  { label: "Khách hàng", path: "/admin/customers" },
  { label: "Lịch sử giá", path: "/admin/price-history" },
];

export default function DashboardPage() {
  const [selectedMenu, setSelectedMenu] = useState("Bảng điều khiển");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
  const navigate = useNavigate();
  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md px-4 py-6 space-y-4">
        <div className="font-bold text-lg text-blue-600 mb-6">PrimeCare</div>
        {menu.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(item.path)} // chuyển trang
            className={`block w-full text-left px-3 py-2 rounded transition ${
              selectedMenu === item.label
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </aside>
      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          <div className="ml-auto flex items-center gap-2 text-sm">
            <img
              src="/avatar.jpg"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">Boss</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 py-4 relative">
          {/* Phân trang trong content */}
          {currentPage === 1 && (
            <>
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
                  { title: "Tổng doanh thu", value: "198.500.000đ" },
                  { title: "Tổng số đơn hàng", value: "1.820" },
                  { title: "Tổng số khách hàng", value: "1.035" },
                  { title: "Tổng số loại sản phẩm tồn kho thấp", value: "5" },
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
                  <h2 className="text-lg font-semibold mb-4">Doanh thu</h2>
                  <Chart />
                </div>
              </div>
            </>
          )}
          {currentPage === 2 && (
            <>
              <h2 className="text-lg font-semibold mb-4">Đơn hàng</h2>
              <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
                <div className="min-w-[1000px]">
                  <OrdersChart />
                </div>
              </div>
            </>
          )}
          {currentPage === 3 && (
            <>
              <h2 className="text-lg font-semibold mb-4">Khách hàng</h2>
              <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
                <div className="min-w-[1000px]">
                  <CustomerChart />
                </div>
              </div>
            </>
          )}
          {currentPage === 4 && (
            <>
              <h2 className="text-lg font-semibold mb-4">
                Sản phẩm tồn kho thấp (&lt;=20)
              </h2>
              <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
                <div className="min-w-[1000px]">
                  <LowStockChart />
                </div>
              </div>
            </>
          )}

          {/* Pagination below the chart */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-blue-600 border-blue-500 hover:bg-blue-50"
              }`}
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-blue-600 border-blue-500 hover:bg-blue-50"
              }`}
            >
              ›
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
