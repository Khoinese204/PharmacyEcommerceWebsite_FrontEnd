// src/pages/customer/OrderSuccessPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const breadcrumbItems = [{ label: "Quay lại giỏ hàng", path: "/cart" }];
  const { orderId, name, phone, address, total, expectedDate, paymentMethod } =
    location.state || {};

  return (
    <>
      <div>
        <BreadcrumbBack items={breadcrumbItems}></BreadcrumbBack>
      </div>

      <div className="py-10 bg-white flex items-start justify-center pt-20">
        <div className="max-w-2xl mx-auto text-center p-6 rounded">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-4 text-[#00b14f] uppercase tracking-wide">
            Đặt hàng thành công!
          </h2>

          <div className="bg-gray-100 text-left rounded p-5 text-sm leading-relaxed text-gray-800">
            <p>
              Bạn đã đặt hàng thành công đơn hàng mã <strong>{orderId}</strong>,{" "}
              {paymentMethod === "bank"
                ? "đã chọn hình thức chuyển khoản (QR Code)."
                : "thanh toán khi nhận hàng."}
            </p>
            <p>
              Khách hàng: <strong>{name}</strong>, SĐT: <strong>{phone}</strong>
              .
            </p>
            <p>
              Sản phẩm sẽ được giao đến địa chỉ: <strong>{address}</strong>
            </p>
            <p>
              Tổng tiền: <strong>{total.toLocaleString()}đ</strong>
            </p>
            <p>
              Dự kiến giao hàng trước: <strong>{expectedDate}</strong>
            </p>
            <p className="mt-2">PrimeCare rất hân hạnh được phục vụ bạn!</p>
          </div>

          <div className="flex justify-center gap-10 mt-6 text-sm font-semibold">
            <button
              onClick={() => navigate("/")}
              className="bg-cyan-400 text-white py-2 px-6 rounded-lg"
            >
              QUAY LẠI TRANG CHỦ
            </button>
            <button
              onClick={() => navigate(`/account/orderhistory/${orderId}`)}
              className="bg-cyan-400 text-white py-2 px-6 rounded-lg"
            >
              CHI TIẾT ĐƠN HÀNG
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
