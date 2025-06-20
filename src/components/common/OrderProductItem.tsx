// src/components/common/OrderProductItem.tsx
import React from "react";

type Props = {
  item: {
    id: number;
    name: string;
    unit: string;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    quantity: number;
  };
};

export default function OrderProductItem({ item }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-4 text-sm text-black">
      {/* Hình ảnh và thông tin thuốc */}
      <div className="flex items-center gap-4 w-full">
        <img
          src={`/images/products/${item.image}`}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex flex-col">
          <p className="font-medium text-black">{item.name}</p>
          <p className="text-xs text-gray-500">{item.unit}</p>
          <div className="flex gap-2 text-sm mt-1">
            <span className="text-red-500 font-bold">
              {item.discountedPrice.toLocaleString()}đ
            </span>
            {item.discountedPrice < item.originalPrice && (
              <span className="line-through text-gray-400">
                {item.originalPrice.toLocaleString()}đ
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Số lượng hiển thị readonly */}
      <div className="text-sm font-semibold text-gray-800 whitespace-nowrap ml-4">
        x{item.quantity}
      </div>
    </div>
  );
}
