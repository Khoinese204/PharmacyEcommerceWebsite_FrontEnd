import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/admin/Breadcrumb";
import InventoryTable from "../../components/warehouse/InventoryTable";
import Pagination from "../../components/admin/TablePagination";
import InventoryFilterBar from "../../components/warehouse/InventoryFilterBar";
import { InventoryItem } from "../../components/warehouse/InventoryTable";

const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];

export const mockInventory: InventoryItem[] = [
  {
    batchNumber: "LOT001",
    productName: "Paracetamol 500mg",
    quantity: 120,
    expiryDate: "2025-08-12",
    status: "Còn hạn",
  },
  {
    batchNumber: "LOT002",
    productName: "Amoxicillin 250mg",
    quantity: 0,
    expiryDate: "2023-12-01",
    status: "Hết hàng",
  },
  {
    batchNumber: "LOT003",
    productName: "Vitamin C",
    quantity: 300,
    expiryDate: "2025-6-05",
    status: "Sắp hết hạn",
  },
  {
    batchNumber: "LOT004",
    productName: "Ibuprofen 400mg",
    quantity: 50,
    expiryDate: "2026-01-15",
    status: "Còn hạn",
  },
];

export default function InventoryPage() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Kho");
  const [inventory, setInventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = inventory.filter((item) => {
    const matchesName = item.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    return matchesName && matchesStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
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
            <Breadcrumb items={[{ label: "Quản lý kho", path: "/warehouse/inventory" }]} />
          </div>

          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-2xl font-semibold text-gray-800">Quản lý kho</h2>
          </div>

          <div className="flex justify-between items-center mb-4">
            <InventoryFilterBar
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
            <InventoryTable inventoryItems={paginated} />
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
