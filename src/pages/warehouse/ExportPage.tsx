import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExportTable, { ExportOrder } from "../../components/warehouse/ExportTable";
import ImportFilterBar from "../../components/warehouse/ImportFilterBar";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import ExportFilterBar from "../../components/warehouse/ExportFilterBar";

const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];

const mockExports: ExportOrder[] = [
  {
    id: "IMP001",
    receiver: "Kho PrimeCare",
    phone: "0901123456",
    address: 1,
    status: "Đã nhận",
  },
  {
    id: "IMP002",
    receiver: "Kho PrimeCare",
    phone: "0901123456",
    address: 2,
    status: "Đã giao",
  },
  {
    id: "IMP003",
    receiver: "Kho PrimeCare",
    phone: "0901123456",
    address: 3,
    status: "Chờ xác nhận",
  },
  {
    id: "IMP004",
    receiver: "Kho PrimeCare",
    phone: "0901123456",
    address: 4,
    status: "Đã huỷ",
  },
  {
    id: "IMP005",
    receiver: "Kho PrimeCare",
    phone: "0901123456",
    address: 5,
    status: "Đang xử lý",
  },
];

export default function ExportPage() {
  const [selectedMenu, setSelectedMenu] = useState("Xuất kho");
  const navigate = useNavigate();
  const [exports, setExports] = useState<ExportOrder[]>(mockExports);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredExports = exports.filter((imp) => {
    const matchesReceiver = imp.receiver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? imp.status === statusFilter : true;
    return matchesReceiver && matchesStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredExports.length / itemsPerPage);
  const paginatedExports = filteredExports.slice(
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
            <Breadcrumb items={[{ label: "Xuất kho", path: "/warehouse/export" }]} />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Quản lý xuất kho</h2>
          </div>

          <div className="flex justify-between items-center mb-4">
            <ExportFilterBar
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              onSearchChange={setSearchTerm}
              onStatusChange={setStatusFilter}
              onReset={() => {
                setSearchTerm("");
                setStatusFilter("");
              }}
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <ExportTable orders={paginatedExports} />
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
