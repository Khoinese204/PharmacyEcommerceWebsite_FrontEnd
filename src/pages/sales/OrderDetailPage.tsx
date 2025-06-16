// src/pages/sales/OrderDetailPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OrderDetailFilterBar from "../../components/sales/OrderDetailFilterBar";
import OrderDetailTable, { OrderDetail } from "../../components/sales/OrderDetailTable";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";

interface OrderItemResponse {
  id: string;
  medicineName: string; // ✅ sửa lại cho đúng tên field từ backend
  quantity: number;
  unitPrice: number;
}

interface OrderResponse {
  id: number;
  createdAt: string;
  status: string;
  paymentMethod: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
}

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [selectedMenu] = useState("Chi tiết đơn hàng");

  const [searchTerm, setSearchTerm] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [metaInfo, setMetaInfo] = useState({
    createdAt: "",
    status: "",
    paymentMethod: "",
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const numericOrderId = orderId ? parseInt(orderId) : null;
  const displayOrderId = numericOrderId
    ? `ORD${numericOrderId.toString().padStart(3, "0")}`
    : "";

  useEffect(() => {
    const fetchOrder = async () => {
      if (!numericOrderId) return;

      console.log("🔍 Fetching order with ID:", numericOrderId);
      console.log("🛠️ API URL:", `/api/orders/${numericOrderId}/items`);

      try {
        const orderRes = await axios.get<OrderResponse>(`/api/orders/${numericOrderId}`);
        const orderData = orderRes.data;
        console.log("✅ Order data:", orderData);

        const itemsRes = await axios.get<OrderItemResponse[]>(`/api/orders/${numericOrderId}/items`);
        const items = itemsRes.data;
        console.log("📦 Order items raw:", items);

        const formattedItems: OrderDetail[] = items.map((item, index) => ({
          id: item.id, // ✅ sử dụng index để tạo id tạm thời
          productName: item.medicineName, // ✅ chính xác field trả về từ backend
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice,
        }));

        console.log("🧾 Formatted items:", formattedItems);

        setOrderDetails(formattedItems);
        setCustomerInfo(orderData.customer);
        setMetaInfo({
          createdAt: new Date(orderData.createdAt).toLocaleDateString("vi-VN"),
          status: orderData.status,
          paymentMethod: orderData.paymentMethod,
        });
      } catch (error) {
        console.error("❌ Lỗi khi tải đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [numericOrderId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredOrderDetails = orderDetails.filter((item) =>
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) // ✅ check null để tránh lỗi
  );

  const totalPages = Math.ceil(filteredOrderDetails.length / itemsPerPage);
  const paginatedOrderDetailItems = filteredOrderDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalAmount = orderDetails.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      <aside className="w-60 bg-white shadow-md px-4 py-6 space-y-4">
        <div className="font-bold text-lg text-blue-600 mb-6">PrimeCare</div>
        <button
          onClick={() => navigate("/sales/dashboard")}
          className="block w-full text-left px-3 py-2 rounded text-gray-700 hover:bg-blue-50"
        >
          Bảng điều khiển
        </button>
        <button
          onClick={() => navigate("/sales/orders")}
          className="block w-full text-left px-3 py-2 rounded text-gray-700 hover:bg-blue-50"
        >
          Đơn hàng
        </button>
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
            <Breadcrumb
              items={[
                { label: "Đơn hàng", path: "/sales/orders" },
                { label: "Chi tiết đơn hàng" },
              ]}
            />
          </div>
          <h2 className="text-left text-xl font-semibold mb-4">
            Chi tiết đơn hàng #{displayOrderId}
          </h2>

          <div className="bg-white p-4 rounded-xl shadow space-y-4 text-left">
            {loading ? (
              <p>Đang tải chi tiết đơn hàng...</p>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded border">
                    <p><span className="font-medium">Tên khách hàng:</span> {customerInfo.name}</p>
                    <p><span className="font-medium">Số điện thoại:</span> {customerInfo.phone}</p>
                    <p><span className="font-medium">Địa chỉ:</span> {customerInfo.address}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border col-span-2">
                    <p><span className="font-medium">Ngày tạo:</span> {metaInfo.createdAt}</p>
                    <p><span className="font-medium">Trạng thái:</span> {metaInfo.status}</p>
                    <p><span className="font-medium">Phương thức thanh toán:</span> {metaInfo.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <OrderDetailFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                  />
                  <div className="text-sm font-medium">
                    Tổng tiền:{" "}
                    <span className="text-red-500">
                      {totalAmount.toLocaleString("vi-VN")} ₫
                    </span>
                  </div>
                </div>

                <OrderDetailTable orderDetails={paginatedOrderDetailItems} />
              </>
            )}
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
