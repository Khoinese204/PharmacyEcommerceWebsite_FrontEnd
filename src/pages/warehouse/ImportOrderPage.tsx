import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../../components/common/Sidebar";
import { useState } from "react";

type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

const OrderConfirmPage = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedOrderType, setSelectedOrderType] = useState("");
    const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

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
    <div className="flex">
      <Sidebar />
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="bg-cyan-100 text-sm py-3 px-4 text-gray-700">
          <div className="max-w-6xl mx-auto text-left">
            <span className="text-gray-700">Nhân viên kho</span> &gt;{" "}
            <span className="font-medium text-gray-700">Quản lý nhập kho</span>
          </div>
        </div>

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
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
              Thêm đơn hàng
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg border">
          <table className="w-full text-sm text-left ">
            <thead className="bg-blue-100 text-gray-800 uppercase">
              <tr>
                <th className="px-4 py-2">Mã đơn hàng</th>
                <th className="px-4 py-2">Nhà cung cấp</th>
                <th className="px-4 py-2">Ngày tạo đơn</th>
                <th className="px-4 py-2">Tổng tiền</th>
                <th className="px-4 py-2 text-center">Trạng thái</th>
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
      </div>
    </div>
  );
};

export default OrderConfirmPage;
