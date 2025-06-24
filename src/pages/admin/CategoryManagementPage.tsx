import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/admin/Breadcrumb";
import Pagination from "../../components/admin/TablePagination";
import SearchBar from "../../components/admin/SearchBar";
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

const originalCategories = [
  { id: "00001", name: "Thuốc" },
  { id: "00002", name: "Thực phẩm chức năng" },
  { id: "00003", name: "Chăm sóc cá nhân" },
];

export default function CategoryManagementPage() {
  const [selectedMenu, setSelectedMenu] = useState("Danh mục thuốc");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(originalCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 8;

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReset = () => {
    setSearchTerm("");
    setCategories(originalCategories);
  };

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
              items={[
                { label: "Danh sách danh mục", path: "/admin/categories" },
              ]}
            />
          </div>

          {/* Search + Filter */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="p-6">
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSelect={(value: string) => setSearchTerm(value)}
                placeholder="Tìm kiếm theo tên danh mục..."
              />
            </div>
            <button
              onClick={handleReset}
              className="text-sm px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 mr-4"
            >
              Đặt lại mặc định
            </button>
          </div>

          {/* Add button */}
          <div className="flex justify-between items-center px-6 mb-4">
            <div></div>
            <button
              onClick={() => navigate("/admin/categories/add")}
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-sm"
            >
              Thêm danh mục
            </button>
          </div>

          {/* Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <table className="w-full text-left text-sm table-auto">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="px-4 py-2 font-semibold">ID</th>
                  <th className="px-4 py-2 font-semibold">TÊN DANH MỤC</th>
                  <th className="px-4 py-2 font-semibold text-center">
                    HÀNH ĐỘNG
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((cat) => (
                  <tr key={cat.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{cat.id}</td>
                    <td className="px-4 py-2">{cat.name}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        title="Sửa"
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        ✏️
                      </button>
                      <button
                        title="Xoá"
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
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
            totalPages={Math.ceil(filtered.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </div>
  );
}
