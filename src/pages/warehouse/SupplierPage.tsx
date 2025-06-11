import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SupplierTable, { Supplier } from "../../components/warehouse/SupplierTable";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import ImportFilterBar from "../../components/warehouse/ImportFilterBar";
import SupplierFilterBar from "../../components/warehouse/SupplierFilterBar";

const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];

const mockSuppliers: Supplier[] = [
  {
    id: "SUP001",
    supplier: "Công ty Dược A",
    contact: "Nguyễn Văn A",
    phone: 123456789,
    email: "a@duoc.vn",
    address: "123 Đường A, Quận 1, TP.HCM",
  },
  {
    id: "SUP002",
    supplier: "Công ty Dược B",
    contact: "Trần Thị B",
    phone: 987654321,
    email: "b@duoc.vn",
    address: "456 Đường B, Quận 3, TP.HCM",
  },
  {
    id: "SUP003",
    supplier: "Công ty Dược C",
    contact: "Lê Văn C",
    phone: 1122334455,
    email: "c@duoc.vn",
    address: "789 Đường C, Quận 5, TP.HCM",
  },
  {
    id: "SUP004",
    supplier: "Công ty Dược D",
    contact: "Phạm Thị D",
    phone: 5566778899,
    email: "d@duoc.vn",
    address: "321 Đường D, Quận 10, TP.HCM",
  },
  {
    id: "SUP005",
    supplier: "Công ty Dược E",
    contact: "Đặng Văn E",
    phone: 9988776655,
    email: "e@duoc.vn",
    address: "654 Đường E, Quận 2, TP.HCM",
  },
];

export default function SupplierPage() {
  const [selectedMenu, setSelectedMenu] = useState("Nhà cung cấp");
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredSuppliers = suppliers.filter((sup) =>
    sup.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
            <Breadcrumb items={[{ label: "Nhà cung cấp", path: "/warehouse/supplier" }]} />
          </div>

          <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold text-gray-800">Quản lý nhà cung cấp</h2>
        </div>
          
            <div className="flex justify-between items-center mb-4">
                <SupplierFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onReset={() => {
                        setSearchTerm("");
                    }}
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
