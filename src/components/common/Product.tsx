import React from "react";
import { Link } from "react-router-dom";

// ✅ CẬP NHẬT INTERFACE TẠI ĐÂY
export interface ProductProps {
  id: number; // <-- ⚠️ QUAN TRỌNG: Phải thêm dòng này
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  unit: string;
}

const Product: React.FC<ProductProps> = ({
  id, // <-- Nhận id vào đây
  name,
  image,
  price,
  originalPrice,
  unit,
}) => {
  return (
    // Ví dụ: Link tới trang chi tiết sản phẩm
    <Link
      to={`/medicines/${id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain p-4"
          onError={(e) =>
            (e.currentTarget.src = "https://placehold.co/150x150?text=No+Image")
          }
        />
        {originalPrice && originalPrice > price && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
          </span>
        )}
      </div>

      <div className="p-4">
        <h3
          className="text-gray-800 font-medium text-sm line-clamp-2 h-10 mb-2"
          title={name}
        >
          {name}
        </h3>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold text-lg">
              {price.toLocaleString("vi-VN")} đ
            </span>
            <span className="text-gray-500 text-xs">/ {unit}</span>
          </div>

          {originalPrice && originalPrice > price && (
            <span className="text-gray-400 text-xs line-through">
              {originalPrice.toLocaleString("vi-VN")} đ
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Product;
