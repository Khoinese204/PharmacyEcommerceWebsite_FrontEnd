import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/admin/Breadcrumb";

export default function AddSupplierPage() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Nhà cung cấp");

  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "", // Gộp người liên hệ, số điện thoại, email
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/suppliers", formData);
      alert("Tạo nhà cung cấp thành công!");
      navigate("/warehouse/supplier");
    } catch (error) {
      console.error("Lỗi khi tạo nhà cung cấp:", error);
      alert("Tạo nhà cung cấp thất bại.");
    }
  };

  const menu = [
    { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
    { label: "Kho", path: "/warehouse/inventory" },
    { label: "Nhập kho", path: "/warehouse/import" },
    { label: "Xuất kho", path: "/warehouse/export" },
    { label: "Nhà cung cấp", path: "/warehouse/supplier" },
    { label: "Vận chuyển", path: "/warehouse/shipment" },
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
            <img src="/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-semibold text-gray-800">Boss</p>
              <p className="text-xs text-gray-500">Nhân viên kho</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb
              items={[
                { label: "Nhà cung cấp", path: "/warehouse/supplier" },
                { label: "Thêm nhà cung cấp" },
              ]}
            />
          </div>

          <h2 className="text-left text-xl font-semibold mb-4">Thêm nhà cung cấp</h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow w-full max-w-xl"
          >
            {/* Tên nhà cung cấp */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tên nhà cung cấp</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-gray-50"
                required
              />
            </div>

            {/* Thông tin liên hệ */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Thông tin liên hệ</label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-gray-50"
                required
              />
            </div>

            {/* Địa chỉ */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-gray-50"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
              >
                Xác nhận tạo nhà cung cấp
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
