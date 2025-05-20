import React from "react";

export default function OrderSummary() {
  return (
    <div className="bg-gray-50 rounded-xl p-6 w-80 text-sm border mx-auto shadow-sm">
      {/* Tiêu đề */}
      <h2 className="text-lg font-semibold text-black mb-4">Đơn hàng</h2>

      {/* Tổng quan đơn hàng */}
      <div className="space-y-2 text-gray-800">
        <div className="flex justify-between">
          <span>Tổng tiền</span>
          <span className="font-semibold">870.000đ</span>
        </div>
        <div className="flex justify-between text-red-500">
          <span>Giảm giá trực tiếp</span>
          <span>-156.000đ</span>
        </div>
        <div className="flex justify-between text-orange-500">
          <span>Giảm giá voucher</span>
          <span>0đ</span>
        </div>
        <div className="flex justify-between text-blue-600">
          <span>Phí vận chuyển</span>
          <span>Miễn phí</span>
        </div>
      </div>

      {/* Thành tiền */}
      <div className="border-t border-gray-400 my-4"></div>
      <div className="flex justify-between text-sm font-semibold text-black">
        <span>Thành tiền</span>
        <span className="text-blue-600">714.000đ</span>
      </div>
      <div className="border-t border-gray-400 my-4"></div>

      {/* Phương thức thanh toán */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            defaultChecked
            className="accent-black"
          />
          <span className="text-gray-700">
            Thanh toán tiền mặt khi nhận hàng
          </span>
        </div>
        <div className="flex items-start gap-2">
          <input
            type="radio"
            name="payment"
            className="accent-gray-400"
            disabled
          />
          <span className="text-gray-400 leading-snug">
            Thanh toán bằng chuyển khoản
          </span>
        </div>
      </div>

      {/* Nút hủy */}
      <div className="pt-6">
        <button className="w-full border border-red-500 text-red-600 rounded py-2 font-semibold hover:bg-red-50 transition">
          HỦY ĐƠN HÀNG
        </button>
      </div>
    </div>
  );
}
