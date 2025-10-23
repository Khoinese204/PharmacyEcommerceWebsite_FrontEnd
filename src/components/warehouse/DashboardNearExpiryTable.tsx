import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/admin/TablePagination";

interface NearExpiryItem {
  id: number;
  batchNumber: string;
  productName: string;
  quantity: number;
  expiryDate: string;
}

export default function DashboardNearExpiryTable() {
  const [items, setItems] = useState<NearExpiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axios
      .get("/api/inventory")
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.dateStatus === "Sắp hết hạn"
        );
        setItems(filtered);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách thuốc sắp hết hạn:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500">Đang tải dữ liệu...</p>;
  if (items.length === 0)
    return <p className="text-gray-500">Không có thuốc sắp hết hạn.</p>;

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto mt-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">
      </h2>

      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">SỐ LÔ</th>
            <th className="px-4 py-2">TÊN THUỐC</th>
            <th className="px-4 py-2">SỐ LƯỢNG</th>
            <th className="px-4 py-2">HẠN SỬ DỤNG</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{item.batchNumber}</td>
              <td className="px-4 py-2">{item.productName}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2 text-yellow-700 font-medium">
                {new Date(item.expiryDate).toLocaleDateString("vi-VN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Phân trang */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
