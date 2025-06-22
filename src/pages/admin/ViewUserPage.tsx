import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/admin/Breadcrumb";
import axios from "axios";

export default function ViewUserPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 lấy ID từ URL

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "********",
    role: "Customer",
    avatarUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/users/${id}`)
        .then((res) => {
          const data = res.data;
          setFormData({
            name: data.fullName || "",
            email: data.email || "",
            phone: data.phoneNumber || "",
            address: data.address || "",
            password: "********",
            role: data.role || "Customer",
            avatarUrl: data.avatarUrl || "/avatar-default.png",
          });
        })
        .catch((err) => {
          console.error("Lỗi khi lấy người dùng:", err);
        });
    }
  }, [id]);

  const menu = [
    { label: "Bảng điều khiển", path: "/admin/dashboard" },
    { label: "Người dùng", path: "/admin/users" },
    { label: "Thuốc", path: "/admin/medicines" },
    { label: "Danh mục thuốc", path: "/admin/categories" },
    { label: "Mã giảm giá", path: "/admin/coupons" },
    { label: "Kho", path: "/admin/warehouse" },
    { label: "Doanh thu", path: "/admin/revenue" },
    { label: "Khách hàng", path: "/admin/customers" },
    { label: "Lịch sử giá", path: "/admin/price-history" },
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
              item.label === "Người dùng"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          <div className="ml-auto flex items-center gap-2 text-sm">
            <img
              src="/avatar.jpg"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">Boss</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb
              items={[
                { label: "Danh sách người dùng", path: "/admin/users" },
                { label: "Xem người dùng" },
              ]}
            />
          </div>
          <h2 className="text-left text-xl font-semibold mb-4">
            Xem người dùng
          </h2>
          <form className="bg-white p-6 rounded-xl shadow w-full">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={`http://localhost:8080${formData.avatarUrl}`} // ✅ Load từ backend
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border"
                />
                <span className="text-gray-500 text-sm">Avatar</span>
              </div>

              {/* Input Fields */}
              <div className="text-left flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tên</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 bg-gray-200"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 bg-gray-200"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Số điện thoại
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 bg-gray-200"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Địa chỉ
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 bg-gray-200"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mật khẩu
                  </label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    className="w-full border rounded px-3 py-2 bg-gray-200"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 bg-gray-200"
                    disabled
                  >
                    <option value="Admin">Admin</option>
                    <option value="Sales">Sales</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
