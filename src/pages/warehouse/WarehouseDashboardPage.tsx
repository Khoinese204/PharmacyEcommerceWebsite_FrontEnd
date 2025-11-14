import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import Breadcrumb from "../../components/admin/Breadcrumb";
// import LowStockChart from "../../components/admin/LowStockChart"; // Bạn không dùng
import DashboardLowStockTable from "../../components/warehouse/DashboardLowStockTable";
import DashboardNearExpiryTable from "../../components/warehouse/DashboardNearExpiryTable";
// ✅ 1. Import component biểu đồ mới
import ExpiryDonutChart from "../../components/warehouse/ExpiryDonutChart";

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

  // ✅ 2. CẬP NHẬT STATE
  // Bạn CẦN cập nhật backend để trả về 'safeLots'
  const [summary, setSummary] = useState<{
    totalMedicineTypes: number;
    lowStockMedicines: number;
    expiredMedicines: number;
    nearExpiryMedicines: number;
    safeLots: number; // <-- Giả sử backend trả về thêm trường này
  } | null>(null);

  useEffect(() => {
    axios
      .get("/api/warehouse/dashboard-summary")
      .then((res) => {
        console.log("DEBUG - Dashboard summary data:", res.data);
        // GIẢ LẬP DỮ LIỆU (Xóa dòng này khi backend của bạn đã cập nhật)
        // const mockData = { ...res.data, safeLots: 150 }; // Ví dụ 150 lô an toàn
        // setSummary(mockData);

        // DÙNG DÒNG NÀY KHI BACKEND ĐÃ CẬP NHẬT
        setSummary(res.data);
      })
      .catch((err) => {
        console.error("Lỗi lấy dashboard summary:", err);
        setSummary(null);
      });
  }, []);

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      {/* Sidebar (Giữ nguyên) */}
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
        {/* Header (Giữ nguyên) */}
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
            <Breadcrumb
              items={[{ label: "Kho", path: "/warehouse/inventory" }]}
            />
          </div>

          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-2xl font-semibold text-gray-800">
              Bảng điều khiển
            </h2>
          </div>

          {/* Stats (Giữ nguyên) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {summary ? (
              [
                {
                  title: "Tổng loại thuốc trong kho",
                  value: summary.totalMedicineTypes,
                },
                {
                  title: "Lô thuốc sắp hết hàng",
                  value: summary.lowStockMedicines,
                },
                {
                  title: "Lô thuốc hết hạn",
                  value: summary.expiredMedicines,
                },
                {
                  title: "Lô thuốc sắp hết hạn",
                  value: summary.nearExpiryMedicines,
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

          {/* Chart Sắp hết hàng (Giữ nguyên) */}
          <div className="bg-white rounded-xl shadow p-6 overflow-x-auto mb-6">
            <div className="min-w-[1000px]">
              <h2 className="text-lg font-semibold mb-4">Thuốc sắp hết hàng</h2>
              <DashboardLowStockTable />
            </div>
          </div>

          {/* ✅ 3. CẬP NHẬT LAYOUT (Biểu đồ + Bảng Hết hạn) */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Phân bổ Hạn sử dụng</h2>
            {/* Chia grid cho biểu đồ và bảng */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Cột Biểu đồ */}
              <div className="md:col-span-1 h-64">
                {summary ? (
                  <ExpiryDonutChart
                    expired={summary.expiredMedicines}
                    nearExpiry={summary.nearExpiryMedicines}
                    safe={summary.safeLots} // <-- Truyền dữ liệu mới
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p>Đang tải biểu đồ...</p>
                  </div>
                )}
              </div>

              {/* Cột Bảng */}
              <div className="md:col-span-2 overflow-x-auto">
                <h3 className="text-md font-semibold mb-2 text-gray-700">
                  Chi tiết Lô thuốc sắp hết hạn
                </h3>
                <div className="min-w-[700px]">
                  {" "}
                  {/* Đặt min-width ở đây */}
                  <DashboardNearExpiryTable />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
