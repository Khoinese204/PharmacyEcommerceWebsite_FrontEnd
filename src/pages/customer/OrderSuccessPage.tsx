// src/pages/customer/OrderSuccessPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  const orderId = "123456"; // mã đơn hàng (sẽ lấy từ hệ thống trong thực tế)
  const address = "11 Phan Đăng Lưu, Phường 10, Bình Thạnh, TPHCM";
  const deliveryDate = "thứ 7 (3/5/2025)"; // tính toán ngày giao dự kiến

  const breadcrumbItems = [{ label: "Quay lại giỏ hàng", path: "/cart" }];

  return (
    <>
      <div>
        <BreadcrumbBack items={breadcrumbItems}></BreadcrumbBack>
      </div>
      {/* <div className="bg-white min-h-screen py-10"> */}
      <div className="py-10 bg-white flex items-start justify-center pt-20">
        <div className="max-w-2xl mx-auto text-center p-6 rounded">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-4 text-[#00b14f] uppercase tracking-wide">
            Đặt hàng thành công!
          </h2>

          <div className="bg-gray-100 text-left rounded p-5 text-sm leading-relaxed text-gray-800">
            <p>
              Bạn đã đặt hàng thành công đơn hàng mã <strong>{orderId}</strong>,
              thanh toán khi nhận hàng.
            </p>
            <p>
              Sau khi Shop xác nhận đơn hàng, sản phẩm sẽ được giao đến địa chỉ{" "}
              <strong>{address}</strong> trong{" "}
              <strong>Dự kiến trước {deliveryDate}</strong>.
            </p>
            <p className="mt-2">PrimeCare rất hân hạnh được phục vụ bạn!</p>
          </div>

          <div className="flex justify-center gap-10 mt-6 text-sm font-semibold">
            <button
              onClick={() => navigate("/")}
              className="bg-cyan-400 text-white py-2 px-6 rounded-lg text-center font-semibold"
            >
              QUAY LẠI TRANG CHỦ
            </button>
            <button
              onClick={() => navigate("/account/orderhistory/:orderId")}
              className="bg-cyan-400 text-white py-2 px-6 rounded-lg text-center font-semibold"
            >
              CHI TIẾT ĐƠN HÀNG
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
