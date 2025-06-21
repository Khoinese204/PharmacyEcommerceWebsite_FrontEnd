// src/pages/customer/OrderDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderProductList from "../../components/common/OrderProductList";
import OrderProgress from "../../components/common/OrderProgress";
import ActivityHistory from "../../components/common/ActivityHistory";
import ReceiverInfo from "../../components/common/ReceiverInfo";
import OrderSummary from "../../components/common/OrderSummary";
import StatusLine from "../../components/common/StatusLine";
import BreadcrumbTo from "../../components/common/BreadcrumbTo";

export default function CustomerOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/orders/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched order:", data);
          setOrder(data);
        })
        .catch((err) => console.error("Lỗi tải chi tiết đơn hàng:", err));
    }
  }, [id]);

  if (!order) return <p className="text-center mt-10">Đang tải...</p>;

  const breadcrumbItems = [
    { label: "Cá nhân", path: "/account/profile" },
    { label: "Lịch sử đơn hàng", path: "/account/orderhistory" },
    { label: `Chi tiết đơn hàng`, path: `/account/orderhistory/${id}` },
  ];

  const currentStepIndex = [
    "PENDING",
    "PACKING",
    "DELIVERING",
    "DELIVERED",
  ].indexOf(order.status);

  const productItems = order.items.map((item: any, index: number) => ({
    id: index, // ✅ thêm id (nếu API không trả về sẵn)
    name: item.medicineName,
    unit: item.unit,
    image: item.imageUrl,
    originalPrice: item.originalPrice,
    price: item.unitPrice,
    quantity: item.quantity,
  }));

  const receiver = order.customerInfo;
  const summary = order.summary;

  const history = order.statusLogs
    .slice()
    .reverse()
    .map((log: any) => ({
      label:
        log.status === "PENDING"
          ? "Chờ xác nhận"
          : log.status === "PACKING"
          ? "Đang đóng gói"
          : log.status === "DELIVERING"
          ? "Đang giao hàng"
          : log.status === "DELIVERED"
          ? "Đã giao hàng"
          : log.status,
      time: log.time,
      active: order.status === log.status,
    }));

  return (
    <>
      <BreadcrumbTo items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Cột trái: OrderSummary + ReceiverInfo */}
        <div className="space-y-6 order-1 md:order-none">
          <OrderSummary
            total={summary.totalPrice}
            discount={summary.discount}
            voucher={summary.voucherDiscount}
            shipping={summary.shippingFee}
            final={summary.finalTotal}
            method={order.payment.method}
          />
          <ReceiverInfo
            name={receiver.fullName}
            phone={receiver.phone}
            address={receiver.address}
            note={receiver.note}
          />
        </div>

        {/* Cột phải: Danh sách sản phẩm + trạng thái */}
        <div className="md:col-span-2 space-y-4 order-0 md:order-none">
          <OrderProductList items={productItems} />
          <StatusLine
            orderCode={order.orderCode}
            totalAmount={summary.finalTotal}
            orderDate={order.orderDate}
            expectedDeliveryDate={order.expectedDeliveryDate}
            totalItems={productItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            )}
          />
          <OrderProgress currentStep={currentStepIndex} />
          <ActivityHistory history={history} />
        </div>
      </div>
    </>
  );
}
