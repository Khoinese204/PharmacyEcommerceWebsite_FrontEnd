import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { FaUser } from "react-icons/fa";

export default function ViewMedicinePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedMenu, setSelectedMenu] = useState("Thuốc");

  const menu = [
    { label: "Bảng điều khiển", path: "/admin/dashboard" },
    { label: "Người dùng", path: "/admin/users" },
    { label: "Thuốc", path: "/admin/medicines" },
    { label: "Danh mục thuốc", path: "/admin/categories" },
    { label: "Mã giảm giá", path: "/admin/coupons" },
    // { label: "Kho", path: "/admin/warehouse" },
    // { label: "Doanh thu", path: "/admin/revenue" },
    // { label: "Khách hàng", path: "/admin/customers" },
    // { label: "Lịch sử giá", path: "/admin/price-history" },
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
    price: "", // ✅ Thêm dòng này
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
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

  const [creatorName, setCreatorName] = useState("Unknown");
  const [updaterName, setUpdaterName] = useState("Unknown");

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const res = await fetch(`/api/medicines/${Number(id)}`);
        const data = await res.json();
        setMedicine(data);

        setDetails(data.details || details);
        setCreatorName(data.creator?.fullName || "Unknown");
        setUpdaterName(data.updater?.fullName || "Unknown");
      } catch (err) {
        console.error("Lỗi khi tải thuốc:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err);
      }
    };

    fetchMedicine();
    fetchCategories();
  }, [id]);

  useEffect(() => {
    const calculateFinalPrice = async () => {
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
        setFinalPrice(data.finalPrice.toFixed(0));
      } catch (err) {
        setFinalPrice("0");
      }
    };

    if (medicine.originalPrice) {
      calculateFinalPrice();
    }
  }, [medicine.originalPrice, medicine.discountPercent, medicine.vatPercent]);

  return (
    <div className="h-full w-full fixed inset-0 flex bg-gray-50 text-sm overflow-hidden">
      {/* Sidebar */}
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
          {/* Icon Avatar */}
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
              { label: "Xem thuốc" },
            ]}
          />
          <h2 className="text-xl font-semibold mb-4">Xem thuốc</h2>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Tên thuốc
                </label>
                <input disabled value={medicine.name} className="input" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Đơn vị
                </label>
                <input disabled value={medicine.unit} className="input" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Giá gốc
                </label>
                <input
                  disabled
                  value={medicine.originalPrice}
                  className="input"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Giá bán
                </label>
                <input
                  disabled
                  value={medicine.price}
                  className="input font-bold text-blue-600"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Thương hiệu
                </label>
                <input
                  disabled
                  value={medicine.brandOrigin}
                  className="input"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Nhà sản xuất
                </label>
                <input
                  disabled
                  value={medicine.manufacturer}
                  className="input"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Nơi sản xuất
                </label>
                <input
                  disabled
                  value={medicine.countryOfManufacture}
                  className="input"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Danh mục
                </label>
                <select disabled value={medicine.categoryId} className="input">
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  Mô tả ngắn
                </label>
                <input
                  disabled
                  value={medicine.shortDescription}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Người tạo
                </label>
                <input disabled value={creatorName} className="input" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Người cập nhật
                </label>
                <input disabled value={updaterName} className="input" />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  Hình ảnh
                </label>
                <img
                  src={`http://localhost:8080/images/products/${medicine.imageUrl}`}
                  alt="Hình ảnh thuốc"
                  className="h-32 w-32 object-cover border rounded shadow"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {details.map((detail, idx) => (
                <div key={idx}>
                  <label className="block mb-1 font-medium text-gray-700">
                    {detail.type}
                  </label>
                  <textarea
                    value={detail.content}
                    disabled
                    className="p-2 border rounded h-20 w-full"
                  />
                </div>
              ))}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
