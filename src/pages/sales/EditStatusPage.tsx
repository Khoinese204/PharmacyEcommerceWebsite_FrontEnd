import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/admin/Breadcrumb";

export default function EditStatusPage() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Đơn hàng");
  const [status, setStatus] = useState("chờ xác nhận");
  const { orderId } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cập nhật trạng thái đơn hàng:", status);
    // Gọi API cập nhật trạng thái đơn hàng tại đây nếu cần
  };

  const menu = [
    { label: "Bảng điều khiển", path: "/sales/dashboard" },
    { label: "Đơn hàng", path: "/sales/orders" },
  ];

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md px-4 py-6 space-y-4">
        <div className="font-bold text-lg text-blue-600 mb-6">PrimeCare</div>
        {menu.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
            className={`block w-full text-left px-3 py-2 rounded transition ${
              selectedMenu === item.label
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          <div className="ml-auto flex items-center gap-2 text-sm">
            <img src="/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-semibold text-gray-800">Boss</p>
              <p className="text-xs text-gray-500">Nhân viên bán hàng</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb
              items={[
                { label: "Danh sách đơn hàng", path: "/sales/orders" },
                { label: "Chỉnh sửa trạng thái đơn hàng" },
              ]}
            />
          </div>

          <h2 className="text-left text-xl font-semibold mb-4">
            Chỉnh sửa trạng thái đơn hàng
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow w-full max-w-xl"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Trạng thái đơn hàng
              </label>
              <select
                value={status}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-gray-50"
              >
                <option value="chờ xác nhận">Chờ xác nhận</option>
                <option value="đang gói hàng">Đang gói hàng</option>
                <option value="đang giao">Đang giao hàng</option>
                <option value="đang giao">Đã giao</option>
                <option value="đã hủy">Đã hủy</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}