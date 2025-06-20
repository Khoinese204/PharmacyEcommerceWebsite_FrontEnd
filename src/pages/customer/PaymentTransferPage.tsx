import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";

const PaymentTransferPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  const {
    selectedItems,
    appliedPromotions,
    voucherDiscount,
    shippingDiscount,
    total,
    customerName,
    customerPhone,
    selectedCity,
    selectedDistrict,
    selectedWard,
    specificAddress,
    note,
    appliedShippingPromo,
    cart, // ✅ bổ sung dòng này
  } = location.state || {};

  const handleConfirmTransfer = async () => {
    const fullAddress = `${specificAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedCity}`;

    const orderRequest = {
      userId,
      items: cart
        .filter((item) => selectedItems.includes(item.id))
        .map((item) => ({
          medicineId: item.id,
          quantity: item.quantity,
        })),
      totalPrice: total,
      voucherDiscount: voucherDiscount,
      shippingDiscount: shippingDiscount,
      paymentMethod: "BANK_TRANSFER",
      shippingInfo: {
        recipientName: customerName,
        phone: customerPhone,
        province: selectedCity,
        district: selectedDistrict,
        ward: selectedWard,
        addressDetail: specificAddress,
        note: note,
      },
      promotionIds: appliedPromotions,
      shippingPromotionId: appliedShippingPromo,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderRequest),
      });

      console.log("Đặt hàng với userId =", userId, orderRequest);
      if (!res.ok) throw new Error("Đặt hàng thất bại");

      const response = await res.json();

      navigate("/ordersuccess", {
        state: {
          orderId: response.orderId,
          name: customerName,
          phone: customerPhone,
          address: fullAddress,
          total,
          paymentMethod: "BANK_TRANSFER",
          expectedDate: response.expectedDeliveryDate,
        },
      });
    } catch (err) {
      console.log("Đặt hàng với userId =", userId, orderRequest);
      console.error("Đặt hàng thất bại:", err);
      toast.error("Đặt hàng thất bại. Vui lòng thử lại.");
    }
  };

  const handleGoBack = () => {
    navigate("/checkout", {
      state: location.state,
    });
  };

  if (!location.state) {
    return (
      <div className="p-10 text-center text-red-600">
        Không có dữ liệu đơn hàng. Vui lòng quay lại trang đặt hàng.
      </div>
    );
  }

  const transferContent = `${customerName
    .replace(/đ/g, "d") // xử lý đ thường
    .replace(/Đ/g, "D") // xử lý Đ hoa
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/[^a-zA-Z0-9 ]/g, "") // chỉ giữ chữ, số, khoảng trắng
    .replace(/\s+/g, "") // xóa khoảng trắng
    .toUpperCase()}_${customerPhone}`;

  return (
    <div className="max-w-xl mx-auto py-10 px-6 bg-white rounded shadow text-gray-800">
      <h2 className="text-xl font-bold mb-6">Thông tin chuyển khoản</h2>
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
          Tôi đã chuyển khoản
        </button>
      </div>
    </div>
  );
};

export default PaymentTransferPage;
