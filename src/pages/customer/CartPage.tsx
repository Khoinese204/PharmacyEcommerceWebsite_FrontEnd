import React, { useState } from "react";
import QuantityButton from "../../components/common/QuantityButton";
import { useNavigate } from "react-router-dom";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";

export default function CartPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Breadcrumb */}
      <BreadcrumbBack content="Tiếp tục mua sắm" pageTo="/"></BreadcrumbBack>
      {/* Cart Items */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-4 text-left">
          {/* Item 1 */}
          <div className="flex justify-between items-center border rounded-lg p-4 shadow-sm">
            <div className="flex gap-4 items-center">
              <img
                src="/product-1.jpg"
                alt="Ibuprofen"
                className="w-16 h-16 rounded"
              />
              <div>
                <h3 className="font-semibold">Ibuprofen</h3>
                <p className="text-sm text-gray-500">Đơn vị tính: Lọ</p>
                <p className="text-blue-600 font-bold">132.000đ</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-1 w-fit text-sm">
                <QuantityButton></QuantityButton>
              </div>
              <button className="text-red-500 hover:text-red-700 text-xl">
                🗑️
              </button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex justify-between items-center border rounded-lg p-4 shadow-sm">
            <div className="flex gap-4 items-center">
              <img
                src="/product-2.jpg"
                alt="Bioderma"
                className="w-16 h-16 rounded"
              />
              <div>
                <h3 className="font-semibold">Bioderma</h3>
                <p className="text-sm text-gray-500">Đơn vị tính: Chai</p>
                <p className="text-blue-600 font-bold">150.000đ</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-1 w-fit text-sm">
                <QuantityButton></QuantityButton>
              </div>
              <button className="text-red-500 hover:text-red-700 text-xl">
                🗑️
              </button>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="space-y-6">
          {/* Voucher Input */}
          <div>
            <h3 className="font-semibold mb-2">Áp dụng ưu đãi</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                className="border px-3 py-2 rounded text-sm w-full"
              />
              <button className="bg-cyan-400 text-white px-4 rounded hover:bg-cyan-500 text-sm">
                ÁP DỤNG
              </button>
            </div>
          </div>

          {/* Tổng giỏ hàng */}
          <div className="border-t pt-4">
            <h3 className="font-bold mb-2">TỔNG GIỎ HÀNG</h3>
            <div className="flex justify-between text-sm mb-1">
              <span>Tổng tiền</span>
              <span>870.000đ</span>
            </div>
            <div className="flex justify-between text-sm text-orange-500 mb-1">
              <span>Giảm giá trực tiếp</span>
              <span>-156.000đ</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Giảm giá voucher</span>
              <span>0đ</span>
            </div>
            <div className="flex justify-between font-semibold text-blue-700">
              <span>Thành tiền</span>
              <span>714.000đ</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-4 bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600"
            >
              MUA HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
