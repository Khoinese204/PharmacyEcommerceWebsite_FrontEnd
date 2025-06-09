import React from "react";

export interface ImportDetail {
  id: string;
  productName: string;
  orderedAmount: number;
  receivedAmount: number;
  unitPrice: number;
  totalPrice: number;
}

interface Props {
  importDetails: ImportDetail[];
}

export default function ImportDetailTable({ importDetails }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">TÊN THUỐC</th>
            <th className="px-4 py-3 font-semibold text-gray-700">SỐ LƯỢNG ĐÃ ĐẶT</th>
            <th className="px-4 py-3 font-semibold text-gray-700">SỐ LƯỢNG ĐÃ NHẬN</th>
            <th className="px-4 py-3 font-semibold text-gray-700">ĐƠN GIÁ</th>
            <th className="px-4 py-3 font-semibold text-gray-700">TỔNG TIỀN</th>
          </tr>
        </thead>
        <tbody>
          {importDetails.map((detail) => (
            <tr key={detail.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{detail.productName}</td>
              <td className="px-4 py-2">{detail.orderedAmount}</td>
              <td className="px-4 py-2">{detail.receivedAmount}</td>
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
