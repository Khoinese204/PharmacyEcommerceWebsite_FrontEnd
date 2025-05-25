import { useState } from "react";
import Chart from "../../components/admin/RevenueChart";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/admin/UserTable";
import UserFilterBar from "../../components/admin/UserFilterBar";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import SearchBar from "../../components/admin/SearchBar";

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

const mockUsers = [
  {
    id: "00001",
    name: "User 1",
    email: "user1@example.com",
    phone: "0186799000",
    role: "Admin",
    address: "23 Phan Xích Long",
  },
  {
    id: "00002",
    name: "User 2",
    email: "user2@example.com",
    phone: "11 May 2024",
    role: "Sales Staff",
    address: "New York",
  },
  {
    id: "00003",
    name: "User 3",
    email: "user3@example.com",
    phone: "0386799002",
    role: "Warehouse Staff",
    address: "London",
  },
  {
    id: "00004",
    name: "User 4",
    email: "user4@example.com",
    phone: "13 May 2024",
    role: "Customer",
    address: "Paris",
  },
  {
    id: "00005",
    name: "User 5",
    email: "user5@example.com",
    phone: "0586799004",
    role: "Warehouse Staff",
    address: "Berlin",
  },
  {
    id: "00006",
    name: "User 6",
    email: "user6@example.com",
    phone: "15 May 2024",
    role: "Warehouse Staff",
    address: "Tokyo",
  },
  {
    id: "00007",
    name: "User 7",
    email: "user7@example.com",
    phone: "0786799006",
    role: "Admin",
    address: "Seoul",
  },
  {
    id: "00008",
    name: "User 8",
    email: "user8@example.com",
    phone: "17 May 2024",
    role: "Sales Staff",
    address: "Hanoi",
  },
  {
    id: "00009",
    name: "User 9",
    email: "user9@example.com",
    phone: "0986799008",
    role: "Warehouse Staff",
    address: "Bangkok",
  },
  {
    id: "00010",
    name: "User 10",
    email: "user10@example.com",
    phone: "19 May 2024",
    role: "Customer",
    address: "Sydney",
  },
  {
    id: "00011",
    name: "User 11",
    email: "user11@example.com",
    phone: "011867990010",
    role: "Admin",
    address: "23 Phan Xích Long",
  },
  {
    id: "00012",
    name: "User 12",
    email: "user12@example.com",
    phone: "21 May 2024",
    role: "Sales Staff",
    address: "New York",
  },
  {
    id: "00013",
    name: "User 13",
    email: "user13@example.com",
    phone: "013867990012",
    role: "Admin",
    address: "London",
  },
  {
    id: "00014",
    name: "User 14",
    email: "user14@example.com",
    phone: "23 May 2024",
    role: "Sales Staff",
    address: "Paris",
  },
  {
    id: "00015",
    name: "User 15",
    email: "user15@example.com",
    phone: "015867990014",
    role: "Warehouse Staff",
    address: "Berlin",
  },
  {
    id: "00016",
    name: "User 16",
    email: "user16@example.com",
    phone: "25 May 2024",
    role: "Customer",
    address: "Tokyo",
  },
];

const sampleData = [
  "Vitamin C",
  "Canxi",
  "Sắt",
  "Thực phẩm chức năng",
  "Dầu cá Omega 3",
];

export default function UserManagementPage() {
  const [selectedMenu, setSelectedMenu] = useState("Người dùng");
  const navigate = useNavigate();

  // State mới:
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // mỗi trang hiển thị 8 user

  // Giới hạn user theo trang
  const paginatedUsers = mockUsers.slice(
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
              items={[{ label: "Danh sách người dùng", path: "/admin/users" }]}
            />
          </div>
          {/* Search bar*/}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="p-6">
              <SearchBar onSelect={handleSearchSelect} />
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
            <UserFilterBar />

            <button
              onClick={() => navigate("/admin/users/add")}
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-sm"
            >
              Thêm người dùng
            </button>
          </div>

          {/* User Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <UserTable users={paginatedUsers} />
          </div>

          {/* User Table Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(mockUsers.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </div>
  );
}
