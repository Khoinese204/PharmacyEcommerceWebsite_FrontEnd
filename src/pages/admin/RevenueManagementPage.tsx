import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/admin/Breadcrumb";
import Pagination from "../../components/admin/TablePagination";
import { FaUser } from "react-icons/fa";

const menu = [
  { label: "Bảng điều khiển", path: "/admin/dashboard" },
  { label: "Người dùng", path: "/admin/users" },
  { label: "Thuốc", path: "/admin/medicines" },
  { label: "Danh mục thuốc", path: "/admin/categories" },
  { label: "Mã giảm giá", path: "/admin/coupons" },
  // { label: "Kho", path: "/admin/warehouse" },
  // { label: "Doanh thu", path: "/admin/revenue" },
  // { label: "Khách hàng", path: "/admin/customers" },
  // { label: "Lịch sử giá", path: "/admin/price-history" },
];

const revenueData = [
  {
    id: "00001",
    productName: "Nước súc miệng",
    category: "Vệ sinh",
    revenue: 65000,
    orders: 3,
  },
  {
    id: "00002",
    productName: "Thuốc hạ sốt",
    category: "Thuốc",
    revenue: 100000,
    orders: 5,
  },
  {
    id: "00003",
    productName: "Thuốc giảm đau Paracetamol",
    category: "Thuốc",
    revenue: 75000,
    orders: 4,
  },
  {
    id: "00004",
    productName: "Viên uống bổ gan",
    category: "Thực phẩm chức năng",
    revenue: 150000,
    orders: 6,
  },
  {
    id: "00005",
    productName: "Viên uống Vitamin C",
    category: "Thực phẩm chức năng",
    revenue: 80000,
    orders: 2,
  },
  {
    id: "00006",
    productName: "Dung dịch sát khuẩn",
    category: "Vệ sinh",
    revenue: 60000,
    orders: 3,
  },
  {
    id: "00007",
    productName: "Khẩu trang y tế",
    category: "Vệ sinh",
    revenue: 45000,
    orders: 4,
  },
  {
    id: "00008",
    productName: "Gel rửa tay khô",
    category: "Vệ sinh",
    revenue: 55000,
    orders: 2,
  },
];

export default function RevenueManagementPage() {
  const [selectedMenu, setSelectedMenu] = useState("Doanh thu");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 8;

  const paginated = revenueData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      {/* Sidebar */}
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

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          {/* Icon nằm sát phải */}
          <div className="ml-auto flex items-center gap-4 text-black text-lg">
            <Link to="/admin/account">
              <FaUser />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb
              items={[{ label: "Doanh thu", path: "/admin/revenue" }]}
            />
          </div>

          {/* Thống kê doanh thu */}
          <div className="grid grid-cols-3 gap-6 mb-6 px-6">
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-600 mb-1">Tổng doanh thu</p>
              <p className="text-xl font-bold">
                {revenueData
                  .reduce((acc, item) => acc + item.revenue, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-600 mb-1">Tổng đơn hàng</p>
              <p className="text-xl font-bold">
                {revenueData.reduce((acc, item) => acc + item.orders, 0)}
              </p>
            </div>
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-600 mb-1">Khách hàng mới</p>
              <p className="text-xl font-bold">1</p>
            </div>
          </div>

          {/* Bộ lọc */}
          <div className="flex items-center gap-4 mb-4 px-6">
            <select className="border px-2 py-1 rounded">
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1}>{`Tháng ${i + 1}`}</option>
              ))}
            </select>
            <select className="border px-2 py-1 rounded">
              {[2024, 2025].map((year) => (
                <option key={year}>{`Năm ${year}`}</option>
              ))}
            </select>
          </div>

          {/* Bảng doanh thu */}
          <div className="bg-white p-4 rounded-xl shadow">
            <table className="w-full text-left text-sm table-auto">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="px-4 py-2 font-semibold">ID</th>
                  <th className="px-4 py-2 font-semibold">TÊN SẢN PHẨM</th>
                  <th className="px-4 py-2 font-semibold">DANH MỤC</th>
                  <th className="px-4 py-2 font-semibold">DOANH THU</th>
                  <th className="px-4 py-2 font-semibold">SỐ ĐƠN HÀNG</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.productName}</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">
                      {item.revenue.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{item.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(revenueData.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </div>
  );
}
