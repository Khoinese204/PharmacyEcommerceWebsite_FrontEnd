import React, { useState } from "react";
import ActionButtons from "./ActionButtons";

export interface InventoryItem {
  batchNumber: string;
  productName: string;
  quantity: number;
  expiryDate: string;
  status: "Còn hạn" | "Sắp hết hạn" | "Hết hạn" | "Hết hàng";
}

interface Props {
  inventoryItems: InventoryItem[];
  onUpdateItem: (updatedItem: InventoryItem) => void;
}

export default function InventoryTable({ inventoryItems, onUpdateItem }: Props) {
  const [editBatch, setEditBatch] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<InventoryItem>>({});

  const handleEditClick = (item: InventoryItem) => {
    setEditBatch(item.batchNumber);
    setEditData({ quantity: item.quantity, status: item.status });
  };

  const handleSave = (item: InventoryItem) => {
    const updatedItem = {
      ...item,
      quantity: editData.quantity ?? item.quantity,
      status: editData.status ?? item.status,
    };
    onUpdateItem(updatedItem);
    setEditBatch(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditBatch(null);
    setEditData({});
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
                      value={editData.quantity ?? item.quantity}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          quantity: Number(e.target.value),
                        }))
                      }
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="px-4 py-2">
                  {new Date(item.expiryDate).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-4 py-2">
                  {isEditing ? (
                    <select
                      className="border px-2 py-1"
                      value={editData.status ?? item.status}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          status: e.target.value as InventoryItem["status"],
                        }))
                      }
                    >
                      <option value="Còn hạn">Còn hạn</option>
                      <option value="Sắp hết hạn">Sắp hết hạn</option>
                      <option value="Hết hạn">Hết hạn</option>
                      <option value="Hết hàng">Hết hàng</option>
                    </select>
                  ) : (
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
                  )}
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
                      // Chỉ override nút edit để dùng inline edit
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
