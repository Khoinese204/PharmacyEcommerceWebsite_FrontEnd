import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { FaTrash, FaPlus, FaSave, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

// Interface cho dữ liệu thuốc hiển thị trong dropdown
interface MedicineOption {
  id: number;
  name: string;
  unit: string;
  originalPrice: number; // Thêm giá gốc để gợi ý
}

// Interface cho Supplier
interface SupplierOption {
  id: number;
  name: string;
}

// Interface cho từng dòng trong giỏ hàng nhập
interface CartItem {
  medicineId: number;
  medicineName: string; // Để hiển thị
  unit: string; // Để hiển thị
  quantity: number;
  unitPrice: number;
  expiredAt: string; // YYYY-MM-DD
}

const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];

export default function AddImportPage() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Nhập kho"); // State để highlight sidebar

  // --- Data Sources ---
  const [medicines, setMedicines] = useState<MedicineOption[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);

  // --- Form States ---
  const [supplierId, setSupplierId] = useState<number | "">("");

  // State cho dòng đang nhập liệu
  const [selectedMedId, setSelectedMedId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number>(1);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [expiredAt, setExpiredAt] = useState<string>("");

  // State danh sách chờ nhập (Quan trọng nhất)
  const [cart, setCart] = useState<CartItem[]>([]);

  // --- 1. Load dữ liệu ban đầu ---
  useEffect(() => {
    // Load Suppliers
    axios
      .get("/api/suppliers")
      .then((res) => setSuppliers(res.data))
      .catch(console.error);
    // Load Medicines
    axios
      .get("/api/medicines")
      .then((res) => setMedicines(res.data))
      .catch(console.error);
  }, []);

  // --- 2. Xử lý khi chọn thuốc (tự động điền giá gợi ý) ---
  const handleMedicineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const medId = Number(e.target.value);
    setSelectedMedId(medId);

    // Tìm thuốc để lấy giá gốc gợi ý
    const selectedMed = medicines.find((m) => m.id === medId);
    if (selectedMed) {
      setUnitPrice(selectedMed.originalPrice || 0);
    }
  };

  // --- 3. Xử lý thêm vào danh sách tạm ---
  const handleAddToCart = () => {
    if (!selectedMedId || quantity <= 0 || unitPrice < 0 || !expiredAt) {
      toast.warning("Vui lòng điền đầy đủ thông tin thuốc!");
      return;
    }

    const selectedMed = medicines.find((m) => m.id === Number(selectedMedId));
    if (!selectedMed) return;

    const newItem: CartItem = {
      medicineId: selectedMed.id,
      medicineName: selectedMed.name,
      unit: selectedMed.unit,
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      expiredAt: expiredAt,
    };

    // Thêm vào danh sách
    setCart([...cart, newItem]);

    // Reset form nhập liệu (giữ lại ngày hết hạn cho tiện nếu nhập nhiều lô cùng date)
    setSelectedMedId("");
    setQuantity(1);
    setUnitPrice(0);
    // setExpiredAt(""); // Có thể giữ lại hoặc reset tùy trải nghiệm
  };

  // --- 4. Xóa khỏi danh sách tạm ---
  const handleRemoveFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // --- 5. Tính tổng tiền ---
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );

  // --- 6. Gửi API (Lưu phiếu nhập) ---
  const handleSubmit = async () => {
    if (supplierId === "") {
      toast.error("Vui lòng chọn nhà cung cấp!");
      return;
    }
    if (cart.length === 0) {
      toast.error("Danh sách nhập đang trống!");
      return;
    }

    const payload = {
      supplierId: Number(supplierId),
      items: cart.map((item) => ({
        medicineId: item.medicineId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        expiredAt: item.expiredAt,
      })),
    };

    try {
      await axios.post("/api/import", payload);
      toast.success("Nhập kho thành công!");
      navigate("/warehouse/import");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi nhập kho.");
    }
  };

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      {/* Sidebar (Giống AddSupplierPage) */}
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
        {/* Header (Giống AddSupplierPage) */}
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          <div className="ml-auto flex items-center gap-4 text-black text-lg">
            <Link to="/warehouse/account">
              <FaUser />
            </Link>
          </div>
        </header>

        {/* Main Content (Phần logic nhập hàng loạt) */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: "Nhập kho", path: "/warehouse/import" },
                { label: "Tạo phiếu nhập", path: "#" },
              ]}
            />
          </div>

          <h2 className="text-left text-xl font-semibold mb-4">
            Tạo phiếu nhập hàng loạt
          </h2>

          <div className="flex gap-6 flex-col lg:flex-row">
            {/* CỘT TRÁI: FORM NHẬP LIỆU */}
            <div className="w-full lg:w-1/3 space-y-6">
              {/* 1. Chọn Nhà Cung Cấp */}
              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-bold text-gray-700 mb-3 border-b pb-2">
                  Thông tin phiếu
                </h3>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Nhà cung cấp
                </label>
                <select
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                  value={supplierId}
                  onChange={(e) => setSupplierId(Number(e.target.value))}
                >
                  <option value="">-- Chọn nhà cung cấp --</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Form thêm thuốc */}
              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-bold text-gray-700 mb-3 border-b pb-2">
                  Thêm chi tiết
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Chọn thuốc
                    </label>
                    <select
                      className="w-full border p-2 rounded bg-gray-50"
                      value={selectedMedId}
                      onChange={handleMedicineChange}
                    >
                      <option value="">-- Chọn thuốc --</option>
                      {medicines.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.unit})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Số lượng
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full border p-2 rounded bg-gray-50"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Giá nhập (đ)
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full border p-2 rounded bg-gray-50"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Hạn sử dụng
                    </label>
                    <input
                      type="date"
                      className="w-full border p-2 rounded bg-gray-50"
                      value={expiredAt}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setExpiredAt(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2 mt-2 transition"
                  >
                    <FaPlus /> Thêm vào danh sách
                  </button>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: DANH SÁCH CHỜ & TỔNG KẾT */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              <div className="bg-white p-5 rounded-xl shadow flex-1">
                <h3 className="font-bold text-gray-700 mb-4 flex justify-between items-center">
                  <span>Danh sách thuốc chờ nhập</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {cart.length} sản phẩm
                  </span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="p-3 rounded-tl-lg">STT</th>
                        <th className="p-3">Tên thuốc</th>
                        <th className="p-3 text-center">ĐVT</th>
                        <th className="p-3 text-right">SL</th>
                        <th className="p-3 text-right">Đơn giá</th>
                        <th className="p-3 text-right">Thành tiền</th>
                        <th className="p-3">Hạn SD</th>
                        <th className="p-3 text-center rounded-tr-lg">Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.length === 0 ? (
                        <tr>
                          <td
                            colSpan={8}
                            className="text-center py-8 text-gray-400 italic"
                          >
                            Chưa có sản phẩm nào trong phiếu nhập.
                          </td>
                        </tr>
                      ) : (
                        cart.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b hover:bg-gray-50 transition"
                          >
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3 font-medium text-blue-600">
                              {item.medicineName}
                            </td>
                            <td className="p-3 text-center">{item.unit}</td>
                            <td className="p-3 text-right font-mono">
                              {item.quantity}
                            </td>
                            <td className="p-3 text-right font-mono">
                              {item.unitPrice.toLocaleString("vi-VN")}
                            </td>
                            <td className="p-3 text-right font-bold font-mono text-gray-800">
                              {(item.quantity * item.unitPrice).toLocaleString(
                                "vi-VN"
                              )}
                            </td>
                            <td className="p-3 text-gray-600">
                              {new Date(item.expiredAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => handleRemoveFromCart(index)}
                                className="text-red-500 hover:text-red-700 transition p-1 hover:bg-red-50 rounded"
                                title="Xóa dòng này"
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TỔNG KẾT & ACTIONS */}
              <div className="bg-white p-5 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4 text-lg border-b pb-4">
                  <span className="font-bold text-gray-700">
                    Tổng giá trị phiếu nhập:
                  </span>
                  <span className="font-bold text-red-600 text-2xl">
                    {totalAmount.toLocaleString("vi-VN")} đ
                  </span>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => navigate("/warehouse/import")}
                    className="px-6 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 flex items-center gap-2 shadow-lg shadow-green-200 transition transform active:scale-95"
                  >
                    <FaSave /> Xác nhận nhập kho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
