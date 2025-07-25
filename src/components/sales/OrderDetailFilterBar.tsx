import React from "react";
import { FaUndo } from "react-icons/fa";

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function OrderDetailFilterBar({
  searchTerm,
  onSearchChange,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        {/* Tìm theo tên sản phẩm */}
        <input
          type="text"
          placeholder="Tìm theo tên sản phẩm"
          className="border rounded px-3 py-1.5 text-sm w-56"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
