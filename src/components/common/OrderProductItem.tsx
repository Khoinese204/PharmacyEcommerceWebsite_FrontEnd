import React from "react";
import QuantityButton from "./QuantityButton";
import { Link } from "react-router-dom";

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

const OrderProductItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="text-black flex justify-between items-center gap-4">
      <div className="flex gap-4 items-start">
        <img
          src={item.image}
          alt={item.name}
          className="w-14 h-14 rounded object-cover bg-gray-100"
        />
        <div className="text-sm text-left">
          <p className="font-semibold">{item.name}</p>
          <p className="text-xs text-gray-500">Đơn vị tính: {item.unit}</p>
          <p className="text-xs line-through text-gray-400">
            {item.originalPrice.toLocaleString()}đ
          </p>
          <p className="text-blue-600 font-semibold">
            {item.discountedPrice.toLocaleString()}đ
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end">
        {/* <Link
          to={`/products/${item.id}`}
          className="text-xs text-blue-700 hover:underline"
        >
          Xem chi tiết
        </Link> */}
        <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-1 text-sm">
          <QuantityButton
            enabled={false}
            quantity={0}
            onIncrement={function (): void {
              throw new Error("Function not implemented.");
            }}
            onDecrement={function (): void {
              throw new Error("Function not implemented.");
            }}
          ></QuantityButton>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
