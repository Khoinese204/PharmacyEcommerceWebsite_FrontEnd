import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ShipmentTable, { Shipment } from "../../components/warehouse/ShipmentTable";
import ShipmentFilterBar from "../../components/warehouse/ShipmentFilterBar";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";

const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];

export default function ShipmentPage() {
  const [selectedMenu, setSelectedMenu] = useState("Vận chuyển");
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  // Gọi API để lấy danh sách shipment
  useEffect(() => {
    axios
      .get("/api/shipments")
      .then((res) => {
        const mapped = res.data.map((s: any) => ({
          id: s.id,
          shipmentCode: s.shipmentCode,
          orderId: s.orderId || s.order?.id,
          shippedBy: s.shippedBy,
          shippedAt: s.shippedAt,
          deliveredAt: s.deliveredAt,
          status: s.status,
        }));
        setShipments(mapped);
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh sách vận chuyển:", err);
        alert("Không thể tải danh sách vận chuyển.");
      });
  }, []);

  // Lọc theo searchTerm
  const filteredShipments = shipments.filter((s) =>
    s.shipmentCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
  const paginatedShipments = filteredShipments.slice(
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

      {/* Main content */}
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

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          {/* Breadcrumb */}
          <div className="mb-2">
            <Breadcrumb items={[{ label: "Vận chuyển", path: "/warehouse/shipment" }]} />
          </div>

          {/* Tiêu đề */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Quản lý vận chuyển</h2>
          </div>

          {/* Bộ lọc và nút thêm mới */}
          <div className="flex justify-between items-center mb-4">
            <ShipmentFilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onReset={() => setSearchTerm("")}
            />
            <button
              onClick={() => navigate("/warehouse/shipment/add")}
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-sm"
            >
              Tạo vận đơn
            </button>
          </div>

          {/* Bảng dữ liệu */}
          <ShipmentTable shipments={paginatedShipments} />

          {/* Phân trang */}
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
