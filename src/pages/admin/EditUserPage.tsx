import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { toast } from "react-toastify";

export default function EditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedMenu, setSelectedMenu] = useState("Người dùng");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "Customer",
    avatarUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/users/admin/${id}`, {
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        address: formData.address,
        role: formData.role,
        avatarUrl: formData.avatarUrl,
      });
      toast.success("Cập nhật thành công");
      navigate("/admin/users");
    } catch (error) {
      toast.error("Lỗi khi cập nhật người dùng");
      console.error(error);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    const formDataUpload = new FormData();
    formDataUpload.append("avatar", file);

    try {
      const res = await axios.post(
        `http://localhost:8080/api/users/${id}/avatar`,
        formDataUpload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const newUrl = res.data.avatarUrl;
      setFormData((prev) => ({ ...prev, avatarUrl: newUrl }));
      toast.success("Cập nhật ảnh thành công");
    } catch (err) {
      console.error("Lỗi khi upload ảnh", err);
      toast.error("Lỗi khi upload ảnh");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/users/${id}`);
        const data = res.data;
        setFormData({
          name: data.fullName || "",
          email: data.email || "",
          phone: data.phoneNumber || "",
          address: data.address || "",
          password: "",
          role: data.role || "Customer",
          avatarUrl: data.avatarUrl || "",
        });
      } catch (err) {
        console.error("Lỗi lấy dữ liệu người dùng", err);
      }
    };

    if (id) fetchUser();
  }, [id]);

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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb
              items={[
                { label: "Danh sách người dùng", path: `/admin/users` },
                { label: "Chỉnh sửa người dùng" },
              ]}
            />
          </div>
          <h2 className="text-left text-xl font-semibold mb-4">
            Chỉnh sửa người dùng
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow w-full"
          >
            <div className="flex items-start gap-6">
              {/* Upload Avatar */}
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={
                    formData.avatarUrl.startsWith("http")
                      ? formData.avatarUrl
                      : `http://localhost:8080${formData.avatarUrl}`
                  }
                  alt="Avatar"
                  className="w-20 h-20 rounded-full border object-cover"
                />
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload ảnh
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>

              {/* Form Fields */}
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
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">SĐT</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 bg-gray-50"
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
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    disabled
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

            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
              >
                Lưu
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
