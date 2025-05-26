import React from "react";
import ActionButtons from "./ActionButtons";

export interface InventoryItem {
  batchNumber: string;
  productName: string;
  quantity: number;
  expiryDate: string; // ISO format: yyyy-mm-dd
  status: "Còn hạn" | "Sắp hết hạn" | "Hết hạn" | "Hết hàng";
}

interface Props {
  inventoryItems: InventoryItem[];
}

export default function InventoryTable({ inventoryItems }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">SỐ LÔ</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TÊN THUỐC</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TỒN KHO</th>
            <th className="px-4 py-3 font-semibold text-gray-700">HẠN SỬ DỤNG</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TRẠNG THÁI</th>
            <th className="px-4 py-3 font-semibold text-gray-700 text-center">HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.batchNumber} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{item.batchNumber}</td>
              <td className="px-4 py-2">{item.productName}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">{new Date(item.expiryDate).toLocaleDateString("vi-VN")}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.status === "Còn hạn"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Sắp hết hạn"
                      ? "bg-yellow-100 text-yellow-700"
                      : item.status === "Hết hàng"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <ActionButtons
                    viewUrl={`/warehouse/inventory/${item.batchNumber}`}
                    editUrl={`/warehouse/inventory/${item.batchNumber}/edit`}
                    onDelete={() => console.log("Xóa đơn hàng:", item.batchNumber)}
                />
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
