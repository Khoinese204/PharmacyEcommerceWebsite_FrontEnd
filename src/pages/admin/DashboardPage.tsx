// DashboardPage.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import OrdersChart from "../../components/admin/OrderChart";
import CustomerChart from "../../components/admin/CustomerChart";
import LowStockChart from "../../components/admin/LowStockChart";
import RevenueChart from "../../components/admin/RevenueChart";
import axios from "axios";

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
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Bảng điều khiển");
  const [currentPage, setCurrentPage] = useState(1);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [summary, setSummary] = useState<any>(null);
  const [revenueChart, setRevenueChart] = useState<any[]>([]);
  const [ordersChart, setOrdersChart] = useState<any[]>([]);
  const [customersChart, setCustomersChart] = useState<any[]>([]);
  const [lowStockChart, setLowStockChart] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [summaryRes, revenueRes, ordersRes, customersRes, lowStockRes] =
        await Promise.all([
          axios.get(`/api/admin/dashboard/summary?month=${month}&year=${year}`),
          axios.get(
            `/api/admin/dashboard/revenue-chart?month=${month}&year=${year}`
          ),
          axios.get(
            `/api/admin/dashboard/orders-chart?month=${month}&year=${year}`
          ),
          axios.get(
            `/api/admin/dashboard/customers-chart?month=${month}&year=${year}`
          ),
          axios.get(
            `/api/admin/dashboard/low-stock-chart?month=${month}&year=${year}`
          ),
        ]);

      setSummary(summaryRes.data);
      setRevenueChart(revenueRes.data);
      setOrdersChart(ordersRes.data);
      setCustomersChart(customersRes.data);
      setLowStockChart(lowStockRes.data);
    };
    fetchData();
  }, [month, year]);

  const [totalPages] = useState(4);

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      <aside className="w-60 bg-white shadow-md px-4 py-6 space-y-4">
        <div className="font-bold text-lg text-blue-600 mb-6">PrimeCare</div>
        {menu.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
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
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          <div className="ml-auto flex items-center gap-4 text-black text-lg">
            <Link to="/admin/account">
              <FaUser />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-4 relative">
          {currentPage === 1 && (
            <>
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Bảng điều khiển
                </h2>
                <div className="flex items-center gap-2 text-xs">
                  <select
                    className="border rounded px-2 py-1 z-10 relative"
                    value={month}
                    onChange={(e) => setMonth(+e.target.value)}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{`Tháng ${
                        i + 1
                      }`}</option>
                    ))}
                  </select>
                  <select
                    className="border rounded px-2 py-1 z-10 relative"
                    value={year}
                    onChange={(e) => setYear(+e.target.value)}
                  >
                    {[2024, 2025].map((year) => (
                      <option key={year} value={year}>{`Năm ${year}`}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {summary &&
                  [
                    {
                      title: "Tổng doanh thu",
                      value: summary.totalRevenue.toLocaleString("vi-VN") + "đ",
                    },
                    { title: "Tổng số đơn hàng", value: summary.totalOrders },
                    {
                      title: "Tổng số khách hàng",
                      value: summary.totalCustomers,
                    },
                    {
                      title: "Sản phẩm tồn kho thấp",
                      value: summary.lowStockProductTypes,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 shadow hover:shadow-md transition"
                    >
                      <p className="text-gray-500">{item.title}</p>
                      <p className="text-xl font-bold text-black">
                        {item.value}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
                <div className="min-w-[1000px]">
                  <h2 className="text-lg font-semibold mb-4">
                    {" "}
                    Biểu đồ doanh thu hàng ngày
                  </h2>
                  <RevenueChart data={revenueChart} />
                </div>
              </div>
            </>
          )}

          {currentPage === 2 && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">
                Biểu đồ số đơn hàng mỗi ngày
              </h2>
              <OrdersChart data={ordersChart} />
            </div>
          )}

          {currentPage === 3 && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">
                Biểu đồ tăng trưởng khách hàng
              </h2>
              <CustomerChart data={customersChart} />
            </div>
          )}

          {currentPage === 4 && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">
                Biểu đồ sản phẩm sắp hết hàng (số lượng nhỏ hơn 20)
              </h2>
              <p className="text-sm text-blue-500">
                Được tính ở thời điểm hiện tại
              </p>
              <LowStockChart data={lowStockChart} />
            </div>
          )}

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
