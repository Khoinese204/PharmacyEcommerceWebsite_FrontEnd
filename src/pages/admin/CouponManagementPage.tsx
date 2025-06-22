import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  { label: "Kho", path: "/admin/warehouse" },
  { label: "Doanh thu", path: "/admin/revenue" },
  { label: "Khách hàng", path: "/admin/customers" },
  { label: "Lịch sử giá", path: "/admin/price-history" },
];

export default function CouponManagementPage() {
  const [selectedMenu, setSelectedMenu] = useState("Mã giảm giá");
  const [searchTerm, setSearchTerm] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 8;

  // Gọi API để lấy danh sách mã giảm giá
  const fetchCoupons = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/promotions/all");
      const formatted = res.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        discount: item.discountPercent || 0,
        startDate: new Date(item.startDate).toLocaleDateString("vi-VN"),
        endDate: new Date(item.endDate).toLocaleDateString("vi-VN"),
        applicableCategories: item.applicableCategoryName || "Tất cả danh mục",
      }));
      setCoupons(formatted);
    } catch (error) {
      console.error("Lỗi khi tải mã giảm giá:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleReset = () => {
    setSearchTerm("");
    fetchCoupons();
  };

  const filtered = coupons.filter((coupon: any) =>
    coupon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
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
                { label: "Danh sách mã giảm giá", path: "/admin/coupons" },
              ]}
            />
          </div>

          {/* Search + Reset */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="p-6">
              <SearchBar
                placeholder="Tìm kiếm theo tên mã giảm giá..."
                onSelect={(value: string) => setSearchTerm(value)}
              />
            </div>
            <button
              onClick={handleReset}
              className="text-sm px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 mr-4"
            >
              Đặt lại mặc định
            </button>
          </div>

          {/* Filter + Add button */}
          <div className="flex justify-between items-center px-6 mb-4">
            <div></div>
            <button
              onClick={() => navigate("/admin/coupons/add")}
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-sm"
            >
              Thêm mã giảm giá
            </button>
          </div>

          {/* Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <table className="w-full text-left text-sm table-auto">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="px-4 py-2 font-semibold">ID</th>
                  <th className="px-4 py-2 font-semibold">TÊN MÃ GIẢM GIÁ</th>
                  <th className="px-4 py-2 font-semibold">GIẢM (%)</th>
                  <th className="px-4 py-2 font-semibold">NGÀY BẮT ĐẦU</th>
                  <th className="px-4 py-2 font-semibold">NGÀY KẾT THÚC</th>
                  <th className="px-4 py-2 font-semibold">DANH MỤC ÁP DỤNG</th>
                  <th className="px-4 py-2 font-semibold text-center">
                    HÀNH ĐỘNG
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((coupon: any) => (
                  <tr key={coupon.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{coupon.id}</td>
                    <td className="px-4 py-2">{coupon.name}</td>
                    <td className="px-4 py-2">{coupon.discount}%</td>
                    <td className="px-4 py-2">{coupon.startDate}</td>
                    <td className="px-4 py-2">{coupon.endDate}</td>
                    <td className="px-4 py-2">{coupon.applicableCategories}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button title="Xem" className="hover:text-blue-600">
                        👁️
                      </button>
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
