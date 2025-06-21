import React from "react";
import ActionButtons from "./ActionButtons";

export interface ImportOrder {
  id: number;
  supplier: string;
  createdAt: string; // ISO string
  totalAmount: number;
}

interface Props {
  orders: ImportOrder[];
  isConfirmMode?: boolean;
  selectedOrders?: string[];
  onSelectOrder?: (orderId: string) => void;
}

export default function ImportTable({
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
            <th className="px-4 py-3 font-semibold text-gray-700">NHÀ CUNG CẤP</th>
            <th className="px-4 py-3 font-semibold text-gray-700">NGÀY TẠO ĐƠN</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TỔNG TIỀN</th>
            <th className="px-4 py-3 font-semibold text-gray-700 text-center">HÀNH ĐỘNG</th>
            {isConfirmMode && <th className="px-4 py-3 text-center"></th>}
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{"IMP" + String(order.id).padStart(3, "0")}</td>
              <td className="px-4 py-2">{order.supplier}</td>
              <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
              <td className="px-4 py-2">{formatCurrency(order.totalAmount)}</td>
              <td className="px-4 py-2 text-center">
                <ActionButtons
                  viewUrl={`/warehouse/import/${order.id}`}
                  editUrl={`/warehouse/import/${order.id}/edit`}
                  onDelete={() => console.log("Xóa đơn nhập:", order.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN");
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}


