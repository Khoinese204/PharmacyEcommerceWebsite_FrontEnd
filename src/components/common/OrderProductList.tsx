import React from "react";
import OrderProductItem from "./OrderProductItem";

type Product = {
  id: number;
  name: string;
  unit: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
};

type Props = {
  items: Product[];
};

const OrderProductList: React.FC<Props> = ({ items }) => {
  return (
    <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 max-w-3xl">
      {items.map((item, index) => (
        <OrderProductItem key={index} item={item} />
      ))}
    </div>
  );
};

export default OrderProductList;
