import React from "react";
import { FaFilter, FaUndo } from "react-icons/fa";

export default function MedicineFilterBar() {
  return (
    <div className="flex justify-between items-center mb-4">
      {/* Left: Filter options */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 px-3 py-1.5 border rounded text-sm hover:bg-gray-100">
          <FaFilter />
          Lọc bởi
        </button>

        <select className="border rounded px-3 py-1.5 text-sm">
          <option>DANH MỤC</option>
          <option>Thuốc</option>
          <option>Thực phẩm chức năng</option>
          <option>Chăm sóc cá nhân</option>
        </select>
        <select className="border rounded px-3 py-1.5 text-sm">
          <option>GIÁ</option>
          <option>Dưới 100.000đ</option>
          <option>100.000đ - 300.000đ</option>
          <option>300.000đ - 500.000đ</option>
          <option>Trên 500.000đ</option>
        </select>

        <button className="flex items-center gap-1 px-3 py-1.5 text-red-500 border border-red-100 bg-red-50 rounded text-sm hover:bg-red-100">
          <FaUndo />
          Đặt lại mặc định
        </button>
      </div>
    </div>
  );
}
