import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MedicineActionButtons({
  medicineId,
}: {
  medicineId: string;
}) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/medicines/${Number(medicineId)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Xóa thuốc thành công!");
        setShowConfirm(false);
        // ✅ Option: reload hoặc cập nhật lại danh sách
        setTimeout(() => {
          window.location.reload(); // hoặc gọi callback
        }, 2000);
      } else {
        const error = await res.text();
        toast.error(`Xóa thất bại: ${error}`);
      }
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      toast.error("Đã xảy ra lỗi khi xóa thuốc.");
    }
  };

  return (
    <>
      <div className="flex justify-center gap-1 items-center">
        <button onClick={() => navigate(`/admin/medicines/${medicineId}`)}>
          👁️
        </button>
        <button onClick={() => navigate(`/admin/medicines/${medicineId}/edit`)}>
          ✏️
        </button>
        <button onClick={() => setShowConfirm(true)}>🗑️</button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative bg-white p-6 rounded shadow-lg max-w-sm w-full z-10">
            <h3 className="text-lg font-semibold mb-4">Thông báo</h3>
            <p className="mb-4">
              Bạn có chắc muốn xóa thuốc có mã <strong>{medicineId}</strong>{" "}
              này?
            </p>
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
    </>
  );
}
