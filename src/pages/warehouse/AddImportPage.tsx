import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/admin/Breadcrumb";

export default function AddImportPage() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Nhập kho");

  type Product = { id: number; name: string; originalPrice: number };
  type Supplier = { id: number; name: string };

  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [formData, setFormData] = useState({
    productId: "",
    supplierId: "",
    importDate: new Date().toISOString().split("T")[0],
    quantity: 1,
    unitPrice: 0,
  });

  // ✅ Gọi API lấy danh sách thuốc & nhà cung cấp
  useEffect(() => {
    axios.get("/api/medicines")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Lỗi load thuốc:", err));

    axios.get("/api/suppliers")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error("Lỗi load nhà cung cấp:", err));
  }, []);

  // ✅ Xử lý thay đổi trường nhập
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "productId") {
      const selected = products.find((p) => p.id === Number(value));
      setFormData((prev) => ({
        ...prev,
        productId: value,
        unitPrice: selected ? selected.originalPrice : 0,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Gửi đơn nhập hàng
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = {
      supplierId: Number(formData.supplierId),
      items: [
        {
          medicineId: Number(formData.productId),
          quantity: Number(formData.quantity),
          unitPrice: Number(formData.unitPrice),
        },
      ],
    };

    try {
      await axios.post("/api/import", requestBody);
      alert("Tạo đơn nhập thành công!");
      navigate("/warehouse/import");
    } catch (error) {
      console.error("Lỗi tạo đơn nhập:", error);
      alert("Tạo đơn nhập thất bại.");
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
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          <div className="ml-auto flex items-center gap-2 text-sm">
            <img src="/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-semibold text-gray-800">Boss</p>
              <p className="text-xs text-gray-500">Nhân viên kho</p>
            </div>
          </div>
        </header>

        {/* Main Form */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb
              items={[
                { label: "Nhập kho", path: "/warehouse/import" },
                { label: "Tạo đơn nhập hàng" },
              ]}
            />
          </div>

          <h2 className="text-left text-xl font-semibold mb-4">Tạo đơn nhập hàng</h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow w-full max-w-xl"
          >
            {/* Thuốc */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Thuốc</label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-gray-50"
                required
              >
                <option value="">-- Chọn thuốc --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Nhà cung cấp */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nhà cung cấp</label>
              <select
                name="supplierId"
                value={formData.supplierId}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-gray-50"
                required
              >
                <option value="">-- Chọn nhà cung cấp --</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ngày tạo đơn */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Ngày tạo đơn</label>
              <input
                type="date"
                name="importDate"
                value={formData.importDate}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-gray-50"
                disabled
              />
            </div>

            {/* Số lượng */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Số lượng</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min={1}
                className="w-full border rounded px-3 py-2 bg-gray-50"
                required
              />
            </div>

            {/* Đơn giá */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Giá nhập (VNĐ)</label>
              <input
                type="number"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-gray-50"
                min={0}
                readOnly
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
              >
                Xác nhận nhập hàng
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
