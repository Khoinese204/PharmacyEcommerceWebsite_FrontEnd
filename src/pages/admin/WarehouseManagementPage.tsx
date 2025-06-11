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

const originalStockItems = [
  {
    id: "00001",
    name: "Nước súc miệng",
    price: 65000,
    category: "Vệ sinh",
    stock: 10,
    expiryDate: "7/5/2028",
    status: "TỒN KHO THẤP",
  },
  {
    id: "00002",
    name: "Thuốc hạ sốt",
    price: 100000,
    category: "Thuốc",
    stock: 30,
    expiryDate: "7/5/2025",
    status: "HẾT HẠN",
  },
  {
    id: "00003",
    name: "Khẩu trang y tế",
    price: 25000,
    category: "Vệ sinh",
    stock: 5,
    expiryDate: "12/10/2026",
    status: "TỒN KHO THẤP",
  },
  {
    id: "00004",
    name: "Viên uống bổ sung Vitamin C",
    price: 80000,
    category: "Thực phẩm chức năng",
    stock: 50,
    expiryDate: "15/3/2027",
    status: "BÌNH THƯỜNG",
  },
  {
    id: "00005",
    name: "Dung dịch sát khuẩn",
    price: 45000,
    category: "Vệ sinh",
    stock: 12,
    expiryDate: "1/8/2026",
    status: "TỒN KHO THẤP",
  },
  {
    id: "00006",
    name: "Thuốc cảm cúm Coldrex",
    price: 95000,
    category: "Thuốc",
    stock: 40,
    expiryDate: "22/11/2025",
    status: "BÌNH THƯỜNG",
  },
  {
    id: "00007",
    name: "Gel rửa tay khô",
    price: 32000,
    category: "Vệ sinh",
    stock: 3,
    expiryDate: "9/9/2025",
    status: "TỒN KHO THẤP",
  },
  {
    id: "00008",
    name: "Thuốc kháng sinh Amoxicillin",
    price: 70000,
    category: "Thuốc",
    stock: 0,
    expiryDate: "5/6/2024",
    status: "HẾT HẠN",
  },
  {
    id: "00009",
    name: "Viên uống bổ gan",
    price: 120000,
    category: "Thực phẩm chức năng",
    stock: 25,
    expiryDate: "20/12/2026",
    status: "BÌNH THƯỜNG",
  },
  {
    id: "00010",
    name: "Thuốc giảm đau Paracetamol",
    price: 50000,
    category: "Thuốc",
    stock: 8,
    expiryDate: "1/1/2026",
    status: "TỒN KHO THẤP",
  },
];

export default function WarehouseManagementPage() {
  const [selectedMenu, setSelectedMenu] = useState("Kho");
  const [currentPage, setCurrentPage] = useState(1);
  const [items] = useState(originalStockItems);
  const navigate = useNavigate();
  const itemsPerPage = 8;

  const paginated = items.slice(
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
            <Breadcrumb items={[{ label: "Kho", path: "/admin/warehouse" }]} />
          </div>

          {/* Thống kê kho */}
          <div className="grid grid-cols-3 gap-6 mb-6 px-6">
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-600 mb-1">Tồn kho</p>
              <p className="text-xl font-bold">100</p>
            </div>
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-600 mb-1">Loại hàng tồn kho thấp</p>
              <p className="text-xl font-bold">5</p>
            </div>
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-600 mb-1">Hết hạn</p>
              <p className="text-xl font-bold">1</p>
            </div>
          </div>

          {/* Table tồn kho */}
          <div className="bg-white p-4 rounded-xl shadow">
            <table className="w-full text-left text-sm table-auto">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="px-4 py-2 font-semibold">ID</th>
                  <th className="px-4 py-2 font-semibold">TÊN</th>
                  <th className="px-4 py-2 font-semibold">GIÁ</th>
                  <th className="px-4 py-2 font-semibold">DANH MỤC</th>
                  <th className="px-4 py-2 font-semibold">TỒN KHO</th>
                  <th className="px-4 py-2 font-semibold">NGÀY HẾT HẠN</th>
                  <th className="px-4 py-2 font-semibold">TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.price.toLocaleString()}</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">{item.stock}</td>
                    <td className="px-4 py-2">{item.expiryDate}</td>
                    <td className="px-4 py-2">
                      {item.status === "HẾT HẠN" ? (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                          HẾT HẠN
                        </span>
                      ) : (
                        <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">
                          TỒN KHO THẤP
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </div>
  );
}
