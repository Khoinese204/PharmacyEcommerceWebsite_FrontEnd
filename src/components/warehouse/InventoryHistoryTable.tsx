import React from "react";

export interface InventoryLogItem {
  id: number;
  medicineName: string;
  type: "import" | "export";
  quantity: number;
  relatedOrderId: number;
  createdAt: string;
}

interface Props {
  logs: InventoryLogItem[];
}

export default function InventoryHistoryTable({ logs }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-700">TÊN THUỐC</th>
            <th className="px-4 py-3 font-semibold text-gray-700">LOẠI</th>
            <th className="px-4 py-3 font-semibold text-gray-700">SỐ LƯỢNG</th>
            <th className="px-4 py-3 font-semibold text-gray-700">MÃ ĐƠN LIÊN QUAN</th>
            <th className="px-4 py-3 font-semibold text-gray-700">THỜI GIAN</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{log.medicineName}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    log.type === "import"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {log.type === "import" ? "Nhập kho" : "Xuất kho"}
                </span>
              </td>
              <td className="px-4 py-2">{log.quantity}</td>
              <td className="px-4 py-2">
                {log.type === "import" ? `IMP${String(log.relatedOrderId).padStart(3, "0")}` : `ORD${String(log.relatedOrderId).padStart(3, "0")}`}
              </td>
              <td className="px-4 py-2">
                {new Date(log.createdAt).toLocaleString("vi-VN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
