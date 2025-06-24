import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import axios from "axios";

interface Props {
  viewUrl: string;
  orderId: number;
  currentStatus:
    | "PENDING"
    | "PACKING"
    | "DELIVERING"
    | "DELIVERED"
    | "CANCELLED";
  onDelete?: () => void;
  onStatusUpdateSuccess?: (newStatusCode: string) => void;
  editUrl?: string;
  customEditAction?: () => void;
}

const statuses = [
  { label: "Chờ xác nhận", value: "PENDING" },
  { label: "Đang gói hàng", value: "PACKING" },
  { label: "Đang giao hàng", value: "DELIVERING" },
  { label: "Đã giao", value: "DELIVERED" },
  { label: "Đã hủy", value: "CANCELLED" },
];

export default function ActionButtonsExport({
  viewUrl,
  editUrl,
  orderId,
  currentStatus,
  onDelete,
  onStatusUpdateSuccess,
  customEditAction,
}: Props) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Props["currentStatus"]>("PACKING"); // default, sẽ reset sau
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = currentUser?.id;

  const handleDelete = () => {
    if (onDelete) onDelete();
    setShowConfirm(false);
  };

  const handleSaveStatus = async () => {
    console.log("DEBUG - currentStatus:", currentStatus);
    console.log("DEBUG - selectedStatus:", selectedStatus);

    if (!(currentStatus === "PACKING" && selectedStatus === "DELIVERING")) {
      setErrorMessage("Chỉ được chuyển từ 'Đang gói hàng' sang 'Đang giao hàng'.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    try {
      await axios.put(`/api/orders/${orderId}/status`, {
        orderId,
        newStatus: selectedStatus,
        updatedByUserId: userId,
        note: "Cập nhật trạng thái từ nhân viên kho",
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

  const getAllowedNextStatuses = (status: Props["currentStatus"]) => {
    if (status === "PACKING") {
      return statuses.filter((s) => s.value === "DELIVERING");
    }
    return [];
  };

  const handleOpenEdit = () => {
    const allowed = getAllowedNextStatuses(currentStatus);
    if (allowed.length > 0) {
      setSelectedStatus(allowed[0].value as Props["currentStatus"]);
    } else {
      setSelectedStatus(currentStatus);
    }
    setShowEdit(true);
  };

  return (
    <>
      <div className="flex justify-center gap-2 items-center">
        <button
          onClick={() => navigate(viewUrl)}
          className="p-1 text-blue-600 hover:bg-gray-100 rounded"
          title="Xem chi tiết"
        >
          👁️
        </button>

        {customEditAction ? (
          <button
            onClick={customEditAction}
            className="p-1 text-green-600 hover:bg-gray-100 rounded"
            title="Chỉnh sửa trạng thái"
          >
            ✏️
          </button>
        ) : onStatusUpdateSuccess ? (
          <button
            onClick={handleOpenEdit}
            className="p-1 text-green-600 hover:bg-gray-100 rounded"
            title="Cập nhật trạng thái"
          >
            ✏️
          </button>
        ) : editUrl ? (
          <button
            onClick={() => navigate(editUrl)}
            className="p-1 text-green-600 hover:bg-gray-100 rounded"
            title="Chỉnh sửa"
          >
            ✏️
          </button>
        ) : null}

        {onDelete && (
          <button
            onClick={() => setShowConfirm(true)}
            className="p-1 text-red-600 hover:bg-gray-100 rounded"
            title="Xóa"
          >
            🗑️
          </button>
        )}
      </div>

      {/* Modal xác nhận xóa */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative bg-white p-6 rounded shadow-lg max-w-sm w-full z-10">
            <h3 className="text-lg font-semibold mb-4">Xác nhận</h3>
            <p className="mb-4">Bạn có chắc muốn xóa mục này?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowConfirm(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={handleDelete}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal cập nhật trạng thái */}
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative bg-white p-6 rounded shadow-lg max-w-sm w-full z-10">
            <h3 className="text-lg font-semibold mb-4">Chỉnh sửa trạng thái</h3>
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as Props["currentStatus"])
              }
              className="w-full mb-3 border px-3 py-2 rounded"
            >
              {getAllowedNextStatuses(currentStatus).map((s) => (
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
