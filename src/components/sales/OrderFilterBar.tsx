import React from "react";
import { FaUndo } from "react-icons/fa";

interface Props {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export default function OrderFilterBar({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onReset,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      {/* Filter options */}
      <div className="flex items-center gap-2">
        {/* Search by customer name */}
        <input
          type="text"
          placeholder="Tìm theo tên khách hàng"
          className="border rounded px-3 py-1.5 text-sm w-56"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* Filter by status */}
        <select
          className="border rounded px-3 py-1.5 text-sm"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Trạng thái</option>
          <option value="Chờ xác nhận">Chờ xác nhận</option>
          <option value="Đã xác nhận">Đã xác nhận</option>
          <option value="Đang đóng gói">Đang đóng gói</option>
          <option value="Đã đóng gói">Đã đóng gói</option>
          <option value="Đang giao hàng">Đang giao hàng</option>
          <option value="Đã giao">Đã giao</option>
          <option value="Đã hủy">Đã hủy</option>
          <option value="Giao hàng thất bại">Giao hàng thất bại</option>
          <option value="Đã hoàn tiền">Đã hoàn tiền</option>
        </select>

        {/* Reset button */}
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
