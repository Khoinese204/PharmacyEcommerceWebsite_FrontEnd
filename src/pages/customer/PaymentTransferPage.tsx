import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PaymentTransferPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  const {
    selectedItems = [],
    appliedPromotions = [],
    voucherDiscount = 0,
    shippingDiscount = 0,
    total = 0,
    customerName = "",
    customerPhone = "",
    selectedCity = "",
    selectedDistrict = "",
    selectedWard = "",
    specificAddress = "",
    note = "",
    appliedShippingPromo = null,
    cart = [],
  } = location.state || {};

  // Fallback bảo vệ khi không có state
  if (!location.state) {
    return (
      <div className="p-10 text-center text-red-600">
        Không có dữ liệu đơn hàng. Vui lòng quay lại trang đặt hàng.
      </div>
    );
  }

  const fullAddress = useMemo(
    () =>
      `${specificAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedCity}`,
    [specificAddress, selectedWard, selectedDistrict, selectedCity]
  );

  // Nội dung chuyển khoản hiển thị (không ảnh hưởng tới VNPay)
  const transferContent = useMemo(() => {
    const name = (customerName || "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "")
      .toUpperCase();
    return `${name}_${customerPhone || ""}`;
  }, [customerName, customerPhone]);

  const handleConfirmTransfer = async () => {
    try {
      // 1) Lưu tạm dữ liệu checkout để khi VNPay redirect về FE có thể tạo đơn
      sessionStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          userId,
          cart,
          selectedItems,
          appliedPromotions,
          voucherDiscount,
          shippingDiscount,
          customerName,
          customerPhone,
          selectedCity,
          selectedDistrict,
          selectedWard,
          specificAddress,
          note,
          appliedShippingPromo,
          total: Math.round(Number(total ?? 0)),
        })
      );

      // 2) Gọi BE tạo link VNPay
      const amount = Math.round(Number(total ?? 0)); // FE gửi VND nguyên, BE sẽ *100
      const res = await axios.post("/api/v1/payment/create-payment", null, {
        params: { amount },
      });

      if (res.data?.code === "00" && res.data?.data) {
        // 3) Redirect sang VNPay (trình duyệt rời trang, code sau đây sẽ không chạy)
        window.location.href = res.data.data;
        return;
      }

      console.error("VNPay response:", res.data);
      toast.error(res.data?.message || "Tạo thanh toán VNPay thất bại");
    } catch (err) {
      console.error("Lỗi tạo thanh toán VNPay:", err);
      toast.error("Không thể kết nối cổng thanh toán. Vui lòng thử lại!");
    }
  };

  const handleGoBack = () => {
    navigate("/checkout", {
      state: location.state,
    });
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-6 bg-white rounded shadow text-gray-800">
      <h2 className="text-xl font-bold mb-6">Thông tin chuyển khoản</h2>

      {/* Phần hiển thị này chỉ để hướng dẫn, không ảnh hưởng VNPay */}
      <p>
        <strong>Ngân hàng:</strong> ABC Bank
      </p>
      <p>
        <strong>Số tài khoản:</strong> 123 456 789
      </p>
      <p>
        <strong>Chủ tài khoản:</strong> Công ty TNHH PrimeCare
      </p>
      <p>
        <strong>Nội dung:</strong> {transferContent}
      </p>
      <p className="mb-4">
        <strong>Số tiền:</strong>{" "}
        <span className="text-blue-600 font-semibold">
          {Number(total).toLocaleString()}đ
        </span>
      </p>

      <div className="flex gap-4">
        <button
          onClick={handleGoBack}
          className="text-blue-600 text-sm underline"
        >
          Quay lại trang thông tin đặt hàng
        </button>
        <button
          onClick={handleConfirmTransfer}
          className="ml-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
        >
          Chuyển khoản
        </button>
      </div>

      {/* Gợi ý trải nghiệm: giải thích rõ bước tiếp theo */}
      <p className="text-xs text-gray-500 mt-3">
        Bạn sẽ được chuyển đến cổng VNPay để hoàn tất thanh toán. Sau khi thanh
        toán thành công, hệ thống sẽ tự động tạo đơn hàng và chuyển đến trang
        xác nhận.
      </p>
    </div>
  );
};

export default PaymentTransferPage;
