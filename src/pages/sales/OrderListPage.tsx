import { FaEye, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const menu = [
  { label: "Bảng điều khiển", path: "/sales/dashboard" },
  { label: "Danh sách đơn hàng", path: "/sales/listorders" },
];

const initialOrders = [
  { id: "PO-202401", customer: "Nguyễn Văn A", status: "Đang xử lý", total: 80000 },
  { id: "PO-202402", customer: "Trần Thị B", status: "Đã giao", total: 120000 },
  { id: "PO-202403", customer: "Lê Văn C", status: "Đã hủy", total: 0 },
  { id: "PO-202404", customer: "Phạm Thị D", status: "Đang xử lý", total: 100000 },
];

export default function OrderListPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [orders, setOrders] = useState(initialOrders);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ customer: "", status: "" });
  const navigate = useNavigate();
  const location = useLocation();

  const filteredOrders = orders.filter((order) => {
    const keywordMatch = order.customer.toLowerCase().includes(searchKeyword.toLowerCase());
    const statusMatch = statusFilter ? order.status === statusFilter : true;
    return keywordMatch && statusMatch;
  });

  const handleDelete = (orderId: string) => {
    const confirm = window.confirm("Bạn có chắc muốn xoá đơn hàng này?");
    if (confirm) {
      setOrders(orders.filter((o) => o.id !== orderId));
    }
  };

  const handleEditClick = (order: any) => {
    setEditingOrderId(order.id);
    setEditValues({ customer: order.customer, status: order.status });
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setEditValues({ customer: "", status: "" });
  };

  const handleSaveEdit = () => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === editingOrderId ? { ...order, ...editValues } : order
      )
    );
    setEditingOrderId(null);
    setEditValues({ customer: "", status: "" });
  };

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

      {/* Main content */}
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

        {/* Body */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Breadcrumb */}
          <div className="text-gray-700 text-sm text-left">
            <span>Nhân viên bán hàng</span> &gt;{" "}
            <span className="font-medium text-gray-700">Danh sách đơn hàng</span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <input
                type="text"
                placeholder="Tìm theo tên khách hàng"
                className="border px-2 py-1 rounded text-sm text-gray-700 w-40"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <select
                className="border px-2 py-1 rounded text-sm text-gray-700"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
              <button
                className="text-red-600 font-medium text-sm ml-2"
                onClick={() => {
                  setSearchKeyword("");
                  setStatusFilter("");
                }}
              >
                🔄 Làm mới
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg border">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-100 text-gray-800 uppercase">
                <tr>
                  <th className="px-4 py-2">Mã đơn hàng</th>
                  <th className="px-4 py-2">Khách hàng</th>
                  <th className="px-4 py-2">Trạng thái</th>
                  <th className="px-4 py-2">Tổng tiền</th>
                  <th className="px-4 py-2 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      Không tìm thấy đơn hàng nào.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const isEditing = editingOrderId === order.id;
                    return (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-800 font-medium">{order.id}</td>
                        <td className="px-4 py-2 text-gray-800">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editValues.customer}
                              onChange={(e) =>
                                setEditValues((prev) => ({
                                  ...prev,
                                  customer: e.target.value,
                                }))
                              }
                              className="border rounded px-2 py-1 w-full"
                            />
                          ) : (
                            order.customer
                          )}
                        </td>
                        <td className="px-4 py-2 text-gray-800">
                          {isEditing ? (
                            <select
                              value={editValues.status}
                              onChange={(e) =>
                                setEditValues((prev) => ({
                                  ...prev,
                                  status: e.target.value,
                                }))
                              }
                              className="border rounded px-2 py-1 w-full"
                            >
                              <option value="Đang xử lý">Đang xử lý</option>
                              <option value="Đã giao">Đã giao</option>
                              <option value="Đã hủy">Đã hủy</option>
                            </select>
                          ) : (
                            order.status
                          )}
                        </td>
                        <td className="px-4 py-2 text-gray-800">{order.total.toLocaleString()}đ</td>
                        <td className="px-4 py-2">
                          <div className="flex justify-center gap-4 text-lg">
                            {isEditing ? (
                              <>
                                <FaSave
                                  onClick={handleSaveEdit}
                                  className="cursor-pointer text-green-600 hover:text-green-800"
                                />
                                <FaTimes
                                  onClick={handleCancelEdit}
                                  className="cursor-pointer text-gray-600 hover:text-gray-800"
                                />
                              </>
                            ) : (
                              <>
                                <FaEye
                                  onClick={() => navigate(`/sales/orders/${order.id}`)}
                                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                                />
                                <FaEdit
                                  onClick={() => handleEditClick(order)}
                                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                                />
                                <FaTrash
                                  onClick={() => handleDelete(order.id)}
                                  className="cursor-pointer text-red-500 hover:text-red-700"
                                />
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
