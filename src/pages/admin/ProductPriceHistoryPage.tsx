import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/admin/Breadcrumb";
import Pagination from "../../components/admin/TablePagination";

const productPriceHistory = [
  {
    id: "00001",
    medicineName: "Nước súc miệng",
    importDate: "2025-01-01",
    importPrice: 40000,
    salePrice: 50000,
    effectiveDate: "2025-01-01",
    updatedBy: "Admin1",
    isActive: true,
  },
  {
    id: "00002",
    medicineName: "Nước súc miệng",
    importDate: "2025-01-10",
    importPrice: 45000,
    salePrice: 55000,
    effectiveDate: "2025-01-10",
    updatedBy: "Admin1",
    isActive: true,
  },
];

export default function ProductPriceHistoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
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

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: "Lịch sử giá", path: "/admin/price-history" },
                { label: "Điều chỉnh giá", path: "#" },
              ]}
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Lịch sử giá bán
          </h2>

          {/* Table */}
          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <table className="w-full text-left text-sm table-auto">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="px-4 py-2 font-semibold">ID</th>
                  <th className="px-4 py-2 font-semibold">TÊN THUỐC</th>
                  <th className="px-4 py-2 font-semibold">NGÀY NHẬP KHO</th>
                  <th className="px-4 py-2 font-semibold">GIÁ NHẬP</th>
                  <th className="px-4 py-2 font-semibold">GIÁ BÁN</th>
                  <th className="px-4 py-2 font-semibold">NGÀY HIỆU LỰC</th>
                  <th className="px-4 py-2 font-semibold">NGƯỜI CHỈNH SỬA</th>
                  <th className="px-4 py-2 font-semibold text-center">
                    HÀNH ĐỘNG
                  </th>
                </tr>
              </thead>
              <tbody>
                {productPriceHistory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.medicineName}</td>
                    <td className="px-4 py-2">{item.importDate}</td>
                    <td className="px-4 py-2">
                      {item.importPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {item.salePrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{item.effectiveDate}</td>
                    <td className="px-4 py-2">{item.updatedBy}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      {item.isActive && (
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                          Áp dụng
                        </span>
                      )}
                      <button className="text-red-500 hover:text-red-700 text-xs ml-2">
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Quay lại
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
