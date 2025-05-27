import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetailFilterBar from "../../components/sales/OrderDetailFilterBar";
import OrderDetailTable from "../../components/sales/OrderDetailTable";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { OrderDetail } from "../../components/sales/OrderDetailTable";
import ImportDetailTable, { ImportDetail } from "../../components/warehouse/ImportDetailTable";

const menu = [
  { label: "Bảng điều khiển", path: "/warehouse/dashboard" },
  { label: "Kho", path: "/warehouse/inventory" },
  { label: "Nhập kho", path: "/warehouse/import" },
  { label: "Xuất kho", path: "/warehouse/export" },
  { label: "Nhà cung cấp", path: "/warehouse/supplier" },
  { label: "Vận chuyển", path: "/warehouse/shipment" },
];

const rawMockImportDetails = [
  { id: "OD001", product: "Paracetamol 500mg", orderedAmount: 2, receivedAmount: 2, price: 50000 },
  { id: "OD002", product: "Vitamin C 1000mg", orderedAmount: 1, receivedAmount: 1, price: 80000 },
  { id: "OD003", product: "Khẩu trang y tế", orderedAmount: 5, receivedAmount: 4, price: 20000 },
  { id: "OD004", product: "Sát khuẩn tay nhanh", orderedAmount: 3, receivedAmount: 3, price: 60000 },
  { id: "OD005", product: "Thuốc ho siro", orderedAmount: 2, receivedAmount: 2, price: 75000 },
  { id: "OD006", product: "Panadol Extra", orderedAmount: 1, receivedAmount: 1, price: 45000 },
  { id: "OD007", product: "Nước muối sinh lý", orderedAmount: 4, receivedAmount: 3, price: 15000 },
  { id: "OD008", product: "Kem chống nắng", orderedAmount: 1, receivedAmount: 1, price: 120000 },
  { id: "OD009", product: "Sữa rửa mặt", orderedAmount: 2, receivedAmount: 2, price: 95000 },
  { id: "OD010", product: "Tăm bông", orderedAmount: 3, receivedAmount: 3, price: 10000 },
];

const mockImportDetails: ImportDetail[] = rawMockImportDetails.map((item) => ({
  id: item.id,
  productName: item.product,
  orderedAmount: item.orderedAmount,
  receivedAmount: item.receivedAmount,
  unitPrice: item.price,
  totalPrice: item.orderedAmount * item.price,
}));

export default function ImportDetailPage() {
  const [selectedMenu, setSelectedMenu] = useState("Chi tiết nhập kho");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [orderDetails, setOrderDetails] = useState(mockImportDetails);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredImportDetails = mockImportDetails.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredImportDetails.length / itemsPerPage);
  const paginatedImportDetailItems = filteredImportDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalAmount = orderDetails.reduce(
    (sum, item) => sum + item.totalPrice,
    0
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
                { label: "Nhập kho", path: "/warehouse/import" },
                { label: "Chi tiết nhập kho" },
                ]}
            />
            </div>
            <h2 className="text-left text-xl font-semibold mb-4">Chi tiết nhập kho</h2>

          <div className="bg-white p-4 rounded-xl shadow space-y-4 text-left">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded border">
                <p><span className="font-medium">Mã đơn hàng:</span> IMP001</p>
                <p><span className="font-medium">Nhà cung cấp:</span> Công ty Dược A</p>
                <p><span className="font-medium">Ngày tạo đơn:</span> 01/05/2025</p>
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
