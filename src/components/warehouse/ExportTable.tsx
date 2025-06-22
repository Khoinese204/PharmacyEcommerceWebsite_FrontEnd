import React from "react";
import ActionButtonsExport from "./ActionButtonsExport";

export interface ExportOrder {
  id: number;
  orderId: number;
  recipientName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  addressDetail: string;
  status: "PENDING" | "PACKING" | "DELIVERING" | "DELIVERED" | "CANCELLED";
}

interface Props {
  orders: ExportOrder[];
  isConfirmMode?: boolean;
  selectedOrders?: string[];
  onSelectOrder?: (orderId: string) => void;
  onOrdersChange?: (newOrders: ExportOrder[]) => void;
}

export default function ExportTable({
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
              <td className="px-4 py-2">{`ORD${order.orderId.toString().padStart(3, "0")}`}</td>
              <td className="px-4 py-2">{order.recipientName}</td>
              <td className="px-4 py-2">{order.phone}</td>
              <td className="px-4 py-2">
                {`${order.addressDetail}, ${order.ward}, ${order.district}, ${order.province}`}
              </td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <ActionButtonsExport
                  viewUrl={`/warehouse/export/${order.orderId}`}
                  orderId={order.orderId}
                  currentStatus={order.status}
                  onDelete={() => console.log("Xóa đơn xuất:", order.orderId)}
                  onStatusUpdateSuccess={(newStatusCode) => {
                    const updated = orders.map((o) =>
                      o.orderId === order.orderId
                        ? { ...o, status: newStatusCode as ExportOrder["status"] }
                        : o
                    );
                    onOrdersChange?.(updated);
                  }}
                />
              </td>
              {isConfirmMode && (
                <td className="px-4 py-2 text-center">
                  {order.status === "PENDING" && (
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.orderId.toString())}
                      onChange={() => onSelectOrder?.(order.orderId.toString())}
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
    case "PENDING":
      return "bg-yellow-100 text-yellow-600";
    case "PACKING":
      return "bg-purple-100 text-purple-600";
    case "DELIVERING":
      return "bg-orange-100 text-orange-600";
    case "DELIVERED":
      return "bg-emerald-100 text-emerald-600";
    case "CANCELLED":
      return "bg-red-100 text-red-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "PENDING":
      return "Chờ xác nhận";
    case "PACKING":
      return "Đang gói hàng";
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
