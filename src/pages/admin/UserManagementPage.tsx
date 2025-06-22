import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/admin/Breadcrumb";
import SearchBar from "../../components/admin/SearchBar";
import Pagination from "../../components/admin/TablePagination";
import UserFilterBar from "../../components/admin/UserFilterBar";
import UserTable from "../../components/admin/UserTable";
import { FaUser } from "react-icons/fa";

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

export default function UserManagementPage() {
  const [selectedMenu, setSelectedMenu] = useState("Người dùng");
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Gọi API lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi khi tải người dùng:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchSelect = (value: string) => {
    setSearchTerm(value);
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
              items={[{ label: "Danh sách người dùng", path: "/admin/users" }]}
            />
          </div>

          {/* Search + Reset */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="p-6">
              <SearchBar
                placeholder="Tìm kiếm theo tên người dùng, email, ..."
                onSelect={handleSearchSelect}
              />
            </div>
          </div>

          {/* Filter + Thêm người dùng */}
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

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </div>
  );
}
