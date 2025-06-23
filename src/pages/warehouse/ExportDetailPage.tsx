import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ExportDetailFilterBar from "../../components/warehouse/ExportDetailFilterBar";
import ExportDetailTable, { ExportDetail } from "../../components/warehouse/ExportDetailTable";
import Pagination from "../../components/admin/TablePagination";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { FaUser } from "react-icons/fa";

// ---------------------- INTERFACES ----------------------
interface ExportItemResponse {
  medicineName: string;
  quantity: number;
  unitPrice: number;
}

interface CustomerInfoResponse {
  fullName: string;
  phone: string;
  address: string;
  note: string;
}

interface SummaryResponse {
  totalPrice: number;
  discount: number;
  voucherDiscount: number;
  shippingFee: number;
  finalTotal: number;
}

interface ExportDetailResponse {
  exportCode: string;
  exportDate: string;
  status: string;
  items: ExportItemResponse[];
  customerInfo: CustomerInfoResponse;
  summary: SummaryResponse;
}

// ---------------------- COMPONENT ----------------------
export default function ExportDetailPage() {
  const { exportId } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [exportDetails, setExportDetails] = useState<ExportDetail[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoResponse>({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });
  const [metaInfo, setMetaInfo] = useState({
    exportCode: "",
    createdAt: "",
    status: "",
  });
  const [summary, setSummary] = useState<SummaryResponse>({
    totalPrice: 0,
    discount: 0,
    voucherDiscount: 0,
    shippingFee: 0,
    finalTotal: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const numericExportId = exportId ? parseInt(exportId) : null;

  useEffect(() => {
    const fetchExport = async () => {
      if (!numericExportId) return;

      try {
        const res = await axios.get<ExportDetailResponse>(`/api/exports/${numericExportId}`);
        const data = res.data;

        const formattedItems: ExportDetail[] = data.items.map((item, index) => ({
          id: index.toString(),
          productName: item.medicineName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice,
        }));

        setExportDetails(formattedItems);
        setCustomerInfo(data.customerInfo);
        setMetaInfo({
          exportCode: data.exportCode,
          createdAt: new Date(data.exportDate).toLocaleString("vi-VN"),
          status: data.status,
        });
        setSummary(data.summary);
      } catch (error) {
        console.error("❌ Lỗi khi tải chi tiết xuất kho:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExport();
  }, [numericExportId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredExportDetails = exportDetails.filter((item) =>
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExportDetails.length / itemsPerPage);
  const paginatedExportItems = filteredExportDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      <aside className="w-60 bg-white shadow-md px-4 py-6 space-y-4">
        <div className="font-bold text-lg text-blue-600 mb-6">PrimeCare</div>
        <button
          onClick={() => navigate("/warehouse/dashboard")}
          className="block w-full text-left px-3 py-2 rounded text-gray-700 hover:bg-blue-50"
        >
          Bảng điều khiển
        </button>
        <button
          onClick={() => navigate("/warehouse/export")}
          className="block w-full text-left px-3 py-2 rounded text-gray-700 hover:bg-blue-50"
        >
          Xuất kho
        </button>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
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
                { label: "Xuất kho", path: "/warehouse/export" },
                { label: "Chi tiết xuất kho" },
              ]}
            />
          </div>
          <h2 className="text-left text-xl font-semibold mb-4">
            Chi tiết phiếu xuất #{metaInfo.exportCode}
          </h2>

          <div className="bg-white p-4 rounded-xl shadow space-y-4 text-left">
            {loading ? (
              <p>Đang tải chi tiết xuất kho...</p>
            ) : (
              <>
                {/* Thông tin khách hàng & đơn xuất */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded border">
                    <p><span className="font-medium">Tên khách hàng:</span> {customerInfo.fullName}</p>
                    <p><span className="font-medium">Số điện thoại:</span> {customerInfo.phone}</p>
                    <p><span className="font-medium">Địa chỉ:</span> {customerInfo.address}</p>
                    {customerInfo.note && (
                      <p><span className="font-medium">Ghi chú:</span> {customerInfo.note}</p>
                    )}
                  </div>
                  <div className="bg-gray-50 p-4 rounded border col-span-2">
                    <p><span className="font-medium">Ngày xuất:</span> {metaInfo.createdAt}</p>
                    <p><span className="font-medium">Trạng thái:</span> {metaInfo.status}</p>
                  </div>
                </div>

                {/* Bộ lọc và tổng tiền */}
                <div className="flex justify-between items-center mb-4">
                  <ExportDetailFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                  />
                  <div className="text-sm font-medium">
                    Tổng cộng:{" "}
                    <span className="text-red-500">
                      {summary.finalTotal.toLocaleString("vi-VN")} ₫
                    </span>
                  </div>
                </div>

                {/* Bảng chi tiết sản phẩm */}
                <ExportDetailTable exportDetails={paginatedExportItems} />

                {/* Tổng kết */}
                <div className="mt-4 text-right text-sm space-y-1">
                  <p>Tổng giá gốc: {summary.totalPrice.toLocaleString("vi-VN")} ₫</p>
                  <p>Giảm giá: -{summary.discount.toLocaleString("vi-VN")} ₫</p>
                  <p>Voucher: -{summary.voucherDiscount.toLocaleString("vi-VN")} ₫</p>
                  <p>Phí vận chuyển: -{summary.shippingFee.toLocaleString("vi-VN")} ₫</p>
                  <p className="text-lg font-semibold text-red-600">
                    Tổng thanh toán: {summary.finalTotal.toLocaleString("vi-VN")} ₫
                  </p>
                </div>
              </>
            )}
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
