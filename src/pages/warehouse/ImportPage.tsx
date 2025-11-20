import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import ImportTable, {
  ImportOrder,
} from "../../components/warehouse/ImportTable";
import ImportFilterBar from "../../components/warehouse/ImportFilterBar";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { FaUser } from "react-icons/fa";

const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];

export default function ImportPage() {
  const [selectedMenu, setSelectedMenu] = useState("Nhập kho");
  const navigate = useNavigate();
  const [imports, setImports] = useState<ImportOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ Gọi API lấy danh sách đơn nhập
  useEffect(() => {
    axios
      .get("/api/import")
      .then((res) => {
        const mapped: ImportOrder[] = res.data.map((item: any) => ({
          id: item.id, // Format mã đơn
          supplier: item.supplierName,
          createdAt: item.createdAt,
          totalAmount: item.totalPrice,
        }));
        setImports(mapped);
      })
      .catch((err) => console.error("Lỗi khi tải danh sách đơn nhập:", err));
  }, []);

  // ✅ Lọc dữ liệu
  const filteredImports = imports.filter((imp) => {
    const matchesSupplier = imp.supplier
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSupplier;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredImports.length / itemsPerPage);
  const paginatedImports = filteredImports.slice(
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
            <Breadcrumb
              items={[{ label: "Nhập kho", path: "/warehouse/import" }]}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Quản lý nhập kho
            </h2>
          </div>

          <div className="flex justify-between items-center mb-4">
            <ImportFilterBar
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              onSearchChange={setSearchTerm}
              onStatusChange={setStatusFilter}
              onReset={() => {
                setSearchTerm("");
                setStatusFilter("");
              }}
            />
            <button
              onClick={() => navigate("/warehouse/import/add")}
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-sm"
            >
              Nhập hàng
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <ImportTable orders={paginatedImports} />
          </div>

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
