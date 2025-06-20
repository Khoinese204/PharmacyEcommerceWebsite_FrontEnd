import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OrderDetailFilterBar from "../../components/sales/OrderDetailFilterBar";
import OrderDetailTable, { OrderDetail } from "../../components/sales/OrderDetailTable";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { FaUser } from "react-icons/fa";

// ---------------------- INTERFACES ----------------------
interface OrderItemResponse {
  medicineName: string;
  quantity: number;
  unitPrice: number;
}

interface CustomerInfoResponse {
  fullName: string;
  phone: string;
  address: string;
  note: string;
}

interface PaymentResponse {
  method: string;
  status: string;
}

interface SummaryResponse {
  totalPrice: number;
  discount: number;
  voucherDiscount: number;
  shippingFee: number;
  finalTotal: number;
}

interface OrderDetailResponse {
  orderCode: string;
  orderDate: string;
  status: string;
  items: OrderItemResponse[];
  customerInfo: CustomerInfoResponse;
  payment: PaymentResponse;
  summary: SummaryResponse;
  canCancel: boolean;
}

// ---------------------- COMPONENT ----------------------
export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoResponse>({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });
  const [metaInfo, setMetaInfo] = useState({
    orderCode: "",
    createdAt: "",
    status: "",
    paymentMethod: "",
    paymentStatus: "",
  });
  const [summary, setSummary] = useState<SummaryResponse>({
    totalPrice: 0,
    discount: 0,
    voucherDiscount: 0,
    shippingFee: 0,
    finalTotal: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const numericOrderId = orderId ? parseInt(orderId) : null;

  useEffect(() => {
    const fetchOrder = async () => {
      if (!numericOrderId) return;

      try {
        const res = await axios.get<OrderDetailResponse>(`/api/orders/${numericOrderId}`);
        const data = res.data;

        const formattedItems: OrderDetail[] = data.items.map((item, index) => ({
          id: index.toString(),
          productName: item.medicineName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice,
        }));

        setOrderDetails(formattedItems);
        setCustomerInfo(data.customerInfo);
        setMetaInfo({
          orderCode: data.orderCode,
          createdAt: new Date(data.orderDate).toLocaleString("vi-VN"),
          status: data.status,
          paymentMethod: data.payment.method,
          paymentStatus: data.payment.status,
        });
        setSummary(data.summary);
      } catch (error) {
        console.error("❌ Lỗi khi tải chi tiết đơn hàng:", error);
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
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrderDetails.length / itemsPerPage);
  const paginatedOrderDetailItems = filteredOrderDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
              items={[
                { label: "Đơn hàng", path: "/sales/orders" },
                { label: "Chi tiết đơn hàng" },
              ]}
            />
          </div>
          <h2 className="text-left text-xl font-semibold mb-4">
            Chi tiết đơn hàng #{metaInfo.orderCode}
          </h2>

          <div className="bg-white p-4 rounded-xl shadow space-y-4 text-left">
            {loading ? (
              <p>Đang tải chi tiết đơn hàng...</p>
            ) : (
              <>
                {/* Thông tin khách hàng & đơn hàng */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded border">
                    <p><span className="font-medium">Tên khách hàng:</span> {customerInfo.fullName}</p>
                    <p><span className="font-medium">Số điện thoại:</span> {customerInfo.phone}</p>
                    <p><span className="font-medium">Địa chỉ:</span> {customerInfo.address}</p>
                    {customerInfo.note && (
                      <p><span className="font-medium">Ghi chú:</span> {customerInfo.note}</p>
                    )}
                  </div>
                  <div className="bg-gray-50 p-4 rounded border col-span-2">
                    <p><span className="font-medium">Ngày tạo:</span> {metaInfo.createdAt}</p>
                    <p><span className="font-medium">Trạng thái:</span> {metaInfo.status}</p>
                    <p><span className="font-medium">Phương thức thanh toán:</span> {metaInfo.paymentMethod}</p>
                    <p><span className="font-medium">Trạng thái thanh toán:</span> {metaInfo.paymentStatus}</p>
                  </div>
                </div>

                {/* Bộ lọc và tổng */}
                <div className="flex justify-between items-center mb-4">
                  <OrderDetailFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                  />
                  <div className="text-sm font-medium">
                    Tổng cộng:{" "}
                    <span className="text-red-500">
                      {summary.finalTotal.toLocaleString("vi-VN")} ₫
                    </span>
                  </div>
                </div>

                {/* Bảng sản phẩm */}
                <OrderDetailTable orderDetails={paginatedOrderDetailItems} />

                {/* Tổng kết */}
                <div className="mt-4 text-right text-sm space-y-1">
                  <p>Tổng giá gốc: {summary.totalPrice.toLocaleString("vi-VN")} ₫</p>
                  <p>Giảm giá: -{summary.discount.toLocaleString("vi-VN")} ₫</p>
                  <p>Voucher: -{summary.voucherDiscount.toLocaleString("vi-VN")} ₫</p>
                  <p>Phí vận chuyển: -{summary.shippingFee.toLocaleString("vi-VN")} ₫</p>
                  <p className="text-lg font-semibold text-red-600">
                    Tổng thanh toán: {summary.finalTotal.toLocaleString("vi-VN")} ₫
                  </p>
                </div>
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
