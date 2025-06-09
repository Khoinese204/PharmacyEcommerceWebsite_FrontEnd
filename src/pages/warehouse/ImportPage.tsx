import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImportTable from "../../components/warehouse/ImportTable";
import ImportFilterBar from "../../components/warehouse/ImportFilterBar";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { ImportOrder } from "../../components/warehouse/ImportTable";

const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];

const mockImports: ImportOrder[] = [
  {
    id: "IMP001",
    supplier: "Công ty Dược A",
    createdAt: "2025-05-01T00:00:00.000Z",
    totalAmount: 2000000,
    status: "Đã nhận",
  },
  {
    id: "IMP002",
    supplier: "Công ty Dược B",
    createdAt: "2025-05-02T00:00:00.000Z",
    totalAmount: 1500000,
    status: "Đã giao",
  },
  {
    id: "IMP003",
    supplier: "Công ty Dược C",
    createdAt: "2025-05-03T00:00:00.000Z",
    totalAmount: 1750000,
    status: "Chờ xác nhận",
  },
  {
    id: "IMP004",
    supplier: "Công ty Dược D",
    createdAt: "2025-05-04T00:00:00.000Z",
    totalAmount: 1250000,
    status: "Đã huỷ",
  },
  {
    id: "IMP005",
    supplier: "Công ty Dược E",
    createdAt: "2025-05-05T00:00:00.000Z",
    totalAmount: 2200000,
    status: "Đang xử lý",
  },
];


export default function ImportPage() {
  const [selectedMenu, setSelectedMenu] = useState("Nhập kho");
  const navigate = useNavigate();
  const [imports, setImports] = useState(mockImports);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredImports = imports.filter((imp) => {
    const matchesSupplier = imp.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? imp.status === statusFilter : true;
    return matchesSupplier && matchesStatus;
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
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          <div className="ml-auto flex items-center gap-2 text-sm">
            <img src="/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-semibold text-gray-800">Boss</p>
              <p className="text-xs text-gray-500">Nhân viên kho</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb items={[{ label: "Nhập kho", path: "/inventory/import" }]} />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Quản lý nhập kho</h2>
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
