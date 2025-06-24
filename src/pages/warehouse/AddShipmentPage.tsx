import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { FaUser } from "react-icons/fa";

interface Shipment {
  id: number;
  shipmentCode: string;
}

export default function AddShipmentPage() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Vận chuyển");

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [shipmentId, setShipmentId] = useState<number | "">("");
  const [shippedBy, setShippedBy] = useState("GHN");

  useEffect(() => {
    // Gọi API để lấy danh sách shipment
    axios
      .get("/api/shipments")
      .then((res) => {
        const filtered = res.data.filter((s: any) => !s.shippedBy); // Chỉ lấy shipment chưa gán
        setShipments(filtered);
      })
      .catch((err) => {
        console.error("Lỗi khi tải shipment:", err);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/shipments/${shipmentId}/assign`, { shippedBy });
      alert("Tạo đơn vận chuyển thành công!");
      navigate("/warehouse/shipment");
    } catch (error) {
      console.error("Lỗi khi tạo shipment:", error);
      alert("Tạo đơn vận chuyển thất bại.");
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
          <div className="ml-auto flex items-center gap-4 text-black text-lg">
            <Link to="/warehouse/account">
              <FaUser />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb
              items={[
                { label: "Vận chuyển", path: "/warehouse/shipment" },
                { label: "Tạo đơn vận chuyển" },
              ]}
            />
          </div>

          <h2 className="text-left text-xl font-semibold mb-4">
            Tạo đơn vận chuyển
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow w-full max-w-xl"
          >
            {/* shipmentId */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Mã vận chuyển
              </label>
              <select
                name="shipmentId"
                value={shipmentId}
                onChange={(e) => setShipmentId(Number(e.target.value))}
                className="w-full border rounded px-3 py-2 bg-gray-50"
                required
              >
                <option value="">-- Chọn mã vận chuyển --</option>
                {shipments.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.shipmentCode}
                  </option>
                ))}
              </select>
            </div>

            {/* shippedBy */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Đơn vị vận chuyển
              </label>
              <select
                name="shippedBy"
                value={shippedBy}
                onChange={(e) => setShippedBy(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-gray-50"
              >
                <option value="GHN">GHN</option>
                <option value="J_AND_T_EXPRESS">J&T Express</option>
                <option value="VTP">GHTK</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
              >
                Xác nhận tạo đơn vận chuyển
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
