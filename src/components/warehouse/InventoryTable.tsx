import React from "react";
import ActionButtons from "./ActionButtons";

export interface InventoryItem {
  id: number;
  batchNumber: string;
  productName: string;
  quantity: number;
  expiryDate: string;
  status: "Còn hàng" | "Sắp hết hàng" | "Hết hàng";
  dateStatus: "Còn hạn" | "Hết hạn" | "Sắp hết hạn";
}

interface Props {
  inventoryItems: InventoryItem[];
  onUpdateItem: (updatedItem: InventoryItem) => void;
  onEditItem?: (item: InventoryItem) => void;
}

export default function InventoryTable({ inventoryItems, onUpdateItem, onEditItem }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">SỐ LÔ</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TÊN THUỐC</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TỒN KHO</th>
            <th className="px-4 py-3 font-semibold text-gray-700">HẠN SỬ DỤNG</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TÌNH TRẠNG KHO</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TÌNH TRẠNG HẠN</th>
            <th className="px-4 py-3 font-semibold text-gray-700 text-center">HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => {
            // 💡 Màu tình trạng kho
            let statusClass = "";
            if (item.status === "Còn hàng") statusClass = "bg-green-100 text-green-700";
            else if (item.status === "Sắp hết hàng") statusClass = "bg-yellow-100 text-yellow-800";
            else statusClass = "bg-red-100 text-red-700";

            // 💡 Màu tình trạng hạn
            let dateStatusClass = "";
            if (item.dateStatus === "Còn hạn") {
              dateStatusClass = "bg-green-50 text-green-600";
            } else if (item.dateStatus === "Sắp hết hạn") {
              dateStatusClass = "bg-yellow-100 text-yellow-800";
            } else {
              dateStatusClass = "bg-red-100 text-red-700";
            }

            return (
              <tr key={item.batchNumber} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{item.batchNumber}</td>
                <td className="px-4 py-2">{item.productName}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">
                  {new Date(item.expiryDate).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${statusClass}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${dateStatusClass}`}
                  >
                    {item.dateStatus}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <ActionButtons
                    viewUrl={`/warehouse/inventory/${item.id}`}
                    editUrl=""
                    onDelete={() =>
                      console.log("Xóa lô hàng:", item.batchNumber)
                    }
                    customEditAction={() => {
                      if (onEditItem) onEditItem(item);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
