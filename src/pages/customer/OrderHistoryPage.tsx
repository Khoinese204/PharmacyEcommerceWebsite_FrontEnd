import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/common/UserSidebar";
import BreadcrumbTo from "../../components/common/BreadcrumbTo";

const tabs = [
  { label: "Đang xử lý", value: "processing" },
  { label: "Đã đóng gói", value: "packed" },
  { label: "Đang vận chuyển", value: "shipping" },
  { label: "Đã giao hàng", value: "delivered" },
  { label: "Đã huỷ", value: "cancelled" },
];

const orders = Array(5).fill({
  id: "1223444",
  total: "714.000đ",
  date: "7:32 PM 2/5/2025",
});

const order_tabs = [
  { label: "Mới nhất", value: "latest" },
  { label: "Cũ nhất", value: "oldest" },
];
const breadcrumbItems = [
  { label: "Cá nhân", path: "/account/profile" },
  { label: "Lịch sử đơn hàng", path: "/account/orderhistory" },
];

export default function OrderHistoryPage() {
  const [activeTab, setActiveTab] = useState("shipping");
  const navigate = useNavigate();

  const [onTab, setOnTab] = useState("latest");

  return (
    <div className="bg-gray-50 min-h-screen text-sm">
      {/* Breadcrumb */}
      <BreadcrumbTo items={breadcrumbItems}></BreadcrumbTo>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Sidebar */}
        <UserSidebar activePath="/account/orderhistory" />

        {/* Main content */}
        <div className="md:col-span-3 space-y-6">
          <div className="text-[10px]">
            <h1 className="font-semibold text-black">Lịch sử đơn hàng</h1>
          </div>
          {/* Tabs */}
          <div className="flex items-center text-sm">
            <div className="flex space-x-3">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-1 rounded-full text-sm ${
                    activeTab === tab.value
                      ? "bg-cyan-400 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center text-sm">
            <span className="text-gray-500 mr-2">Sắp xếp theo:</span>
            <div className="flex space-x-3">
              {order_tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setOnTab(tab.value)}
                  className={`px-4 py-1 font-semibold rounded-full transition
          ${
            onTab === tab.value
              ? "bg-cyan-400 text-white"
              : "bg-gray-200 text-black"
          }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders */}
          <div className="text-left text-black">
            <div className="bg-white rounded-lg shadow-sm border divide-y">
              {orders.map((order, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center px-4 py-4"
                >
                  <div>
                    <p className="text-sm">
                      Mã đơn: <span className="font-bold">{order.id}</span>
                    </p>
                    <p>
                      Giá trị đơn:{" "}
                      <span className="font-bold">{order.total}</span>
                    </p>
                    <p>
                      Ngày đặt hàng:{" "}
                      <span className="font-bold">{order.date}</span>
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/account/orderhistory/${order.id}`)
                    }
                    className="text-blue-500 hover:underline"
                  >
                    Xem chi tiết
                  </button>
                </div>
              ))}
            </div>

            {/* Load more */}
            <div className="flex justify-center mt-6">
              <button className="px-6 py-2 border rounded font-medium hover:bg-gray-100">
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
