import React from "react";

export interface ExportDetail {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Props {
  exportDetails: ExportDetail[];
}

export default function ExportDetailTable({ exportDetails }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">TÊN SẢN PHẨM</th>
            <th className="px-4 py-3 font-semibold text-gray-700">SỐ LƯỢNG</th>
            <th className="px-4 py-3 font-semibold text-gray-700">ĐƠN GIÁ</th>
            <th className="px-4 py-3 font-semibold text-gray-700">THÀNH TIỀN</th>
          </tr>
        </thead>
        <tbody>
          {exportDetails.map((detail) => (
            <tr key={detail.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{detail.productName}</td>
              <td className="px-4 py-2">{detail.quantity}</td>
              <td className="px-4 py-2">
                {detail.unitPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td className="px-4 py-2">
                {detail.totalPrice.toLocaleString("vi-VN", {
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
