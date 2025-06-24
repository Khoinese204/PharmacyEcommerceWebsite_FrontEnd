import React from "react";
import axios from "axios";
import ActionButtons from "./ActionButtons";
import { useNavigate } from "react-router-dom";

export interface Shipment {
  id: number;
  shipmentCode: string;
  orderId: number;
  shippedBy: string;
  shippedAt: string; // ISO string
  deliveredAt?: string; // có thể null
  status: "WAITING" | "SHIPPING" | "DELIVERED"; // enum
}

interface Props {
  shipments: Shipment[];
}

export default function ShipmentTable({ shipments }: Props) {
  const navigate = useNavigate();

  const handleMarkAsDelivered = async (shipmentId: number) => {
    const confirmed = window.confirm("Xác nhận đã giao hàng?");
    if (!confirmed) return;

    try {
      await axios.put(`/api/shipments/${shipmentId}/status`, {
        status: "DELIVERED",
      });
      alert("Cập nhật trạng thái thành công!");
      window.location.reload(); // reload bảng
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Cập nhật trạng thái thất bại.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">MÃ VẬN CHUYỂN</th>
            <th className="px-4 py-3 font-semibold text-gray-700">MÃ ĐƠN HÀNG</th>
            <th className="px-4 py-3 font-semibold text-gray-700">ĐƠN VỊ VẬN CHUYỂN</th>
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
              <td className="px-4 py-2">
                {"ORD" + String(shipment.orderId).padStart(3, "0")}
              </td>
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
                    shipment.status === "WAITING"
                      ? "bg-yellow-100 text-yellow-700"
                      : shipment.status === "SHIPPING"
                      ? "bg-blue-100 text-blue-700"
                      : shipment.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {{
                    WAITING: "Chờ xử lý",
                    SHIPPING: "Đang giao hàng",
                    DELIVERED: "Đã giao",
                  }[shipment.status]}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <ActionButtons
                  viewUrl={`/warehouse/shipment/${shipment.id}`}
                  editUrl={`/warehouse/shipment/${shipment.id}/edit`}
                  onDelete={() => console.log("Xóa vận chuyển:", shipment.id)}
                  customEditAction={
                    shipment.status === "SHIPPING"
                      ? () => handleMarkAsDelivered(shipment.id)
                      : undefined
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
