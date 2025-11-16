import React, { useEffect, useState } from "react";
import BreadcrumbTo from "../../components/common/BreadcrumbTo";
import QuantityButton from "../../components/common/QuantityButton";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";
import { fetchInventoryQuantity, fetchMedicineById } from "../../common/api";
import BreadcrumbBack from "../../components/common/BreadcrumbBack";
import { getCategoryNameById } from "../../utils/getCategoryNameById";
import { BASE_IMAGE_URL } from "../../helper/constants";
import RatingsAndReviews from "../../components/common/RatingsAndReviews";

const allProducts = [
  {
    id: 1,
    name: "Vitamin C 500mg",
    image: "/images/products/product1.jpg",
    originalPrice: 165000,
    discountedPrice: 165000,
    unit: "hộp",
    brand: "VitaHealth",
  },
  {
    id: 2,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product2.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
    brand: "Vinamilk",
  },
  {
    id: 3,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product3.jpg",
    originalPrice: 200000,
    discountedPrice: 200000,
    unit: "lon",
    brand: "Vinamilk",
  },
  {
    id: 4,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product4.jpg",
    originalPrice: 200000,
    discountedPrice: 200000,
    unit: "lon",
    brand: "Nutifood",
  },
  {
    id: 5,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product5.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
    brand: "Nutifood",
  },
  {
    id: 6,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product6.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
    brand: "TH True Milk",
  },
  {
    id: 7,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product7.jpg",
    originalPrice: 180000,
    discountedPrice: 180000,
    unit: "lon",
    brand: "TH True Milk",
  },
  {
    id: 8,
    name: "Sữa tăng đề kháng",
    image: "/images/products/product8.jpg",
    originalPrice: 200000,
    discountedPrice: 180000,
    unit: "lon",
    brand: "Abbott",
  },
  {
    id: 9,
    name: "Sữa tăng đề kháng extra",
    image: "/images/products/product9.jpg",
    originalPrice: 210000,
    discountedPrice: 190000,
    unit: "lon",
    brand: "Abbott",
  },
  {
    id: 10,
    name: "Sữa tăng đề kháng extra",
    image: "/images/products/product10.jpg",
    originalPrice: 210000,
    discountedPrice: 190000,
    unit: "lon",
    brand: "Nestlé",
  },
  {
    id: 11,
    name: "Sữa tăng đề kháng extra",
    image: "/images/products/product11.jpg",
    originalPrice: 210000,
    discountedPrice: 190000,
    unit: "lon",
    brand: "Nestlé",
  },
];

