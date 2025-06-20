import React from "react";
import ActionButtons from "./ActionButtons";

export interface Supplier {
  id: number;               // sửa lại từ string → number
  name: string;             // tên nhà cung cấp
  contactInfo: string;      // gộp người liên hệ + sđt + email
  address: string;
}

interface Props {
  suppliers: Supplier[];
}

export default function SupplierTable({ suppliers }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">TÊN NHÀ CUNG CẤP</th>
            <th className="px-4 py-3 font-semibold text-gray-700">THÔNG TIN LIÊN HỆ</th>
            <th className="px-4 py-3 font-semibold text-gray-700">ĐỊA CHỈ</th>
            <th className="px-4 py-3 font-semibold text-gray-700 text-center">HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{supplier.name}</td>
              <td className="px-4 py-2">{supplier.contactInfo}</td>
              <td className="px-4 py-2">{supplier.address}</td>
              <td className="px-4 py-2 text-center">
                <ActionButtons
                  viewUrl={`/warehouse/supplier/${supplier.id}`}
                  editUrl={`/warehouse/supplier/${supplier.id}/edit`}
                  onDelete={() => console.log("Xóa nhà cung cấp:", supplier.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
