import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { FaUser } from "react-icons/fa";
import { BASE_IMAGE_URL } from "../../helper/constants";
import { toast } from "react-toastify";

export default function EditMedicinePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  const [selectedMenu, setSelectedMenu] = useState("Thuốc");
  const menu = [
    { label: "Bảng điều khiển", path: "/admin/dashboard" },
    { label: "Người dùng", path: "/admin/users" },
    { label: "Thuốc", path: "/admin/medicines" },
    { label: "Danh mục thuốc", path: "/admin/categories" },
    { label: "Mã giảm giá", path: "/admin/coupons" },
    { label: "Kho", path: "/admin/warehouse" },
    { label: "Doanh thu", path: "/admin/revenue" },
    { label: "Khách hàng", path: "/admin/customers" },
    { label: "Lịch sử giá", path: "/admin/price-history" },
  ];
  const [medicine, setMedicine] = useState({
    name: "",
    unit: "",
    originalPrice: "",
    discountPercent: "0",
    vatPercent: "10",
    brandOrigin: "",
    manufacturer: "",
    countryOfManufacture: "",
    categoryId: "",
    shortDescription: "",
    imageUrl: "",
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [finalPrice, setFinalPrice] = useState("0");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [details, setDetails] = useState([
    { type: "INGREDIENT", content: "" },
    { type: "EFFECT", content: "" },
    { type: "USAGE", content: "" },
    { type: "SIDE_EFFECT", content: "" },
    { type: "NOTE", content: "" },
    { type: "STORAGE", content: "" },
    { type: "DESCRIPTION", content: "" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const medRes = await fetch(`/api/medicines/${id}`);
      const medData = await medRes.json();
      setMedicine(medData);
      setDetails(medData.details || details);

      const catRes = await fetch("/api/categories");
      const catData = await catRes.json();
      setCategories(catData);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchFinalPrice = async () => {
      const res = await fetch("/api/pricing/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalPrice: parseFloat(medicine.originalPrice) || 0,
          discountPercent: parseFloat(medicine.discountPercent) || 0,
          vatPercent: parseFloat(medicine.vatPercent) || 0,
        }),
      });
      const data = await res.json();
      setFinalPrice(data.finalPrice.toFixed(0));
    };

    if (medicine.originalPrice) {
      fetchFinalPrice();
    }
  }, [medicine.originalPrice, medicine.discountPercent, medicine.vatPercent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (index, content) => {
    const updated = [...details];
    updated[index].content = content;
    setDetails(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (userId != null) {
      formData.append("userId", userId.toString());
    }

    Object.entries(medicine).forEach(([key, value]) => {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        formData.append(key, value.toString());
      }
    });

    formData.append("price", finalPrice.toString());
    formData.append("details", JSON.stringify(details));

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    const res = await fetch(`/api/medicines/${id}/upload`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      toast.success("Cập nhật thuốc thành công!");
      navigate("/admin/medicines");
    } else {
      toast.error("Lỗi khi cập nhật thuốc!");
    }
  };

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      <aside className="w-60 bg-white shadow-md px-4 py-6 space-y-4">
        <div className="font-bold text-lg text-blue-600 mb-6">PrimeCare</div>
        {menu.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(item.path)} // chuyển trang
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
          <div className="ml-auto flex items-center gap-4 text-black text-lg">
            <FaUser />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <Breadcrumb
            items={[
              { label: "Danh sách thuốc", path: "/admin/medicines" },
              { label: "Chỉnh sửa thuốc" },
            ]}
          />
          <h2 className="text-xl font-semibold mb-4">Chỉnh sửa thuốc</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Tên thuốc */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Tên thuốc
                </label>
                <input
                  name="name"
                  value={medicine.name}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Đơn vị */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Đơn vị
                </label>
                <input
                  name="unit"
                  value={medicine.unit}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Giá gốc */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Giá gốc
                </label>
                <input
                  name="originalPrice"
                  value={medicine.originalPrice}
                  onChange={handleChange}
                  type="number"
                  className="input"
                />
              </div>

              {/* Giảm giá */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Giảm giá (%)
                </label>
                <select
                  name="discountPercent"
                  value={medicine.discountPercent}
                  onChange={handleChange}
                  className="input"
                >
                  {[0, 5, 10, 15, 20, 25, 30].map((p) => (
                    <option key={p} value={p}>
                      Giảm {p}%
                    </option>
                  ))}
                </select>
              </div>

              {/* VAT */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  VAT (%)
                </label>
                <select
                  name="vatPercent"
                  value={medicine.vatPercent}
                  onChange={handleChange}
                  className="input"
                >
                  {[0, 5, 10].map((v) => (
                    <option key={v} value={v}>
                      VAT {v}%
                    </option>
                  ))}
                </select>
              </div>

              {/* Giá bán */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Giá bán
                </label>
                <input
                  disabled
                  value={finalPrice}
                  className="input font-bold text-blue-600"
                />
              </div>

              {/* Thương hiệu */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Thương hiệu
                </label>
                <input
                  name="brandOrigin"
                  value={medicine.brandOrigin}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Nhà sản xuất */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Nhà sản xuất
                </label>
                <input
                  name="manufacturer"
                  value={medicine.manufacturer}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Nơi sản xuất */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Nơi sản xuất
                </label>
                <input
                  name="countryOfManufacture"
                  value={medicine.countryOfManufacture}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Danh mục */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Danh mục
                </label>
                <select
                  name="categoryId"
                  value={medicine.categoryId}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mô tả ngắn */}
              <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  Mô tả ngắn
                </label>
                <input
                  name="shortDescription"
                  value={medicine.shortDescription}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

              {/* Ảnh */}
              <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      setSelectedImage(file);
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setPreviewUrl(reader.result as string);
                      reader.readAsDataURL(file);
                    } else {
                      setSelectedImage(null);
                      setPreviewUrl(null);
                    }
                  }}
                  className="input"
                />
              </div>

              {previewUrl || medicine.imageUrl ? (
                <div className="col-span-2">
                  <img
                    src={previewUrl || `${BASE_IMAGE_URL}${medicine.imageUrl}`}
                    className="h-32 w-32 object-contain border mt-2 rounded shadow"
                    alt="Preview"
                  />
                </div>
              ) : null}
            </div>

            {/* Chi tiết thuốc */}
            <div className="grid grid-cols-2 gap-4">
              {details.map((detail, idx) => (
                <div key={idx}>
                  <label className="block mb-1 font-medium text-gray-700">
                    {detail.type}
                  </label>
                  <textarea
                    value={detail.content}
                    onChange={(e) => handleDetailChange(idx, e.target.value)}
                    className="p-2 border rounded h-20 w-full"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Lưu thay đổi
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
