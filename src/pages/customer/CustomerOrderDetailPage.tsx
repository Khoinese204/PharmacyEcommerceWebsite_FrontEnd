import React from "react";
import OrderProductList from "../../components/common/OrderProductList";
import OrderProgress from "../../components/common/OrderProgress";
import ActivityHistory from "../../components/common/ActivityHistory";
import ReceiverInfo from "../../components/common/ReceiverInfo";
import OrderSummary from "../../components/common/OrderSummary";
import StatusLine from "../../components/common/StatusLine";
import BreadcrumbTo from "../../components/common/BreadcrumbTo";
import Breadcrumbs from "../../components/common/BreadcrumbTo";

export default function OrderDetailPage() {
  const breadcrumbItems = [
    { label: "Cá nhân", path: "/profile" },
    { label: "Lịch sử đơn hàng", path: "/account/orderhistory" },
    { label: "Chi tiết đơn hàng", path: "/account/orderhistory/123456" },
  ];
  const productItems = [
    {
      id: 1,
      name: "Ibuprofen",
      unit: "Lọ",
      image: "/ibuprofen.jpg",
      originalPrice: 165000,
      discountedPrice: 132000,
      quantity: 2,
    },
    {
      id: 2,
      name: "Bioderma",
      unit: "Chai",
      image: "/bioderma.jpg",
      originalPrice: 180000,
      discountedPrice: 150000,
      quantity: 3,
    },
  ];
  const currentStep = 2;
  const receiverInfo = {
    name: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TPHCM",
    note: "Giao hàng trước 5 giờ chiều",
  };

  const history = [
    {
      label: "Đã giao hàng",
      time: "11:00 AM 7/5/2025",
    },
    {
      label: "Đang giao hàng",
      time: "10:00 AM 6/5/2025",
    },
    {
      label: "Hoàn tất đóng gói",
      time: "2:00 PM 5/5/2025",
    },
    {
      label: "Đang đóng gói",
      time: "6:30 AM 4/5/2025",
    },
    {
      label: "Đang xử lý",
      time: "9:00 PM 2/5/2025",
    },
    {
      label: "Chờ xác nhận",
      time: "7:32 PM 2/5/2025",
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Cột trái: OrderSummary + ReceiverInfo */}
        <div className="space-y-6 order-1 md:order-none">
          <OrderSummary />
          <ReceiverInfo
            name={receiverInfo.name}
            phone={receiverInfo.phone}
            address={receiverInfo.address}
            note={receiverInfo.note}
          />
        </div>

        {/* Cột phải (chiếm 2 cột): ProductList + StatusLine + Progress + History */}
        <div className="md:col-span-2 space-y-4 order-0 md:order-none">
          <OrderProductList items={productItems} />
          <StatusLine />
          <OrderProgress currentStep={0} />
          <ActivityHistory history={history} />
        </div>
      </div>
    </>
  );
}
