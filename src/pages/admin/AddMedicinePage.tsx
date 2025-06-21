import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AddMedicinePage() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Thuốc");
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

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
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [finalPrice, setFinalPrice] = useState("0");
  const [details, setDetails] = useState([
    { type: "INGREDIENT", content: "" },
    { type: "EFFECT", content: "" },
    { type: "USAGE", content: "" },
    { type: "SIDE_EFFECT", content: "" },
    { type: "NOTE", content: "" },
    { type: "STORAGE", content: "" },
    { type: "DESCRIPTION", content: "" },
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (index: number, content: string) => {
    const updated = [...details];
    updated[index].content = content;
    setDetails(updated);
  };

  const fetchFinalPriceFromBackend = async () => {
    try {
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
      console.log("Success to fetch price:", data);
      setFinalPrice(data.finalPrice.toFixed(0));
    } catch (err) {
      console.error("Failed to fetch price:", err);
      setFinalPrice("0");
    }
  };

  useEffect(() => {
    if (medicine.originalPrice) {
      fetchFinalPriceFromBackend();
    }
  }, [medicine.originalPrice, medicine.discountPercent, medicine.vatPercent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId);  
    // Gửi các trường thuốc
    Object.entries(medicine).forEach(([key, value]) => {
      if (key === "originalPrice" || key === "categoryId") {
        formData.append(key, String(parseFloat(value)));
      } else {
        formData.append(key, value);
      }
    });

    formData.append("price", String(parseFloat(finalPrice)));
    formData.append("details", JSON.stringify(details)); // ✅ dạng chuỗi JSON

    // Gửi ảnh nếu có
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    // Gọi API backend
    try {
      const res = await fetch("/api/medicines", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Thêm thuốc thành công!");
        navigate("/admin/medicines");
      } else {
        const text = await res.text();
        toast.error("Thêm thuốc thất bại!");
      }
    } catch (err) {
      console.error("Lỗi kết nối:", err);
      alert("Không thể kết nối đến server!");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };

    fetchCategories();
  }, []);

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
          {/* Icon nằm sát phải */}
          <div className="ml-auto flex items-center gap-4 text-black text-lg">
            <Link to="/admin/account">
              <FaUser />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <Breadcrumb
            items={[
              { label: "Danh sách thuốc", path: "/admin/medicines" },
              { label: "Thêm thuốc" },
            ]}
          />
          <h2 className="text-xl font-semibold mb-4">Thêm thuốc</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                value={medicine.name}
                onChange={handleChange}
                placeholder="Tên thuốc"
                className="input"
              />
              <input
                name="unit"
                value={medicine.unit}
                onChange={handleChange}
                placeholder="Đơn vị"
                className="input"
              />
              <input
                name="originalPrice"
                value={medicine.originalPrice}
                onChange={handleChange}
                placeholder="Giá gốc"
                type="number"
                className="input"
              />
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
              <input
                value={finalPrice}
                disabled
                placeholder="Giá bán (backend)"
                className="input font-bold text-blue-600"
              />
              <input
                name="brandOrigin"
                value={medicine.brandOrigin}
                onChange={handleChange}
                placeholder="Thương hiệu"
                className="input"
              />
              <input
                name="manufacturer"
                value={medicine.manufacturer}
                onChange={handleChange}
                placeholder="Nhà sản xuất"
                className="input"
              />
              <input
                name="countryOfManufacture"
                value={medicine.countryOfManufacture}
                onChange={handleChange}
                placeholder="Nơi sản xuất"
                className="input"
              />
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

              <input
                name="shortDescription"
                value={medicine.shortDescription}
                onChange={handleChange}
                placeholder="Mô tả ngắn"
                className="input col-span-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setSelectedImage(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setPreviewUrl(reader.result as string);
                    reader.readAsDataURL(file);
                  } else {
                    setPreviewUrl(null);
                  }
                }}
                className="input col-span-2"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-32 w-32 object-contain border mt-2 rounded shadow"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {details.map((detail, idx) => (
                <textarea
                  key={idx}
                  value={detail.content}
                  onChange={(e) => handleDetailChange(idx, e.target.value)}
                  placeholder={detail.type}
                  className="p-2 border rounded h-20"
                />
              ))}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Lưu thuốc
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
