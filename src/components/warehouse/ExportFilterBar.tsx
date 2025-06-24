import React from "react";
import { FaUndo } from "react-icons/fa";

interface Props {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export default function ExportFilterBar({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onReset,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        {/* Tìm theo tên người nhận */}
        <input
          type="text"
          placeholder="Tìm theo tên người nhận"
          className="border rounded px-3 py-1.5 text-sm w-56"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* Lọc theo trạng thái đơn xuất */}
        <select
          className="border rounded px-3 py-1.5 text-sm"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Trạng thái</option>
          <option value="PENDING">Chờ xác nhận</option>
          <option value="PACKING">Đang gói hàng</option>
          <option value="DELIVERING">Đang giao hàng</option>
          <option value="DELIVERED">Đã giao</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>

        {/* Nút đặt lại bộ lọc */}
        <button
          className="flex items-center gap-1 px-3 py-1.5 text-red-500 border border-red-100 bg-red-50 rounded text-sm hover:bg-red-100"
          onClick={onReset}
        >
          <FaUndo />
          Đặt lại mặc định
        </button>
      </div>
    </div>
  );
}
