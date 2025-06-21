import React from "react";
import ActionButtons from "./ActionButtons";

export interface Shipment {
  id: number;
  shipmentCode: string;
  orderId: number;
  shippedBy: string;
  shippedAt: string; // ISO string
  deliveredAt?: string; // có thể null
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED"; // enum
}

interface Props {
  shipments: Shipment[];
}

export default function ShipmentTable({ shipments }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">MÃ VẬN CHUYỂN</th>
            <th className="px-4 py-3 font-semibold text-gray-700">MÃ ĐƠN HÀNG</th>
            <th className="px-4 py-3 font-semibold text-gray-700">NV GIAO HÀNG</th>
            <th className="px-4 py-3 font-semibold text-gray-700">NGÀY GIAO</th>
            <th className="px-4 py-3 font-semibold text-gray-700">NGÀY NHẬN</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TRẠNG THÁI</th>
            <th className="px-4 py-3 font-semibold text-gray-700 text-center">HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{shipment.shipmentCode}</td>
              <td className="px-4 py-2">{"ORD" + String(shipment.orderId).padStart(3, "0")}</td>
              <td className="px-4 py-2">{shipment.shippedBy}</td>
              <td className="px-4 py-2">
                {shipment.shippedAt
                  ? new Date(shipment.shippedAt).toLocaleDateString("vi-VN")
                  : "--"}
              </td>
              <td className="px-4 py-2">
                {shipment.deliveredAt
                  ? new Date(shipment.deliveredAt).toLocaleDateString("vi-VN")
                  : "--"}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    shipment.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : shipment.status === "SHIPPED"
                      ? "bg-blue-100 text-blue-700"
                      : shipment.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {{
                    PENDING: "Chờ xử lý",
                    SHIPPED: "Đang giao",
                    DELIVERED: "Đã giao",
                    CANCELLED: "Đã hủy",
                  }[shipment.status]}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <ActionButtons
                  viewUrl={`/warehouse/shipment/${shipment.id}`}
                  editUrl={`/warehouse/shipment/${shipment.id}/edit`}
                  onDelete={() => console.log("Xóa vận chuyển:", shipment.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
