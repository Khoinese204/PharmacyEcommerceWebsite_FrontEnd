import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OrderDetailFilterBar from "../../components/sales/OrderDetailFilterBar";
import ImportDetailTable, { ImportDetail } from "../../components/warehouse/ImportDetailTable";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { FaUser } from "react-icons/fa";

const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];

interface ImportOrderResponse {
  id: number;
  supplierName: string;
  totalPrice: number;
  createdAt: string;
  items: ImportDetail[];
}

export default function ImportDetailPage() {
  const [selectedMenu, setSelectedMenu] = useState("Chi tiết nhập kho");
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [orderDetails, setOrderDetails] = useState<ImportDetail[]>([]);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [supplierName, setSupplierName] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchImportOrder = async () => {
      try {
        const res = await axios.get<ImportOrderResponse>(`/api/import/${orderId}`);
        const data = res.data;
        setOrderDetails(data.items);
        setSupplierName(data.supplierName);
        setCreatedAt(new Date(data.createdAt).toLocaleDateString("vi-VN"));
        setTotalAmount(data.totalPrice);
      } catch (error) {
        console.error("❌ Lỗi khi tải dữ liệu đơn nhập:", error);
      }
    };
    fetchImportOrder();
  }, [orderId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredImportDetails = orderDetails.filter((item) =>
    item.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredImportDetails.length / itemsPerPage);
  const paginatedImportDetailItems = filteredImportDetails.slice(
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
                { label: "Nhập kho", path: "/warehouse/import" },
                { label: "Chi tiết nhập kho" },
              ]}
            />
          </div>
          <h2 className="text-left text-xl font-semibold mb-4">Chi tiết nhập kho</h2>

          <div className="bg-white p-4 rounded-xl shadow space-y-4 text-left">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded border">
                <p><span className="font-medium">Mã đơn hàng:</span> {"IMP" + String(orderId).padStart(3, "0")}</p>
                <p><span className="font-medium">Nhà cung cấp:</span> {supplierName}</p>
                <p><span className="font-medium">Ngày tạo đơn:</span> {createdAt}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <OrderDetailFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <div className="text-sm font-medium">Tổng tiền: <span className="text-red-500">{totalAmount.toLocaleString()}₫</span></div>
            </div>

            <ImportDetailTable importDetails={paginatedImportDetailItems} />
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