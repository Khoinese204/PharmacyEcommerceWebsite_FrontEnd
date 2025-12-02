import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderTable from "../../components/sales/OrderTable";
import OrderFilterBar from "../../components/sales/OrderFilterBar";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import axios from "axios";
import { FaUser } from "react-icons/fa";

// ✅ Kiểu dữ liệu cho đơn hàng
interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
}

const menu = [
  { label: "Bảng điều khiển", path: "/sales/dashboard" },
  { label: "Đơn hàng", path: "/sales/orders" },
  { label: "Chat", path: "/sales/chat" },
];

export default function OrderListPage() {
  const [selectedMenu, setSelectedMenu] = useState("Đơn hàng");
  const navigate = useNavigate();
  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = currentUser?.id;

  // Lọc dữ liệu
  const filteredOrders = orders.filter((order) => {
    const matchesName = order.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesName && matchesStatus;
  });

  // Gọi API và map dữ liệu
  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => {
        const apiOrders: Order[] = res.data.map((order: any) => ({
          id: `ORD${String(order.orderId).padStart(3, "0")}`,
          customer: order.customer,
          status: convertStatus(order.status),
          total: order.totalPrice,
        }));
        setOrders(apiOrders);
      })
      .catch((err) => {
        console.error("Lỗi khi tải đơn hàng:", err);
      });
  }, []);

  // Phân trang
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Chọn checkbox
  const toggleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // ✅ Xác nhận đơn hàng
  const confirmOrders = () => {
    const updated = orders.map((order) =>
      selectedOrders.includes(order.id) && order.status === "Chờ xác nhận"
        ? { ...order, status: "Đang đóng gói" }
        : order
    );

    setOrders(updated);
    setSelectedOrders([]);
    setIsConfirmMode(false);

    console.log("🟩 Đã xác nhận đơn hàng:", selectedOrders);
    console.log("🟡 userId đang gửi là:", userId);

    // Gửi PUT request cho từng đơn hàng đã chọn
    selectedOrders.forEach((id) => {
      const realId = parseInt(id.replace("ORD", ""));
      const payload = {
        orderId: realId,
        newStatus: "PACKING",
        updatedByUserId: userId,
        note: "Xác nhận từ frontend",
      };

      console.log("📦 Payload gửi lên:", payload);

      axios
        .put(`/api/orders/${realId}/status`, payload)
        .catch((err) => console.error("❌ Lỗi khi xác nhận đơn hàng:", err));
    });
  };

  // Xử lý nút xác nhận
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
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          {/* Icon nằm sát phải */}
          <div className="ml-auto flex items-center gap-4 text-black text-lg">
            <Link to="/sales/account">
              <FaUser />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb
              items={[{ label: "Đơn hàng", path: "/sales/orders" }]}
            />
          </div>

          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-2xl font-semibold text-gray-800">
              Quản lý đơn hàng
            </h2>
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
                isConfirmMode
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
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
              onOrdersChange={setOrders}
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

function convertStatus(status: string): string {
  switch (status) {
    case "PENDING":
      return "Chờ xác nhận";
    case "PACKING":
      return "Đang đóng gói";
    case "DELIVERING":
      return "Đang giao hàng";
    case "DELIVERED":
      return "Đã giao";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return status;
  }
}
