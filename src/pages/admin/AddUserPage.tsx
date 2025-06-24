import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { toast } from "react-toastify";

export default function AddUserPage() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Người dùng");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "Admin",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (avatarFile) {
      data.append("avatar", avatarFile);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/admin/addUser",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        toast.success("Thêm người dùng thành công");
        navigate("/admin/users");
      } else {
        const errorMsg = await response.text();
        toast.error("Lỗi: " + errorMsg);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Có lỗi xảy ra khi gửi yêu cầu");
    }
  };

  const menu = [
    { label: "Bảng điều khiển", path: "/admin/dashboard" },
    { label: "Người dùng", path: "/admin/users" },
    { label: "Thuốc", path: "/admin/medicines" },
    { label: "Danh mục thuốc", path: "/admin/categories" },
    { label: "Mã giảm giá", path: "/admin/coupons" },
    // { label: "Kho", path: "/admin/warehouse" },
    // { label: "Doanh thu", path: "/admin/revenue" },
    // { label: "Khách hàng", path: "/admin/customers" },
    // { label: "Lịch sử giá", path: "/admin/price-history" },
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
                { label: "Thêm người dùng" },
              ]}
            />
          </div>
          <h2 className="text-left text-xl font-semibold mb-4">
            Thêm người dùng
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow w-full"
          >
            <div className="flex items-start gap-6">
              {/* Upload Avatar */}
              {/* Upload Avatar */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xl border overflow-hidden">
                  {avatarFile ? (
                    <img
                      src={URL.createObjectURL(avatarFile)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-2xl">📷</span>
                  )}
                </div>

                {/* Nút cập nhật ảnh */}
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("avatarInput")?.click()
                  }
                  className="text-sm text-blue-500 hover:underline"
                >
                  Cập nhật ảnh mới
                </button>

                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </div>

              {/* Input Fields */}
              <div className="text-left flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tên</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                    required
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
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                    required
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
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mật khẩu
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 bg-gray-50"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Sales">Sales</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
              >
                Thêm
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
