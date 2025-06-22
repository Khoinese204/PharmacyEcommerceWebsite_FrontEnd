import React from "react";

export interface InventoryDetail {
  id: number;
  batchNumber: string;
  productName: string;
  quantity: number;
  expiryDate: string;
  status: string;
  dateStatus: string;
  unitPrice: number;
}


interface Props {
  inventoryDetails: InventoryDetail[];
}

export default function InventoryDetailTable({ inventoryDetails }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">Tên thuốc</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Tồn kho</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Hạn sử dụng</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Đơn giá</th>
          </tr>
        </thead>
        <tbody>
          {inventoryDetails.map((detail, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{detail.productName}</td>
              <td className="px-4 py-2">{detail.quantity}</td>
              <td className="px-4 py-2">{detail.expiryDate}</td>
              <td className="px-4 py-2">
                {detail.unitPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
