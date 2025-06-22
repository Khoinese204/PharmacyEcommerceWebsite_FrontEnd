import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserActionButtons({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/users/admin/${userId}`);
      toast.success("Xóa người dùng thành công");
      // ✅ Option: reload hoặc cập nhật lại danh sách
      setTimeout(() => {
        window.location.reload(); // hoặc gọi callback
      }, 2000);
      navigate("/admin/users");
    } catch (error) {
      console.error("Lỗi khi xóa người dùng", error);
      toast.error("Xóa người dùng thất bại");
    }
    setShowConfirm(false);
  };

  return (
    <>
      <div className="flex justify-center gap-1 items-center">
        <button onClick={() => navigate(`/admin/users/${userId}`)}>👁️</button>
        <button onClick={() => navigate(`/admin/users/${userId}/edit`)}>
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
              Bạn có chắc muốn xóa người dùng <strong>{userId}</strong> này?
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
