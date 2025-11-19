import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import Breadcrumb from "../../components/admin/Breadcrumb";
import Pagination from "../../components/admin/TablePagination";
import SearchBar from "../../components/admin/SearchBar";
import MedicineTable from "../../components/admin/MedicineTable";
import MedicineFilterBar from "../../components/admin/MedicineFilterBar";

export interface Medicine {
  id: number;
  name: string;
  price?: number;
  originalPrice?: number;
  imageUrl?: string;
  unit: string;
  categoryId: number;
  category?: { id: number; name: string };
  expiryDate?: string;
  stock?: number;
  description?: string;
}

interface Category {
  id: number;
  name: string;
}

const menu = [
  { label: "Bảng điều khiển", path: "/admin/dashboard" },
  { label: "Người dùng", path: "/admin/users" },
  { label: "Thuốc", path: "/admin/medicines" },
  { label: "Danh mục thuốc", path: "/admin/categories" },
  { label: "Mã giảm giá", path: "/admin/coupons" },
];

export default function MedicineManagementPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedMenu, setSelectedMenu] = useState("Thuốc");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resMed, resCat] = await Promise.all([
          fetch("/api/medicines"),
          fetch("/api/categories"),
        ]);

        const dataMed = await resMed.json();
        const dataCat = await resCat.json();

        setMedicines(dataMed);
        setCategories(dataCat);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
      }
    };

    fetchData();
  }, []);

  const onReset = () => {
    setCategoryFilter("");
    setPriceFilter("");
    setSearchKeyword("");
  };

  const handleSearchSelect = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const filteredMedicines = medicines.filter((med) => {
    let matchCategory = true;
    if (categoryFilter !== "") {
      const targetCat = categories.find((c) => c.name === categoryFilter);
      if (targetCat) {
        const medCatId = med.categoryId || med.category?.id;
        matchCategory = medCatId === targetCat.id;
      } else {
        matchCategory = false;
      }
    }

    // ✅ 2. SỬA LỖI Ở ĐÂY: Sử dụng (med.price ?? 0)
    // Toán tử ?? 0 nghĩa là: nếu med.price là null/undefined thì lấy giá trị 0
    const currentPrice = med.price ?? 0;

    const matchPrice =
      priceFilter === "" ||
      (priceFilter === "Dưới 100.000đ" && currentPrice < 100000) ||
      (priceFilter === "100.000đ - 300.000đ" &&
        currentPrice >= 100000 &&
        currentPrice <= 300000) ||
      (priceFilter === "300.000đ - 500.000đ" &&
        currentPrice > 300000 &&
        currentPrice <= 500000) ||
      (priceFilter === "Trên 500.000đ" && currentPrice > 500000);

    const matchSearch =
      searchKeyword.trim() === "" ||
      med.name.toLowerCase().includes(searchKeyword.toLowerCase());

    return matchCategory && matchPrice && matchSearch;
  });

  const paginated = filteredMedicines.slice(
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

          {/* Filter + Thêm thuốc */}
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
