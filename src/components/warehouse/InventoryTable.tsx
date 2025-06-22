import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import axios from "axios"; // ← THÊM DÒNG NÀY


export interface InventoryItem {
  batchNumber: string;
  productName: string;
  quantity: number;
  expiryDate: string;
  status: "Còn hạn" | "Sắp hết hàng";
}

interface Props {
  inventoryItems: InventoryItem[];
  onUpdateItem: (updatedItem: InventoryItem) => void;
}

export default function InventoryTable({ inventoryItems, onUpdateItem }: Props) {
  const [editBatch, setEditBatch] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(0);

  const handleEditClick = (item: InventoryItem) => {
    setEditBatch(item.batchNumber);
    setEditQuantity(item.quantity);
  };

  const handleSave = async (item: InventoryItem) => {
  try {
    const updatedItem: InventoryItem = {
      ...item,
      quantity: editQuantity,
    };

    // Gọi API cập nhật tồn kho
    await axios.patch(`/api/inventory/${item.batchNumber}`, {
      quantity: editQuantity,
    });

    onUpdateItem(updatedItem); // cập nhật state ở cha
    setEditBatch(null);
  } catch (error) {
    console.error("Lỗi khi cập nhật tồn kho:", error);
    alert("❌ Cập nhật thất bại. Vui lòng thử lại.");
  }
};


  const handleCancel = () => {
    setEditBatch(null);
  };

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
          {inventoryItems.map((item) => {
            const isEditing = editBatch === item.batchNumber;
            return (
              <tr key={item.batchNumber} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{item.batchNumber}</td>
                <td className="px-4 py-2">{item.productName}</td>
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="number"
                      className="border px-2 py-1 w-20"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(Number(e.target.value))}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="px-4 py-2">
                  {new Date(item.expiryDate).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.status === "Còn hạn"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Sắp hết hàng"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  {isEditing ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleSave(item)}
                        className="text-green-600 hover:text-green-800"
                      >
                        💾
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ❌
                      </button>
                    </div>
                  ) : (
                    <ActionButtons
                      viewUrl={`/warehouse/inventory/${item.batchNumber}`}
                      editUrl=""
                      onDelete={() =>
                        console.log("Xóa lô hàng:", item.batchNumber)
                      }
                      customEditAction={() => handleEditClick(item)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
