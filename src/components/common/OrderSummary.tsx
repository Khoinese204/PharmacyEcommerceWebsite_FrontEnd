import React from "react";

interface OrderSummaryProps {
  total: number;
  discount: number;
  voucher: number;
  shipping: number;
  final: number;
  method: string;
}

export default function OrderSummary({
  total,
  discount,
  voucher,
  shipping,
  final,
  method,
}: OrderSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 w-80 text-sm border mx-auto shadow-sm">
      <h2 className="text-lg font-semibold text-black mb-4">Đơn hàng</h2>

      <div className="space-y-2 text-gray-800">
        <div className="flex justify-between">
          <span>Tổng tiền</span>
          <span className="font-semibold">{total.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between text-red-500">
          <span>Giảm giá trực tiếp</span>
          <span>-{discount.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between text-orange-500">
          <span>Giảm giá voucher</span>
          <span>-{voucher.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between text-blue-600">
          <span>Phí vận chuyển</span>
          <span>
            {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()}đ`}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-400 my-4"></div>
      <div className="flex justify-between text-sm font-semibold text-black">
        <span>Thành tiền</span>
        <span className="text-blue-600">{final.toLocaleString()}đ</span>
      </div>
      <div className="border-t border-gray-400 my-4"></div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            defaultChecked
            className="accent-black"
          />
          <span className="text-gray-700">
            {method === "COD"
              ? "Thanh toán tiền mặt khi nhận hàng"
              : "Thanh toán bằng chuyển khoản"}
          </span>
        </div>
      </div>

      <div className="pt-6">
        <button className="w-full border border-red-500 text-red-600 rounded py-2 font-semibold hover:bg-red-50 transition">
          HỦY ĐƠN HÀNG
        </button>
      </div>
    </div>
  );
}
