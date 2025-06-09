import React from "react";
import ActionButtons from "./ActionButtons";

export interface ExportOrder {
  id: string;
  receiver: string;
  phone: string;
  address: number;
  status: string;
}

interface Props {
  orders: ExportOrder[];
  isConfirmMode?: boolean;
  selectedOrders?: string[];
  onSelectOrder?: (orderId: string) => void;
}

export default function ExportTable({
  orders,
  isConfirmMode = false,
  selectedOrders = [],
  onSelectOrder,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">MÃ ĐƠN HÀNG</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TÊN NGƯỜI NHẬN</th>
            <th className="px-4 py-3 font-semibold text-gray-700">SĐT</th>
            <th className="px-4 py-3 font-semibold text-gray-700">ĐỊA CHỈ</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TRẠNG THÁI</th>
            <th className="px-4 py-3 font-semibold text-gray-700 text-center">HÀNH ĐỘNG</th>
            {isConfirmMode && <th className="px-4 py-3 text-center"></th>}
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.receiver}</td>
              <td className="px-4 py-2">{order.phone}</td>
              <td className="px-4 py-2">{order.address}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <ActionButtons
                  viewUrl={`/warehouse/export/${order.id}`}
                  editUrl={`/warehouse/export/${order.id}/edit`}
                  onDelete={() => console.log("Xóa đơn xuất:", order.id)}
                />
              </td>
              {isConfirmMode && (
                <td className="px-4 py-2 text-center">
                  {order.status === "Chờ xác nhận" ? (
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => onSelectOrder?.(order.id)}
                    />
                  ) : null}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getStatusStyle(status: string) {
  switch (status) {
    case "Chờ xác nhận":
      return "bg-yellow-100 text-yellow-600";
    case "Đang xử lý":
      return "bg-blue-100 text-blue-600";
    case "Đã soạn hàng":
      return "bg-purple-100 text-purple-600";
    case "Đang giao":
      return "bg-orange-100 text-orange-600";
    case "Đã giao":
      return "bg-emerald-100 text-emerald-600";
    case "Đã nhận":
      return "bg-green-100 text-green-600";
    case "Đã hủy":
      return "bg-red-100 text-red-600";
    case "Trả hàng":
      return "bg-pink-100 text-pink-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
}



