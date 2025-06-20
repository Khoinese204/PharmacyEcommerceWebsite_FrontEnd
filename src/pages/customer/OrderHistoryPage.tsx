import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/common/UserSidebar";
import BreadcrumbTo from "../../components/common/BreadcrumbTo";

interface Order {
  id: string;
  total: number;
  date: string;
  status: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
}

const tabs = [
  { label: "Chờ xác nhận", value: "PENDING" },
  { label: "Đang đóng gói", value: "PACKING" },
  { label: "Đang giao hàng", value: "DELIVERING" },
  { label: "Đã giao hàng", value: "DELIVERED" },
  { label: "Đã huỷ", value: "CANCELLED" },
];

const orderTabs = [
  { label: "Mới nhất", value: "latest" },
  { label: "Cũ nhất", value: "oldest" },
];

const breadcrumbItems = [
  { label: "Cá nhân", path: "/account/profile" },
  { label: "Lịch sử đơn hàng", path: "/account/orderhistory" },
];

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("PENDING");
  const [sortOrder, setSortOrder] = useState("latest");
  const [orders, setOrders] = useState<Order[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user).id : null;

      if (!userId) return;

      try {
        const res = await fetch(`/api/orders/user/${userId}`);
        const data = await res.json();

        const mappedOrders: Order[] = data.map((o: any) => ({
          id: o.orderCode,
          total: o.totalPrice,
          date: o.orderDate,
          status: o.status,
          name: "",
          phone: "",
          address: "",
          paymentMethod: "",
        }));

        setOrders(mappedOrders);
      } catch (err) {
        console.error("Lỗi khi tải đơn hàng", err);
      }
    };

    fetchOrders();
  }, []);

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  const filteredOrders = sortedOrders.filter(
    (order) => order.status === activeTab
  );

  return (
    <div className="bg-gray-50 min-h-screen text-sm">
      <BreadcrumbTo items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        <UserSidebar activePath="/account/orderhistory" />

        <div className="md:col-span-3 space-y-6">
          <h1 className="font-semibold text-black text-lg">Lịch sử đơn hàng</h1>

          {/* Tabs trạng thái */}
          <div className="flex items-center text-sm">
            <div className="flex space-x-3">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-1 rounded-full ${
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

          {/* Tabs sắp xếp */}
          <div className="flex items-center text-sm">
            <span className="text-gray-500 mr-2">Sắp xếp theo:</span>
            <div className="flex space-x-3">
              {orderTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSortOrder(tab.value)}
                  className={`px-4 py-1 font-semibold rounded-full transition ${
                    sortOrder === tab.value
                      ? "bg-cyan-400 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Danh sách đơn hàng */}
          <div className="text-left text-black">
            {filteredOrders.length === 0 ? (
              <p>Không có đơn hàng nào ở trạng thái này.</p>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border divide-y">
                {filteredOrders.slice(0, visibleCount).map((order, idx) => (
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
                        <span className="font-bold">
                          {order.total?.toLocaleString()}đ
                        </span>
                      </p>
                      <p>
                        Ngày đặt hàng:{" "}
                        <span className="font-bold">{order.date}</span>
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigate(
                          `/account/orderhistory/${order.id.replace("DH", "")}`
                        )
                      }
                      className="text-blue-500 hover:underline"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Xem thêm */}
          {filteredOrders.length > visibleCount && (
            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-2 border rounded font-medium hover:bg-gray-100"
                onClick={() => setVisibleCount(visibleCount + 5)}
              >
                Xem thêm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
