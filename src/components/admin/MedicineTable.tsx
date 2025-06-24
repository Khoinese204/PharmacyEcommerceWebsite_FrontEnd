import React from "react";
import ActionButtons from "./UserActionButtons";
import MedicineActionButtons from "./MedicineActionButtons";
import { getCategoryNameById } from "../../utils/getCategoryNameById";

export interface Medicine {
  id: string;
  name: string;
  originalPrice: number;
  price: number;
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
            {[
              "ID",
              "TÊN",
              "GIÁ GỐC",
              "GIÁ BÁN",
              "ĐƠN VỊ",
              "DANH MỤC",
              "HÀNH ĐỘNG",
            ].map((header) => (
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
                {med.originalPrice.toLocaleString("vi-VN")}
              </td>
              <td className="px-4 py-2">{med.price.toLocaleString("vi-VN")}</td>
              <td className="px-4 py-2">{med.unit}</td>

              <td>{getCategoryNameById(med.categoryId)}</td>
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

function getRoleStyle(role: string) {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-600";
    case "Sales":
      return "bg-purple-100 text-purple-600";
    case "Warehouse":
      return "bg-green-100 text-green-600";
    case "Customer":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
