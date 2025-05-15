// src/pages/customer/CheckoutPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";

const CheckoutPage = () => {
  const [voucher, setVoucher] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-white text-gray-800">
      <BreadcrumbBack
        content="Quay lại giỏ hàng"
        pageTo="/cart"
      ></BreadcrumbBack>
      {/* Nội dung */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thông tin đặt hàng */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Thông tin đặt hàng</h2>
          <input type="text" placeholder="Họ và tên *" className="input" />
          <input type="text" placeholder="Số điện thoại *" className="input" />
          <div className="flex gap-4">
            <select className="input flex-1">
              <option>Chọn tỉnh/thành phố *</option>
            </select>
            <select className="input flex-1">
              <option>Chọn quận/huyện *</option>
            </select>
          </div>
          <select className="input">
            <option>Chọn phường/xã *</option>
          </select>
          <input type="text" placeholder="Địa chỉ cụ thể *" className="input" />
          <textarea
            placeholder="Ghi chú (không bắt buộc)"
            className="input"
            rows={3}
          ></textarea>
          <label className="text-sm inline-flex items-center gap-2">
            <input type="checkbox" /> Yêu cầu xuất hóa đơn điện tử?
          </label>
        </div>

        {/* Đơn hàng */}
        <div className="space-y-6">
          {/* Mã giảm giá */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Áp dụng ưu đãi</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                placeholder="Nhập mã giảm giá"
                className="input flex-1"
              />
              <button className="bg-cyan-400 hover:bg-cyan-500 text-white px-4 py-2 rounded text-sm">
                Áp dụng
              </button>
            </div>
          </div>

          {/* Chi tiết đơn */}
          <h2 className="text-left text-lg font-semibold">Đơn hàng</h2>
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tổng tiền</span>
              <span>870.000đ</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Giảm giá trực tiếp</span>
              <span>-156.000đ</span>
            </div>
            <div className="flex justify-between">
              <span>Giảm giá voucher</span>
              <span>0đ</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Phí vận chuyển</span>
              <span className="text-blue-600">Miễn phí</span>
            </div>
            <div className="border-t pt-4 space-y-2 text-sm"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Thành tiền</span>
              <span className="text-blue-600">714.000đ</span>
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="space-y-2">
            <p className="text-left text-sm">Chọn phương thức thanh toán</p>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="payment" defaultChecked /> Thanh toán
              tiền mặt khi nhận hàng
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="payment" /> Thanh toán bằng chuyển khoản
              (QR Code)
            </label>
          </div>

          <button
            onClick={() => navigate("/ordersuccess")}
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-2 rounded font-semibold"
          >
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
