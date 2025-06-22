import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react"; // Thư viện icon hiện đại

interface Props {
  viewUrl: string;
  editUrl?: string;
  onDelete?: () => void;
  customEditAction?: () => void; // 👈 thêm dòng này
}

export default function ActionButtons({ viewUrl, editUrl, onDelete, customEditAction }: Props) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (onDelete) onDelete();
    setShowConfirm(false);
  };

  return (
    <>
      <div className="flex justify-center gap-1 items-center">
        <button onClick={() => navigate(viewUrl)}>👁️</button>
        {customEditAction ? (
          <button onClick={customEditAction}>✏️</button>
        ) : (
          editUrl && <button onClick={() => navigate(editUrl)}>✏️</button>
        )}
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