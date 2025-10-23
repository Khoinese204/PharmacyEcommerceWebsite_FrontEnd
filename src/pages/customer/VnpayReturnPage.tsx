import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify"; // nếu bạn dùng toast

type CartItem = { id: number; quantity: number };
type PendingOrder = {
  userId: number | null;
  cart: CartItem[];
  selectedItems: number[];
  appliedPromotions: number[]; // hoặc string[] tùy backend
  voucherDiscount: number;
  shippingDiscount: number;
  customerName: string;
  customerPhone: string;
  selectedCity: string;
  selectedDistrict: string;
  selectedWard: string;
  specificAddress: string;
  note?: string;
  appliedShippingPromo?: number | null; // hoặc string/null tùy backend
  total: number;
};

export default function VnpayReturnPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // 1) Lấy dữ liệu tạm đã lưu trước khi rời site (handlePlaceOrder / handleConfirmTransfer)
      const raw = sessionStorage.getItem("pendingOrder");
      const pending: PendingOrder | null = raw ? JSON.parse(raw) : null;

      if (!pending || !pending.userId) {
        // Không có dữ liệu để tạo đơn → quay lại giỏ
        // toast?.error?.("Phiên thanh toán không hợp lệ. Vui lòng thử lại.");
        alert("Phiên thanh toán không hợp lệ. Vui lòng thử lại.");
        navigate("/cart", { replace: true });
        return;
      }

      try {
        // 2) Gửi toàn bộ query params VNPay về BE để verify
        const params = Object.fromEntries(new URLSearchParams(location.search));
        const { data } = await axios.get("/api/v1/payment/vnpay-return", {
          params,
        });
        // Kỳ vọng BE trả: { status: "success" | "failed" | "error", message, data: { vnp_*... } }

        if (data?.status !== "success") {
          // 2.1) Thất bại → điều hướng sang trang fail (hoặc quay lại giỏ)
          const reason =
            data?.message || "Thanh toán thất bại. Vui lòng thử lại!";
          // toast?.error?.(reason);
          navigate("/orderfailed", {
            state: { reason, vnp: data?.data },
            replace: true,
          });
          return;
        }

        // 3) Xác thực thành công → BẮT ĐẦU tạo đơn
        const orderRequest = {
          userId: pending.userId,
          items: pending.cart
            .filter((item) => pending.selectedItems.includes(item.id))
            .map((item) => ({
              medicineId: item.id,
              quantity: item.quantity,
            })),
          totalPrice: pending.total,
          voucherDiscount: pending.voucherDiscount,
          shippingDiscount: pending.shippingDiscount,
          paymentMethod: "BANK_TRANSFER", // hoặc "BANK" tuỳ enum của bạn
          shippingInfo: {
            recipientName: pending.customerName,
            phone: pending.customerPhone,
            province: pending.selectedCity,
            district: pending.selectedDistrict,
            ward: pending.selectedWard,
            addressDetail: pending.specificAddress,
            note: pending.note,
          },
          promotionIds: pending.appliedPromotions,
          shippingPromotionId: pending.appliedShippingPromo,
        };

        const resOrder = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderRequest),
        });

        if (!resOrder.ok) {
          // toast?.error?.("Không thể tạo đơn hàng sau khi thanh toán. Vui lòng liên hệ hỗ trợ.");
          alert(
            "Không thể tạo đơn hàng sau khi thanh toán. Vui lòng liên hệ hỗ trợ."
          );
          navigate("/cart", { replace: true });
          return;
        }

        const orderResponse = await resOrder.json();

        // 4) Dọn dẹp và điều hướng thành công
        const fullAddress = `${pending.specificAddress}, ${pending.selectedWard}, ${pending.selectedDistrict}, ${pending.selectedCity}`;
        // Xoá dữ liệu tạm để tránh tạo đơn lần 2 nếu user refresh
        sessionStorage.removeItem("pendingOrder");

        navigate("/ordersuccess", {
          state: {
            orderId: orderResponse.orderId,
            name: pending.customerName,
            phone: pending.customerPhone,
            address: fullAddress,
            total: pending.total,
            paymentMethod: "bank",
            expectedDate: orderResponse.expectedDeliveryDate,
          },
          replace: true, // tránh back về trang return
        });
      } catch (e) {
        console.error("Lỗi khi verify VNPay hoặc tạo đơn:", e);
        // toast?.error?.("Không thể xác thực giao dịch. Vui lòng thử lại!");
        alert("Không thể xác thực giao dịch. Vui lòng thử lại!");
        navigate("/cart", { replace: true });
      }
    })();
  }, [location.search, navigate]);

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="text-center">
        <div className="animate-spin h-10 w-10 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-gray-600">
          Đang xác nhận thanh toán và tạo đơn hàng...
        </p>
      </div>
    </div>
  );
}