const RandomProductDetailPage = () => {
  const [activeTab, setActiveTab] = useState("mo-ta");
  const { productId } = useParams(); // 👈 Lấy từ URL
  const location = useLocation();
  const categoryPath = location.pathname.split("/")[1]; // "drugs" | "functional-foods" | ...
  const [product, setProduct] = useState<any | null>(null);
  const [inventoryQuantity, setInventoryQuantity] = useState<number | null>(
    null
  );
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  // const getDetailContent = (type: string): string => {
  //   return (
  //     product?.details.find((d) => d.type === type)?.content ||
  //     "Không có dữ liệu"
  //   );
  // };

  const { addToCart, isInCart } = useCart(); // ✅ khai báo ở đây

  const breadcrumbItems = [{ label: "Trang chủ", path: "/" }];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchMedicineById(Number(productId));
        setProduct(data);
        const quantity = await fetchInventoryQuantity(Number(productId));
        setInventoryQuantity(quantity);
      } catch (error: any) {
        console.error("❌ Error fetching product:", error.message);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div className="bg-white text-gray-800">
      {/* Breadcrumb */}
      <BreadcrumbBack items={breadcrumbItems}></BreadcrumbBack>

      {/* Top info */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={`${BASE_IMAGE_URL}${product!.imageUrl}`}
            alt={product!.name}
            className="w-full max-w-sm max-h-[800px] object-contain rounded-lg shadow-md"
          />
        </div>

        <div>
          <h1
            style={{ fontSize: "30px" }}
            className="font-semibold mb-2 leading-snug text-left"
          >
            {product!.name}
          </h1>
          <div className="text-left mb-4">
            {product!.price !== product!.originalPrice && (
              <span className="line-through text-gray-400 text-sm mr-2">
                {product!.originalPrice.toLocaleString("vi-VN")}đ
              </span>
            )}
            <span className="text-blue-600 font-bold text-lg">
              {product!.price.toLocaleString("vi-VN")}đ/{product!.unit}
            </span>
          </div>
          <div className="text-left">
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isInCart(product!.id)) {
                    toast.error("Sản phẩm đã tồn tại trong giỏ hàng!", {
                      position: "top-center",
                    });
                    return;
                  }
                  addToCart({
                    id: product!.id,
                    name: product!.name,
                    image: `${BASE_IMAGE_URL}${product!.imageUrl}`, // ✅ đảm bảo có path
                    unit: product!.unit,
                    price: product!.price,
                    originalPrice: product!.originalPrice,
                  });
                  toast.success("Đã thêm vào giỏ hàng!");
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-4 py-2 rounded-full"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>

          <table className="text-left text-sm">
            <tbody>
              <tr>
                <td className="pr-4 py-1">Chọn đơn vị tính:</td>
                <td>{product!.unit}</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Danh mục:</td>
                <td>{getCategoryNameById(product!.categoryId)}</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Mô tả ngắn:</td>
                <td>{product!.shortDescription}</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Xuất xứ:</td>
                <td>{product!.countryOfManufacture}</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Nhà sản xuất:</td>
                <td>{product!.manufacturer}</td>
              </tr>
              <tr>
                <td className="pr-4 py-1">Thương hiệu:</td>
                <td>{product!.brandOrigin}</td>
              </tr>
              <tr>
                <td className="pr-4 py-1 font-bold text-green-600">Còn hàng</td>
                <td className="text-green-600">
                  {inventoryQuantity !== null ? inventoryQuantity : 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        <aside className="space-y-3">
          {[
            { key: "mo-ta", label: "Mô tả sản phẩm", type: "DESCRIPTION" },
            { key: "thanh-phan", label: "Thành phần", type: "INGREDIENT" },
            { key: "cong-dung", label: "Công dụng", type: "EFFECT" },
            { key: "cach-dung", label: "Cách dùng", type: "USAGE" },
            { key: "tac-dung-phu", label: "Tác dụng phụ", type: "SIDE_EFFECT" },
            { key: "luu-y", label: "Lưu ý", type: "NOTE" },
            { key: "bao-quan", label: "Bảo quản", type: "STORAGE" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full text-left py-2 px-3 rounded ${
                activeTab === tab.key
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </aside>

        <div className="text-left md:col-span-3 whitespace-pre-line">
          {[
            { key: "mo-ta", title: "Mô tả sản phẩm", type: "DESCRIPTION" },
            { key: "thanh-phan", title: "Thành phần", type: "INGREDIENT" },
            { key: "cong-dung", title: "Công dụng", type: "EFFECT" },
            { key: "cach-dung", title: "Cách dùng", type: "USAGE" },
            { key: "tac-dung-phu", title: "Tác dụng phụ", type: "SIDE_EFFECT" },
            { key: "luu-y", title: "Lưu ý", type: "NOTE" },
            { key: "bao-quan", title: "Bảo quản", type: "STORAGE" },
          ]
            .filter((tab) => tab.key === activeTab)
            .map((tab) => (
              <div key={tab.key}>
                <h2 className="text-base font-semibold mb-2">{tab.title}</h2>
                <p>
                  {product!.details.find((d) => d.type === tab.type)?.content ??
                    "Không có dữ liệu"}
                </p>
              </div>
            ))}
        </div>
      </div>
      <RatingsAndReviews medicineId={product.id} viewerId={userId} />
    </div>
  );
};

export default RandomProductDetailPage;
