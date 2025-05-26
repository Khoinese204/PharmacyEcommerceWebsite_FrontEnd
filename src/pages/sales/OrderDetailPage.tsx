import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetailFilterBar from "../../components/sales/OrderDetailFilterBar";
import OrderDetailTable from "../../components/sales/OrderDetailTable";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { OrderDetail } from "../../components/sales/OrderDetailTable";

const menu = [
  { label: "Bảng điều khiển", path: "/sales/dashboard" },
  { label: "Đơn hàng", path: "/sales/orders" },
];

const rawMockOrderDetails = [
  { id: "OD001", product: "Paracetamol 500mg", quantity: 2, price: 50000 },
  { id: "OD002", product: "Vitamin C 1000mg", quantity: 1, price: 80000 },
  { id: "OD003", product: "Khẩu trang y tế", quantity: 5, price: 20000 },
  { id: "OD004", product: "Sát khuẩn tay nhanh", quantity: 3, price: 60000 },
  { id: "OD005", product: "Thuốc ho siro", quantity: 2, price: 75000 },
  { id: "OD006", product: "Panadol Extra", quantity: 1, price: 45000 },
  { id: "OD007", product: "Nước muối sinh lý", quantity: 4, price: 15000 },
  { id: "OD008", product: "Kem chống nắng", quantity: 1, price: 120000 },
  { id: "OD009", product: "Sữa rửa mặt", quantity: 2, price: 95000 },
  { id: "OD010", product: "Tăm bông", quantity: 3, price: 10000 },
];

const mockOrderDetails: OrderDetail[] = rawMockOrderDetails.map((item) => ({
  id: item.id,
  productName: item.product,
  quantity: item.quantity,
  unitPrice: item.price,
  totalPrice: item.quantity * item.price,
}));

export default function OrderDetailPage() {
  const [selectedMenu, setSelectedMenu] = useState("Chi tiết đơn hàng");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [orderDetails, setOrderDetails] = useState(mockOrderDetails);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredOrderDetails = orderDetails.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
            <Breadcrumb
                items={[
                { label: "Đơn hàng", path: "/sales/orders" },
                { label: "Chi tiết đơn hàng" },
                ]}
            />
            </div>
            <h2 className="text-left text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>

          <div className="bg-white p-4 rounded-xl shadow space-y-4 text-left">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded border">
                <p><span className="font-medium">Tên khách hàng:</span> Nguyễn Văn A</p>
                <p><span className="font-medium">Số điện thoại:</span> 0909123456</p>
                <p><span className="font-medium">Địa chỉ:</span> 123 Đường ABC, Quận 1</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border">
                <p><span className="font-medium">Ngày tạo:</span> 01/01/2025</p>
                <p><span className="font-medium">Trạng thái:</span> Chờ xác nhận</p>
                <p><span className="font-medium">Phương thức thanh toán:</span> Ví điện tử</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
            <OrderDetailFilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <div className="text-sm font-medium">Tổng tiền: <span className="text-red-500">{totalAmount.toLocaleString()}₫</span></div>
          </div>

            <OrderDetailTable orderDetails={paginatedOrderDetailItems} />
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
