import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

// Map enum từ backend sang tiếng Việt để hiển thị
function mapInventoryStatus(status: string): string {
  switch (status) {
    case "AVAILABLE":
      return "Còn hàng";
    case "LOW_STOCK":
      return "Sắp hết hàng";
    default:
      return "Không xác định";
  }
}

export default function InventoryPage() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Kho");

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get("/api/warehouse/inventory");
        const mappedData = res.data.map((item: any) => ({
          batchNumber: item.batchNumber,
          productName: item.productName,
          quantity: item.quantity,
          expiryDate: item.expiryDate,
          status: mapInventoryStatus(item.status),
        }));
        setInventory(mappedData);
      } catch (error) {
        console.error("❌ Lỗi khi tải dữ liệu kho:", error);
      }
    };

    fetchInventory();
  }, []);

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
            <img src="/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-semibold text-gray-800">Boss</p>
              <p className="text-xs text-gray-500">Nhân viên kho</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb items={[{ label: "Kho", path: "/warehouse/inventory" }]} />
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
            <InventoryTable
              inventoryItems={paginated}
              onUpdateItem={(updatedItem) => {
                setInventory((prev) =>
                  prev.map((item) =>
                    item.batchNumber === updatedItem.batchNumber ? updatedItem : item
                  )
                );
              }}
            />
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
