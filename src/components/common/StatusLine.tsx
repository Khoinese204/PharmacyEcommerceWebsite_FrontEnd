// src/components/common/StatusLine.tsx
import React from "react";

interface StatusLineProps {
  orderCode: string;
  totalAmount: number;
  orderDate: string;
  expectedDeliveryDate: string;
  totalItems: number;
}

export default function StatusLine({
  orderCode,
  totalAmount,
  orderDate,
  expectedDeliveryDate,
  totalItems,
}: StatusLineProps) {
  const formattedOrderDate = new Date(orderDate).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const formattedDelivery = new Date(expectedDeliveryDate).toLocaleDateString(
    "vi-VN"
  );

  return (
    <div className="text-left bg-yellow-50 border rounded-lg p-4 flex justify-between items-center mt-5">
      <div>
        <p className="text-sm text-black font-semibold">
          Mã đơn hàng #{orderCode}
        </p>
        <p className="text-xs text-gray-500">
          {totalItems} sản phẩm ・ Đơn hàng đã đặt vào {formattedOrderDate} ・
          Dự kiến giao hàng: {formattedDelivery}
        </p>
      </div>
      <p className="text-cyan-500 font-semibold text-base">
        {totalAmount.toLocaleString()}đ
      </p>
    </div>
  );
}
