import { useState } from "react";
import Chart from "../../components/admin/RevenueChart";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/admin/UserTable";
import UserFilterBar from "../../components/admin/UserFilterBar";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import SearchBar from "../../components/admin/SearchBar";
import MedicineTable from "../../components/admin/MedicineTable";
import MedicineFilterBar from "../../components/admin/MedicineFilterBar";

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

const medicines = [
  {
    id: "00001",
    name: "Nước súc miệng",
    price: 65000,
    category: "Chăm sóc cá nhân",
    stock: 10,
  },
  {
    id: "00002",
    name: "Viên uống Immunvita EasyLife",
    price: 70000,
    category: "Thực phẩm chức năng",
    stock: 20,
  },
  {
    id: "00003",
    name: "Thuốc Exopadin",
    price: 60000,
    category: "Thuốc",
    stock: 15,
  },
  {
    id: "00004",
    name: "Thuốc Vomina Plus",
    price: 100000,
    category: "Thuốc",
    stock: 5,
  },
];

export default function MedicineManagementPage() {
  const [selectedMenu, setSelectedMenu] = useState("Thuốc");
  const navigate = useNavigate();

  // State mới:
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // mỗi trang hiển thị 8 user

  // Giới hạn user theo trang
  const paginated = medicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchSelect = (item: string) => {
    console.log("Đã chọn:", item);
  };

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
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb
              items={[{ label: "Danh sách thuốc", path: "/admin/medicines" }]}
            />
          </div>
          {/* Search bar*/}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="p-6">
              <SearchBar
                onSelect={handleSearchSelect}
                placeholder="Tìm kiếm theo tên thuốc, ..."
              />
            </div>
            {/* Filter Date*/}
            {/* <div className="flex items-center gap-2 text-xs">
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
            </div> */}
          </div>

          {/* Filter + Thêm người dùng trên cùng 1 dòng */}
          <div className="flex justify-between items-center px-6 mb-4">
            <MedicineFilterBar />

            <button
              onClick={() => navigate("/admin/medicines/add")}
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-sm"
            >
              Thêm thuốc
            </button>
          </div>

          {/* User Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <MedicineTable medicines={paginated} />
          </div>

          {/* User Table Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(medicines.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </div>
  );
}
