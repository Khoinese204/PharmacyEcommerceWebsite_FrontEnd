import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

interface Props {
  viewUrl: string;
  orderId: number;
  currentStatus: string; // code: CONFIRMED, PENDING, ...
  onDelete?: () => void;
  onStatusUpdateSuccess?: (newStatus: string) => void;
}

const statuses = [
  { label: "Chờ xác nhận", value: "PENDING" },
  { label: "Đã xác nhận", value: "CONFIRMED" },
  { label: "Đang đóng gói", value: "PACKING" },
  { label: "Đã đóng gói", value: "PACKED" },
  { label: "Đang giao hàng", value: "DELIVERING" },
  { label: "Đã giao", value: "DELIVERED" },
  { label: "Đã hủy", value: "CANCELLED" },
  { label: "Giao hàng thất bại", value: "FAIL_DELIVERY" },
  { label: "Đã hoàn tiền", value: "REFUNDED" },
];

export default function ActionButtons({
  viewUrl,
  orderId,
  currentStatus,
  onDelete,
  onStatusUpdateSuccess,
}: Props) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = () => {
    if (onDelete) onDelete();
    setShowConfirm(false);
  };

  const handleSaveStatus = async () => {
    setIsSaving(true);
    setErrorMessage("");
    try {
      await axios.put(`/api/orders/${orderId}/status`, {
        orderId,
        newStatus: selectedStatus,
        updatedByUserId: 2,
        note: "Cập nhật từ ActionButtons",
      });

      onStatusUpdateSuccess?.(selectedStatus);
      setShowEdit(false);
    } catch (err) {
        console.error("Lỗi cập nhật trạng thái:", err);
        setErrorMessage("Cập nhật trạng thái thất bại. Vui lòng thử lại.");
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-1 items-center">
        <button onClick={() => navigate(viewUrl)}>👁️</button>
        <button onClick={() => setShowEdit(true)}>✏️</button>
        {onDelete && <button onClick={() => setShowConfirm(true)}>🗑️</button>}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative bg-white p-6 rounded shadow-lg max-w-sm w-full z-10">
            <h3 className="text-lg font-semibold mb-4">Xác nhận</h3>
            <p className="mb-4">Bạn có chắc muốn xóa mục này?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 rounded bg-gray-200"
                onClick={() => setShowConfirm(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-1 rounded bg-red-500 text-white"
                onClick={handleDelete}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative bg-white p-6 rounded shadow-lg max-w-sm w-full z-10">
            <h3 className="text-lg font-semibold mb-4">Chỉnh sửa trạng thái</h3>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full mb-3 border px-3 py-2 rounded"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            {errorMessage && (
              <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 rounded bg-gray-200"
                onClick={() => setShowEdit(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
                onClick={handleSaveStatus}
                disabled={isSaving}
              >
                {isSaving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
