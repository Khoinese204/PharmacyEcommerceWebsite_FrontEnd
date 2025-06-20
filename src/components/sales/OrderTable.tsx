import React from "react";
import ActionButtons from "./ActionButtons";

interface Order {
  id: string; // Ví dụ: ORD001
  customer: string;
  total: number;
  status: string; // tiếng Việt
}

interface Props {
  orders: Order[];
  isConfirmMode?: boolean;
  selectedOrders?: string[];
  onSelectOrder?: (orderId: string) => void;
  onOrdersChange?: (newOrders: Order[]) => void; 
}

export default function OrderTable({
  orders,
  isConfirmMode = false,
  selectedOrders = [],
  onSelectOrder,
  onOrdersChange,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">MÃ ĐƠN HÀNG</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TÊN KHÁCH HÀNG</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TỔNG TIỀN</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TRẠNG THÁI</th>
            <th className="px-4 py-3 font-semibold text-gray-700 text-center">HÀNH ĐỘNG</th>
            {isConfirmMode && <th className="px-4 py-3 text-center"></th>}
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.customer}</td>
              <td className="px-4 py-2">
                {order.total.toLocaleString("vi-VN")} ₫
              </td>
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
                  viewUrl={`/sales/orders/${parseInt(order.id.replace("ORD", ""))}`}
                  orderId={parseInt(order.id.replace("ORD", ""))}
                  currentStatus={mapStatusToCode(order.status)}
                  onDelete={() => console.log("Xóa đơn hàng:", order.id)}
                  onStatusUpdateSuccess={(newStatusCode) => {
                    const updated = orders.map((o) =>
                      o.id === order.id
                        ? { ...o, status: convertStatus(newStatusCode) }
                        : o
                    );
                    onOrdersChange?.(updated);
                  }}
                />
              </td>
              {isConfirmMode && (
                <td className="px-4 py-2 text-center">
                  {order.status === "Chờ xác nhận" && (
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => onSelectOrder?.(order.id)}
                    />
                  )}
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
    case "Đang đóng gói":
      return "bg-blue-100 text-blue-600";
    case "Đang giao hàng":
      return "bg-purple-100 text-purple-600";
    case "Đã giao":
      return "bg-green-100 text-green-600";
    case "Đã hủy":
      return "bg-red-100 text-red-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function mapStatusToCode(status: string): string {
  switch (status) {
    case "Chờ xác nhận": return "PENDING";
    case "Đang đóng gói": return "PACKING";
    case "Đang giao hàng": return "DELIVERING";
    case "Đã giao": return "DELIVERED";
    case "Đã hủy": return "CANCELLED";
    default: return "UNKNOWN";
  }
}

function convertStatus(statusCode: string): string {
  switch (statusCode) {
    case "PENDING": return "Chờ xác nhận";
    case "PACKING": return "Đang đóng gói";
    case "DELIVERING": return "Đang giao hàng";
    case "DELIVERED": return "Đã giao";
    case "CANCELLED": return "Đã hủy";
    default: return statusCode;
  }
}

