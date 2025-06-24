import React from "react";
import { FaFilter, FaUndo } from "react-icons/fa";

interface Props {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  priceFilter: string;
  setPriceFilter: (value: string) => void;
  onReset: () => void;
}

export default function MedicineFilterBar({
  categoryFilter,
  setCategoryFilter,
  priceFilter,
  setPriceFilter,
  onReset,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 px-3 py-1.5 border rounded text-sm hover:bg-gray-100">
          <FaFilter />
          Lọc bởi
        </button>

        <select
          className="border rounded px-3 py-1.5 text-sm"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">DANH MỤC</option>
          <option>Thuốc</option>
          <option>Thực phẩm chức năng</option>
          <option>Chăm sóc cá nhân</option>
        </select>

        <select
          className="border rounded px-3 py-1.5 text-sm"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">GIÁ</option>
          <option>Dưới 100.000đ</option>
          <option>100.000đ - 300.000đ</option>
          <option>300.000đ - 500.000đ</option>
          <option>Trên 500.000đ</option>
        </select>

        <button
          onClick={onReset}
          className="flex items-center gap-1 px-3 py-1.5 text-red-500 border border-red-100 bg-red-50 rounded text-sm hover:bg-red-100"
        >
          <FaUndo />
          Đặt lại mặc định
        </button>
      </div>
    </div>
  );
}
