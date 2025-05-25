import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

const menu = [
  { label: "Bảng điều khiển", path: "/sales/dashboard" },
  { label: "Danh sách đơn hàng", path: "/sales/listorders" },
];

const OrderDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [customerName, setCustomerName] = useState("Nguyễn Văn A");
  const [orderStatus, setOrderStatus] = useState("Đang xử lý");

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const orderItems: OrderItem[] = [
    {
      id: "PO-202401",
      productName: "Paracetamol 500mg",
      quantity: 2,
      unitPrice: 40000,
      totalPrice: 80000,
    },
    {
      id: "PO-202402",
      productName: "Vitamin C 1000mg",
      quantity: 1,
      unitPrice: 60000,
      totalPrice: 60000,
    },
    {
      id: "PO-202403",
      productName: "Dung dịch nhỏ mắt Natri Clorid 0.9%",
      quantity: 3,
      unitPrice: 25000,
      totalPrice: 75000,
    },
    {
      id: "PO-202404",
      productName: "Khẩu trang y tế 4 lớp",
      quantity: 1,
      unitPrice: 100000,
      totalPrice: 100000,
    },
    {
      id: "PO-202405",
      productName: "Gel rửa tay khô 500ml",
      quantity: 2,
      unitPrice: 42000,
      totalPrice: 84000,
    },
  ];

  const totalAmount = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md px-4 py-6 space-y-4">
        <div className="font-bold text-lg text-blue-600 mb-6">PrimeCare</div>
        {menu.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`block w-full text-left px-3 py-2 rounded transition ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          <div className="ml-auto flex items-center gap-2 text-sm">
            <img src="/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-semibold text-gray-800">Boss</p>
              <p className="text-xs text-gray-500">Nhân viên bán hàng</p>
            </div>
          </div>
        </header>

        {/* Nội dung chi tiết đơn hàng */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-700">
            <div className="bg-white rounded-lg shadow p-4 text-left border">
              <p className="flex items-center gap-2">
                <strong>Tên:</strong>
                {isEditingName ? (
                  <>
                    <input
                      type="text"
                      className="border px-2 py-1 rounded text-sm"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <button
                      className="text-blue-600 text-sm"
                      onClick={() => setIsEditingName(false)}
                    >
                      ✔
                    </button>
                  </>
                ) : (
                  <>
                    <span>{customerName}</span>
                    <FaEdit
                      className="text-blue-600 cursor-pointer"
                      onClick={() => setIsEditingName(true)}
                    />
                  </>
                )}
              </p>
              <p><strong>SDT:</strong> 0901234567</p>
              <p><strong>Địa chỉ:</strong> 123 Nguyễn Huệ, Quận 1, TP.HCM</p>
            </div>

            <div className="bg-white rounded-lg shadow p-4 text-left border">
              <p><strong>Ngày tạo:</strong> 2025-04-26</p>
              <p className="flex items-center gap-2">
                <strong>Trạng thái:</strong>
                {isEditingStatus ? (
                  <>
                    <select
                      className="border px-2 py-1 rounded text-sm"
                      value={orderStatus}
                      onChange={(e) => setOrderStatus(e.target.value)}
                    >
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Đã giao">Đã giao</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                    <button
                      className="text-blue-600 text-sm"
                      onClick={() => setIsEditingStatus(false)}
                    >
                      ✔
                    </button>
                  </>
                ) : (
                  <>
                    <span>{orderStatus}</span>
                    <FaEdit
                      className="text-blue-600 cursor-pointer"
                      onClick={() => setIsEditingStatus(true)}
                    />
                  </>
                )}
              </p>
              <p><strong>Phương thức thanh toán:</strong> COD</p>
            </div>
          </div>

          {/* Bộ lọc và tổng tiền */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <div className="flex flex-wrap gap-2 items-center">
              <input
                type="text"
                placeholder="Tìm tên sản phẩm"
                className="border px-2 py-1 rounded text-sm text-gray-700 w-35"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <select
                className="border px-2 py-1 rounded text-sm text-gray-700"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="" disabled>Thời gian</option>
                <option value="today">Hôm nay</option>
                <option value="yesterday">Hôm qua</option>
                <option value="last7days">7 ngày qua</option>
              </select>
              <select
                className="border px-2 py-1 rounded text-sm text-gray-700"
                value={selectedOrderType}
                onChange={(e) => setSelectedOrderType(e.target.value)}
              >
                <option value="" disabled>Loại đơn hàng</option>
                <option value="retail">Bán lẻ</option>
                <option value="wholesale">Bán sỉ</option>
              </select>
              <select
                className="border px-2 py-1 rounded text-sm text-gray-700"
                value={selectedOrderStatus}
                onChange={(e) => setSelectedOrderStatus(e.target.value)}
              >
                <option value="" disabled>Trạng thái đơn hàng</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipped">Đã giao</option>
                <option value="cancelled">Đã hủy</option>
              </select>
              <button
                className="text-red-600 font-medium text-sm ml-2"
                onClick={() => {
                  setSelectedDate("");
                  setSelectedOrderType("");
                  setSelectedOrderStatus("");
                }}
              >
                🔄 Làm mới
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Tổng tiền:</span>
              <span className="font-semibold text-gray-700">
                {totalAmount.toLocaleString()}đ
              </span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                Cập nhật trạng thái
              </button>
            </div>
          </div>

          {/* Bảng sản phẩm */}
          <div className="overflow-x-auto bg-white rounded-lg border">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-100 text-gray-800 uppercase">
                <tr>
                  <th className="px-4 py-2">Tên sản phẩm</th>
                  <th className="px-4 py-2">Số lượng</th>
                  <th className="px-4 py-2">Đơn giá</th>
                  <th className="px-4 py-2">Tổng tiền</th>
                  <th className="px-4 py-2 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-800">{item.productName}</td>
                    <td className="px-4 py-2 text-gray-800">{item.quantity}</td>
                    <td className="px-4 py-2 text-gray-800">{item.unitPrice.toLocaleString()}đ</td>
                    <td className="px-4 py-2 text-gray-800">{item.totalPrice.toLocaleString()}đ</td>
                    <td className="px-4 py-2">
                      <div className="flex justify-center gap-4 text-lg">
                        <FaEye className="cursor-pointer text-blue-600 hover:text-blue-800" />
                        <FaEdit className="cursor-pointer text-blue-600 hover:text-blue-800" />
                        <FaTrash className="cursor-pointer text-red-500 hover:text-red-700" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderDetailPage;
