import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa"; // ❌ icon đỏ
import BreadcrumbBack from "../../components/common/BreadcrumbBack";

export default function OrderFailPage() {
  const navigate = useNavigate();

  const breadcrumbItems = [{ label: "Quay lại trang chủ", path: "/" }];

  return (
    <>
      <div>
        <BreadcrumbBack items={breadcrumbItems}></BreadcrumbBack>
      </div>

      <div className="py-10 bg-white flex flex-col items-center justify-center pt-10">
        {/* Icon + Tiêu đề */}
        <FaTimesCircle className="text-red-500 text-6xl mb-4" />
        <h2 className="text-xl font-bold mb-4 text-red-600 uppercase tracking-wide">
          Thanh toán không thành công!
        </h2>

        {/* Khung nội dung cảnh báo */}
        <div className="bg-gray-100 max-w-xl rounded p-5 text-sm leading-relaxed text-gray-800 text-left shadow">
          <p>Giao dịch không thành công</p>
          <p className="mt-2">PrimeCare rất hân hạnh được phục vụ bạn!</p>
        </div>

        {/* Nút hành động */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm font-semibold">
          <button
            onClick={() => navigate("/")}
            className="bg-cyan-400 hover:bg-cyan-500 text-white py-2 px-6 rounded-lg"
          >
            QUAY LẠI TRANG CHỦ
          </button>
        </div>
      </div>
    </>
  );
}
