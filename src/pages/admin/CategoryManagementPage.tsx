import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/admin/Breadcrumb";
import Pagination from "../../components/admin/TablePagination";
import SearchBar from "../../components/admin/SearchBar";
import { FaUser } from "react-icons/fa";

const menu = [
  { label: "Bảng điều khiển", path: "/admin/dashboard" },
  { label: "Người dùng", path: "/admin/users" },
  { label: "Thuốc", path: "/admin/medicines" },
  { label: "Danh mục thuốc", path: "/admin/categories" },
  { label: "Mã giảm giá", path: "/admin/coupons" },
];

interface Category {
  id: number;
  name: string;
}

export default function CategoryManagementPage() {
  const [selectedMenu, setSelectedMenu] = useState("Danh mục thuốc");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const navigate = useNavigate();
  const itemsPerPage = 8;
  const BASE_URL = "http://localhost:8080/api/categories"; // ✅ chỉnh theo port Spring Boot của bạn

  // ===========================
  // Load dữ liệu từ backend
  // ===========================
  const fetchCategories = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: searchTerm ? { name: searchTerm } : {},
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [searchTerm]);

  // ===========================
  // Thêm danh mục mới
  // ===========================
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await axios.post(BASE_URL, { name: newCategoryName.trim() });
      setIsAddModalOpen(false);
      setNewCategoryName("");
      fetchCategories(); // cập nhật lại danh sách
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  // ===========================
  // Sửa danh mục
  // ===========================
  const handleEditCategory = async () => {
    if (!editCategory || !editCategory.name.trim()) return;
    try {
      await axios.put(`${BASE_URL}/${editCategory.id}`, {
        name: editCategory.name.trim(),
      });
      setIsEditModalOpen(false);
      setEditCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Lỗi khi sửa danh mục:", error);
    }
  };

  // ===========================
  // Xoá danh mục
  // ===========================
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    try {
      await axios.delete(`${BASE_URL}/${categoryToDelete.id}`);
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (error) {
      console.error("Lỗi khi xoá danh mục:", error);
    }
  };

  // ===========================
  // Reset bộ lọc
  // ===========================
  const handleReset = () => {
    setSearchTerm("");
    fetchCategories();
  };

  // ===========================
  // Phân trang
  // ===========================
  const paginated = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      {/* Sidebar */}
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

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-white shadow-sm shrink-0">
          <div className="ml-auto flex items-center gap-4 text-black text-lg">
            <Link to="/admin/account">
              <FaUser />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-2">
            <Breadcrumb
              items={[
                { label: "Danh sách danh mục", path: "/admin/categories" },
              ]}
            />
          </div>

          {/* Search + Filter */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="p-6">
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSelect={(value: string) => setSearchTerm(value)}
                placeholder="Tìm kiếm theo tên danh mục..."
              />
            </div>
            {/* <button
              onClick={handleReset}
              className="text-sm px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 mr-4"
            >
              Đặt lại mặc định
            </button> */}
          </div>

          {/* Add button */}
          <div className="flex justify-between items-center px-6 mb-4">
            <div></div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-sm"
            >
              Thêm danh mục
            </button>
          </div>

          {/* Table */}
          <div className="bg-white p-4 rounded-xl shadow">
            <table className="w-full text-left text-sm table-fixed border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="px-4 py-2 font-semibold">STT</th>
                  <th className="px-4 py-2 font-semibold">TÊN DANH MỤC</th>
                  <th className="px-4 py-2 font-semibold text-center">
                    HÀNH ĐỘNG
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((cat, index) => (
                  <tr key={cat.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2">{cat.name}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        title="Sửa"
                        onClick={() => {
                          setEditCategory(cat);
                          setIsEditModalOpen(true);
                        }}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        ✏️
                      </button>
                      <button
                        title="Xoá"
                        onClick={() => {
                          setCategoryToDelete(cat);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(categories.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Thêm danh mục mới
            </h2>
            <input
              type="text"
              placeholder="Nhập tên danh mục..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={handleAddCategory}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && editCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Chỉnh sửa danh mục
            </h2>
            <input
              type="text"
              placeholder="Nhập tên danh mục..."
              value={editCategory.name}
              onChange={(e) =>
                setEditCategory({ ...editCategory, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={handleEditCategory}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && categoryToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4 text-center text-red-600">
              Xác nhận xoá
            </h2>
            <p className="text-center mb-6">
              Bạn có chắc chắn muốn xoá danh mục{" "}
              <span className="font-semibold">{categoryToDelete.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteCategory}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
