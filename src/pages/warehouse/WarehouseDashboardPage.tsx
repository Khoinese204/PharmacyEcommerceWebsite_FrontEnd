import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import Breadcrumb from "../../components/admin/Breadcrumb";
import LowStockChart from "../../components/admin/LowStockChart";
import DashboardLowStockTable from "../../components/warehouse/DashboardLowStockTable";


const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [summary, setSummary] = useState<{
    totalMedicineTypes: number;
    lowStockMedicines: number;
    expiredMedicines: number;
  } | null>(null);

  useEffect(() => {
  axios
    .get("/api/warehouse/dashboard-summary")
    .then((res) => {
      console.log("DEBUG - Dashboard summary data:", res.data); // ✅ Thêm dòng này
      setSummary(res.data);
    })
    .catch((err) => {
      console.error("Lỗi lấy dashboard summary:", err); // ✅ In lỗi cụ thể
      setSummary(null);
    });
}, []);


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
          <div className="ml-auto flex items-center gap-4 text-black text-lg">
            <Link to="/warehouse/account">
              <FaUser />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 py-4">
          <div className="mb-2">
            <Breadcrumb items={[{ label: "Kho", path: "/warehouse/inventory" }]} />
          </div>

          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-2xl font-semibold text-gray-800">Bảng điều khiển</h2>
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
            {summary ? (
              [
                {
                  title: "Tổng loại thuốc trong kho",
                  value: summary.totalMedicineTypes,
                },
                {
                  title: "Loại thuốc sắp hết hàng",
                  value: summary.lowStockMedicines,
                },
                {
                  title: "Loại thuốc hết hạn",
                  value: summary.expiredMedicines,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow hover:shadow-md transition"
                >
                  <p className="text-gray-500">{item.title}</p>
                  <p className="text-xl font-bold text-black">{item.value}</p>
                </div>
              ))
            ) : (
              <p>Đang tải dữ liệu...</p>
            )}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <div className="min-w-[1000px]">
              <h2 className="text-lg font-semibold mb-4">Thuốc sắp hết hàng</h2>
              {/* <LowStockChart /> */}
              <DashboardLowStockTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
