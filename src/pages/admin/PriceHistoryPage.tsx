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

const priceHistoryData = [
  {
    id: "00001",
    medicineName: "Nước súc miệng",
    importDate: "2025-01-01",
    importPrice: 40000,
    salePrice: 50000,
    effectiveDate: "2025-01-01",
    updatedBy: "Admin1",
  },
  {
    id: "00002",
    medicineName: "Thuốc hạ sốt",
    importDate: "2025-03-15",
    importPrice: 60000,
    salePrice: 75000,
    effectiveDate: "2025-03-16",
    updatedBy: "Admin2",
  },
];

export default function PriceHistoryPage() {
  const [selectedMenu, setSelectedMenu] = useState("Lịch sử giá");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 8;

  const paginated = priceHistoryData.slice(
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
              items={[{ label: "Lịch sử giá", path: "/admin/price-history" }]}
            />
          </div>

          {/* Filter by Month & Year */}
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

          {/* Search Bar */}
          <div className="flex items-center gap-2 px-6 mb-4">
            <input
              type="text"
              placeholder="Tên thuốc, thực phẩm chức năng, chăm sóc cá nhân"
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Tìm
            </button>
          </div>

          {/* Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <table className="w-full text-left text-sm table-auto">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="px-4 py-2 font-semibold">ID</th>
                  <th className="px-4 py-2 font-semibold">TÊN THUỐC</th>
                  <th className="px-4 py-2 font-semibold">NGÀY NHẬP KHO</th>
                  <th className="px-4 py-2 font-semibold">GIÁ NHẬP</th>
                  <th className="px-4 py-2 font-semibold">GIÁ BÁN</th>
                  <th className="px-4 py-2 font-semibold">NGÀY HIỆU LỰC</th>
                  <th className="px-4 py-2 font-semibold">NGƯỜI CHỈNH SỬA</th>
                  <th className="px-4 py-2 font-semibold text-center">
                    HÀNH ĐỘNG
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.medicineName}</td>
                    <td className="px-4 py-2">{item.importDate}</td>
                    <td className="px-4 py-2">
                      {item.importPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {item.salePrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{item.effectiveDate}</td>
                    <td className="px-4 py-2">{item.updatedBy}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        title="Xem chi tiết"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() =>
                          navigate(`/admin/price-history/${item.id}`)
                        }
                      >
                        👁️
                      </button>
                      <button
                        title="Thêm mới"
                        className="text-gray-600 hover:text-black"
                      >
                        ➕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(priceHistoryData.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </div>
  );
}
