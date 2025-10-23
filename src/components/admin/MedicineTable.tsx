import React from "react";
import MedicineActionButtons from "./MedicineActionButtons";
import { getCategoryNameById } from "../../utils/getCategoryNameById";

export interface Medicine {
  id: string;
  name: string;
  originalPrice: number | null;
  price: number | null;
  categoryId: number;
  unit: string;
}

interface Props {
  medicines: Medicine[];
}

export default function MedicineTable({ medicines }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {["ID", "TÊN", "GIÁ GỐC", "GIÁ BÁN", "ĐƠN VỊ", "DANH MỤC", "HÀNH ĐỘNG"].map((header) => (
              <th
                key={header}
                className={`px-4 py-3 font-semibold text-gray-700 ${
                  header === "HÀNH ĐỘNG" ? "text-center" : "text-left"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {medicines.map((med) => (
            <tr key={med.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{med.id}</td>
              <td className="px-4 py-2">{med.name}</td>

              <td className="px-4 py-2">
                {med.originalPrice != null
                  ? med.originalPrice.toLocaleString("vi-VN") + "₫"
                  : "--"}
              </td>

              <td className="px-4 py-2">
                {(med.price != null ? med.price : med.originalPrice)?.toLocaleString("vi-VN") + "₫"}
              </td>

              <td className="px-4 py-2">{med.unit}</td>
              <td className="px-4 py-2">{getCategoryNameById(med.categoryId)}</td>

              <td className="px-4 py-2 text-center">
                <MedicineActionButtons medicineId={med.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
