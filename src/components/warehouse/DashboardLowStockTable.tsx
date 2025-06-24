import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/admin/TablePagination"; // ✅ dùng lại component phân trang cũ

interface LowStockItem {
  id: number;
  batchNumber: string;
  productName: string;
  quantity: number;
  expiryDate: string;
}

export default function DashboardLowStockTable() {
  const [items, setItems] = useState<LowStockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axios
      .get("/api/inventory") // hoặc `/api/warehouse/inventory` tùy backend của bạn
      .then((res) => {
        const filtered = res.data.filter(
          (item: any) => item.status === "Sắp hết hàng"
        );
        setItems(filtered);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách thuốc sắp hết:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500">Đang tải dữ liệu...</p>;
  if (items.length === 0)
    return <p className="text-gray-500">Không có thuốc sắp hết hàng.</p>;

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto mt-4">
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
              <td className="px-4 py-2">
                {new Date(item.expiryDate).toLocaleDateString("vi-VN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Thêm Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
