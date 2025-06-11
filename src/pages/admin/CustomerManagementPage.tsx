import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/admin/Breadcrumb";
import Pagination from "../../components/admin/TablePagination";

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

const customers = [
  {
    id: "00001",
    name: "Nguyễn Văn A",
    phone: "0987654321",
    email: "nguyenvana@gmail.com",
    totalOrders: 3,
    totalSpent: 65000,
  },
  {
    id: "00002",
    name: "Trần Thị B",
    phone: "0912345678",
    email: "tranthib@gmail.com",
    totalOrders: 5,
    totalSpent: 100000,
  },
  {
    id: "00003",
    name: "Lê Văn C",
    phone: "0909090909",
    email: "levanc@gmail.com",
    totalOrders: 2,
    totalSpent: 45000,
  },
];

export default function CustomerManagementPage() {
  const [selectedMenu, setSelectedMenu] = useState("Khách hàng");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 8;

  const paginated = customers.slice(
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
              items={[{ label: "Khách hàng", path: "/admin/customers" }]}
            />
          </div>

          {/* Thống kê khách hàng */}
          <div className="grid grid-cols-3 gap-6 mb-6 px-6">
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-600 mb-1">Tổng doanh thu</p>
              <p className="text-xl font-bold">
                {customers
                  .reduce((acc, c) => acc + c.totalSpent, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-600 mb-1">Tổng khách hàng mới</p>
              <p className="text-xl font-bold">5</p>
            </div>
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-600 mb-1">Tổng khách hàng trung thành</p>
              <p className="text-xl font-bold">1</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <table className="w-full text-left text-sm table-auto">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="px-4 py-2 font-semibold">ID</th>
                  <th className="px-4 py-2 font-semibold">TÊN KHÁCH HÀNG</th>
                  <th className="px-4 py-2 font-semibold">SỐ ĐIỆN THOẠI</th>
                  <th className="px-4 py-2 font-semibold">EMAIL</th>
                  <th className="px-4 py-2 font-semibold">TOTAL ORDERS</th>
                  <th className="px-4 py-2 font-semibold">TOTAL SPENT</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{customer.id}</td>
                    <td className="px-4 py-2">{customer.name}</td>
                    <td className="px-4 py-2">{customer.phone}</td>
                    <td className="px-4 py-2">{customer.email}</td>
                    <td className="px-4 py-2">{customer.totalOrders}</td>
                    <td className="px-4 py-2">
                      {customer.totalSpent.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(customers.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </div>
  );
}
