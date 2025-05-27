import React from "react";
import ActionButtons from "./ActionButtons";

export interface Supplier {
  id: string;
  supplier: string;
  contact: string;
  phone: number;
  email: string;
  address: string;
}

interface Props {
  suppliers: Supplier[];
}

export default function SupplierTable({
  suppliers,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">TÊN NHÀ CUNG CẤP</th>
            <th className="px-4 py-3 font-semibold text-gray-700">NGƯỜI LIÊN HỆ</th>
            <th className="px-4 py-3 font-semibold text-gray-700">SĐT</th>
            <th className="px-4 py-3 font-semibold text-gray-700">EMAIL</th>
            <th className="px-4 py-3 font-semibold text-gray-700">ĐỊA CHỈ</th>
            <th className="px-4 py-3 font-semibold text-gray-700 text-center">HÀNH ĐỘNG</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{supplier.supplier}</td>
              <td className="px-4 py-2">{supplier.contact}</td>
              <td className="px-4 py-2">{supplier.phone}</td>
              <td className="px-4 py-2">{supplier.email}</td>
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

