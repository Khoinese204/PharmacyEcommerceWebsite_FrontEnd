import React from "react";
import { FaUndo } from "react-icons/fa";

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export default function ImportFilterBar({
  searchTerm,
  onSearchChange,
  onReset,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        {/* Tìm theo tên đơn vị vận chuyển */}
        <input
          type="text"
          placeholder="Tìm theo đơn vị vận chuyển"
          className="border rounded px-3 py-1.5 text-sm w-56"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

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
