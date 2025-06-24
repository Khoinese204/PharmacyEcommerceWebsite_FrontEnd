import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SupplierTable, { Supplier } from "../../components/warehouse/SupplierTable";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import SupplierFilterBar from "../../components/warehouse/SupplierFilterBar";
import { FaUser } from "react-icons/fa";

const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];

export default function SupplierPage() {
  const [selectedMenu, setSelectedMenu] = useState("Nhà cung cấp");
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ Gọi API để lấy danh sách nhà cung cấp
  useEffect(() => {
    axios.get("/api/suppliers")
      .then((res) => {
        // Map lại nếu cần đổi tên fields để phù hợp với frontend (nếu backend không trùng khớp)
        const mapped = res.data.map((s: any) => ({
          id: s.id,
          name: s.name,           // hoặc s.supplierName tùy theo backend
          contactInfo: s.contactInfo,     // hoặc s.contact
          address: s.address,
        }));
        setSuppliers(mapped);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách nhà cung cấp:", err);
        alert("Không thể tải danh sách nhà cung cấp.");
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredSuppliers = suppliers.filter((sup) =>
    sup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedSuppliers = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
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

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          <div className="ml-auto flex items-center gap-4 text-black text-lg">
            <Link to="/warehouse/account">
              <FaUser />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb items={[{ label: "Nhà cung cấp", path: "/warehouse/supplier" }]} />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Quản lý nhà cung cấp</h2>
          </div>

          <div className="flex justify-between items-center mb-4">
            <SupplierFilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onReset={() => setSearchTerm("")}
            />
            <button
              onClick={() => navigate("/warehouse/supplier/add")}
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-sm"
            >
              Thêm nhà cung cấp
            </button>
          </div>

          <SupplierTable suppliers={paginatedSuppliers} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}
