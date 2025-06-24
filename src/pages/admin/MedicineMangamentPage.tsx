import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import Breadcrumb from "../../components/admin/Breadcrumb";
import Pagination from "../../components/admin/TablePagination";
import SearchBar from "../../components/admin/SearchBar";
import MedicineTable from "../../components/admin/MedicineTable";
import MedicineFilterBar from "../../components/admin/MedicineFilterBar";
import type { Medicine } from "../../components/admin/MedicineTable";

const menu = [
  { label: "Bảng điều khiển", path: "/admin/dashboard" },
  { label: "Người dùng", path: "/admin/users" },
  { label: "Thuốc", path: "/admin/medicines" },
  { label: "Danh mục thuốc", path: "/admin/categories" },
  { label: "Mã giảm giá", path: "/admin/coupons" },
//   { label: "Kho", path: "/admin/warehouse" },
//   { label: "Doanh thu", path: "/admin/revenue" },
//   { label: "Khách hàng", path: "/admin/customers" },
//   { label: "Lịch sử giá", path: "/admin/price-history" },
];

export default function MedicineManagementPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedMenu, setSelectedMenu] = useState("Thuốc");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  const onReset = () => {
    setCategoryFilter("");
    setPriceFilter("");
    setSearchKeyword("");
  };

  const handleSearchSelect = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const filteredMedicines = medicines.filter((med) => {
    const matchCategory =
      categoryFilter === "" ||
      (categoryFilter === "Thuốc" && med.categoryId === 1) ||
      (categoryFilter === "Thực phẩm chức năng" && med.categoryId === 2) ||
      (categoryFilter === "Chăm sóc cá nhân" && med.categoryId === 3);

    const matchPrice =
      priceFilter === "" ||
      (priceFilter === "Dưới 100.000đ" && med.price < 100000) ||
      (priceFilter === "100.000đ - 300.000đ" &&
        med.price >= 100000 &&
        med.price <= 300000) ||
      (priceFilter === "300.000đ - 500.000đ" &&
        med.price > 300000 &&
        med.price <= 500000) ||
      (priceFilter === "Trên 500.000đ" && med.price > 500000);

    const matchSearch =
      searchKeyword.trim() === "" ||
      med.name.toLowerCase().includes(searchKeyword.toLowerCase());

    return matchCategory && matchPrice && matchSearch;
  });

  const paginated = filteredMedicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await fetch("/api/medicines");
        const data = await res.json();
        setMedicines(data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách thuốc:", err);
      }
    };

    fetchMedicines();
  }, []);

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
              items={[{ label: "Danh sách thuốc", path: "/admin/medicines" }]}
            />
          </div>

          {/* Search bar*/}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="p-6">
              <SearchBar
                onSelect={handleSearchSelect}
                placeholder="Tìm kiếm theo tên thuốc, ..."
                value={searchKeyword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchKeyword(e.target.value)
                }
              />
            </div>
          </div>

          {/* Filter + Thêm người dùng */}
          <div className="flex justify-between items-center px-6 mb-4">
            <MedicineFilterBar
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              onReset={onReset}
            />
            <button
              onClick={() => navigate("/admin/medicines/add")}
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-sm"
            >
              Thêm thuốc
            </button>
          </div>

          {/* Medicine Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <MedicineTable medicines={paginated} />
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredMedicines.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </div>
  );
}
