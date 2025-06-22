import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OrderDetailFilterBar from "../../components/sales/OrderDetailFilterBar";
import InventoryDetailTable, { InventoryDetail } from "../../components/warehouse/InventoryDetailTable";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";

const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];


export default function InventoryDetailPage() {
  const [selectedMenu, setSelectedMenu] = useState("Chi tiết kho");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [inventoryDetails, setInventoryDetails] = useState<InventoryDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (!id) return;
    const fetchInventoryDetails = async () => {
      try {
        const res = await axios.get<InventoryDetail>(`/api/inventory/${id}`);
        setInventoryDetails([res.data]);
        console.log("✅ Dữ liệu trả về:", res.data);

      } catch (error) {
        console.error("❌ Lỗi khi tải dữ liệu chi tiết kho:", error);
      }
    };
    fetchInventoryDetails();
  }, [id]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredInventoryDetails = inventoryDetails.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInventoryDetails.length / itemsPerPage);
  const paginatedInventoryItems = filteredInventoryDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
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
                { label: "Kho", path: "/warehouse/inventory" },
                { label: "Chi tiết kho" },
              ]}
            />
          </div>
          <h2 className="text-left text-xl font-semibold mb-4">Chi tiết kho</h2>

          <div className="bg-white p-4 rounded-xl shadow space-y-4 text-left">
            <InventoryDetailTable inventoryDetails={paginatedInventoryItems} />
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}
