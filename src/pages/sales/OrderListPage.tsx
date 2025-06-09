import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderTable from "../../components/sales/OrderTable";
import OrderFilterBar from "../../components/sales/OrderFilterBar";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";

const menu = [
  { label: "Bảng điều khiển", path: "/sales/dashboard" },
  { label: "Đơn hàng", path: "/sales/orders" },
];

const mockOrders = [
  { id: "ORD001", customer: "Nguyễn Văn A", status: "Chờ xác nhận", total: 250000 },
  { id: "ORD002", customer: "Trần Thị B", status: "Đang xử lý", total: 460000 },
  { id: "ORD003", customer: "Lê Văn C", status: "Đã giao", total: 125000 },
  { id: "ORD004", customer: "Phạm Thị D", status: "Đã huỷ", total: 300000 },
  { id: "ORD005", customer: "Đỗ Văn E", status: "Chờ xác nhận", total: 88000 },
  { id: "ORD006", customer: "Nguyễn Thị F", status: "Đang xử lý", total: 540000 },
  { id: "ORD007", customer: "Trương Văn G", status: "Đã giao", total: 110000 },
  { id: "ORD008", customer: "Mai Thị H", status: "Chờ xác nhận", total: 220000 },
  { id: "ORD009", customer: "Huỳnh Văn I", status: "Đã huỷ", total: 190000 },
  { id: "ORD010", customer: "Phan Thị K", status: "Đã giao", total: 310000 },
  { id: "ORD011", customer: "Ngô Văn L", status: "Đang xử lý", total: 175000 },
  { id: "ORD012", customer: "Lý Thị M", status: "Chờ xác nhận", total: 400000 },
  { id: "ORD013", customer: "Tô Văn N", status: "Đã giao", total: 99000 },
  { id: "ORD014", customer: "Hồ Thị O", status: "Đang xử lý", total: 280000 },
  { id: "ORD015", customer: "Bùi Văn P", status: "Chờ xác nhận", total: 350000 },
  { id: "ORD016", customer: "Dương Thị Q", status: "Đã giao", total: 120000 },
];

export default function OrderListPage() {
  const [selectedMenu, setSelectedMenu] = useState("Đơn hàng");
  const navigate = useNavigate();
  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Lọc
  const filteredOrders = orders.filter((order) => {
    const matchesName = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesName && matchesStatus;
  });

  // Reset trang khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Phân trang trên kết quả đã lọc
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const confirmOrders = () => {
    const updated = orders.map((order) =>
      selectedOrders.includes(order.id) && order.status === "Chờ xác nhận"
        ? { ...order, status: "Đang xử lý" }
        : order
    );
    setOrders(updated);
    setSelectedOrders([]);
    setIsConfirmMode(false);
    console.log("Đã xác nhận đơn hàng:", selectedOrders);
  };

  const handleConfirmClick = () => {
    if (!isConfirmMode) {
      setIsConfirmMode(true);
    } else {
      confirmOrders();
    }
  };

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
              <p className="text-xs text-gray-500">Nhân viên bán hàng</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb items={[{ label: "Đơn hàng", path: "/sales/orders" }]} />
          </div>

          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-2xl font-semibold text-gray-800">Quản lý đơn hàng</h2>
          </div>

          <div className="flex justify-between items-center mb-4">
            <OrderFilterBar
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
              onClick={handleConfirmClick}
              className={`${
                isConfirmMode ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
              } text-white px-4 py-1.5 rounded text-sm`}
            >
              {isConfirmMode ? "Xác nhận đơn đã chọn" : "Xác nhận đơn hàng"}
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <OrderTable
              orders={paginatedOrders}
              isConfirmMode={isConfirmMode}
              selectedOrders={selectedOrders}
              onSelectOrder={toggleSelectOrder}
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
