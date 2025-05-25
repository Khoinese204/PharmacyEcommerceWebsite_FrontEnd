import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="flex justify-end px-6 py-4">
      <div className="flex gap-2 items-center">
        <button
          disabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
          className={`w-8 h-8 rounded border flex items-center justify-center ${
            isFirst
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          &lt;
        </button>
        <button
          disabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
          className={`w-8 h-8 rounded border flex items-center justify-center ${
            isLast
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
